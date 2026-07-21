import styles from './Services.module.css'

const services = [
  {
    title: 'Landing Pages',
    description:
      'Crie páginas focadas em conversão para captar leads, vender mais e gerar resultado rápido.',
    highlights: [
      'Objetivo claro e direto',
      'Layout pensado para conversão',
      'Entrega rápida',
      'Boa presença para campanhas',
    ],
    icon: 'landing',
    featured: true,
  },
  {
    title: 'Sites Institucionais',
    description:
      'Apresente sua empresa com um site profissional, moderno e confiável para gerar confiança.',
    highlights: [
      'Visual profissional',
      'Estrutura clara para comunicação',
      'Responsivo em qualquer tela',
      'Foco em reputação da marca',
    ],
    icon: 'website',
  },
  {
    title: 'Sites Empresariais',
    description:
      'Tenha um site organizado para apresentar serviços, contatos, diferenciais e oportunidades de negócio.',
    highlights: [
      'Mais credibilidade',
      'Melhor comunicação com clientes',
      'Estrutura para crescimento',
      'Experiência profissional online',
    ],
    icon: 'system',
  },
  {
    title: 'Manutenção de Sites',
    description:
      'Mantenha seu site atualizado, estável e funcionando bem para evitar perda de clientes.',
    highlights: [
      'Correções e melhorias',
      'Mais segurança',
      'Atualizações constantes',
      'Site sempre funcionando',
    ],
    icon: 'api',
  },
  {
    title: 'Correção de Bugs',
    description:
      'Resolva problemas de funcionamento com atenção rápida e soluções práticas para o seu negócio.',
    highlights: [
      'Mais estabilidade',
      'Menos interrupções',
      'Melhor experiência de uso',
      'Ajustes com foco em resultado',
    ],
    icon: 'api',
  },
  {
    title: 'Sistemas Web Simples',
    description:
      'Automatize processos simples e organize seu trabalho com uma solução prática e eficiente.',
    highlights: [
      'Menos trabalho manual',
      'Processos mais organizados',
      'Mais produtividade',
      'Solução adaptada ao seu dia a dia',
    ],
    icon: 'system',
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
            Soluções práticas para vender mais e operar melhor
          </h2>
          <p className={styles.subtitle}>
            Podemos ajudar sua empresa com landing pages, sites institucionais,
            sites empresariais, manutenção e sistemas simples para melhorar sua
            presença online e facilitar o dia a dia do negócio.
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
