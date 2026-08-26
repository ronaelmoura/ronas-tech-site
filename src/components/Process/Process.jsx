import styles from './Process.module.css'

const processSteps = [
  ['Você conta o que está acontecendo.', 'Pelo WhatsApp, explicamos os sintomas e combinamos o melhor horário para o atendimento.'],
  ['Fazemos um diagnóstico inicial.', 'Verifico o sistema e explico o que pode ser otimizado antes de começar as alterações.'],
  ['Você acompanha o acesso remoto.', 'O serviço é feito com sua autorização e você vê na tela cada etapa do atendimento.'],
  ['Entrego o computador revisado.', 'Ao final, você recebe um resumo do que foi feito e orientações para manter o bom desempenho.'],
]

function Process() {
  return (
    <section id="processo" className={`${styles.section} reveal`} aria-labelledby="process-title">
      <div className={styles.container}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>Como funciona o atendimento remoto</p>
          <h2 id="process-title">Simples, acompanhado e sem sair de casa.</h2>
          <p className={styles.subtitle}>Você mantém o controle durante todo o acesso. Nenhuma alteração importante é feita sem explicação.</p>
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
