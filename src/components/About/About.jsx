import { siteConfig } from '../../config/siteConfig'
import { trackExternalLink } from '../../utils/analytics'
import styles from './About.module.css'

const facts = [
  ['6', 'frentes de solução'],
  ['Full Stack', 'desenvolvimento sob medida'],
  ['IA + automação', 'quando existe uma aplicação prática'],
  ['Remoto', 'com atendimento a partir de Tianguá, CE'],
]

const principles = [
  ['01', 'Entender antes de construir'],
  ['02', 'Explicar sem complicar'],
  ['03', 'Entregar algo que possa ser usado'],
]

function About() {
  return (
    <section id="sobre" className={`${styles.section} reveal`} aria-labelledby="about-title">
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Sobre a Ronas Tech</p>
          <h2 id="about-title">Não vendemos tecnologia por tecnologia.</h2>
          <p className={styles.lead}>
            A Ronas Tech cria ferramentas digitais para resolver situações concretas do dia a dia de uma empresa.
          </p>
          <p>
            Um site para gerar contatos. Um sistema para organizar a operação. Uma automação para eliminar tarefas repetitivas. Uma integração para juntar informações que hoje estão separadas.
          </p>
          <p className={styles.secondaryText}>
            O ponto de partida é sempre o mesmo: entender como o trabalho acontece hoje e encontrar onde a tecnologia realmente pode ajudar.
          </p>

          <div className={styles.actions}>
            <a className={styles.primary} href="#contato">Falar com a Ronas Tech</a>
            <a className={styles.secondary} href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" onClick={() => trackExternalLink('linkedin')}>Conhecer no LinkedIn</a>
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelGlow} aria-hidden="true" />
          <div className={styles.panelHeader}>
            <div>
              <span>RONAS TECH</span>
              <strong>Nosso jeito de trabalhar</strong>
            </div>
            <span className={styles.liveBadge}><i /> ATIVO</span>
          </div>

          <div className={styles.principles}>
            {principles.map(([number, text]) => (
              <div className={styles.principle} key={number}>
                <span>{number}</span>
                <strong>{text}</strong>
                <i aria-hidden="true">↗</i>
              </div>
            ))}
          </div>

          <dl className={styles.factGrid}>
            {facts.map(([value, label]) => (
              <div key={label}>
                <dt>{value}</dt>
                <dd>{label}</dd>
              </div>
            ))}
          </dl>

          <div className={styles.stack} aria-label="Tecnologias utilizadas">
            <span>React</span>
            <span>Node.js</span>
            <span>TypeScript</span>
            <span>MySQL</span>
            <span>APIs</span>
            <span>IA</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
