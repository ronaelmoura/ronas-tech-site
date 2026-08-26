import { siteConfig } from '../../config/siteConfig'
import { trackExternalLink } from '../../utils/analytics'
import styles from './About.module.css'

const facts = [
  ['670h', 'Formação Full Stack pelo SENAI'],
  ['TI', 'Experiência com suporte e sistemas'],
  ['Brasil', 'Atendimento remoto e direto'],
  ['Ponta a ponta', 'Do diagnóstico à orientação final'],
]

function About() {
  return (
    <section id="sobre" className={`${styles.section} reveal`} aria-labelledby="about-title">
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Quem está por trás</p>
          <h2 id="about-title">Você fala diretamente com quem entende de computadores e sistemas.</h2>
          <p className={styles.lead}>A Ronas Tech é conduzida por Ronael Moura, profissional de tecnologia com formação Full Stack pelo SENAI e experiência em suporte de TI.</p>
          <p>O atendimento combina diagnóstico cuidadoso, explicação em linguagem simples e ajustes proporcionais ao que o seu computador realmente precisa.</p>
          <div className={styles.actions}>
            <a className={styles.primary} href="#pedido">Solicitar uma avaliação <span aria-hidden="true">→</span></a>
            <a className={styles.secondary} href={siteConfig.github} target="_blank" rel="noopener noreferrer" onClick={() => trackExternalLink('github')}>Ver trabalho no GitHub <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className={styles.proof} aria-label="Informações profissionais">
          <div className={styles.proofHeader}><span>Ronael Moura</span><strong>Suporte de TI e tecnologia</strong><small>Tianguá, Ceará · atendimento remoto para todo o Brasil</small></div>
          <dl className={styles.factGrid}>
            {facts.map(([value, label]) => <div key={label}><dt>{value}</dt><dd>{label}</dd></div>)}
          </dl>
          <div className={styles.stack}><span>Windows</span><span>Desempenho</span><span>Segurança</span><span>Suporte remoto</span></div>
        </div>
      </div>
    </section>
  )
}

export default About
