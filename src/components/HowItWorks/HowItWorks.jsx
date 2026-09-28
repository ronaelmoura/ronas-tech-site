import styles from './HowItWorks.module.css'

const steps = [
  { number: '01', title: 'Você conta o que está acontecendo', description: 'Pode ser um site que não gera contatos, uma tarefa repetitiva ou uma rotina que virou uma bagunça de planilhas.' },
  { number: '02', title: 'A gente entende a rotina', description: 'Conversamos sobre o problema, o jeito que sua empresa trabalha e o que precisa mudar.' },
  { number: '03', title: 'Definimos o que faz sentido', description: 'Só então escolhemos o caminho: site, automação, sistema, dashboard ou alguma combinação dessas soluções.' },
  { number: '04', title: 'Colocamos para funcionar', description: 'Desenvolvemos, testamos e entregamos a solução com espaço para evoluir quando o negócio precisar.' },
]

function HowItWorks() {
  return (
    <section id="como-funciona" className={styles.section} aria-labelledby="how-title">
      <div className={styles.container}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>Como funciona</p>
          <h2 id="how-title">Do primeiro contato até a solução funcionando.</h2>
          <p className={styles.subtitle}>Você não precisa chegar sabendo qual tecnologia precisa. Começamos pelo problema.</p>
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
          <strong>Uma conversa antes de qualquer orçamento.</strong>
          <span>O objetivo é entender o que realmente precisa ser feito antes de falar em tecnologia.</span>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
