import styles from './Hero.module.css'

function Hero() {
  return (
    <section id="inicio" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}><span /> RONAS TECH · SOLUÇÕES DIGITAIS</p>
          <h1 id="hero-title">Tecnologia que transforma <span>problemas de negócio</span> em soluções digitais.</h1>
          <p className={styles.description}>
            Criamos sites, sistemas, automações e soluções com IA para empresas que querem crescer, ganhar produtividade e simplificar processos.
          </p>
          <div className={styles.actions}>
            <a className={styles.primary} href="#servicos">Conhecer serviços <span>→</span></a>
            <a className={styles.secondary} href="#contato">Falar com a Ronas Tech</a>
          </div>
          <div className={styles.trust}>
            <span>Desenvolvimento sob medida</span>
            <span>Automação</span>
            <span>Inteligência artificial</span>
          </div>
        </div>
        <div className={styles.visual}>
          <div className={styles.panel}>
            <div className={styles.panelTop}><span>RONAS TECH</span><b>ONLINE</b></div>
            <div className={styles.panelBody}>
              <small>MAPA DE SOLUÇÕES</small>
              <h2>Seu processo.</h2>
              <h2 className={styles.accent}>Nossa tecnologia.</h2>
              <div className={styles.flow}>
                <div><i>01</i><span>Entender</span></div>
                <div><i>02</i><span>Construir</span></div>
                <div><i>03</i><span>Automatizar</span></div>
              </div>
              <div className={styles.status}><span /> Sistema pronto para evoluir</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Hero
