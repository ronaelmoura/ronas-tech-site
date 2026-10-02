import styles from './Technologies.module.css'

const technologyGroups = [
  {
    category: 'Front-End',
    description: 'Interfaces responsivas e acessíveis',
    technologies: [
      { name: 'HTML5', icon: 'html' },
      { name: 'CSS3', icon: 'css' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'React', icon: 'react' },
    ],
  },
  {
    category: 'Back-End',
    description: 'APIs REST, autenticação e regras de negócio',
    technologies: [
      { name: 'Node.js', icon: 'node' },
      { name: 'Express', icon: 'express' },
    ],
  },
  {
    category: 'Banco de Dados',
    description: 'Modelagem relacional e transações',
    technologies: [{ name: 'MySQL', icon: 'mysql' }],
  },
  {
    category: 'Ferramentas',
    description: 'Versionamento, containers e build',
    technologies: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'Docker', icon: 'docker' },
      { name: 'Vite', icon: 'vite' },
    ],
  },
]

const technologyIcons = {
  html: (
    <>
      <path d="M5 3h14l-1.3 15L12 21l-5.7-3L5 3Z" />
      <path d="M8 7h8l-.3 3H8.3l.4 5 3.3 1.7 3.3-1.7.2-2H12" />
    </>
  ),
  css: (
    <>
      <path d="M5 3h14l-1.3 15L12 21l-5.7-3L5 3Z" />
      <path d="M16 7H8l.2 3h7.5l-.5 5-3.2 1.7L8.8 15l-.2-2" />
    </>
  ),
  javascript: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M11 8v7a2 2 0 0 1-4 0M14 14.5c.5 1 1.3 1.5 2.3 1.5 1 0 1.7-.5 1.7-1.3 0-2.2-4-1.2-4-4 0-1.5 1.2-2.7 3-2.7.8 0 1.6.3 2.2 1" />
    </>
  ),
  react: (
    <>
      <circle cx="12" cy="12" r="1.7" />
      <ellipse cx="12" cy="12" rx="9" ry="3.7" />
      <ellipse cx="12" cy="12" rx="9" ry="3.7" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.7" transform="rotate(120 12 12)" />
    </>
  ),
  node: (
    <>
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
      <path d="M9 15V9l6 6V9" />
    </>
  ),
  express: (
    <>
      <path d="M3 7h8M3 12h6M3 17h8M14 7l7 10M21 7l-7 10" />
    </>
  ),
  mysql: (
    <>
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </>
  ),
  git: (
    <>
      <path d="m12 3 9 9-9 9-9-9 9-9Z" />
      <circle cx="9" cy="9" r="1.5" />
      <circle cx="15" cy="15" r="1.5" />
      <path d="m10 10 4 4M12 8l2-2" />
    </>
  ),
  github: (
    <>
      <path d="M9 19c-4 1.2-4-2-5-2.5M14 21v-3.5c0-1 .1-1.5-.5-2 2.8-.3 5.7-1.4 5.7-6.2 0-1.4-.5-2.5-1.3-3.4.1-.3.6-1.6-.1-3.3 0 0-1.1-.3-3.6 1.3a12.4 12.4 0 0 0-6.5 0C5.2 2.3 4.1 2.6 4.1 2.6c-.7 1.7-.2 3-.1 3.3-.8.9-1.3 2-1.3 3.4 0 4.8 2.9 5.9 5.7 6.2-.5.5-.6 1.1-.6 2V21" />
    </>
  ),
  docker: (
    <>
      <path d="M3 12h16.5c.8 0 1.5-.4 2-1-1-.3-1.6-1-1.7-2-1 .1-1.8.7-2 1.5" />
      <path d="M3 12c0 4 3 7 8 7 4.5 0 7.5-2.5 8.5-7" />
      <path d="M5 9h3v3H5zM8 9h3v3H8zM11 9h3v3h-3zM8 6h3v3H8zM11 6h3v3h-3z" />
    </>
  ),
  vite: (
    <>
      <path d="m4 4 8 16L20 4l-8 3-8-3Z" />
      <path d="m13.5 3-4 8h4l-3 7 7-10h-4l2-5" />
    </>
  ),
}

function TechnologyIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <g
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {technologyIcons[name]}
      </g>
    </svg>
  )
}

function Technologies() {
  return (
    <section
      id="stack"
      className={styles.section}
      aria-labelledby="technologies-title"
    >
      <div className={styles.container}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>02 / Minha caixa de ferramentas</p>
          <h2 id="technologies-title">Da ideia à aplicação.<br />Uma stack conectada.</h2>
          <p className={styles.subtitle}>
            As mesmas ferramentas dos projetos acima: JavaScript de ponta a
            ponta, banco relacional e um fluxo de entrega com Git e Docker.
          </p>
        </header>

        <div className={styles.groups}>
          {technologyGroups.map(({ category, description, technologies }) => (
            <article className={styles.group} key={category}>
              <header className={styles.groupHeader}>
                <div>
                  <h3>{category}</h3>
                  <p>{description}</p>
                </div>
                <span aria-label={`${technologies.length} tecnologias`}>
                  {String(technologies.length).padStart(2, '0')}
                </span>
              </header>

              <ul className={styles.technologyList}>
                {technologies.map(({ name, icon }) => (
                  <li className={styles.technology} key={name}>
                    <span className={styles.icon}>
                      <TechnologyIcon name={icon} />
                    </span>
                    <span className={styles.name}>{name}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Technologies
