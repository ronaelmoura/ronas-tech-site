import express from "express";
import { rateLimit } from "express-rate-limit";
import { DatabaseSync } from "node:sqlite";
import {
  randomBytes,
  randomUUID,
  createHash,
  scrypt,
  timingSafeEqual,
} from "node:crypto";
import { promisify } from "node:util";
import { mkdirSync } from "node:fs";
import path from "node:path";
import Stripe from "stripe";
import { oficinaPlans } from "../src/data/oficinaPlans.js";

const derive = promisify(scrypt);
const hash = (value) => createHash("sha256").update(value).digest("hex");
const fail = (status, message) => Object.assign(new Error(message), { status });
const validPlan = (id) => oficinaPlans.some((plan) => plan.id === id);
const clean = (value, max = 160) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export function createApp({
  databasePath = "data/oficina.sqlite",
  origin = "http://localhost:4173",
  stripeKey = "",
  webhookSecret = "",
  priceIds = {},
  stripeClient,
} = {}) {
  if (stripeKey && !stripeKey.startsWith("sk_test_"))
    throw new Error("Este ambiente aceita somente chaves Stripe de teste.");
  if (databasePath !== ":memory:")
    mkdirSync(path.dirname(databasePath), { recursive: true });
  const db = new DatabaseSync(databasePath);
  db.exec(`PRAGMA foreign_keys = ON;
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS accounts (
      id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL, salt TEXT NOT NULL, type TEXT NOT NULL,
      company TEXT NOT NULL, plan TEXT NOT NULL, created_at INTEGER NOT NULL,
      customer TEXT UNIQUE, subscription TEXT UNIQUE, status TEXT NOT NULL DEFAULT 'pending'
    );
    CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, account_id TEXT NOT NULL REFERENCES accounts(id), expires INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS events (id TEXT PRIMARY KEY);
    CREATE TABLE IF NOT EXISTS checkouts (account_id TEXT PRIMARY KEY REFERENCES accounts(id), session TEXT, plan TEXT NOT NULL, url TEXT, expires INTEGER NOT NULL);
  `);
  const stripe = stripeClient || (stripeKey ? new Stripe(stripeKey) : null);
  const billingReady = Boolean(
    stripe && webhookSecret && oficinaPlans.every((p) => priceIds[p.id]),
  );
  const pendingCheckouts = new Set();
  const app = express();
  app.disable("x-powered-by");
  app.use("/api", (_req, res, next) => {
    res.set({
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex",
    });
    next();
  });
  app.post(
    "/api/oficina/webhook",
    express.raw({ type: "application/json", limit: "256kb" }),
    async (req, res) => {
      if (!billingReady)
        throw fail(503, "Pagamento de teste ainda não configurado.");
      let event;
      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          req.headers["stripe-signature"],
          webhookSecret,
        );
      } catch {
        throw fail(400, "Assinatura do webhook inválida.");
      }
      if (event.livemode)
        throw fail(400, "Eventos de produção não são aceitos.");
      if (db.prepare("SELECT id FROM events WHERE id = ?").get(event.id))
        return res.json({ received: true });
      const object = event.data.object;
      if (
        [
          "checkout.session.completed",
          "customer.subscription.created",
          "customer.subscription.updated",
          "customer.subscription.deleted",
        ].includes(event.type)
      ) {
        const subscriptionId =
          event.type === "checkout.session.completed"
            ? object.subscription
            : object.id;
        if (subscriptionId) {
          // Fetch current provider state so delayed/reordered events cannot restore expired access.
          const sub = await stripe.subscriptions.retrieve(subscriptionId);
          const account = db
            .prepare("SELECT * FROM accounts WHERE id = ?")
            .get(sub.metadata.accountId || "");
          const plan = oficinaPlans.find(
            (p) => priceIds[p.id] === sub.items.data[0]?.price.id,
          );
          const customer =
            typeof sub.customer === "string" ? sub.customer : sub.customer.id;
          if (
            !account ||
            !plan ||
            account.customer !== customer ||
            (account.subscription && account.subscription !== sub.id)
          )
            throw fail(409, "Assinatura não corresponde à conta.");
          db.prepare(
            "UPDATE accounts SET subscription = ?, status = ?, plan = ? WHERE id = ?",
          ).run(sub.id, sub.status, plan.id, account.id);
        }
      }
      db.prepare("INSERT OR IGNORE INTO events (id) VALUES (?)").run(event.id);
      res.json({ received: true });
    },
  );
  app.use("/api", express.json({ limit: "16kb" }));
  app.use("/api", (req, _res, next) => {
    if (
      !["GET", "HEAD", "OPTIONS"].includes(req.method) &&
      req.headers.origin !== origin
    )
      return next(fail(403, "Origem da solicitação inválida."));
    next();
  });
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { error: "Muitas tentativas. Aguarde 15 minutos." },
  });
  const tokenFrom = (req) =>
    req.headers.cookie
      ?.split(";")
      .map((v) => v.trim())
      .find((v) => v.startsWith("oficina_session="))
      ?.slice(16) || "";
  const sessionCookie = (res, token, maxAge = 604800) =>
    res.setHeader(
      "Set-Cookie",
      `oficina_session=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${maxAge}${origin.startsWith("https:") ? "; Secure" : ""}`,
    );
  const startSession = (req, res, id) => {
    db.prepare("DELETE FROM sessions WHERE token = ? OR expires < ?").run(
      hash(tokenFrom(req)),
      Date.now(),
    );
    const token = randomBytes(32).toString("hex");
    db.prepare("INSERT INTO sessions VALUES (?, ?, ?)").run(
      hash(token),
      id,
      Date.now() + 604800000,
    );
    sessionCookie(res, token);
  };
  const publicAccount = (a) => ({
    id: a.id,
    name: a.name,
    email: a.email,
    type: a.type,
    company: a.company,
    plan: a.plan,
    status: a.status,
    subscribed: ["active", "trialing"].includes(a.status),
  });
  const requireAccount = (req, _res, next) => {
    req.account = db
      .prepare(
        "SELECT a.* FROM accounts a JOIN sessions s ON s.account_id = a.id WHERE s.token = ? AND s.expires > ?",
      )
      .get(hash(tokenFrom(req)), Date.now());
    next(
      req.account ? undefined : fail(401, "Entre na sua conta para continuar."),
    );
  };
  app.get("/api/oficina/config", (_req, res) =>
    res.json({
      mode: "test",
      billingReady,
      plans: oficinaPlans,
    }),
  );
  app.post("/api/oficina/register", authLimiter, async (req, res) => {
    const { password, type, plan, acceptedTerms } = req.body || {};
    const name = clean(req.body?.name);
    const email = clean(req.body?.email, 254).toLowerCase();
    const company = clean(req.body?.company);
    if (
      name.length < 2 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      typeof password !== "string" ||
      password.length < 12 ||
      password.length > 128 ||
      !["pf", "empresa"].includes(type) ||
      (type === "empresa" && company.length < 2) ||
      !validPlan(plan) ||
      acceptedTerms !== true
    )
      throw fail(
        400,
        "Confira os dados e use uma senha de 12 a 128 caracteres.",
      );
    const salt = randomBytes(16).toString("hex");
    const passwordHash = (await derive(password, salt, 64)).toString("hex");
    const id = randomUUID();
    try {
      db.prepare(
        "INSERT INTO accounts (id,name,email,password,salt,type,company,plan,created_at) VALUES (?,?,?,?,?,?,?,?,?)",
      ).run(
        id,
        name,
        email,
        passwordHash,
        salt,
        type,
        type === "empresa" ? company : "",
        plan,
        Date.now(),
      );
    } catch (error) {
      if (
        error.code?.includes("CONSTRAINT") ||
        error.message.includes("UNIQUE")
      )
        throw fail(
          409,
          "Não foi possível cadastrar este e-mail. Tente entrar na sua conta.",
        );
      throw error;
    }
    startSession(req, res, id);
    res.status(201).json({
      account: publicAccount(
        db.prepare("SELECT * FROM accounts WHERE id = ?").get(id),
      ),
    });
  });
  app.post("/api/oficina/login", authLimiter, async (req, res) => {
    const email = clean(req.body?.email, 254).toLowerCase();
    const password = req.body?.password;
    if (typeof password !== "string" || password.length > 128)
      throw fail(400, "Dados de acesso inválidos.");
    const account = db
      .prepare("SELECT * FROM accounts WHERE email = ?")
      .get(email);
    const candidate = await derive(
      password,
      account?.salt || "unregistered-account-salt",
      64,
    );
    if (
      !account ||
      !timingSafeEqual(candidate, Buffer.from(account.password, "hex"))
    )
      throw fail(401, "E-mail ou senha incorretos.");
    startSession(req, res, account.id);
    res.json({ account: publicAccount(account) });
  });
  app.get("/api/oficina/me", requireAccount, (req, res) =>
    res.json({ account: publicAccount(req.account) }),
  );
  app.post("/api/oficina/logout", (req, res) => {
    db.prepare("DELETE FROM sessions WHERE token = ?").run(
      hash(tokenFrom(req)),
    );
    sessionCookie(res, "", 0);
    res.json({ ok: true });
  });
  app.post("/api/oficina/plan", requireAccount, (req, res) => {
    if (!validPlan(req.body?.plan)) throw fail(400, "Plano inválido.");
    if (
      req.account.subscription ||
      db
        .prepare("SELECT 1 FROM checkouts WHERE account_id = ? AND expires > ?")
        .get(req.account.id, Date.now())
    )
      throw fail(
        409,
        "Gerencie a assinatura ou aguarde o checkout atual expirar antes de alterar o plano.",
      );
    db.prepare("UPDATE accounts SET plan = ? WHERE id = ?").run(
      req.body.plan,
      req.account.id,
    );
    res.json({
      account: publicAccount({ ...req.account, plan: req.body.plan }),
    });
  });
  app.post("/api/oficina/checkout", requireAccount, async (req, res) => {
    if (!billingReady)
      throw fail(
        503,
        "Pagamento ainda não disponível: os preços e a integração de teste estão em configuração. Nenhuma cobrança foi feita.",
      );
    if (req.account.subscription)
      throw fail(
        409,
        "Esta conta já possui uma assinatura. Use Gerenciar assinatura.",
      );
    const existing = db
      .prepare("SELECT * FROM checkouts WHERE account_id = ? AND expires > ?")
      .get(req.account.id, Date.now());
    if (existing?.url) return res.json({ url: existing.url });
    const accountId = req.account.id;
    if (pendingCheckouts.has(accountId))
      throw fail(
        409,
        "Checkout em preparação. Tente novamente em alguns instantes.",
      );
    const expires = existing
      ? existing.expires / 1000
      : Math.floor(Date.now() / 1000) + 1860;
    if (!existing)
      db.prepare(
        "INSERT OR REPLACE INTO checkouts (account_id,plan,expires) VALUES (?,?,?)",
      ).run(accountId, req.account.plan, expires * 1000);
    pendingCheckouts.add(accountId);
    try {
      let customer = req.account.customer;
      if (!customer) {
        const created = await stripe.customers.create(
          {
            email: req.account.email,
            name: req.account.company || req.account.name,
            metadata: { accountId },
          },
          { idempotencyKey: `customer-${accountId}` },
        );
        customer = created.id;
        db.prepare("UPDATE accounts SET customer = ? WHERE id = ?").run(
          customer,
          accountId,
        );
      }
      const session = await stripe.checkout.sessions.create(
        {
          mode: "subscription",
          customer,
          client_reference_id: accountId,
          line_items: [{ price: priceIds[req.account.plan], quantity: 1 }],
          subscription_data: { metadata: { accountId } },
          expires_at: expires,
          success_url: `${origin}/ronas-oficina/conta?checkout=retorno`,
          cancel_url: `${origin}/ronas-oficina/conta?checkout=cancelado`,
        },
        { idempotencyKey: `checkout-${accountId}-${expires}` },
      );
      db.prepare(
        "UPDATE checkouts SET session = ?, url = ? WHERE account_id = ?",
      ).run(session.id, session.url, accountId);
      res.json({ url: session.url });
    } finally {
      // Keep the attempt and its idempotency key after a timeout: the provider may
      // have created the session even when its response never reached this server.
      pendingCheckouts.delete(accountId);
    }
  });
  app.post("/api/oficina/portal", requireAccount, async (req, res) => {
    if (!billingReady || !req.account.customer || !req.account.subscription)
      throw fail(409, "Não há assinatura para gerenciar.");
    const session = await stripe.billingPortal.sessions.create({
      customer: req.account.customer,
      return_url: `${origin}/ronas-oficina/conta`,
    });
    res.json({ url: session.url });
  });
  app.use("/api", (_req, res) =>
    res.status(404).json({ error: "Recurso não encontrado." }),
  );
  app.use((error, _req, res, _next) =>
    res.status(error.status || 500).json({
      error: error.status
        ? error.message
        : "Não foi possível concluir a solicitação. Tente novamente.",
    }),
  );
  return { app, db };
}
