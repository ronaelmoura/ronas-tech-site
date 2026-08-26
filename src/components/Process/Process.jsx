import styles from './Process.module.css'

const processSteps = [
  ['Escolha os serviços na loja.', 'Adicione ao pedido o que mais se aproxima do problema do seu PC ou notebook.'],
  ['Envie o pedido pelo WhatsApp.', 'O site prepara um resumo e você complementa com os sintomas do computador.'],
  ['Receba a avaliação e o valor.', 'Confirmo o que pode ser feito remotamente, explico o serviço e informo o valor antes de começar.'],
  ['Acompanhe o atendimento.', 'Você vê o acesso remoto na tela e recebe um resumo com as orientações finais.'],
]

function Process() {
  return (
    <section id="processo" className={`${styles.section} reveal`} aria-labelledby="process-title">
      <div className={styles.container}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>Como comprar o serviço</p>
          <h2 id="process-title">Da escolha ao atendimento, sem complicação.</h2>
          <p className={styles.subtitle}>A contratação é concluída pelo WhatsApp somente depois que o problema e o valor estiverem claros.</p>
        </header>
        <ol className={styles.timeline}>
          {processSteps.map(([title, description], index) => (
            <li className={styles.step} key={title}>
              <div className={styles.marker} aria-hidden="true"><span>{String(index + 1).padStart(2, '0')}</span></div>
              <article className={styles.card}>
                <span className={styles.stepLabel}>Etapa {index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Process
