import { useEffect, useRef, useState } from 'react'
import styles from './Problems.module.css'
import compact from './ProblemsCompact.module.css'

// Cada card ganha uma animação que conta o próprio sintoma: o carregamento
// que não termina, o travamento, o alerta que aparece sozinho. Ela roda
// algumas vezes quando o card entra na tela e volta a rodar no hover — não
// fica em looping permanente consumindo bateria.
const overlays = {
  loader: <span className={styles.loader} aria-hidden="true" />,
  freeze: <span className={styles.freeze} aria-hidden="true"><i /></span>,
  popup: <span className={styles.popup} aria-hidden="true"><i /><i /></span>,
  crash: <span className={styles.crash} aria-hidden="true"><i /></span>,
  disk: <span className={styles.disk} aria-hidden="true"><i /></span>,
  alert: <span className={styles.alert} aria-hidden="true">!</span>,
}

const problems = [
  { image: '/images/problemas/inicio-lento.webp', overlay: 'loader', title: 'Demora para ligar', text: 'O Windows inicia devagar e você espera para conseguir trabalhar.', tag: 'Inicialização', serviceId: 'otimizacao', recommendation: 'A otimização revisa os programas que iniciam com o Windows e os processos que atrasam a inicialização.' },
  { image: '/images/problemas/computador-travando.webp', overlay: 'freeze', title: 'Trava ou fica lento', text: 'Programas simples consomem recursos demais ou param de responder.', tag: 'Desempenho', serviceId: 'otimizacao', recommendation: 'A otimização verifica armazenamento, processos e configurações que podem estar consumindo recursos demais.' },
  { image: '/images/problemas/anuncios-virus.webp', overlay: 'popup', title: 'Anúncios e avisos', text: 'Pop-ups, extensões ou programas estranhos aparecem sem você pedir.', tag: 'Segurança', serviceId: 'seguranca', recommendation: 'A limpeza de programas indesejados revisa extensões, aplicativos suspeitos e configurações básicas de segurança.' },
  { image: '/images/problemas/programa-nao-abre.webp', overlay: 'crash', title: 'Programa não abre', text: 'Erros de instalação, atualização ou configuração interrompem sua rotina.', tag: 'Programas', serviceId: 'programas', recommendation: 'O suporte a programas verifica instalação, compatibilidade, atualizações e drivers relacionados ao erro.' },
  { image: '/images/problemas/pouco-espaco.webp', overlay: 'disk', title: 'Pouco espaço', text: 'O disco vive cheio e você não sabe o que pode remover com segurança.', tag: 'Armazenamento', serviceId: 'otimizacao', recommendation: 'A otimização identifica arquivos temporários e programas desnecessários antes de qualquer remoção.' },
  { image: '/images/problemas/erro-windows.webp', overlay: 'alert', title: 'Erro no Windows', text: 'Atualizações falham, recursos param de funcionar ou mensagens aparecem repetidamente.', tag: 'Sistema', serviceId: 'windows', recommendation: 'A correção do Windows analisa a mensagem apresentada, repara componentes e testa o sistema depois do ajuste.' },
]

function recommendService(event, problem) {
  event.preventDefault()
  window.dispatchEvent(new CustomEvent('select-support-service', { detail: { id: problem.serviceId, explanation: problem.recommendation } }))
  document.querySelector('#loja')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function Problems() {
  const [expanded, setExpanded] = useState(false)
  const gridRef = useRef(null)

  // IntersectionObserver nativo: marca o card quando ele aparece na tela
  // para a animação do sintoma rodar ali, e não desde o carregamento.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const cards = gridRef.current?.children
    if (!cards?.length) return undefined
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add(styles.playing)
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.35 })
    for (const card of cards) observer.observe(card)
    return () => observer.disconnect()
  }, [expanded])

  return <section id="problemas" className={`${styles.section} reveal`} aria-labelledby="problems-title"><div className={styles.container}><header><p className={styles.eyebrow}>Comece pelo sintoma</p><h2 id="problems-title">Qual destes erros está atrapalhando você?</h2><p>Você não precisa saber o nome técnico do problema. Basta contar o que está acontecendo.</p></header><div ref={gridRef} className={`${styles.grid} ${expanded ? compact.expanded : compact.collapsed}`}>{problems.map((problem, index) => <article className={styles.card} key={problem.title}><div className={styles.illustration} aria-hidden="true"><img src={problem.image} alt="" loading="lazy" width="900" height="506" /><span className={styles.screenGlow} style={{ '--delay': `${index * -.7}s` }} /><span className={styles.scan} style={{ '--delay': `${index * -.55}s` }} />{overlays[problem.overlay]}</div><small>{problem.tag}</small><h3>{problem.title}</h3><p>{problem.text}</p><a href="#loja" onClick={(event) => recommendService(event, problem)}>Ver recomendação explicada</a></article>)}</div><button className={compact.showMore} type="button" aria-expanded={expanded} onClick={() => setExpanded((current) => !current)}>{expanded ? 'Mostrar menos problemas' : 'Ver todos os problemas'}</button><div className={styles.note}><strong>Nem todo defeito é remoto.</strong><span>Se houver indício de problema físico — tela quebrada, bateria, superaquecimento ou computador que não liga — você será orientado antes de contratar.</span></div></div></section>
}

export default Problems
