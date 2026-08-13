import styles from './Hero.module.css'
import { siteConfig } from '../../config/siteConfig'
import { trackExternalLink } from '../../utils/analytics'

function Hero() {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    'Olá, Ronael! Vim pelo site da Ronas Tech e quero organizar melhor o meu negócio.',
  )}`

  return (
    <section id="inicio" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" />
            Atendimento remoto para pequenos negócios em todo o Brasil
          </p>

          <h1 id="hero-title" className={styles.title}>
            Seu negócio não precisa de mais ferramentas.{' '}
            <span>Precisa da ferramenta certa.</span>
          </h1>

          <p className={styles.description}>
            Criamos sites, automações e sistemas que transformam visitas em
            conversas, tarefas em processos claros e informações soltas em
            decisões melhores.
          </p>

          <div className={styles.actions}>
            <a
              className={styles.primaryButton}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackExternalLink('hero_whatsapp', whatsappUrl)}
            >
              Quero organizar meu negócio
              <span aria-hidden="true">→</span>
            </a>

            <a className={styles.secondaryButton} href="#projetos">
              Ver soluções reais
            </a>
          </div>

          <ul className={styles.trustList} aria-label="Diferenciais do atendimento">
            <li>Atendimento direto com quem desenvolve</li>
            <li>Proposta clara antes de qualquer decisão</li>
            <li>Do diagnóstico à publicação e evolução</li>
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
