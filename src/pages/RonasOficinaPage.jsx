import { siteConfig } from '../config/siteConfig'
import styles from './RonasOficinaPage.module.css'

const wa = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Olá! Quero conhecer a proposta Ronas Oficina para organizar a rotina da minha oficina.')}`

const features = [
  ['01', 'Clientes e veículos', 'Consulte os dados importantes sem depender de anotações espalhadas.'],
  ['02', 'Ordens de serviço', 'Organize os serviços e acompanhe cada etapa do atendimento.'],
  ['03', 'Orçamentos', 'Tenha as informações dos orçamentos reunidas e fáceis de consultar.'],
  ['04', 'Histórico de atendimento', 'Visualize os registros de serviços e atendimentos anteriores.'],
]

function RonasOficinaPage() {
  return (
    <main className={styles.page}>
      <header className={styles.nav}>
        <a className={styles.brand} href="/" aria-label="Ronas Tech, página inicial">
          <img src={siteConfig.logoPath} alt="" width="36" height="36" />
          <span>RONAS TECH</span>
        </a>
        <a className={styles.navLink} href={wa} target="_blank" rel="noreferrer">Fale com a gente <span aria-hidden="true">↗</span></a>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span /> TECNOLOGIA PARA OFICINAS</p>
          <h1>Sua oficina mais organizada. <em>Seu trabalho sob controle.</em></h1>
          <p className={styles.lead}>Uma solução digital em desenvolvimento para ajudar a organizar clientes, veículos, serviços e orçamentos em um só lugar.</p>
          <a className={styles.button} href={wa} target="_blank" rel="noreferrer">Quero conhecer a solução <span aria-hidden="true">→</span></a>
          <p className={styles.note}>Em desenvolvimento e validação com oficinas da região.</p>
        </div>
        <div className={styles.visual} aria-label="Ilustração conceitual de um painel de organização de oficina">
          <div className={styles.visualTop}><span>RONAS OFICINA</span><span className={styles.live}><i /> CONCEITO</span></div>
          <div className={styles.visualTitle}>Visão geral <small>Exemplo ilustrativo</small></div>
          <div className={styles.stats}><div><small>Atendimentos</small><strong>Organizados</strong></div><div><small>Etapas</small><strong>Visíveis</strong></div></div>
          <div className={styles.task}><b><span className={styles.dotBlue}/> Veículo recebido</b><small>Cadastro e solicitação</small><span className={styles.tag}>Entrada</span></div>
          <div className={styles.task}><b><span className={styles.dotYellow}/> Em avaliação</b><small>Serviço em acompanhamento</small><span className={styles.tag}>Andamento</span></div>
          <div className={styles.task}><b><span className={styles.dotGreen}/> Serviço concluído</b><small>Histórico atualizado</small><span className={styles.tag}>Concluído</span></div>
          <div className={styles.visualFoot}>Uma ideia de fluxo — interface final a validar com oficinas.</div>
        </div>
      </section>

      <section className={styles.problem}>
        <p className={styles.kicker}>A ROTINA DA OFICINA</p>
        <h2>Quando as informações ficam espalhadas, acompanhar cada serviço pode ficar mais difícil.</h2>
        <p>Conversas, papéis e planilhas podem dificultar a consulta de dados de clientes, veículos e serviços. A proposta é reunir essas informações em um fluxo simples.</p>
      </section>

      <section className={styles.features}>
        <div className={styles.sectionHead}><p className={styles.kicker}>A PROPOSTA</p><h2>O essencial da rotina, em um só lugar.</h2><p>Estamos ouvindo oficinas para definir uma ferramenta útil, simples e adequada ao dia a dia.</p></div>
        <div className={styles.featureGrid}>{features.map(([n, title, desc]) => <article className={styles.feature} key={n}><span>{n}</span><h3>{title}</h3><p>{desc}</p></article>)}</div>
        <p className={styles.disclaimer}>Funcionalidades previstas; disponibilidade e escopo serão definidos após a validação.</p>
      </section>

      <section className={styles.process}>
        <p className={styles.kicker}>COMO FUNCIONA</p><h2>Começamos entendendo sua oficina.</h2>
        <div className={styles.steps}>{[['01','Entendemos','Conversamos sobre a rotina e os desafios atuais.'],['02','Identificamos','Priorizamos o que realmente precisa ser organizado.'],['03','Apresentamos','Mostramos uma proposta alinhada à sua necessidade.'],['04','Acompanhamos','Se fizer sentido, planejamos a implantação juntos.']].map(([n,t,d]) => <article key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p></article>)}</div>
      </section>

      <section className={styles.cta}>
        <p className={styles.kicker}>RONAS TECH · TIANGUÁ, CE</p>
        <h2>Vamos conversar sobre a organização da sua oficina?</h2>
        <p>Conte um pouco sobre como vocês trabalham hoje. Queremos entender a rotina antes de propor uma solução.</p>
        <a className={styles.button} href={wa} target="_blank" rel="noreferrer">Conversar pelo WhatsApp <span aria-hidden="true">↗</span></a>
      </section>
      <footer className={styles.footer}><a href="/">Ronas Tech</a><span>© {new Date().getFullYear()} · Tecnologia aplicada a negócios.</span></footer>
    </main>
  )
}

export default RonasOficinaPage
