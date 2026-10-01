import { test } from "node:test";
import assert from "node:assert/strict";
import { once } from "node:events";
import Stripe from "stripe";
import { createApp } from "./app.js";

test("authentication attempts are rate limited", async (t) => {
  const { request } = await setup(t);
  for (let i = 0; i < 20; i++) {
    assert.equal((await request("login", { email: "nobody@example.test", password: "invalid" })).status, 401);
  }
  assert.equal((await request("login", { email: "nobody@example.test", password: "invalid" })).status, 429);
});

test("checkout retries preserve idempotency after an uncertain provider response", async (t) => {
  const keys = [];
  const stripeClient = {
    customers: { create: async () => ({ id: "cus_retry" }) },
    checkout: { sessions: { create: async (_params, options) => {
      keys.push(options.idempotencyKey);
      if (keys.length === 1) throw new Error("Connection lost after remote creation");
      return { id: "cs_retry", url: "https://checkout.stripe.com/c/pay/cs_retry" };
    } } },
  };
  const { request } = await setup(t, { stripeClient, webhookSecret: "whsec_fixture", priceIds: { basico: "price_b", intermediario: "price_i", avancado: "price_a" } });
  await request("register", signup);
  assert.equal((await request("checkout", {})).status, 500);
  assert.equal((await request("checkout", {})).status, 200);
  assert.equal(keys[0], keys[1]);
});

const origin = "http://localhost:4173";
const signup = {
  name: "Oficina Teste",
  email: "teste@example.test",
  password: "uma-senha-de-teste-123",
  type: "pf",
  plan: "basico",
  acceptedTerms: true,
};
async function setup(t, options = {}) {
  const { app, db } = createApp({
    databasePath: ":memory:",
    origin,
    ...options,
  });
  const server = app.listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(async () => {
    await new Promise((resolve) => server.close(resolve));
    db.close();
  });
  let cookie = "";
  async function request(route, body, headers = {}) {
    const response = await fetch(
      `http://127.0.0.1:${server.address().port}/api/oficina/${route}`,
      {
        method: body === undefined ? "GET" : "POST",
        headers: {
          Origin: origin,
          Cookie: cookie,
          "Content-Type": "application/json",
          ...headers,
        },
        body: body === undefined ? undefined : JSON.stringify(body),
      },
    );
    if (response.headers.get("set-cookie"))
      cookie = response.headers.get("set-cookie").split(";")[0];
    return {
      status: response.status,
      data: await response.json(),
      cookie: response.headers.get("set-cookie"),
    };
  }
  return { db, request };
}
test("PF: real registration, hashed password/session, persistence, logout and login", async (t) => {
  const { db, request } = await setup(t);
  assert.equal((await request("me")).status, 401);
  const registered = await request("register", signup);
  assert.equal(registered.status, 201);
  assert.match(registered.cookie, /HttpOnly; SameSite=Lax/);
  assert.equal(registered.data.account.subscribed, false);
  assert.equal(registered.data.account.password, undefined);
  const stored = db.prepare("SELECT * FROM accounts").get();
  assert.notEqual(stored.password, signup.password);
  assert.equal(stored.password.length, 128);
  assert.notEqual(
    db.prepare("SELECT token FROM sessions").get().token,
    registered.cookie.split(";")[0].split("=")[1],
  );
  assert.equal((await request("me")).data.account.email, signup.email);
  assert.equal(
    (await request("plan", { plan: "avancado", accountId: "another-account" }))
      .data.account.plan,
    "avancado",
  );
  assert.equal((await request("logout", {})).status, 200);
  assert.equal((await request("me")).status, 401);
  assert.equal(
    (await request("login", { email: signup.email, password: "incorrect" }))
      .status,
    401,
  );
  assert.equal(
    (
      await request("login", {
        email: signup.email.toUpperCase(),
        password: signup.password,
      })
    ).status,
    200,
  );
  assert.equal((await request("me")).data.account.plan, "avancado");
});
test("validation: company required, invalid plan, weak password, terms, duplicate account, foreign origin", async (t) => {
  const { request } = await setup(t);
  for (const invalid of [
    { type: "empresa" },
    { plan: "admin" },
    { password: "short" },
    { acceptedTerms: false },
    { email: "not-email" },
  ])
    assert.equal(
      (await request("register", { ...signup, ...invalid })).status,
      400,
    );
  assert.equal(
    (await request("register", signup, { Origin: "https://evil.example" }))
      .status,
    403,
  );
  assert.equal(
    (
      await request("register", {
        ...signup,
        type: "empresa",
        company: "Oficina Exemplo",
        plan: "intermediario",
      })
    ).status,
    201,
  );
  assert.equal((await request("me")).data.account.company, "Oficina Exemplo");
  assert.equal((await request("register", signup)).status, 409);
  assert.equal((await request("plan", { plan: "invalid" })).status, 400);
});
test("missing payment configuration never creates subscription; expired sessions fail", async (t) => {
  const { request, db } = await setup(t);
  assert.equal((await request("config")).data.billingReady, false);
  assert.equal((await request("checkout", {})).status, 401);
  await request("register", signup);
  assert.equal((await request("checkout", {})).status, 503);
  assert.equal((await request("me")).data.account.status, "pending");
  db.prepare("UPDATE sessions SET expires = 0").run();
  assert.equal((await request("me")).status, 401);
});
test("accounts are isolated and logout invalidates the previous session", async (t) => {
  const { request } = await setup(t);
  const first = await request("register", signup);
  const oldCookie = first.cookie.split(";")[0];
  await request("logout", {});
  await request("register", {
    ...signup,
    email: "second@example.test",
    name: "Outra Oficina",
  });
  assert.equal(
    (await request("me", undefined, { Cookie: oldCookie })).status,
    401,
  );
  assert.equal(
    (
      await request("plan", {
        plan: "intermediario",
        accountId: first.data.account.id,
      })
    ).data.account.name,
    "Outra Oficina",
  );
  await request("login", signup);
  assert.equal((await request("me")).data.account.plan, "basico");
});
test("rejects production Stripe keys", () => {
  assert.throws(
    () =>
      createApp({ databasePath: ":memory:", stripeKey: "sk_live_not-allowed" }),
    /somente chaves Stripe de teste/,
  );
});
test("checkout and signed webhook: server-owned prices, duplicate protection, confirmation, cancellation", async (t) => {
  const sdk = new Stripe("sk_test_placeholder");
  const webhookSecret = "whsec_test_fixture";
  let receivedCheckout;
  let subscription;
  let checkouts = 0;
  const stripeClient = {
    webhooks: sdk.webhooks,
    customers: { create: async () => ({ id: "cus_test" }) },
    checkout: {
      sessions: {
        create: async (params) => {
          receivedCheckout = params;
          checkouts++;
          return {
            id: "cs_test",
            url: "https://checkout.stripe.com/c/pay/cs_test",
          };
        },
      },
    },
    subscriptions: { retrieve: async () => subscription },
    billingPortal: {
      sessions: {
        create: async () => ({
          url: "https://billing.stripe.com/p/session/test",
        }),
      },
    },
  };
  const { request, db } = await setup(t, {
    stripeClient,
    webhookSecret,
    priceIds: {
      basico: "price_basic",
      intermediario: "price_middle",
      avancado: "price_advanced",
    },
  });
  const account = (await request("register", signup)).data.account;
  assert.equal(
    (
      await request("checkout", {
        price: "price_attacker",
        accountId: "attacker",
      })
    ).status,
    200,
  );
  assert.equal(receivedCheckout.line_items[0].price, "price_basic");
  assert.equal(
    receivedCheckout.subscription_data.metadata.accountId,
    account.id,
  );
  assert.equal((await request("checkout", {})).status, 200);
  assert.equal(checkouts, 1);
  assert.equal((await request("plan", { plan: "avancado" })).status, 409);
  assert.equal((await request("me")).data.account.subscribed, false);
  subscription = {
    id: "sub_test",
    customer: "cus_test",
    status: "active",
    metadata: { accountId: account.id },
    items: { data: [{ price: { id: "price_basic" } }] },
  };
  const event = {
    id: "evt_1",
    livemode: false,
    type: "checkout.session.completed",
    data: { object: { subscription: "sub_test" } },
  };
  const signed = (value) => ({
    "stripe-signature": sdk.webhooks.generateTestHeaderString({
      payload: JSON.stringify(value),
      secret: webhookSecret,
    }),
  });
  assert.equal(
    (await request("webhook", event, { "stripe-signature": "invalid" })).status,
    400,
  );
  assert.equal((await request("webhook", event, signed(event))).status, 200);
  assert.equal((await request("me")).data.account.subscribed, true);
  assert.equal((await request("checkout", {})).status, 409);
  assert.equal((await request("portal", {})).status, 200);
  assert.equal((await request("webhook", event, signed(event))).status, 200);
  assert.equal(
    db.prepare("SELECT count(*) AS count FROM events").get().count,
    1,
  );
  subscription.status = "canceled";
  const canceled = {
    id: "evt_2",
    livemode: false,
    type: "customer.subscription.deleted",
    data: { object: { id: "sub_test" } },
  };
  assert.equal(
    (await request("webhook", canceled, signed(canceled))).status,
    200,
  );
  assert.equal((await request("me")).data.account.subscribed, false);
  const live = { ...event, id: "evt_live", livemode: true };
  assert.equal((await request("webhook", live, signed(live))).status, 400);
});
