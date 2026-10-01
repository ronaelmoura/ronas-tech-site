import { siteConfig } from "../config/siteConfig";
import { oficinaPlans } from "../data/oficinaPlans";
import styles from "./RonasOficinaPage.module.css";

const wa = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Olá! Quero conhecer o Ronas Oficina.")}`;
export function OficinaHeader() {
  return (
    <header className={styles.nav}>
      <a className={styles.brand} href="/ronas-oficina">
        <span className={styles.brandIcon} aria-hidden="true">
          R↗
        </span>
        <span>
          ronas<span className={styles.brandLight}>oficina</span>
        </span>
      </a>
      <nav aria-label="Navegação Ronas Oficina">
        <a href="/ronas-oficina#recursos">Recursos</a>
        <a href="/ronas-oficina#planos">Planos</a>
        <a className={styles.navLogin} href="/ronas-oficina/entrar">
          Entrar ↗
        </a>
      </nav>
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
          <div>
            <p className={styles.eyebrow}>● SUA PRÓXIMA ETAPA COMEÇA AQUI</p>
            <h1>
              Cuide dos veículos.
              <br />
              <em>
                A gente organiza
                <br />o caminho.
              </em>
            </h1>
            <p className={styles.lead}>
              Menos anotações espalhadas. Mais clareza para sua oficina. Uma
              proposta de gestão de clientes, veículos e serviços em um só
              lugar.
            </p>
            <div className={styles.actions}>
              <a className={styles.button} href="/ronas-oficina/cadastro">
                Criar conta de teste →
              </a>
              <a className={styles.textLink} href="#planos">
                Conhecer os planos ↓
              </a>
            </div>
            <p className={styles.note}>
              Cadastro disponível no ambiente de teste. Gestão da oficina em
              desenvolvimento.
            </p>
          </div>
          <div
            className={styles.visual}
            role="img"
            aria-label="Exemplo ilustrativo do futuro painel: 12 serviços, 4 em andamento, 8 concluídos. Não são dados reais."
          >
            <div className={styles.visualTop}>
              <span>R / OFICINA</span>
              <span className={styles.live}>PAINEL ILUSTRATIVO</span>
            </div>
            <div className={styles.visualTitle}>
              Tudo pronto para o dia.
              <small>Acompanhe cada etapa da sua oficina.</small>
            </div>
            <div className={styles.stats}>
              <div>
                <small>Serviços do dia</small>
                <strong>12</strong>
                <small>+ organização</small>
              </div>
              <div>
                <small>Em andamento</small>
                <strong>04</strong>
                <small>em acompanhamento</small>
              </div>
              <div>
                <small>Concluídos</small>
                <strong>08</strong>
                <small>prontos para entrega</small>
              </div>
            </div>
            <div className={styles.tableHead}>
              <span>ATENDIMENTO</span>
              <span>ETAPA</span>
            </div>
            {[
              ["01", "Revisão preventiva", "Veículo recebido", "Entrada"],
              ["02", "Troca de óleo", "Serviço em execução", "Andamento"],
              ["03", "Sistema de freios", "Pronto para entrega", "Concluído"],
            ].map(([n, t, d, s]) => (
              <div className={styles.task} key={n}>
                <span className={styles.taskNumber}>{n}</span>
                <div>
                  <b>{t}</b>
                  <small>{d}</small>
                </div>
                <span className={styles.tag}>{s}</span>
              </div>
            ))}
            <div className={styles.visualFoot}>
              <span>● Visão geral da operação</span>
              <span>Dados de exemplo</span>
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
