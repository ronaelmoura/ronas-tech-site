import { siteConfig } from '../../config/siteConfig'
import { trackExternalLink } from '../../utils/analytics'
import styles from './Portfolio.module.css'

const projects = [
  {
    title: 'Ronas Desk',
    category: 'Sistema Web full stack',
    need:
      'Organizar atendimento, centralizar informações de clientes e acompanhar chamados de forma mais prática.',
    solution:
      'Foi desenvolvido um sistema com painel administrativo para controle de clientes, status dos atendimentos e gestão operacional.',
    technologies: ['React', 'Node.js', 'Express', 'MySQL'],
    status: 'Em desenvolvimento',
    codeUrl: `${siteConfig.github}/ronas-desk`,
    featured: true,
    visual: 'dashboard',
  },
  {
    title: 'Site da Ronas Tech',
    category: 'Site institucional / portfólio profissional',
    need:
      'Apresentar a empresa e seus serviços de forma clara, profissional e com foco em conversão de clientes.',
    solution:
      'Foi criado um site institucional com comunicação objetiva, navegação simples e estrutura voltada para captar leads e apresentar a proposta da empresa.',
    technologies: ['React', 'Vite', 'CSS Modules', 'Google Analytics'],
    status: 'Publicado',
    projectUrl: siteConfig.siteUrl,
    codeUrl: `${siteConfig.github}/ronas-tech-site`,
    featured: true,
    visual: 'portfolio',
  },
]

function ExternalIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M11 4h5v5M9 11l7-7M16 11v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4" />
    </svg>
  )
}

function CodeIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="m7 5-5 5 5 5M13 5l5 5-5 5M12 3 8 17" />
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

  return (
    <div className={styles.portfolioMockup} aria-hidden="true">
      <div className={styles.browserBar}>
        <span />
        <span />
        <span />
        <i>ronaelmoura.github.io</i>
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
          <p className={styles.eyebrow}>Projetos selecionados</p>
          <h2 id="portfolio-title">Provas de capacidade da Ronas Tech</h2>
          <p className={styles.subtitle}>
            Veja como a equipe trabalha com soluções práticas, comunicação clara e
            desenvolvimento voltado para necessidades reais de negócio.
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

                <ul className={styles.technologies} aria-label="Tecnologias utilizadas">
                  {project.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>

                <div className={styles.features}>
                  <h4>Status do projeto</h4>
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
                      Ver projeto
                      <ExternalIcon />
                    </a>
                  ) : (
                    <button className={styles.disabledButton} type="button" disabled>
                      Projeto em desenvolvimento
                    </button>
                  )}

                  {project.codeUrl && (
                    <a
                      className={styles.secondaryButton}
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackExternalLink('github', project.codeUrl)}
                    >
                      <CodeIcon />
                      Ver no GitHub
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
