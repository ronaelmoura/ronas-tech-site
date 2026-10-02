import { useEffect, useState } from "react";
import { oficinaPains } from "../data/oficinaPains";
import { trackEvent } from "../utils/analytics";
import OficinaConsent from "../components/Oficina/OficinaConsent";
import { siteConfig } from "../config/siteConfig";
import { oficinaPlans } from "../data/oficinaPlans";
import styles from "./RonasOficinaPage.module.css";

const wa = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Olá! Quero conversar sobre a rotina da minha oficina e conhecer a proposta do Ronas Oficina.")}`;
function WhatsAppIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.7A8.5 8.5 0 1 1 20.5 11.8Z" />
      <path d="M8.5 7.8c-.8.3-1 1.3-.7 2.2 1 3 3.1 5 6 5.7 1 .2 1.9-.3 2.1-1.1l-2.2-1.4-.9 1c-1.5-.6-2.8-1.8-3.4-3.3l.9-.9-1.1-2.2Z" />
    </svg>
  );
}
export function OficinaHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.nav}>
        <a
          className={styles.brand}
          href="/"
          aria-label="Ronas Tech, página inicial"
        >
          <span className={styles.logoFrame}>
            <img
              src="/images/ronas-tech-brand.png"
              width="1024"
              height="1024"
              alt=""
            />
          </span>
          <span>
            RONAS <span className={styles.brandLight}>TECH</span>
          </span>
        </a>
        <nav aria-label="Navegação Ronas Oficina">
          <a className={styles.desktopLink} href="/">
            Início
          </a>
          <a className={styles.desktopLink} href="/ronas-oficina#recursos">
            Recursos
          </a>
          <a className={styles.currentLink} href="/ronas-oficina">
            Ronas Oficina
          </a>
          <a href="/ronas-oficina#planos">Planos</a>
          <a href="/ronas-oficina/entrar">Entrar</a>
        </nav>
        <a
          className={styles.navContact}
          data-oficina-cta="header"
          href={wa}
          target="_blank"
          rel="noreferrer"
        >
          <WhatsAppIcon />
          <span>Falar no WhatsApp</span>
        </a>
      </div>
    </header>
  );
}
export function OficinaFooter() {
  return (
    <footer className={styles.footer}>
      <a href="/">Ronas Tech · Tianguá, CE</a>
      <span>© {new Date().getFullYear()} Ronas Oficina</span>
      <div>
        <a href="/politica-de-privacidade">Privacidade</a>
        <a href="/termos-de-uso">Termos</a>
      </div>
    </footer>
  );
}
export default function RonasOficinaPage() {
  const [painId, setPainId] = useState("aprovacao");
  const [profile, setProfile] = useState("Trabalho sozinho");
  const [testAvailable, setTestAvailable] = useState(false);
  const pain = oficinaPains.find((item) => item.id === painId);
  const personalizedWhatsApp =
    "https://wa.me/" +
    siteConfig.whatsappNumber +
    "?text=" +
    encodeURIComponent(
      "Olá, Ronas Tech! Quero conversar sobre minha oficina.\nMinha rotina: " +
        profile +
        ".\nMinha principal dificuldade: " +
        pain.label +
        ".\nQuero entender a proposta do Ronas Oficina e o que já está disponível.",
    );
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/oficina/config", { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setTestAvailable(data?.mode === "test"))
      .catch(() => {});
    return () => controller.abort();
  }, []);
  function measureClick(event) {
    const link = event.target.closest("a[data-oficina-cta]");
    if (link)
      trackEvent("oficina_contact_intent", {
        placement: link.dataset.oficinaCta,
      });
  }

  return (
    <div className={styles.page} onClick={measureClick}>
      <a className="skip-link" href="#conteudo-principal">
        Pular para o conteúdo principal
      </a>
      <OficinaHeader />
      <main id="conteudo-principal">
        <section className={styles.hero} aria-label="Proposta Ronas Oficina">
          <img
            className={styles.heroImage}
            src="/images/ronas-oficina-workshop.png"
            width="1536"
            height="1024"
            alt=""
            fetchPriority="high"
          />
          <div className={styles.heroShade} aria-hidden="true" />
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>
              <span>
                RONAS <b>OFICINA</b>
              </span>
            </p>
            <h1>
              Carro no elevador.
              <br />
              Orçamento no WhatsApp.
              <br />
              <em>Tudo na sua cabeça?</em>
            </h1>
            <p className={styles.lead}>
              Entre a bancada e o balcão, você ainda precisa encontrar uma
              autorização, conferir uma peça e responder o prazo. O Ronas
              Oficina está sendo construído para reunir o combinado de cada
              atendimento.
            </p>
            <div className={styles.actions}>
              <a
                className={styles.button}
                data-oficina-cta="hero"
                href={wa}
                target="_blank"
                rel="noreferrer"
              >
                <WhatsAppIcon />
                Conversar sobre minha oficina <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className={styles.heroSecondary}>
              <span>Conversa sem compromisso</span>
              <span>Produto em desenvolvimento</span>
            </div>
            <a className={styles.heroExplore} href="#recursos">
              Ver situações do dia a dia ↓
            </a>
          </div>
        </section>
        <div className={styles.strip}>
          <span>RONAS TECH · TIANGUÁ, CE</span>
          <p>Conversa direta com quem desenvolve. Sem cadastro para falar.</p>
        </div>
        <section id="recursos" className={styles.painSection}>
          <div className={styles.painIntro}>
            <div>
              <p className={styles.kicker}>ENTRE UM CARRO E OUTRO</p>
              <h2>
                Qual dessas perguntas
                <br />
                interrompe seu dia?
              </h2>
            </div>
            <p>
              Toque na situação que você conhece de perto. A proposta começa
              pelo que acontece na sua oficina.
            </p>
          </div>
          <div className={styles.painWorkbench}>
            <div
              className={styles.painChoices}
              role="group"
              aria-label="Situações da rotina da oficina"
            >
              {oficinaPains.map((item, index) => (
                <button
                  key={item.id}
                  aria-pressed={painId === item.id}
                  onClick={() => setPainId(item.id)}
                >
                  <span>0{index + 1}</span>
                  {item.question}
                  <b aria-hidden="true">↗</b>
                </button>
              ))}
            </div>
            <div className={styles.painStory} aria-live="polite">
              <p className={styles.sceneLabel}>VOCÊ RECONHECE ESSA CENA?</p>
              <h3>{pain.question}</h3>
              <p>{pain.scene}</p>
              <p className={styles.consequence}>{pain.consequence}</p>
              <div className={styles.record}>
                <span>O REGISTRO QUE FAZ FALTA</span>
                <p>{pain.record}</p>
              </div>
              <p className={styles.scope}>{pain.proposal}</p>
            </div>
          </div>
          <div className={styles.workOrder}>
            <div className={styles.paperHeader}>
              <span>RONAS / OFICINA</span>
              <span>RASCUNHO DO FLUXO</span>
            </div>
            <p className={styles.paperCaption}>
              Como essa informação poderia ficar reunida
            </p>
            <dl>
              {pain.paper.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <p className={styles.paperNote}>
              Exemplo ilustrativo. Não é uma tela de um módulo já disponível.
            </p>
          </div>
          <div className={styles.painNext}>
            <p>É isso que acontece por aí?</p>
            <a className={styles.button} href="#conversar">
              Quero contar minha rotina <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
        <section className={styles.honesty}>
          <div>
            <p className={styles.kicker}>O COMBINADO, DESDE O COMEÇO</p>
            <h2>
              Você merece saber
              <br />
              em que etapa estamos.
            </h2>
            <p>
              Estamos validando a proposta. A conversa serve para entender sua
              operação e explicar o que podemos construir a partir dela.
            </p>
          </div>
          <div className={styles.readiness}>
            <div>
              <span>EM TESTE</span>
              <p>
                Cadastro PF/Empresa, login e escolha de plano no ambiente de
                teste.
              </p>
            </div>
            <div>
              <span>EM DESENVOLVIMENTO</span>
              <p>
                Clientes, veículos, ordens de serviço, orçamentos e histórico.
              </p>
            </div>
            <div>
              <span>AINDA A DEFINIR</span>
              <p>
                Preços, limites, implantação e disponibilidade. Não há
                contratação ou cobrança nesta página.
              </p>
            </div>
            {testAvailable && (
              <a href="/ronas-oficina/cadastro">
                Conhecer o ambiente de contas de teste ↗
              </a>
            )}
          </div>
        </section>
        <section id="planos" className={styles.plans}>
          <div className={styles.sectionHead}>
            <p className={styles.kicker}>QUAL É O TAMANHO DA SUA ROTINA?</p>
            <h2>
              O plano precisa caber
              <br />
              no seu jeito de trabalhar.
            </h2>
            <p>
              Básico, Intermediário e Avançado são propostas de escopo para
              Pessoa Física e Empresa. Converse sobre o que faz sentido para sua
              operação.
            </p>
          </div>
          <div className={styles.planGrid}>
            {oficinaPlans.map((p, i) => (
              <article
                key={p.id}
                className={`${styles.planCard} ${i === 1 ? styles.featuredPlan : ""}`}
              >
                <p className={styles.planAudience}>{p.audience}</p>
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <div className={styles.price}>
                  A definir <span>/ mês</span>
                </div>
                <a
                  className={i === 1 ? styles.button : styles.outlineButton}
                  href={
                    "https://wa.me/" +
                    siteConfig.whatsappNumber +
                    "?text=" +
                    encodeURIComponent(
                      "Olá! Tenho interesse na proposta do plano " +
                        p.name +
                        " do Ronas Oficina. Quero entender o escopo previsto e a disponibilidade.",
                    )
                  }
                  target="_blank"
                  rel="noreferrer"
                  data-oficina-cta={"plan-" + p.id}
                >
                  Conversar sobre o {p.name} ↗
                </a>
                <ul>
                  {p.features.map((f) => (
                    <li key={f}>
                      <span aria-hidden="true">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <span className={styles.planNote}>
                  Recursos previstos · em desenvolvimento
                </span>
              </article>
            ))}
          </div>
          <p className={styles.disclaimer}>
            Os valores ainda não foram definidos. Demonstrar interesse não
            reserva um preço, não ativa uma assinatura e não gera cobrança.
          </p>
        </section>
        <section className={styles.process}>
          <div>
            <p className={styles.kicker}>O QUE ACONTECE DEPOIS DO CLIQUE</p>
            <h2>
              A conversa começa
              <br />
              pela sua oficina.
            </h2>
          </div>
          <ol className={styles.steps}>
            {[
              [
                "Você conta o que está pegando",
                "Quem atende, como os serviços são registrados e onde a informação se perde.",
              ],
              [
                "A gente confere o que faz sentido",
                "Relacionamos sua necessidade ao escopo proposto e explicamos o que ainda está em construção.",
              ],
              [
                "O próximo passo fica combinado",
                "Disponibilidade, valores e implantação precisam ser apresentados antes de qualquer contratação.",
              ],
            ].map(([t, d], i) => (
              <li key={t}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <section className={styles.faq}>
          <div className={styles.sectionHead}>
            <p className={styles.kicker}>ANTES DE COMEÇAR</p>
            <h2>Vamos tirar suas dúvidas.</h2>
          </div>
          {[
            [
              "Vou ter que abandonar meu controle atual?",
              "Não pedimos que você pare sua operação ou migre os dados nesta conversa. Primeiro precisamos entender seu controle atual. Migração e implantação ainda serão definidas.",
            ],
            [
              "Falar no WhatsApp já me cadastra ou contrata algo?",
              "Não. O link abre uma mensagem que você pode revisar antes de enviar. Não há criação automática de conta, assinatura ou cobrança.",
            ],
            [
              "Consigo começar a usar na operação hoje?",
              "Ainda não. Cadastro, login e escolha de plano fazem parte desta etapa de teste. Os módulos de clientes, veículos, ordens de serviço, estoque e relatórios estão previstos e ainda não estão disponíveis.",
            ],
            [
              "Preciso ter CNPJ para criar uma conta?",
              "Não. Você pode escolher Pessoa Física ou Empresa. Para Empresa, informe também o nome da oficina. Documentos fiscais serão tratados quando a contratação for definida.",
            ],
            [
              "Criar uma conta gera cobrança?",
              "Não. Os preços ainda estão em definição e nenhuma assinatura é ativada pelo cadastro. O pagamento será feito em um checkout separado, inicialmente apenas em modo de teste.",
            ],
            [
              "Posso mudar o plano escolhido?",
              "Sim. Antes de iniciar uma assinatura ou um checkout, você pode alterar o plano na área da conta. Uma assinatura existente será gerenciada pelo portal de pagamento.",
            ],
          ].map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </section>
        <section id="conversar" className={styles.contactSection}>
          <div>
            <p className={styles.kicker}>PODE CONTAR DO SEU JEITO</p>
            <h2>
              Qual parte da rotina
              <br />
              você gostaria de tirar
              <br />
              <em>da cabeça?</em>
            </h2>
            <p>
              Selecione a situação mais próxima da sua. A mensagem já vai com
              esse contexto e você pode editar antes de enviar.
            </p>
            <div className={styles.identity}>
              <strong>Ronas Tech</strong>
              <span>Tecnologia para negócios · {siteConfig.location}</span>
              <a href={"mailto:" + siteConfig.email}>{siteConfig.email}</a>
              <a href={"tel:+" + siteConfig.whatsappNumber}>
                {siteConfig.whatsappDisplay}
              </a>
              <a href="/">Conhecer a Ronas Tech ↗</a>
            </div>
          </div>
          <div className={styles.contactForm}>
            <label htmlFor="workshop-profile">Como você trabalha hoje?</label>
            <select
              id="workshop-profile"
              value={profile}
              onChange={(event) => setProfile(event.target.value)}
            >
              <option>Trabalho sozinho</option>
              <option>Tenho uma equipe pequena</option>
              <option>Tenho uma operação maior</option>
              <option>Estou abrindo minha oficina</option>
            </select>
            <label htmlFor="workshop-pain">
              O que mais precisa de atenção?
            </label>
            <select
              id="workshop-pain"
              value={painId}
              onChange={(event) => setPainId(event.target.value)}
            >
              {oficinaPains.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
            <p className={styles.messagePreview}>
              Vamos conversar sobre <strong>{pain.label.toLowerCase()}</strong>{" "}
              na sua oficina.
            </p>
            <a
              className={styles.button}
              href={personalizedWhatsApp}
              target="_blank"
              rel="noreferrer"
              data-oficina-cta="qualified-contact"
            >
              <WhatsAppIcon />
              Levar essa conversa ao WhatsApp ↗
            </a>
            <p className={styles.contactPrivacy}>
              Sem pedir seu telefone ou e-mail aqui. As escolhas só seguem na
              mensagem quando você abre o WhatsApp; o envio depende de você.
            </p>
            <a
              className={styles.plainContact}
              href={wa}
              target="_blank"
              rel="noreferrer"
              data-oficina-cta="direct-contact"
            >
              Prefiro conversar sem escolher nada
            </a>
          </div>
        </section>
      </main>
      <OficinaFooter />
      <OficinaConsent />
    </div>
  );
}
