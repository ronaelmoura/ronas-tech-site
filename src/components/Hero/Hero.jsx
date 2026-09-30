import styles from './Hero.module.css'

function Hero() {
  return (
    <section id="inicio" className={styles['rt-hero']} aria-labelledby="hero-title">
      <div className={styles['rt-hero-grid']} aria-hidden="true" />
      <div className={${styles['rt-hero-glow']} ${styles['rt-hero-glow-one']}} aria-hidden="true" />
      <div className={${styles['rt-hero-glow']} ${styles['rt-hero-glow-two']}} aria-hidden="true" />
      <div className={styles['rt-hero-container']}>
        <div className={styles['rt-hero-copy']}>
          <p className={styles['rt-kicker']}><span /> RONAS TECH · DIGITAL STUDIO</p>
          <h1 id="hero-title">Problemas reais.<br /><em>Soluções digitais.</em></h1>
          <p className={styles['rt-hero-description']}>Criamos sistemas, sites, automações e soluções com IA para transformar tarefas complicadas em processos mais simples.</p>
          <div className={styles['rt-hero-actions']}>
            <a className={${styles['rt-button']} ${styles['rt-button-primary']}} href="#contato">Quero resolver um problema <span>→</span></a>
            <a className={${styles['rt-button']} ${styles['rt-button-ghost']}} href="#projetos">Ver projetos</a>
          </div>
          <div className={styles['rt-hero-meta']}><span>Projetos sob medida</span><span>Atendimento remoto</span><span>Tianguá · CE</span></div>
        </div>

        <div className={styles['rt-transformation']} aria-label="Da necessidade à solução digital">
          <div className={styles['rt-transform-head']}><span>RONAS TECH / WORKFLOW</span><i>AO VIVO</i></div>
          <div className={styles['rt-transform-body']}>
            <div className={styles['rt-transform-column']}>
              <small>01 · PROBLEMA</small>
              <strong>O trabalho não deveria depender disso.</strong>
              <div className={styles['rt-chip-list']}><span>Planilhas</span><span>WhatsApp</span><span>Retrabalho</span><span>Dados espalhados</span></div>
            </div>
            <div className={styles['rt-transform-arrow']}><span>→</span><small>ENTENDEMOS</small></div>
            <div className={${styles['rt-transform-column']} ${styles.solution}}>
              <small>02 · SOLUÇÃO</small>
              <strong>Um processo que trabalha melhor.</strong>
              <div className={styles['rt-solution-flow']}><span>Sistema</span><span>Automação</span><span>Integração</span><span>IA</span></div>
            </div>
          </div>
          <div className={styles['rt-transform-foot']}><span><b /> Problema identificado</span><span>→</span><strong>Solução em construção</strong></div>
        </div>
      </div>
      <div className={styles['rt-hero-bottom']}><span>01</span><i /><span>DESCOBRIR O CAMINHO</span></div>
    </section>
  )
}
export default Hero
