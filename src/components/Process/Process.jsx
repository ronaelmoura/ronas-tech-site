import styles from './Process.module.css'

const processSteps = [
  ['Você conta o que precisa resolver.', 'Explique o problema do computador ou a ideia de solução digital pelo WhatsApp.'],
  ['Recebe um diagnóstico e um caminho.', 'Avalio a necessidade, explico o que pode ser feito e defino um escopo claro.'],
  ['O trabalho é realizado com acompanhamento.', 'No suporte, você acompanha o acesso remoto. No desenvolvimento, acompanha as etapas e validações.'],
  ['Você recebe a entrega e as orientações.', 'O serviço termina com um resumo do que foi feito e os próximos passos recomendados.'],
]

function Process() {
  return (
    <section id="processo" className={`${styles.section} reveal`} aria-labelledby="process-title">
      <div className={styles.container}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>Como funciona</p>
          <h2 id="process-title">Um processo claro do primeiro contato à entrega.</h2>
          <p className={styles.subtitle}>Seja para suporte ou desenvolvimento, você entende o que será feito antes do trabalho começar.</p>
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
