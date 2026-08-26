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
          <h2 id="about-title">Suporte técnico com visão completa de tecnologia.</h2>
          <p className={styles.lead}>A Ronas Tech é conduzida por Ronael Moura, desenvolvedor Full Stack com formação pelo SENAI e experiência em suporte de TI.</p>
          <p>Essa combinação ajuda a diagnosticar problemas com cuidado, explicar soluções em linguagem simples e manter o atendimento proporcional ao que você realmente precisa.</p>
          <div className={styles.actions}>
            <a className={styles.primary} href="#loja">Escolher um serviço</a>
            <a className={styles.secondary} href={siteConfig.github} target="_blank" rel="noopener noreferrer" onClick={() => trackExternalLink('github')}>Ver trabalho no GitHub</a>
          </div>
        </div>
        <div className={styles.proof} aria-label="Informações profissionais">
          <div className={styles.proofHeader}><span>Ronael Moura</span><strong>Suporte de TI e desenvolvedor Full Stack</strong><small>Tianguá, Ceará · atendimento remoto para todo o Brasil</small></div>
          <dl className={styles.factGrid}>
            {facts.map(([value, label]) => <div key={label}><dt>{value}</dt><dd>{label}</dd></div>)}
          </dl>
          <div className={styles.stack}><span>Windows</span><span>Desempenho</span><span>Segurança</span><span>Backup</span><span>Suporte remoto</span></div>
        </div>
      </div>
    </section>
  )
}

export default About
