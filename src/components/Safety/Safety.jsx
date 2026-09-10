import styles from './Safety.module.css'

const safeguards = [
  ['Você autoriza', 'O acesso só começa depois da sua confirmação. Nenhuma conexão é feita escondida.'],
  ['Você acompanha', 'A tela permanece visível durante o serviço e você pode encerrar a sessão quando quiser.'],
  ['Você aprova', 'O problema, o que será feito e o valor são explicados antes de qualquer serviço.'],
  ['Você mantém suas senhas', 'Não peço suas senhas pessoais. Quando necessário, você mesmo digita os dados.'],
]

function Safety() {
  return <section className={`${styles.section} reveal`} aria-labelledby="safety-title"><div className={styles.container}><header><p>Antes do acesso remoto</p><h2 id="safety-title">Seu computador continua sob seu controle.</h2><span>O atendimento é acompanhado do início ao fim, com autorização clara em cada etapa.</span></header><div className={styles.grid}>{safeguards.map(([title, description], index) => <article key={title}><b aria-hidden="true">0{index + 1}</b><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>
}

export default Safety
