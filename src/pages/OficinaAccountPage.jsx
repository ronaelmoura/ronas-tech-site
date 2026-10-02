import { useEffect, useState } from "react";
import { OficinaHeader, OficinaFooter } from "./RonasOficinaPage";
import { formatOficinaPrice, oficinaPlans } from "../data/oficinaPlans";
import styles from "./RonasOficinaPage.module.css";

async function api(route, body) {
  const response = await fetch(`/api/oficina/${route}`, {
    method: body ? "POST" : "GET",
    credentials: "same-origin",
    headers: body ? { "Content-Type": "application/json" } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error(
      "O ambiente de contas não está disponível neste endereço. Tente novamente mais tarde.",
    );
  }
  if (!response.ok)
    throw Object.assign(new Error(data.error || "Não foi possível concluir."), {
      status: response.status,
    });
  return data;
}
export default function OficinaAccountPage({ mode }) {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(mode === "conta");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [type, setType] = useState("pf");
  const [plan, setPlan] = useState("basico");
  const [config, setConfig] = useState(null);
  const register = mode === "cadastro";
  useEffect(() => {
    const selected = new URLSearchParams(window.location.search).get("plano");
    if (oficinaPlans.some((p) => p.id === selected)) setPlan(selected);
    let cancelled = false;
    api("config")
      .then((data) => {
        if (!cancelled) setConfig(data);
      })
      .catch(() => {
        if (!cancelled) setConfig({ unavailable: true });
      });
    if (mode === "conta") {
      api("me")
        .then((data) => {
          if (!cancelled) {
            setAccount(data.account);
            setPlan(data.account.plan);
          }
        })
        .catch((err) => {
          if (!cancelled) {
            if (err.status === 401)
              window.location.replace("/ronas-oficina/entrar");
            else setError(err.message);
          }
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
      const checkout = new URLSearchParams(window.location.search).get(
        "checkout",
      );
      if (checkout === "retorno")
        setMessage(
          "Você retornou do checkout. A assinatura só é atualizada após confirmação do provedor. Use “Atualizar status” para consultar.",
        );
      if (checkout === "cancelado")
        setMessage(
          "Checkout cancelado. Seu cadastro continua disponível; nenhuma assinatura foi ativada por este retorno.",
        );
    }
    return () => {
      cancelled = true;
    };
  }, [mode]);
  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      await api(register ? "register" : "login", {
        name: form.get("name"),
        email: form.get("email"),
        password: form.get("password"),
        company: form.get("company"),
        type,
        plan,
        acceptedTerms: form.get("terms") === "on",
      });
      window.location.assign("/ronas-oficina/conta");
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }
  async function action(route, body = {}) {
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const data = await api(route, route === "me" ? undefined : body);
      if (data.account) {
        setAccount(data.account);
        setPlan(data.account.plan);
        setMessage(
          route === "plan"
            ? "Plano escolhido salvo. Sua assinatura ainda não foi ativada."
            : "Status da conta atualizado.",
        );
      }
      if (route === "logout") window.location.assign("/ronas-oficina/entrar");
      if (data.url) window.location.assign(data.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className={styles.page}>
      <a className="skip-link" href="#conteudo-principal">
        Pular para o conteúdo principal
      </a>
      <OficinaHeader />
      <main id="conteudo-principal" className={styles.accountMain}>
        {mode === "conta" ? (
          <div className={styles.dashboard}>
            <div className={styles.dashboardTop}>
              <p className={styles.kicker}>SUA CONTA · AMBIENTE DE TESTE</p>
              {account && (
                <button
                  className={styles.outlineButton}
                  disabled={busy}
                  onClick={() => action("logout")}
                >
                  Sair ↗
                </button>
              )}
            </div>
            {loading && <p role="status">Carregando sua conta…</p>}
            {error && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}
            {message && (
              <p className={styles.notice} role="status">
                {message}
              </p>
            )}
            {account && (
              <>
                <h1>
                  Olá, {account.name.split(" ")[0]}.<br />
                  Seu próximo passo está aqui.
                </h1>
                <p>
                  Seu cadastro está salvo. Acompanhe a escolha do plano e a
                  disponibilidade da assinatura.
                </p>
                <div className={styles.accountCards}>
                  <section className={styles.accountCard}>
                    <h2>Dados da conta</h2>
                    <p>{account.name}</p>
                    <p>{account.email}</p>
                    <p>
                      {account.type === "empresa"
                        ? `Empresa · ${account.company}`
                        : "Pessoa Física"}
                    </p>
                    <p className={styles.hint}>
                      Sessão protegida. Ao terminar em um computador
                      compartilhado, saia da conta.
                    </p>
                  </section>
                  <section className={styles.accountCard}>
                    <h2>Seu plano</h2>
                    <label htmlFor="account-plan">Plano escolhido</label>
                    <select
                      id="account-plan"
                      value={plan}
                      onChange={(e) => setPlan(e.target.value)}
                      disabled={busy || account.status !== "pending"}
                    >
                      {oficinaPlans.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                    <button
                      className={styles.outlineButton}
                      disabled={
                        busy ||
                        plan === account.plan ||
                        account.status !== "pending"
                      }
                      onClick={() => action("plan", { plan })}
                    >
                      Salvar escolha
                    </button>
                    <p>
                      Valor mensal:{" "}
                      {formatOficinaPrice(
                        oficinaPlans.find((item) => item.id === plan)
                          ?.monthlyPriceCents ?? 0,
                      )}
                    </p>
                  </section>
                </div>
                <section className={styles.accountCard}>
                  <h2>Assinatura e pagamento</h2>
                  <p>
                    Status:{" "}
                    <strong>
                      {account.subscribed
                        ? "Ativa em modo de teste"
                        : account.status === "pending"
                          ? "Aguardando configuração do pagamento"
                          : `Sem acesso ativo (${account.status})`}
                    </strong>
                  </p>
                  {!config?.billingReady && (
                    <p>
                      O preço do plano está definido. A conexão com o pagamento
                      de teste ainda está em configuração; nenhuma cobrança é
                      feita ao criar sua conta.
                    </p>
                  )}
                  {config?.billingReady && (
                    <p>
                      Checkout em modo de teste. Confira o valor no provedor
                      antes de confirmar e use apenas dados de teste.
                    </p>
                  )}
                  <div className={styles.actions}>
                    {account.status === "pending" ? (
                      <button
                        className={styles.button}
                        disabled={
                          busy || !config?.billingReady || plan !== account.plan
                        }
                        onClick={() => action("checkout")}
                      >
                        {config?.billingReady
                          ? "Abrir checkout de teste →"
                          : "Pagamento em configuração"}
                      </button>
                    ) : (
                      <button
                        className={styles.button}
                        disabled={busy || !config?.billingReady}
                        onClick={() => action("portal")}
                      >
                        Gerenciar assinatura ↗
                      </button>
                    )}
                    <button
                      className={styles.outlineButton}
                      disabled={busy}
                      onClick={() => action("me")}
                    >
                      Atualizar status
                    </button>
                  </div>
                </section>
                <p className={styles.notice}>
                  Os módulos de gestão da oficina estão em desenvolvimento. Uma
                  assinatura de teste não libera funcionalidades ainda não
                  implementadas.
                </p>
              </>
            )}
          </div>
        ) : (
          <div className={styles.accountGrid}>
            <div className={styles.accountIntro}>
              <p className={styles.kicker}>RONAS OFICINA · AMBIENTE DE TESTE</p>
              <h1>
                {register
                  ? "O primeiro passo para uma rotina mais organizada."
                  : "Bom ter você por aqui de novo."}
              </h1>
              <p>
                {register
                  ? "Crie uma conta para acompanhar o produto e escolher o plano que combina com sua oficina."
                  : "Entre para consultar sua conta, seu plano e o status da assinatura."}
              </p>
              <ol>
                <li>Escolha Pessoa Física ou Empresa</li>
                <li>Selecione uma proposta de plano</li>
                <li>Acompanhe os próximos passos</li>
              </ol>
              <p className={styles.notice}>
                Produto em desenvolvimento. Use dados de teste. Nenhuma cobrança
                é gerada pelo cadastro.
              </p>
            </div>
            <form className={styles.form} onSubmit={submit}>
              <h2>{register ? "Criar sua conta" : "Entrar na sua conta"}</h2>
              {config?.unavailable && (
                <p className={styles.error} role="alert">
                  Cadastro e login estão indisponíveis neste endereço. O
                  servidor do ambiente de teste precisa estar ativo.
                </p>
              )}
              {register && (
                <>
                  <fieldset>
                    <legend>Tipo de conta</legend>
                    <div className={styles.radioGroup}>
                      <label>
                        <input
                          type="radio"
                          name="type"
                          value="pf"
                          checked={type === "pf"}
                          onChange={() => setType("pf")}
                        />
                        Pessoa Física
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="type"
                          value="empresa"
                          checked={type === "empresa"}
                          onChange={() => setType("empresa")}
                        />
                        Empresa
                      </label>
                    </div>
                  </fieldset>
                  <div className={styles.field}>
                    <label htmlFor="name">Seu nome</label>
                    <input
                      id="name"
                      name="name"
                      autoComplete="name"
                      required
                      minLength={2}
                      maxLength={160}
                    />
                  </div>
                  {type === "empresa" && (
                    <div className={styles.field}>
                      <label htmlFor="company">Nome da empresa / oficina</label>
                      <input
                        id="company"
                        name="company"
                        autoComplete="organization"
                        required
                        minLength={2}
                        maxLength={160}
                      />
                    </div>
                  )}
                </>
              )}
              <div className={styles.field}>
                <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="password">Senha</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={register ? "new-password" : "current-password"}
                  required
                  minLength={register ? 12 : undefined}
                  maxLength={128}
                  aria-describedby={register ? "password-hint" : undefined}
                />
                {register && (
                  <p id="password-hint" className={styles.hint}>
                    Use pelo menos 12 caracteres. Prefira uma frase que só você
                    conheça.
                  </p>
                )}
              </div>
              {register && (
                <>
                  <div className={styles.field}>
                    <label htmlFor="plan">Plano de interesse</label>
                    <select
                      id="plan"
                      name="plan"
                      value={plan}
                      onChange={(e) => setPlan(e.target.value)}
                    >
                      {oficinaPlans.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} · {formatOficinaPrice(p.monthlyPriceCents)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <label className={styles.checkLabel}>
                    <input type="checkbox" name="terms" required />
                    <span>
                      Li os{" "}
                      <a href="/termos-de-uso" target="_blank" rel="noreferrer">
                        Termos de Uso
                      </a>{" "}
                      e a{" "}
                      <a
                        href="/politica-de-privacidade"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Política de Privacidade
                      </a>{" "}
                      e entendo que este é um ambiente de teste.
                    </span>
                  </label>
                </>
              )}
              {error && (
                <p className={styles.error} role="alert">
                  {error}
                </p>
              )}
              <button
                className={styles.button}
                disabled={busy || !config || config.unavailable}
              >
                {busy
                  ? "Aguarde…"
                  : register
                    ? "Criar conta de teste →"
                    : "Entrar →"}
              </button>
              <p className={styles.formFoot}>
                {register ? (
                  <>
                    Já tem conta? <a href="/ronas-oficina/entrar">Entrar</a>
                  </>
                ) : (
                  <>
                    Ainda não tem conta?{" "}
                    <a href="/ronas-oficina/cadastro">Criar conta</a>
                  </>
                )}
              </p>
            </form>
          </div>
        )}
      </main>
      <OficinaFooter />
    </div>
  );
}
