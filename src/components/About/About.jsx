import styles from './About.module.css'

const differentials = [
  {
    title: 'Soluções desenvolvidas sob medida',
    icon: 'custom',
  },
  {
    title: 'Atendimento próximo e transparente',
    icon: 'support',
  },
  {
    title: 'Tecnologias modernas',
    icon: 'technology',
  },
  {
    title: 'Interfaces intuitivas e responsivas',
    icon: 'interface',
  },
  {
    title: 'Código organizado e escalável',
    icon: 'code',
  },
  {
    title: 'Suporte após a entrega',
    icon: 'delivery',
  },
]

const differentialIcons = {
  custom: (
    <>
      <path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z" />
      <path d="m4 7 8 4 8-4M12 11v10M8 5l8 4" />
    </>
  ),
  support: (
    <>
      <path d="M4 13v-2a8 8 0 0 1 16 0v2" />
      <path d="M5 13h2v5H5a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2ZM19 13h-2v5h2a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2ZM17 18c-1 2-3 3-5 3" />
    </>
  ),
  technology: (
    <>
      <rect x="5" y="5" width="14" height="14" rx="3" />
      <path d="M9 9h6v6H9zM9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
    </>
  ),
  interface: (
    <>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4M7 8h4M7 12h7M17 8h.01" />
    </>
  ),
  code: (
    <>
      <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
    </>
  ),
  delivery: (
    <>
      <path d="M20 12a8 8 0 1 1-2.3-5.7L20 9" />
      <path d="M20 4v5h-5M8 12l2.5 2.5L16 9" />
    </>
  ),
}

function DifferentialIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {differentialIcons[name]}
      </g>
    </svg>
  )
}

function About() {
  return (
    <section id="sobre" className={styles.section} aria-labelledby="about-title">
      <div className={styles.container}>
        <div className={styles.introduction}>
          <div className={styles.content}>
            <p className={styles.eyebrow}>Sobre a Ronas Tech</p>
            <h2 id="about-title">Tecnologia para transformar negócios</h2>
            <p>
              A Ronas Tech é uma empresa de desenvolvimento de software focada
              na criação de sites, sistemas web e soluções digitais
              personalizadas. Nosso objetivo é ajudar empresas a organizar
              processos, fortalecer sua presença digital e crescer utilizando
              tecnologia moderna, segura e eficiente.
            </p>
            <p>
              Trabalhamos com atendimento próximo, planejamento claro e
              desenvolvimento orientado às necessidades reais de cada cliente.
              Cada projeto é pensado para ser fácil de usar, responsivo,
              escalável e preparado para evoluir junto com o negócio.
            </p>
            <a className={styles.cta} href="#contato">
              Falar com a Ronas Tech
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <aside className={styles.principles} aria-label="Propósito da Ronas Tech">
            <article className={styles.principle}>
              <div className={styles.principleHeader}>
                <span aria-hidden="true">01</span>
                <h3>Missão</h3>
              </div>
              <p>
                Desenvolver soluções digitais modernas que simplifiquem
                processos, resolvam problemas reais e ajudem empresas a alcançar
                melhores resultados.
              </p>
            </article>

            <article className={styles.principle}>
              <div className={styles.principleHeader}>
                <span aria-hidden="true">02</span>
                <h3>Visão</h3>
              </div>
              <p>
                Ser reconhecida como uma empresa de software confiável, inovadora
                e referência em soluções para pequenas e médias empresas.
              </p>
            </article>

            <article className={styles.principle}>
              <div className={styles.principleHeader}>
                <span aria-hidden="true">03</span>
                <h3>Valores</h3>
              </div>
              <ul className={styles.values}>
                {[
                  'Qualidade',
                  'Transparência',
                  'Compromisso',
                  'Simplicidade',
                  'Inovação',
                  'Evolução contínua',
                ].map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </article>
          </aside>
        </div>

        <div className={styles.differentials}>
          <header className={styles.differentialsHeader}>
            <p>Por que escolher a Ronas Tech</p>
            <h3>Desenvolvimento com qualidade em cada detalhe</h3>
          </header>

          <ul className={styles.differentialGrid}>
            {differentials.map(({ title, icon }) => (
              <li className={styles.differential} key={title}>
                <span className={styles.icon}>
                  <DifferentialIcon name={icon} />
                </span>
                <span>{title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default About
