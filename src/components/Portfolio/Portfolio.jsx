import styles from './Portfolio.module.css'

const projects = [
  {
    title: 'Ronas Desk',
    category: 'Sistema Web Full Stack',
    description:
      'Sistema de gestão de clientes e chamados desenvolvido para organizar atendimentos, centralizar informações e acompanhar o andamento dos serviços.',
    technologies: ['React', 'Node.js', 'Express', 'MySQL'],
    features: [
      'Cadastro de clientes',
      'Gestão de chamados',
      'Controle de status',
      'Painel administrativo',
      'Integração com banco de dados',
    ],
    status: 'Em desenvolvimento',
    codeUrl: 'https://github.com/ronaelmoura/ronas-desk',
    featured: true,
    visual: 'dashboard',
  },
  {
    title: 'Portfólio Ronas Tech',
    category: 'Portfólio Profissional',
    description:
      'Portfólio desenvolvido para apresentar projetos, habilidades, tecnologias e a trajetória profissional de Ronael Moura como Desenvolvedor Full Stack.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
    features: [
      'Apresentação profissional',
      'Projetos em destaque',
      'Tecnologias',
      'Contato',
      'Layout responsivo',
    ],
    status: 'Publicado',
    projectUrl: 'https://ronaelmoura.github.io/portfolio-ronas-tech/',
    codeUrl: 'https://github.com/ronaelmoura/portfolio-ronas-tech',
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
        <div className={styles.floatingStatus}>12 chamados ativos</div>
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
          <h2 id="portfolio-title">Projetos que demonstram nossa experiência</h2>
          <p className={styles.subtitle}>
            Conheça algumas soluções desenvolvidas com foco em organização,
            desempenho, experiência do usuário e resolução de problemas reais.
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
                  <span className={styles.featuredBadge}>Projeto principal</span>
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
                <p className={styles.description}>{project.description}</p>

                <ul className={styles.technologies} aria-label="Tecnologias utilizadas">
                  {project.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>

                <div className={styles.features}>
                  <h4>Principais funcionalidades</h4>
                  <ul>
                    {project.features.map((feature) => (
                      <li key={feature}>
                        <span aria-hidden="true">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.actions}>
                  {project.projectUrl ? (
                    <a
                      className={styles.primaryButton}
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Acessar projeto
                      <ExternalIcon />
                    </a>
                  ) : (
                    <button className={styles.disabledButton} type="button" disabled>
                      Demo em breve
                    </button>
                  )}

                  <a
                    className={styles.secondaryButton}
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CodeIcon />
                    Ver código
                  </a>
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
