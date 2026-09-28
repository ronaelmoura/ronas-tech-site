import styles from './Hero.module.css'

function Hero() {
  return (
    <section id="inicio" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}><span /> RONAS TECH · SOLUÇÕES DIGITAIS</p>
          <h1 id="hero-title">Seu negócio tem um problema. A gente transforma isso em uma ferramenta que funciona.</h1>
          <p className={styles.description}>
            Sites, sistemas, automações e IA para organizar tarefas, atender clientes e colocar sua operação para funcionar melhor.
          </p>
          <div className={styles.actions}>
            <a className={styles.primary} href="#contato">Falar sobre meu projeto <span>→</span></a>
            <a className={styles.secondary} href="#servicos">Ver como podemos ajudar</a>
          </div>
          <div className={styles.trust}>
            <span>Projetos sob medida</span>
            <span>Atendimento remoto</span>
            <span>Tianguá · CE</span>
          </div>
        </div>
        <div className={styles.visual}>
          <div className={styles.panel}>
            <div className={styles.panelTop}><span>RONAS TECH</span><b>ONLINE</b></div>
            <div className={styles.panelBody}>
              <small>MAPA DE SOLUÇÕES</small>
              <h2>Seu trabalho.</h2>
              <h2 className={styles.accent}>Uma ferramenta feita para ele.</h2>
              <div className={styles.flow}>
                <div><i>01</i><span>Entender</span></div>
                <div><i>02</i><span>Construir</span></div>
                <div><i>03</i><span>Automatizar</span></div>
              </div>
              <div className={styles.status}><span /> Projeto pronto para o próximo passo</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Hero
