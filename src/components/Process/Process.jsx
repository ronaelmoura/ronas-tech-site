import styles from './Process.module.css'

const processSteps = [
  ['Você conta como seu negócio funciona.', 'A conversa começa pela rotina real, sem exigir que você saiba o nome da tecnologia.'],
  ['Definimos o primeiro problema que vale resolver.', 'Organizamos um escopo proporcional ao que faz sentido agora.'],
  ['Você recebe uma solução organizada e orientação para usar.', 'A entrega vem acompanhada de explicação clara e próximos passos.'],
  ['Se fizer sentido, evoluímos depois.', 'Projeto pequeno quando pequeno é suficiente. Solução maior apenas quando o negócio pede.'],
]

function Process() {
  return (
    <section id="processo" className={styles.section} aria-labelledby="process-title">
      <div className={styles.container}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>Como trabalhamos</p>
          <h2 id="process-title">O que você recebe, na prática</h2>
          <p className={styles.subtitle}>Um caminho direto para organizar o primeiro ponto sem transformar tudo de uma vez.</p>
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
