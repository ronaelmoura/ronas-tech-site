import { siteConfig } from "../config/siteConfig";
import { oficinaPlans } from "../data/oficinaPlans";
import styles from "./RonasOficinaPage.module.css";

const wa = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Olá! Quero conhecer o Ronas Oficina.")}`;
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
  return (
    <div className={styles.page}>
      <a className="skip-link" href="#conteudo-principal">
        Pular para o conteúdo principal
      </a>
      <OficinaHeader />
      <main id="conteudo-principal">
        <section className={styles.hero}>
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
              Sua oficina merece
              <br />
              uma rotina mais
              <br />
              <em>organizada.</em>
            </h1>
            <p className={styles.lead}>
              Conheça uma proposta de sistema para acompanhar atendimentos,
              serviços e informações em um só lugar.
            </p>
            <div className={styles.actions}>
              <a
                className={styles.button}
                href={wa}
                target="_blank"
                rel="noreferrer"
              >
                <WhatsAppIcon />
                Quero conhecer a proposta <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className={styles.heroSecondary}>
              <a href="/ronas-oficina/cadastro">Criar conta de teste ↗</a>
              <span>Produto em desenvolvimento</span>
            </div>
          </div>
        </section>
        <div className={styles.strip}>
          <span>DA ENTRADA À ENTREGA</span>
          <p>Clientes → Veículos → Orçamentos → Serviços → Histórico</p>
        </div>
        <section id="recursos" className={styles.features}>
          <div className={styles.sectionHead}>
            <p className={styles.kicker}>UMA ROTINA MAIS CLARA</p>
            <h2>
              O que importa para sua oficina.
              <br />
              Sem perder o fio da meada.
            </h2>
            <p>
              Estamos construindo as ferramentas da operação. Conheça o que está
              previsto para o produto.
            </p>
          </div>
          <div className={styles.featureGrid}>
            {[
              [
                "01",
                "Clientes e veículos",
                "Informações reunidas para encontrar o que você precisa a cada atendimento.",
              ],
              [
                "02",
                "Ordens de serviço",
                "Da entrada à entrega, acompanhe o serviço e saiba qual é o próximo passo.",
              ],
              [
                "03",
                "Orçamentos",
                "Organize as propostas e mantenha os detalhes do atendimento por perto.",
              ],
              [
                "04",
                "Histórico de atendimento",
                "Consulte o que já foi feito e dê continuidade ao cuidado com cada veículo.",
              ],
            ].map(([n, t, d]) => (
              <article className={styles.feature} key={n}>
                <span>{n} /</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="planos" className={styles.plans}>
          <div className={styles.sectionHead}>
            <p className={styles.kicker}>UM PLANO PARA CADA ETAPA</p>
            <h2>
              Comece do seu jeito.
              <br />
              Cresça com a sua oficina.
            </h2>
            <p>
              Os três planos aceitam Pessoa Física e Empresa. Escolha uma
              proposta para sua conta de teste.
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
                  href={`/ronas-oficina/cadastro?plano=${p.id}`}
                >
                  Escolher {p.name} ↗
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
            Preços e limites de uso ainda serão definidos. Criar uma conta não
            ativa uma assinatura nem gera cobrança.
          </p>
        </section>
        <section className={styles.process}>
          <div>
            <p className={styles.kicker}>DO PRIMEIRO ACESSO EM DIANTE</p>
            <h2>
              Uma conta.
              <br />
              Seu próximo passo.
            </h2>
          </div>
          <ol className={styles.steps}>
            {[
              [
                "Crie sua conta",
                "Escolha Pessoa Física ou Empresa e informe seus dados de acesso.",
              ],
              [
                "Encontre seu plano",
                "Compare Básico, Intermediário e Avançado. A escolha fica salva na sua conta.",
              ],
              [
                "Assine online quando disponível",
                "O checkout de teste será liberado após a configuração de preços e pagamento.",
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
              "O sistema já está pronto para minha oficina?",
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
        <section className={styles.cta}>
          <p className={styles.kicker}>MAIS TEMPO PARA O QUE VOCÊ FAZ BEM</p>
          <h2>
            O próximo capítulo
            <br />
            da sua oficina começa aqui.
          </h2>
          <div className={styles.actions}>
            <a className={styles.button} href="/ronas-oficina/cadastro">
              Criar conta de teste →
            </a>
            <a
              className={styles.textLink}
              href={wa}
              target="_blank"
              rel="noreferrer"
            >
              Conversar com a Ronas Tech ↗
            </a>
          </div>
        </section>
      </main>
      <OficinaFooter />
    </div>
  );
}
