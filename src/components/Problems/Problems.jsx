import styles from './Problems.module.css'

const problems = [
  ['Demora para ligar ou abrir programas.', 'Programas na inicialização, pouco espaço e configurações mal ajustadas podem consumir os recursos do computador.'],
  ['Trava durante o trabalho ou estudo.', 'Processos em excesso e problemas do sistema podem tornar tarefas simples lentas e frustrantes.'],
  ['Aparecem anúncios ou programas estranhos.', 'Extensões e softwares indesejados podem afetar o desempenho, a navegação e a segurança.'],
]

function Problems() {
  return <section id="problemas" className={`${styles.section} reveal`} aria-labelledby="problems-title"><div className={styles.container}><header><p className={styles.eyebrow}>Problemas atendidos</p><h2 id="problems-title">Seu computador dá algum destes sinais?</h2></header><div className={styles.grid}>{problems.map(([title, description], index) => <article className={styles.card} key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div><p className={styles.note}>Se houver indício de defeito físico, você será orientado antes de contratar. Nem todo problema pode ser resolvido remotamente.</p><a className={styles.cta} href="#loja">Escolher um serviço</a></div></section>
}
export default Problems
