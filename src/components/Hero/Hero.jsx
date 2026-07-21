import styles from './Hero.module.css'

function Hero() {
  return (
    <section id="inicio" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" />
            Landing Pages, Sites Institucionais e Sistemas Web
          </p>

          <h1 id="hero-title" className={styles.title}>
            Transforme sua presença online em uma máquina de{' '}
            <span>atração e conversão de clientes.</span>
          </h1>

          <p className={styles.description}>
            Desenvolvemos landing pages com foco em conversão, sites
            institucionais profissionais e sistemas web sob medida para
            empresas que querem vender mais, ganhar autoridade e crescer com
            tecnologia.
          </p>

          <div className={styles.actions}>
            <a className={styles.primaryButton} href="#contato">
              Solicitar uma proposta
              <span aria-hidden="true">→</span>
            </a>

            <a className={styles.secondaryButton} href="#servicos">
              Ver serviços
            </a>
          </div>
        </div>

        <div className={styles.visual} aria-hidden="true">
          <div className={styles.dashboard}>
            <div className={styles.windowBar}>
              <div className={styles.windowDots}>
                <span />
                <span />
                <span />
              </div>

              <div className={styles.addressBar}>projeto.ronastech.com.br</div>
            </div>

            <div className={styles.dashboardBody}>
              <aside className={styles.sidebar}>
                <div className={styles.sidebarLogo}>RT</div>
                <span className={styles.activeIcon} />
                <span />
                <span />
                <span />
              </aside>

              <div className={styles.panel}>
                <div className={styles.panelHeader}>
                  <div>
                    <span className={styles.label}>Projeto digital</span>
                    <strong>Seu negócio online</strong>
                  </div>

                  <span className={styles.status}>Publicado</span>
                </div>

                <div className={styles.metrics}>
                  <div className={styles.metricCard}>
                    <span>Presença digital</span>
                    <strong>Profissional</strong>
                    <small>Site moderno</small>
                  </div>

                  <div className={styles.metricCard}>
                    <span>Dispositivos</span>
                    <strong>100%</strong>
                    <small>Responsivo</small>
                  </div>

                  <div className={styles.metricCard}>
                    <span>Atendimento</span>
                    <strong>WhatsApp</strong>
                    <small>Contato rápido</small>
                  </div>
                </div>

                <div className={styles.chartCard}>
                  <div className={styles.chartHeader}>
                    <span>Crescimento digital</span>
                    <small>Presença online</small>
                  </div>

                  <div className={styles.chart}>
                    <span style={{ '--height': '30%' }} />
                    <span style={{ '--height': '46%' }} />
                    <span style={{ '--height': '41%' }} />
                    <span style={{ '--height': '64%' }} />
                    <span style={{ '--height': '72%' }} />
                    <span style={{ '--height': '91%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.codeCard}>
            <span className={styles.codeLabel}>ronas-tech</span>

            <code>
              <span>const</span> projeto = <em>&apos;online&apos;</em>;
            </code>

            <small>✓ Projeto publicado</small>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero