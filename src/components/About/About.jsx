import { siteConfig } from '../../config/siteConfig'
import { trackExternalLink } from '../../utils/analytics'
import styles from './About.module.css'

const facts = [
  ['SENAI', 'Formação em desenvolvimento de sistemas'],
  ['4 projetos', 'Com código público no GitHub'],
  ['Docker', 'Incluído na stack técnica do Ronas Desk'],
  ['Suporte de TI', 'Experiência com usuários e sistemas'],
]

const stack = ['React', 'Node.js', 'Express', 'MySQL', 'Docker', 'OpenAPI', 'Git']

function About() {
  return (
    <section id="sobre" className={`${styles.section} reveal`} aria-labelledby="about-title">
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Quem está por trás da Ronas Tech</p>
          <h2 id="about-title">Ronael Moura, do planejamento ao código.</h2>
          <p className={styles.lead}>Desenvolvedor Full Stack formado pelo SENAI, responsável pelos projetos apresentados neste site.</p>
          <p>Minha experiência começou no suporte de TI, trabalhando diretamente com usuários e sistemas. Hoje desenvolvo interfaces em React, APIs com Node.js e Express, bancos MySQL e fluxos de entrega com testes, Git e Docker.</p>
          <div className={styles.actions}>
            <a className={styles.primary} href="#projetos">Ver projetos</a>
            <a className={styles.secondary} href="#contato">Falar comigo</a>
            <a className={styles.secondary} href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" onClick={() => trackExternalLink('linkedin')}>LinkedIn</a>
            <a className={styles.secondary} href={siteConfig.github} target="_blank" rel="noopener noreferrer" onClick={() => trackExternalLink('github')}>GitHub</a>
          </div>
        </div>
        <div className={styles.proof} aria-label="Informações profissionais">
          <figure className={styles.workspace}><img src="/workspace-editorial.webp" alt="Mesa de desenvolvimento com notebook e caderno em um ambiente de trabalho" width="1200" height="800" loading="lazy" decoding="async" /><figcaption>Ambiente de desenvolvimento · Ronas Tech</figcaption></figure>
          <div className={styles.proofHeader}><span>Perfil profissional</span><strong>Ronael Moura</strong><small>Desenvolvedor Full Stack · Tianguá, Ceará</small></div>
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
