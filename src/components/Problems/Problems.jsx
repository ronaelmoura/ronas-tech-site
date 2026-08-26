import styles from './Problems.module.css'

const problems = [
  ['Seu computador atrasa sua rotina.', 'Lentidão, travamentos e programas desnecessários podem ser diagnosticados e corrigidos remotamente.'],
  ['Seu negócio ainda não tem uma boa presença digital.', 'Um site ou landing page profissional ajuda clientes a entender, confiar e entrar em contato.'],
  ['Tarefas manuais consomem tempo demais.', 'Sistemas, APIs e automações podem organizar processos e reduzir trabalhos repetitivos.'],
]

function Problems() {
  return <section className={`${styles.section} reveal`} aria-labelledby="problems-title"><div className={styles.container}><header><p className={styles.eyebrow}>Onde a tecnologia pode ajudar</p><h2 id="problems-title">Do computador lento ao sistema que seu negócio precisa.</h2></header><div className={styles.grid}>{problems.map(([title, description], index) => <article className={styles.card} key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div><p className={styles.note}>Você não precisa saber o nome da tecnologia. Conte o problema e receba uma orientação clara sobre o melhor caminho.</p><a className={styles.cta} href="#servicos">Conhecer as duas áreas</a></div></section>
}
export default Problems
