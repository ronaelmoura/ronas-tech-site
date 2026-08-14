import styles from './Problems.module.css'

const problems = [
  ['Cliente pergunta preço e a conversa se perde.', 'O atendimento começa, mas falta um jeito simples de continuar e acompanhar.'],
  ['Pedido ou orçamento fica sem resposta.', 'Informações espalhadas fazem oportunidades dependerem da memória.'],
  ['Seu negócio é bom, mas ninguém entende rapidamente o que você faz.', 'Quando a oferta não está clara, o cliente demora mais para decidir pedir.'],
]

function Problems() {
  return <section className={styles.section} aria-labelledby="problems-title"><div className={styles.container}><header><p className={styles.eyebrow}>O que costuma travar</p><h2 id="problems-title">Se isso acontece, o problema não é falta de esforço.</h2></header><div className={styles.grid}>{problems.map(([title, description], index) => <article className={styles.card} key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div><p className={styles.note}>Não é sobre colocar mais um aplicativo na rotina. É sobre criar um caminho simples para o cliente chegar, entender e pedir.</p><a className={styles.cta} href="#caminhos">Descobrir por onde começar <span aria-hidden="true">→</span></a></div></section>
}
export default Problems
