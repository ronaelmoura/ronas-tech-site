import styles from './Paths.module.css'

const paths = [
  { title: 'Otimização de desempenho', text: 'Revisão da inicialização, programas em segundo plano, espaço e configurações do Windows.', result: 'Um computador mais leve e responsivo para as tarefas do dia a dia.', links: [['Pedir avaliação', '#pedido']] },
  { title: 'Limpeza e organização', text: 'Remoção de arquivos temporários, programas desnecessários e ajustes que liberam recursos.', result: 'Mais espaço e menos processos consumindo o computador sem necessidade.', links: [['Pedir avaliação', '#pedido']] },
  { title: 'Segurança e atualizações', text: 'Verificação de softwares indesejados, atualizações do sistema e orientações de uso seguro.', result: 'Sistema revisado e recomendações simples para evitar novos problemas.', links: [['Pedir avaliação', '#pedido']] },
  { title: 'Preparação para trabalho ou estudo', text: 'Ajustes de navegador, programas essenciais, impressora e ferramentas de produtividade.', result: 'O computador pronto para sua rotina, com o que você realmente utiliza.', links: [['Pedir avaliação', '#pedido']] },
]

function Paths() { return <section id="servicos" className={`${styles.section} reveal`} aria-labelledby="paths-title"><div className={styles.container}><header><p className={styles.eyebrow}>Serviços feitos remotamente</p><h2 id="paths-title">O que pode ser otimizado no seu PC ou notebook.</h2></header><div className={styles.grid}>{paths.map((path) => <article className={styles.card} key={path.title}><h3>{path.title}</h3><p>{path.text}</p><strong>{path.result}</strong><div>{path.links.map(([label, href]) => <a href={href} key={href}>Quero este serviço <span>{label}</span><b aria-hidden="true">↗</b></a>)}</div></article>)}</div></div></section> }
export default Paths
