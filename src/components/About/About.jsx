import { siteConfig } from '../../config/siteConfig'
import { trackExternalLink } from '../../utils/analytics'
import styles from './About.module.css'

const facts = [
  ['670h', 'Formação Full Stack pelo SENAI'],
  ['4', 'Projetos públicos em destaque'],
  ['Brasil', 'Atendimento remoto e direto'],
  ['Ponta a ponta', 'Do diagnóstico à publicação'],
]

function About() {
  return (
    <section id="sobre" className={`${styles.section} reveal`} aria-labelledby="about-title">
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Quem está por trás</p>
          <h2 id="about-title">Você fala diretamente com quem entende e constrói.</h2>
          <p className={styles.lead}>A Ronas Tech é conduzida por Ronael Moura, desenvolvedor Full Stack com formação pelo SENAI e experiência em suporte de TI. O mesmo profissional que entende o problema planeja, desenvolve, testa e acompanha a publicação.</p>
          <p>Isso reduz ruído, deixa as decisões mais claras e mantém o projeto proporcional ao que o seu negócio realmente precisa.</p>
          <div className={styles.actions}>
            <a className={styles.primary} href="#pedido">Conversar sobre meu projeto <span aria-hidden="true">→</span></a>
            <a className={styles.secondary} href={siteConfig.github} target="_blank" rel="noopener noreferrer" onClick={() => trackExternalLink('github')}>Ver trabalho no GitHub <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className={styles.proof} aria-label="Informações profissionais">
          <div className={styles.proofHeader}><span>Ronael Moura</span><strong>Full Stack Developer</strong><small>Tianguá, Ceará · projetos para todo o Brasil</small></div>
          <dl className={styles.factGrid}>
            {facts.map(([value, label]) => <div key={label}><dt>{value}</dt><dd>{label}</dd></div>)}
          </dl>
          <div className={styles.stack}><span>React</span><span>Node.js</span><span>Express</span><span>MySQL</span><span>Docker</span></div>
        </div>
      </div>
    </section>
  )
}

export default About
