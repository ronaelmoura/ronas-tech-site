import styles from './Hero.module.css'

function Hero() {
  return (
    <section id="inicio" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}><span /> RONAS TECH · SOLUÇÕES DIGITAIS</p>
          <h1 id="hero-title">Seu problema de hoje pode virar uma solução digital que trabalha por você.</h1>
          <p className={styles.description}>
            Criamos sites, sistemas, automações e soluções com IA para reduzir trabalho manual, organizar informações e melhorar a experiência dos seus clientes.
          </p>
          <div className={styles.actions}>
            <a className={styles.primary} href="#contato">Conversar sobre meu problema <span>→</span></a>
            <a className={styles.secondary} href="#servicos">Conhecer as soluções</a>
          </div>
          <div className={styles.trust}>
            <span>Projetos sob medida</span>
            <span>Atendimento remoto</span>
            <span>Tianguá · CE</span>
          </div>
        </div>

        <div className={styles.visual} aria-label="Exemplos de soluções digitais">
          <div className={styles.workspace}>
            <div className={styles.workspaceBar}>
              <span className={styles.brandMark}>RT</span>
              <span>WORKSPACE / SOLUÇÕES</span>
              <b><i /> ATIVO</b>
            </div>

            <div className={styles.workspaceGrid}>
              <article className={styles.solutionCard}>
                <div className={styles.cardIcon}>↗</div>
                <small>01 · PRESENÇA</small>
                <h2>Site & Landing Page</h2>
                <p>Uma vitrine digital pensada para apresentar e gerar contato.</p>
                <div className={styles.miniBrowser}>
                  <span /><span /><span />
                  <div />
                </div>
              </article>

              <article className={styles.solutionCard}>
                <div className={styles.cardIcon}>▦</div>
                <small>02 · OPERAÇÃO</small>
                <h2>Sistema Web</h2>
                <p>Informações organizadas em uma ferramenta feita para sua rotina.</p>
                <div className={styles.miniChart}>
                  <span /><span /><span /><span /><span />
                </div>
              </article>

              <article className={styles.solutionCard}>
                <div className={styles.cardIcon}>⌁</div>
                <small>03 · FLUXO</small>
                <h2>Automação</h2>
                <p>Tarefas conectadas para reduzir trabalho manual e repetitivo.</p>
                <div className={styles.miniFlow}>
                  <span>Entrada</span><b>→</b><span>Processo</span><b>→</b><span>Ação</span>
                </div>
              </article>

              <article className={styles.solutionCard}>
                <div className={styles.cardIcon}>✦</div>
                <small>04 · INTELIGÊNCIA</small>
                <h2>IA aplicada</h2>
                <p>IA usada onde existe uma tarefa real para simplificar.</p>
                <div className={styles.aiPulse}><span /><span /><span /><b>IA</b></div>
              </article>
            </div>

            <div className={styles.workspaceFooter}>
              <span><i /> Problema identificado</span>
              <strong>→</strong>
              <span><i /> Solução em construção</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
