import styles from './Services.module.css'

const services = [
  {
    title: 'Sites Profissionais',
    description:
      'Sites modernos, responsivos e rápidos para fortalecer a presença digital da sua empresa e gerar novas oportunidades.',
    highlights: [
      'Design responsivo',
      'Integração com WhatsApp',
      'SEO básico',
      'Formulário de contato',
    ],
    icon: 'website',
    featured: true,
  },
  {
    title: 'Landing Pages',
    description:
      'Páginas estratégicas e focadas em conversão para campanhas, produtos, serviços e captação de clientes.',
    highlights: [
      'Foco em conversão',
      'Carregamento rápido',
      'Layout personalizado',
      'Integração com campanhas',
    ],
    icon: 'landing',
  },
  {
    title: 'Sistemas Web',
    description:
      'Sistemas personalizados para organizar clientes, atendimentos, estoque, financeiro e processos internos.',
    highlights: [
      'Desenvolvimento sob medida',
      'Painel administrativo',
      'Controle de usuários',
      'Banco de dados',
    ],
    icon: 'system',
  },
  {
    title: 'APIs e Integrações',
    description:
      'Conectamos sistemas e automatizamos tarefas por meio de APIs e integrações personalizadas.',
    highlights: [
      'APIs REST',
      'Integração entre sistemas',
      'Automação de processos',
      'Integração com serviços externos',
    ],
    icon: 'api',
  },
]

const serviceIcons = {
  website: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M7 6.5h.01M10 6.5h.01M7 13h4M7 16h7" />
    </>
  ),
  landing: (
    <>
      <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <path d="M3 8h18M7 12h6M7 16h10M16 11l2 2-2 2" />
    </>
  ),
  system: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 8h8M8 12h3M8 16h5M16 12v4M14 14h4" />
    </>
  ),
  api: (
    <>
      <path d="M8 6H6a3 3 0 0 0-3 3v2M16 18h2a3 3 0 0 0 3-3v-2M8 18H6a3 3 0 0 1-3-3v-2M16 6h2a3 3 0 0 1 3 3v2" />
      <path d="m8 12 3-3M8 12l3 3M16 12l-3-3M16 12l-3 3" />
    </>
  ),
}

function ServiceIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {serviceIcons[name]}
      </g>
    </svg>
  )
}

function Services() {
  return (
    <section
      id="servicos"
      className={styles.section}
      aria-labelledby="services-title"
    >
      <div className={styles.container}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>Nossos serviços</p>
          <h2 id="services-title">
            Soluções digitais para transformar o seu negócio
          </h2>
          <p className={styles.subtitle}>
            Desenvolvemos sites, sistemas e aplicações sob medida para empresas
            que desejam modernizar processos, fortalecer sua presença digital e
            crescer com tecnologia.
          </p>
        </header>

        <div className={styles.grid}>
          {services.map(
            ({ title, description, highlights, icon, featured }) => (
              <article
                className={`${styles.card} ${featured ? styles.featured : ''}`}
                key={title}
              >
                {featured && (
                  <span className={styles.badge}>Mais procurado</span>
                )}

                <div className={styles.cardHeader}>
                  <div className={styles.icon}>
                    <ServiceIcon name={icon} />
                  </div>
                  <h3>{title}</h3>
                </div>

                <p className={styles.description}>{description}</p>

                <ul className={styles.highlights}>
                  {highlights.map((highlight) => (
                    <li key={highlight}>
                      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path d="m5 10 3 3 7-7" />
                      </svg>
                      {highlight}
                    </li>
                  ))}
                </ul>

                <a className={styles.cta} href="#contato">
                  Solicitar orçamento
                  <span aria-hidden="true">→</span>
                </a>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  )
}

export default Services
