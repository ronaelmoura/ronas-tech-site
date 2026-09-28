import styles from './HowItWorks.module.css'

const steps = [
  { number: '01', title: 'Você conta o que está acontecendo', description: 'Pode ser um site que não gera contatos, uma tarefa repetitiva ou uma rotina que virou uma bagunça de planilhas.' },
  { number: '02', title: 'Entendemos o problema', description: 'Entendemos como o problema acontece hoje, quem é afetado e o que precisa melhorar.' },
  { number: '03', title: 'Apresentamos o caminho', description: 'Explicamos a solução, o que será entregue e os próximos passos antes de começar.' },
  { number: '04', title: 'Desenvolvemos e entregamos', description: 'Construímos, testamos e colocamos a solução para funcionar. Depois, ela pode evoluir conforme a necessidade.' },
]

function HowItWorks() {
  return (
    <section id="como-funciona" className={styles.section} aria-labelledby="how-title">
      <div className={styles.container}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>Como funciona</p>
          <h2 id="how-title">Sem surpresa no caminho.</h2>
          <p className={styles.subtitle}>Você explica o que está acontecendo. Antes de qualquer proposta, deixamos claro o que será feito, como será feito e qual é o próximo passo.</p>
        </header>
        <div className={styles.grid}>
          {steps.map((step) => (
            <article className={styles.card} key={step.number}>
              <span className={styles.number}>{step.number}</span>
              <div><h3>{step.title}</h3><p>{step.description}</p></div>
            </article>
          ))}
        </div>
        <div className={styles.note}>
          <strong>Primeiro entendemos. Depois propomos.</strong>
          <span>Se a solução não fizer sentido para o problema, a gente não força uma tecnologia só porque ela parece interessante.</span>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
