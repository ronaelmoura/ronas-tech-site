import { siteConfig } from '../../config/siteConfig'
import { trackExternalLink } from '../../utils/analytics'
import styles from './About.module.css'

const facts = [
  ['06', 'frentes de solução'],
  ['Full Stack', 'desenvolvimento sob medida'],
  ['IA + automação', 'aplicação prática'],
  ['Remoto', 'atendimento a partir de Tianguá, CE'],
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
          <h2 id="about-title">Tecnologia só faz sentido quando melhora a forma como o trabalho acontece.</h2>
          <p className={styles.lead}>A Ronas Tech cria soluções digitais sob medida para transformar problemas do dia a dia em ferramentas que possam ser usadas de verdade.</p>

          <div className={styles.story}>
            <div><span>01</span><p>Entendemos a realidade atual: como a empresa atende, vende, organiza informações e executa tarefas.</p></div>
            <div><span>02</span><p>Encontramos onde uma solução digital pode simplificar, conectar ou automatizar essa rotina.</p></div>
            <div><span>03</span><p>Construímos e entregamos a ferramenta com uma linguagem clara, sem esconder o processo atrás de termos técnicos.</p></div>
          </div>

          <p className={styles.secondaryText}>É por isso que um projeto pode ser um site, um sistema, uma automação, uma integração ou IA. O formato muda. O objetivo continua sendo o mesmo: resolver algo concreto.</p>

          <div className={styles.actions}>
            <a className={styles.primary} href="#contato">Falar com a Ronas Tech →</a>
            <a className={styles.secondary} href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" onClick={() => trackExternalLink('linkedin')}>Conhecer no LinkedIn</a>
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelGlow} aria-hidden="true" />
          <div className={styles.panelHeader}>
            <div><span>RONAS TECH</span><strong>Como pensamos um projeto</strong></div>
            <span className={styles.liveBadge}><i /> PROCESSO</span>
          </div>

          <div className={styles.principles}>
            {principles.map(([number, text]) => (
              <div className={styles.principle} key={number}>
                <span>{number}</span><strong>{text}</strong><i aria-hidden="true">↗</i>
              </div>
            ))}
          </div>

          <div className={styles.signal}>
            <span className={styles.signalDot} />
            <div><small>PONTO DE PARTIDA</small><strong>O problema real da empresa</strong></div>
          </div>

          <dl className={styles.factGrid}>
            {facts.map(([value, label]) => <div key={label}><dt>{value}</dt><dd>{label}</dd></div>)}
          </dl>

          <div className={styles.stack} aria-label="Tecnologias utilizadas">
            <span>React</span><span>Node.js</span><span>TypeScript</span><span>MySQL</span><span>APIs</span><span>IA</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
