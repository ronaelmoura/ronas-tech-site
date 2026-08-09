import styles from './Services.module.css'

const services = [
  {
    title: 'Sites e Landing Pages',
    description:
      'Apresente seu negócio com clareza e crie um caminho direto para novos clientes entrarem em contato.',
    highlights: [
      'Mensagem clara sobre sua oferta',
      'Layout profissional e responsivo',
      'Integração com WhatsApp',
      'Estrutura básica para buscas',
    ],
    icon: 'landing',
    path: '/criacao-de-sites',
    featured: true,
  },
  {
    title: 'Automações para o dia a dia',
    description:
      'Reduza tarefas repetitivas e organize etapas que hoje dependem de copiar, colar e lembrar manualmente.',
    highlights: [
      'Fluxos simples e objetivos',
      'Menos retrabalho operacional',
      'Informações centralizadas',
      'Implantação por etapas',
    ],
    icon: 'system',
    path: '/sistemas-web',
  },
  {
    title: 'Sistemas web sob medida',
    description:
      'Transforme planilhas, cadernos e processos soltos em uma ferramenta acessível pelo navegador.',
    highlights: [
      'Cadastros e acompanhamento',
      'Painéis fáceis de entender',
      'Funções definidas com o cliente',
      'Projeto preparado para evoluir',
    ],
    icon: 'system',
    path: '/sistemas-web',
  },
  {
    title: 'Manutenção e melhorias',
    description:
      'Corrija falhas, atualize informações e melhore uma solução digital que sua empresa já utiliza.',
    highlights: [
      'Diagnóstico antes da alteração',
      'Correções visuais e funcionais',
      'Ajustes para celular',
      'Relato claro do que foi feito',
    ],
    icon: 'api',
    path: '/manutencao-de-sites',
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
          <p className={styles.eyebrow}>Como podemos ajudar</p>
          <h2 id="services-title">
            Soluções digitais ligadas a um objetivo real do negócio
          </h2>
          <p className={styles.subtitle}>
            Cada projeto começa por uma necessidade concreta. Você entende o
            que será feito, por que será feito e como a solução ajudará sua
            empresa no dia a dia.
          </p>
        </header>

        <div className={styles.grid}>
          {services.map(
            ({ title, description, highlights, icon, path, featured }) => (
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

                <a className={styles.cta} href={path}>
                  Entender a solução
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
