import styles from './Hero.module.css'
import { siteConfig } from '../../config/siteConfig'
import { trackExternalLink } from '../../utils/analytics'

function Hero() {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    'Olá, Ronael! Vim pelo site da Ronas Tech e gostaria de pedir um orçamento.',
  )}`

  return (
    <section id="inicio" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" />
            Sites, automações e sistemas para pequenos negócios
          </p>

          <h1 id="hero-title" className={styles.title}>
            Sites e automações para pequenos negócios{' '}
            <span>venderem mais e perderem menos tempo.</span>
          </h1>

          <p className={styles.description}>
            Tenha uma presença profissional, organize sua operação e reduza
            tarefas manuais com soluções simples, feitas para a realidade do
            seu negócio.
          </p>

          <div className={styles.actions}>
            <a
              className={styles.primaryButton}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackExternalLink('hero_whatsapp', whatsappUrl)}
            >
              Pedir orçamento no WhatsApp
              <span aria-hidden="true">→</span>
            </a>

            <a className={styles.secondaryButton} href="#projetos">
              Ver projetos reais
            </a>
          </div>

          <ul className={styles.trustList} aria-label="Diferenciais do atendimento">
            <li>Atendimento direto com o fundador</li>
            <li>Escopo e etapas explicados com clareza</li>
            <li>Soluções pensadas para a rotina do negócio</li>
          </ul>
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
                    <span className={styles.label}>Operação digital</span>
                    <strong>Seu negócio organizado</strong>
                  </div>

                  <span className={styles.status}>Publicado</span>
                </div>

                <div className={styles.metrics}>
                  <div className={styles.metricCard}>
                    <span>Atendimento</span>
                    <strong>Organizado</strong>
                    <small>Mais agilidade</small>
                  </div>

                  <div className={styles.metricCard}>
                    <span>Processos</span>
                    <strong>Simples</strong>
                    <small>Menos retrabalho</small>
                  </div>

                  <div className={styles.metricCard}>
                    <span>Oportunidades</span>
                    <strong>Visíveis</strong>
                    <small>Mais controle</small>
                  </div>
                </div>

                <div className={styles.chartCard}>
                  <div className={styles.chartHeader}>
                    <span>Evolução do negócio</span>
                    <small>Operação organizada</small>
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
              <span>const</span> problema = <em>&apos;resolvido&apos;</em>;
            </code>

            <small>✓ Solução pronta para evoluir</small>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
