import styles from './Problems.module.css'

const problems = [
  { icon: '⏳', title: 'Demora para ligar', text: 'O Windows inicia devagar e você espera para conseguir trabalhar.', tag: 'Inicialização' },
  { icon: '↻', title: 'Trava ou fica lento', text: 'Programas simples consomem recursos demais ou param de responder.', tag: 'Desempenho' },
  { icon: '!', title: 'Anúncios e avisos', text: 'Pop-ups, extensões ou programas estranhos aparecem sem você pedir.', tag: 'Segurança' },
  { icon: '×', title: 'Programa não abre', text: 'Erros de instalação, atualização ou configuração interrompem sua rotina.', tag: 'Programas' },
  { icon: '▰', title: 'Pouco espaço', text: 'O disco vive cheio e você não sabe o que pode remover com segurança.', tag: 'Armazenamento' },
  { icon: 'W', title: 'Erro no Windows', text: 'Atualizações falham, recursos param de funcionar ou mensagens aparecem repetidamente.', tag: 'Sistema' },
]

function Problems() {
  return <section id="problemas" className={`${styles.section} reveal`} aria-labelledby="problems-title"><div className={styles.container}><header><p className={styles.eyebrow}>Comece pelo sintoma</p><h2 id="problems-title">Qual destes erros está atrapalhando você?</h2><p>Você não precisa saber o nome técnico do problema. Basta contar o que está acontecendo.</p></header><div className={styles.grid}>{problems.map(({ icon, title, text, tag }) => <article className={styles.card} key={title}><div className={styles.illustration} aria-hidden="true"><span>{icon}</span><i /><i /><i /></div><small>{tag}</small><h3>{title}</h3><p>{text}</p><a href="#loja">Ver serviço indicado <span aria-hidden="true">→</span></a></article>)}</div><div className={styles.note}><strong>Nem todo defeito é remoto.</strong><span>Se houver indício de problema físico — tela quebrada, bateria, superaquecimento ou computador que não liga — você será orientado antes de contratar.</span></div></div></section>
}
export default Problems
