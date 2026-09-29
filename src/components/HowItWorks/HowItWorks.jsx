import styles from './HowItWorks.module.css'

const steps = [
  { number: '01', tag: 'PROBLEMA', title: 'Você explica o cenário', description: 'Você conta o que está acontecendo hoje — sem precisar saber qual tecnologia resolveria isso.' },
  { number: '02', tag: 'DIAGNÓSTICO', title: 'Encontramos o gargalo', description: 'Entendemos a rotina, o atrito e o que realmente precisa mudar antes de pensar em código.' },
  { number: '03', tag: 'DIREÇÃO', title: 'Desenhamos o caminho', description: 'Definimos a solução, prioridades, escopo e próximos passos de forma clara.' },
  { number: '04', tag: 'CONSTRUÇÃO', title: 'Transformamos em produto', description: 'Design, desenvolvimento, integrações, automações e IA entram na medida certa.' },
  { number: '05', tag: 'EVOLUÇÃO', title: 'Colocamos para funcionar', description: 'Testamos, publicamos e deixamos a base pronta para evoluir conforme a necessidade.' },
]

function HowItWorks() {
  return (
    <section id="como-funciona" className={styles.section} aria-labelledby="how-title">
      <div className={styles.container}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>Processo</p>
          <h2 id="how-title">Antes do código, existe uma pergunta: o que realmente precisa mudar?</h2>
          <p className={styles.subtitle}>A primeira conversa não é uma prova técnica. É o momento de entender o cenário e descobrir se existe uma solução digital que faça sentido.</p>
        </header>
        <div className={styles.process} aria-label="Etapas do projeto">
          {steps.map((step, index) => (
            <article className={styles.step} key={step.number}>
              <div className={styles.stepTop}><span className={styles.number}>{step.number}</span><span className={styles.tag}>{step.tag}</span></div>
              <div className={styles.icon}>{['◌', '⌁', '→', '✦', '✓'][index]}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              {index < steps.length - 1 && <span className={styles.arrow} aria-hidden="true">→</span>}
            </article>
          ))}
        </div>
        <div className={styles.note}>
          <div className={styles.noteIcon}>RT</div>
          <div><strong>Sem proposta no escuro.</strong><span>Você primeiro entende o caminho. Só depois decide se faz sentido avançar.</span></div>
        </div>
      </div>
    </section>
  )
}
export default HowItWorks
