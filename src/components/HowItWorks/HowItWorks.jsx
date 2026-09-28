import styles from './HowItWorks.module.css'

const steps = [
  { number: '01', tag: 'DIAGNÓSTICO', title: 'Você conta o que está acontecendo', description: 'Pode ser um site que não gera contatos, uma tarefa repetitiva ou uma rotina que virou uma bagunça de planilhas.' },
  { number: '02', tag: 'ENTENDIMENTO', title: 'Entendemos o problema', description: 'Entendemos como o problema acontece hoje, quem é afetado e o que precisa melhorar.' },
  { number: '03', tag: 'DIREÇÃO', title: 'Apresentamos o caminho', description: 'Explicamos a solução, o que será entregue e os próximos passos antes de começar.' },
  { number: '04', tag: 'ENTREGA', title: 'Desenvolvemos e entregamos', description: 'Construímos, testamos e colocamos a solução para funcionar. Depois, ela pode evoluir conforme a necessidade.' },
]

function HowItWorks() {
  return (
    <section id="como-funciona" className={styles.section} aria-labelledby="how-title">
      <div className={styles.container}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>Como funciona</p>
          <h2 id="how-title">Da ideia à solução, sem complicar.</h2>
          <p className={styles.subtitle}>Você explica o que está acontecendo. Antes de qualquer proposta, deixamos claro o que será feito, como será feito e qual é o próximo passo.</p>
        </header>

        <div className={styles.process} aria-label="Etapas do projeto">
          {steps.map((step, index) => (
            <article className={styles.step} key={step.number}>
              <div className={styles.connector} aria-hidden="true" />
              <div className={styles.stepTop}>
                <span className={styles.number}>{step.number}</span>
                <span className={styles.tag}>{step.tag}</span>
              </div>
              <div className={styles.icon}>{index === 0 ? '◌' : index === 1 ? '⌁' : index === 2 ? '→' : '✓'}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              {index < steps.length - 1 && <span className={styles.arrow} aria-hidden="true">→</span>}
            </article>
          ))}
        </div>

        <div className={styles.note}>
          <div className={styles.noteIcon}>01</div>
          <div><strong>Primeiro entendemos. Depois propomos.</strong><span>Se a solução não fizer sentido para o problema, a gente não força uma tecnologia só porque ela parece interessante.</span></div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
