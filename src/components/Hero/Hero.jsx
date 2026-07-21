import styles from './Hero.module.css'
import { siteConfig } from '../../config/siteConfig'

function Hero() {
  return (
    <section id="inicio" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.content}>
          <img
            className={styles.heroLogo}
            src={siteConfig.logoPath}
            alt=""
            width="52"
            height="49"
          />
          <p className={styles.eyebrow}>
            <span aria-hidden="true" />
            Tecnologia para o seu negócio
          </p>

          <h1 id="hero-title" className={styles.title}>
            Transformamos ideias em{' '}
            <span>soluções de software.</span>
          </h1>

          <p className={styles.description}>
            Desenvolvemos sistemas web, sites profissionais e aplicações sob
            medida para empresas que desejam crescer com tecnologia.
          </p>

          <div className={styles.actions}>
            <a className={styles.primaryButton} href="#contato">
              Solicitar Orçamento
              <span aria-hidden="true">→</span>
            </a>
            <a className={styles.secondaryButton} href="#projetos">
              Conhecer Projetos
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
              <div className={styles.addressBar}>app.ronastech.dev</div>
            </div>

            <div className={styles.dashboardBody}>
              <aside className={styles.sidebar}>
                <div className={styles.sidebarLogo}>R</div>
                <span className={styles.activeIcon} />
                <span />
                <span />
                <span />
              </aside>

              <div className={styles.panel}>
                <div className={styles.panelHeader}>
                  <div>
                    <span className={styles.label}>Visão geral</span>
                    <strong>Dashboard</strong>
                  </div>
                  <span className={styles.status}>Online</span>
                </div>

                <div className={styles.metrics}>
                  <div className={styles.metricCard}>
                    <span>Receita</span>
                    <strong>R$ 84,2k</strong>
                    <small>+12,5%</small>
                  </div>
                  <div className={styles.metricCard}>
                    <span>Projetos</span>
                    <strong>24</strong>
                    <small>+4 este mês</small>
                  </div>
                  <div className={styles.metricCard}>
                    <span>Conversão</span>
                    <strong>8,7%</strong>
                    <small>+2,1%</small>
                  </div>
                </div>

                <div className={styles.chartCard}>
                  <div className={styles.chartHeader}>
                    <span>Crescimento</span>
                    <small>Últimos 6 meses</small>
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
            <span className={styles.codeLabel}>deploy.js</span>
            <code>
              <span>const</span> status = <em>&apos;success&apos;</em>;
            </code>
            <small>✓ Deploy concluído</small>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
