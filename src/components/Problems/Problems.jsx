import styles from './Problems.module.css'

const problems = [
  ['Demora para ligar e abrir programas.', 'Itens desnecessários na inicialização e configurações mal ajustadas podem consumir recursos desde o primeiro minuto.'],
  ['Trava durante o trabalho ou estudo.', 'Falta de espaço, processos em excesso e problemas no sistema tornam tarefas simples cansativas.'],
  ['Aparecem avisos, anúncios ou programas estranhos.', 'Uma revisão cuidadosa ajuda a identificar softwares indesejados e melhorar a segurança do uso diário.'],
]

function Problems() {
  return <section className={`${styles.section} reveal`} aria-labelledby="problems-title"><div className={styles.container}><header><p className={styles.eyebrow}>Seu computador dá estes sinais?</p><h2 id="problems-title">Lentidão não precisa virar parte da rotina.</h2></header><div className={styles.grid}>{problems.map(([title, description], index) => <article className={styles.card} key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div><p className={styles.note}>O atendimento começa com um diagnóstico. Se houver indício de defeito físico, você será orientado antes de contratar qualquer otimização.</p><a className={styles.cta} href="#servicos">Ver serviços de otimização <span aria-hidden="true">→</span></a></div></section>
}
export default Problems
