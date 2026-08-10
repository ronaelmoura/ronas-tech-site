import { siteConfig } from '../../config/siteConfig'
import { trackExternalLink } from '../../utils/analytics'
import styles from './Portfolio.module.css'

const projects = [
  {
    title: 'Ronas Desk',
    category: 'Sistema de gestão de chamados',
    need:
      'Substituir solicitações espalhadas por um fluxo organizado para registrar, priorizar e acompanhar atendimentos.',
    solution:
      'Sistema web publicado com acesso protegido, abertura e acompanhamento de chamados, controle de prioridade e status e painéis para usuários e administradores.',
    benefits: [
      'Solicitações centralizadas em um único lugar',
      'Prioridades e andamento visíveis para a equipe',
      'Histórico organizado para acompanhar cada atendimento',
    ],
    status: 'Publicado',
    projectUrl: 'https://ronas-desk.onrender.com/',
    actionLabel: 'Conhecer o Ronas Desk',
    featured: true,
    visual: 'dashboard',
  },
  {
    title: 'Site da Ronas Tech',
    category: 'Site institucional',
    need:
      'Apresentar a empresa e seus serviços de forma clara, profissional e com foco em conversão de clientes.',
    solution:
      'Foi criado um site institucional com comunicação objetiva, navegação simples e estrutura voltada para captar leads e apresentar a proposta da empresa.',
    benefits: [
      'Serviços apresentados com mais clareza',
      'Contato direto pelo WhatsApp',
      'Experiência adaptada para celular',
    ],
    status: 'Publicado',
    projectUrl: siteConfig.siteUrl,
    actionLabel: 'Ver projeto',
    featured: true,
    visual: 'portfolio',
  },
  {
    title: 'Portfólio — Beatriz Mendes',
    category: 'Portfólio profissional',
    need:
      'Reunir experiência, competências e projetos de análise de dados em uma apresentação profissional e fácil de compartilhar.',
    solution:
      'Foi desenvolvido um portfólio responsivo com identidade visual própria, apresentação dos projetos e acesso direto aos canais profissionais.',
    benefits: [
      'Trabalhos e competências reunidos em um único endereço',
      'Apresentação profissional para processos seletivos e contatos',
      'Experiência adaptada para celular e computador',
    ],
    status: 'Publicado',
    projectUrl: 'https://beatriz-mendes-portfolio.vercel.app/',
    actionLabel: 'Ver portfólio da Beatriz',
    featured: true,
    visual: 'dataPortfolio',
  },
]

function ExternalIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M11 4h5v5M9 11l7-7M16 11v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4" />
    </svg>
  )
}

function ProjectVisual({ type }) {
  if (type === 'dashboard') {
    return (
      <div className={styles.dashboardMockup} aria-hidden="true">
        <aside>
          <span className={styles.mockLogo}>R</span>
          <i />
          <i />
          <i />
        </aside>
        <div className={styles.dashboardContent}>
          <div className={styles.mockTopbar}>
            <span />
            <i />
          </div>
          <div className={styles.mockMetrics}>
            <span />
            <span />
            <span />
          </div>
          <div className={styles.mockTable}>
            <strong>Chamados recentes</strong>
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className={styles.floatingStatus}>Painel de chamados</div>
      </div>
    )
  }

  if (type === 'dataPortfolio') {
    return (
      <div className={styles.dataPortfolioMockup} aria-hidden="true">
        <div className={styles.browserBar}>
          <span />
          <span />
          <span />
          <i>beatriz-mendes-portfolio.vercel.app</i>
        </div>
        <div className={styles.dataPortfolioScreen}>
          <div className={styles.dataIntro}>
            <small>Analista de Dados</small>
            <strong>Beatriz Mendes</strong>
            <span>Dados que apoiam decisões melhores.</span>
          </div>
          <div className={styles.dataChart}>
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.portfolioMockup} aria-hidden="true">
      <div className={styles.browserBar}>
        <span />
        <span />
        <span />
        <i>ronastech.com.br</i>
      </div>
      <div className={styles.portfolioScreen}>
        <div>
          <small>Desenvolvedor Full Stack</small>
          <strong>Ronael Moura</strong>
          <span />
          <span />
          <button type="button" tabIndex="-1">Projetos</button>
        </div>
        <div className={styles.profileShape}>RM</div>
      </div>
    </div>
  )
}

function Portfolio() {
  return (
    <section
      id="projetos"
      className={styles.section}
      aria-labelledby="portfolio-title"
    >
      <div className={styles.container}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>Projetos publicados</p>
          <h2 id="portfolio-title">Projetos que você pode abrir e testar</h2>
          <p className={styles.subtitle}>
            Nada de imagens genéricas tratadas como portfólio. Estes projetos
            foram planejados, desenvolvidos e publicados por Ronael Moura.
          </p>
        </header>

        <div className={styles.grid}>
          {projects.map((project) => (
            <article
              className={`${styles.card} ${project.featured ? styles.featured : ''}`}
              key={project.title}
            >
              <div className={styles.visual}>
                {project.featured && (
                  <span className={styles.featuredBadge}>Projeto em destaque</span>
                )}
                <ProjectVisual type={project.visual} />
              </div>

              <div className={styles.content}>
                <div className={styles.meta}>
                  <span className={styles.category}>{project.category}</span>
                  <span
                    className={`${styles.status} ${project.status === 'Publicado' ? styles.published : ''}`}
                  >
                    <i aria-hidden="true" />
                    {project.status}
                  </span>
                </div>

                <h3>{project.title}</h3>

                <div className={styles.features}>
                  <h4>Necessidade</h4>
                  <p className={styles.description}>{project.need}</p>
                </div>

                <div className={styles.features}>
                  <h4>Solução desenvolvida</h4>
                  <p className={styles.description}>{project.solution}</p>
                </div>

                <div className={styles.features}>
                  <h4>Benefícios para o negócio</h4>
                  <ul className={styles.businessBenefits}>
                    {project.benefits.map((benefit) => (
                      <li key={benefit}>{benefit}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.features}>
                  <h4>Andamento</h4>
                  <p className={styles.description}>{project.status}</p>
                </div>

                <div className={styles.actions}>
                  {project.projectUrl ? (
                    <a
                      className={styles.primaryButton}
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackExternalLink('portfolio', project.projectUrl)
                      }
                    >
                      {project.actionLabel}
                      <ExternalIcon />
                    </a>
                  ) : (
                    <a className={styles.primaryButton} href="#contato">
                      Quero uma solução semelhante
                      <span aria-hidden="true">→</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
