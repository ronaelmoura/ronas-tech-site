import { siteConfig } from '../../config/siteConfig'
import { trackExternalLink } from '../../utils/analytics'
import styles from './About.module.css'

const facts = [
  ['SENAI', 'Formação em desenvolvimento de sistemas'],
  ['4 projetos', 'Com código público no GitHub'],
  ['122 testes', 'Automatizados no Ronas Desk, com CI'],
  ['Suporte de TI', 'Experiência com usuários e sistemas'],
]

const stack = ['React', 'Node.js', 'Express', 'MySQL', 'Docker', 'OpenAPI', 'Git']

function About() {
  return (
    <section id="sobre" className={`${styles.section} reveal`} aria-labelledby="about-title">
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>03 / Além do código</p>
          <h2 id="about-title">Do suporte de TI ao código em produção.</h2>
          <p className={styles.lead}>Sou Ronael Moura, desenvolvedor Full Stack com formação pelo SENAI e experiência em suporte de TI.</p>
          <p>O suporte me ensinou a entender o problema antes de escrever a solução e a explicar tecnologia sem jargão. Hoje levo isso para o desenvolvimento: sistemas web com autenticação, APIs REST, bancos relacionais, testes automatizados e deploy contínuo.</p>
          <div className={styles.actions}>
            <a className={styles.primary} href="#contato">Falar comigo</a>
            <a className={styles.secondary} href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" onClick={() => trackExternalLink('linkedin')}>LinkedIn</a>
            <a className={styles.secondary} href={siteConfig.github} target="_blank" rel="noopener noreferrer" onClick={() => trackExternalLink('github')}>GitHub</a>
          </div>
        </div>
        <div className={styles.proof} aria-label="Informações profissionais">
          <figure className={styles.workspace}><img src="/workspace-editorial.webp" alt="Cena ilustrativa de uma mesa de desenvolvimento com notebook, caderno e luz natural" width="1200" height="800" loading="lazy" decoding="async" /><figcaption>Entender. Construir. Evoluir.</figcaption></figure>
          <div className={styles.proofHeader}><span>Ronael Moura</span><strong>Desenvolvedor Full Stack</strong><small>Tianguá, Ceará</small></div>
          <dl className={styles.factGrid}>
            {facts.map(([value, label]) => <div key={label}><dt>{value}</dt><dd>{label}</dd></div>)}
          </dl>
          <div className={styles.stack}>{stack.map((item) => <span key={item}>{item}</span>)}</div>
        </div>
      </div>
    </section>
  )
}

export default About
