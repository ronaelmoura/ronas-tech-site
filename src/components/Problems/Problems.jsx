import styles from './Problems.module.css'

const problems = [
  { image: '/images/problemas/inicio-lento.png', title: 'Demora para ligar', text: 'O Windows inicia devagar e você espera para conseguir trabalhar.', tag: 'Inicialização' },
  { image: '/images/problemas/computador-travando.png', title: 'Trava ou fica lento', text: 'Programas simples consomem recursos demais ou param de responder.', tag: 'Desempenho' },
  { image: '/images/problemas/anuncios-virus.png', title: 'Anúncios e avisos', text: 'Pop-ups, extensões ou programas estranhos aparecem sem você pedir.', tag: 'Segurança' },
  { image: '/images/problemas/programa-nao-abre.png', title: 'Programa não abre', text: 'Erros de instalação, atualização ou configuração interrompem sua rotina.', tag: 'Programas' },
  { image: '/images/problemas/pouco-espaco.png', title: 'Pouco espaço', text: 'O disco vive cheio e você não sabe o que pode remover com segurança.', tag: 'Armazenamento' },
  { image: '/images/problemas/erro-windows.png', title: 'Erro no Windows', text: 'Atualizações falham, recursos param de funcionar ou mensagens aparecem repetidamente.', tag: 'Sistema' },
]

function Problems() {
  return <section id="problemas" className={`${styles.section} reveal`} aria-labelledby="problems-title"><div className={styles.container}><header><p className={styles.eyebrow}>Comece pelo sintoma</p><h2 id="problems-title">Qual destes erros está atrapalhando você?</h2><p>Você não precisa saber o nome técnico do problema. Basta contar o que está acontecendo.</p></header><div className={styles.grid}>{problems.map(({ image, title, text, tag }, index) => <article className={styles.card} key={title}><div className={styles.illustration} aria-hidden="true"><img src={image} alt="" loading="lazy" width="900" height="506" /><span className={styles.screenGlow} style={{ '--delay': `${index * -.7}s` }} /><span className={styles.scan} style={{ '--delay': `${index * -.55}s` }} /></div><small>{tag}</small><h3>{title}</h3><p>{text}</p><a href="#loja">Ver serviço indicado</a></article>)}</div><div className={styles.note}><strong>Nem todo defeito é remoto.</strong><span>Se houver indício de problema físico — tela quebrada, bateria, superaquecimento ou computador que não liga — você será orientado antes de contratar.</span></div></div></section>
}
export default Problems
