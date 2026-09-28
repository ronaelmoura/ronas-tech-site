import styles from './Problems.module.css'

const problems = [
  { number:'01', type:'PRESENÇA', title:'O site existe, mas não gera contatos', answer:'Melhoramos a apresentação da empresa e o caminho até o contato.', icon:'↗' },
  { number:'02', type:'TEMPO', title:'A equipe perde tempo fazendo a mesma coisa', answer:'Automatizamos etapas repetitivas para reduzir trabalho manual.', icon:'⌁' },
  { number:'03', type:'OPERAÇÃO', title:'A rotina depende de planilhas e controles manuais', answer:'Organizamos o processo em um sistema feito para a realidade da empresa.', icon:'▦' },
  { number:'04', type:'INTEGRAÇÃO', title:'Cada informação está em um lugar diferente', answer:'Conectamos dados e reunimos o que importa em um só lugar.', icon:'⇄' },
  { number:'05', type:'IA', title:'Quero usar IA, mas não sei onde ela realmente ajuda', answer:'Identificamos tarefas práticas em que a IA pode simplificar o trabalho.', icon:'✦' },
]

function Problems() {
  return (
    <section id="problemas" className={styles.section} aria-labelledby="problems-title">
      <div className={styles.container}>
        <header className={styles.heading}>
          <div>
            <p className={styles.eyebrow}>Comece pelo problema</p>
            <h2 id="problems-title">O que está travando sua empresa?</h2>
          </div>
          <div className={styles.intro}>
            <strong>Você não precisa saber qual tecnologia usar.</strong>
            <span>Conte o que acontece hoje. A gente ajuda a transformar o problema em um caminho possível.</span>
          </div>
        </header>

        <div className={styles.problemGrid}>
          {problems.map((problem) => (
            <article className={styles.card} key={problem.number}>
              <div className={styles.cardTop}>
                <span className={styles.number}>{problem.number}</span>
                <span className={styles.type}>{problem.type}</span>
              </div>
              <div className={styles.icon}>{problem.icon}</div>
              <h3>{problem.title}</h3>
              <div className={styles.answer}>
                <small>COMO PODEMOS AJUDAR</small>
                <p>{problem.answer}</p>
              </div>
              <a href="#contato" aria-label={'Conversar sobre: ' + problem.title}>Falar sobre isso <span>→</span></a>
            </article>
          ))}
        </div>

        <div className={styles.bridge}>
          <span className={styles.bridgeLine} />
          <div><strong>Problema → caminho → solução</strong><span>A tecnologia entra depois que entendemos o que realmente precisa ser resolvido.</span></div>
        </div>
      </div>
    </section>
  )
}

export default Problems
