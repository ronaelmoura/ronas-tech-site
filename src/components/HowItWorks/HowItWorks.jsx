import styles from './HowItWorks.module.css'

const steps = [
  { number: '01', tag: 'DIAGNÓSTICO', title: 'Você explica o cenário', description: 'Você pode falar de um site, uma tarefa repetitiva, uma planilha ou qualquer parte da operação que esteja dificultando o trabalho.' },
  { number: '02', tag: 'ENTENDIMENTO', title: 'Entendemos o que precisa mudar', description: 'Mapeamos como a rotina funciona hoje, o que está gerando atrito e qual resultado precisa ser alcançado.' },
  { number: '03', tag: 'DIREÇÃO', title: 'Definimos o caminho', description: 'Apresentamos uma proposta clara, com escopo, prioridades e próximos passos, antes de qualquer desenvolvimento.' },
  { number: '04', tag: 'ENTREGA', title: 'Construímos e colocamos para funcionar', description: 'Desenvolvemos, testamos e colocamos a solução para funcionar. Quando fizer sentido, ela pode evoluir junto com o negócio.' },
]

function HowItWorks() {
  return (
    <section id="como-funciona" className={styles.section} aria-labelledby="how-title">
      <div className={styles.container}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>Como funciona</p>
          <h2 id="how-title">O que acontece depois que você entra em contato?</h2>
          <p className={styles.subtitle}>Você não precisa preparar uma especificação. A primeira conversa serve para entender o cenário e mostrar com clareza qual pode ser o próximo passo.</p>
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
          <div><strong>Sem proposta no escuro.</strong><span>Você primeiro entende o caminho. Só depois decide se faz sentido avançar.</span></div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
