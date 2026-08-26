import styles from './Problems.module.css'

const problems = [
  { image: '/images/problemas/inicio-lento.webp', title: 'Demora para ligar', text: 'O Windows inicia devagar e você espera para conseguir trabalhar.', tag: 'Inicialização', serviceId: 'otimizacao', recommendation: 'A otimização revisa os programas que iniciam com o Windows e os processos que atrasam a inicialização.' },
  { image: '/images/problemas/computador-travando.webp', title: 'Trava ou fica lento', text: 'Programas simples consomem recursos demais ou param de responder.', tag: 'Desempenho', serviceId: 'otimizacao', recommendation: 'A otimização verifica armazenamento, processos e configurações que podem estar consumindo recursos demais.' },
  { image: '/images/problemas/anuncios-virus.webp', title: 'Anúncios e avisos', text: 'Pop-ups, extensões ou programas estranhos aparecem sem você pedir.', tag: 'Segurança', serviceId: 'seguranca', recommendation: 'A limpeza de programas indesejados revisa extensões, aplicativos suspeitos e configurações básicas de segurança.' },
  { image: '/images/problemas/programa-nao-abre.webp', title: 'Programa não abre', text: 'Erros de instalação, atualização ou configuração interrompem sua rotina.', tag: 'Programas', serviceId: 'programas', recommendation: 'O suporte a programas verifica instalação, compatibilidade, atualizações e drivers relacionados ao erro.' },
  { image: '/images/problemas/pouco-espaco.webp', title: 'Pouco espaço', text: 'O disco vive cheio e você não sabe o que pode remover com segurança.', tag: 'Armazenamento', serviceId: 'otimizacao', recommendation: 'A otimização identifica arquivos temporários e programas desnecessários antes de qualquer remoção.' },
  { image: '/images/problemas/erro-windows.webp', title: 'Erro no Windows', text: 'Atualizações falham, recursos param de funcionar ou mensagens aparecem repetidamente.', tag: 'Sistema', serviceId: 'windows', recommendation: 'A correção do Windows analisa a mensagem apresentada, repara componentes e testa o sistema depois do ajuste.' },
]

function recommendService(event, problem) {
  event.preventDefault()
  window.dispatchEvent(new CustomEvent('select-support-service', { detail: { id: problem.serviceId, explanation: problem.recommendation } }))
  document.querySelector('#loja')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function Problems() {
  return <section id="problemas" className={`${styles.section} reveal`} aria-labelledby="problems-title"><div className={styles.container}><header><p className={styles.eyebrow}>Comece pelo sintoma</p><h2 id="problems-title">Qual destes erros está atrapalhando você?</h2><p>Você não precisa saber o nome técnico do problema. Basta contar o que está acontecendo.</p></header><div className={styles.grid}>{problems.map((problem, index) => <article className={styles.card} key={problem.title}><div className={styles.illustration} aria-hidden="true"><img src={problem.image} alt="" loading="lazy" width="900" height="506" /><span className={styles.screenGlow} style={{ '--delay': `${index * -.7}s` }} /><span className={styles.scan} style={{ '--delay': `${index * -.55}s` }} /></div><small>{problem.tag}</small><h3>{problem.title}</h3><p>{problem.text}</p><a href="#loja" onClick={(event) => recommendService(event, problem)}>Ver recomendação explicada</a></article>)}</div><div className={styles.note}><strong>Nem todo defeito é remoto.</strong><span>Se houver indício de problema físico — tela quebrada, bateria, superaquecimento ou computador que não liga — você será orientado antes de contratar.</span></div></div></section>
}
export default Problems
