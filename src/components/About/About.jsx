import { siteConfig } from '../../config/siteConfig'
import { trackExternalLink } from '../../utils/analytics'
import styles from './About.module.css'

const facts = [
  ['6', 'serviços digitais'],
  ['Full Stack', 'desenvolvimento sob medida'],
  ['IA e automação', 'para tarefas do dia a dia'],
  ['Tianguá, CE', 'atendimento remoto'],
]

function About() {
  return (
    <section id="sobre" className={`${styles.section} reveal`} aria-labelledby="about-title">
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Sobre a Ronas Tech</p>
          <h2 id="about-title">Tecnologia para o trabalho real.</h2>
          <p className={styles.lead}>A Ronas Tech nasceu para ajudar empresas a resolver problemas do dia a dia com tecnologia feita sob medida.</p>
          <p>Antes de programar, procuramos entender como o trabalho é feito, onde estão os gargalos e o que precisa melhorar. Só depois definimos o que será desenvolvido.</p>
          <div className={styles.actions}>
            <a className={styles.primary} href="#contato">Falar com a Ronas Tech</a>
            <a className={styles.secondary} href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" onClick={() => trackExternalLink('linkedin')}>LinkedIn</a>
          </div>
        </div>
        <div className={styles.proof} aria-label="Informações sobre a Ronas Tech">
          <div className={styles.proofHeader}><span>RONAS TECH</span><strong>Soluções digitais</strong><small>Atendimento remoto para empresas</small></div>
          <dl className={styles.factGrid}>
            {facts.map(([value, label]) => <div key={label}><dt>{value}</dt><dd>{label}</dd></div>)}
          </dl>
          <div className={styles.stack}><span>React</span><span>Node.js</span><span>TypeScript</span><span>MySQL</span><span>APIs</span><span>IA</span></div>
        </div>
      </div>
    </section>
  )
}
export default About
