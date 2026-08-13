import { useMemo, useState } from 'react'
import { siteConfig } from '../../config/siteConfig'
import { trackConversion, trackWhatsAppClick, withCampaign } from '../../utils/analytics'
import { products } from '../../data/products'
import styles from './Priority.module.css'

const problems = [
  ['presenca', 'Não apareço bem na internet', 'presença digital'],
  ['atendimento', 'Demoro a responder clientes', 'organização do atendimento'],
  ['pedidos', 'Perco pedidos ou orçamentos', 'painel de controle'],
  ['papel', 'Controlo tudo no papel ou em mensagens', 'painel de controle'],
  ['catalogo', 'Preciso mostrar produtos/serviços melhor', 'catálogo/cardápio'],
]
const recommendations = {
  'presença digital': { title: 'Presença digital', product: 'Kit “Negócio Encontrável”', id: 'negocio-encontravel' },
  'organização do atendimento': { title: 'Organização do atendimento', product: 'Kit WhatsApp Organizado', id: 'kit-whatsapp-organizado' },
  'painel de controle': { title: 'Painel de controle', product: 'Painel de Clientes e Orçamentos', id: 'painel-clientes-orcamentos' },
  'catálogo/cardápio': { title: 'Catálogo ou cardápio', product: 'Cardápio ou Catálogo Digital', id: 'catalogo-digital' },
}

function Priority() {
  const [selected, setSelected] = useState([])
  const result = useMemo(() => {
    if (!selected.length) return null
    const counts = selected.reduce((map, id) => { const item = problems.find((problem) => problem[0] === id); map[item[2]] = (map[item[2]] || 0) + 1; return map }, {})
    const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]
    return recommendations[winner]
  }, [selected])
  const product = result ? products.find((item) => item.id === result.id) : null
  const url = product ? `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(withCampaign(`Olá, Ronael. Minha prioridade digital é ${result.title}. Quero conversar sobre ${result.product}.`))}` : '#'
  function toggle(id) { setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]) }
  function showResult() { if (result) trackConversion('priority_result', { result: result.id, problems: selected.join(',') }) }
  return <section id="prioridade" className={styles.section} aria-labelledby="priority-title"><div className={styles.container}><div className={styles.intro}><p className={styles.eyebrow}>Ferramenta rápida</p><h2 id="priority-title">Qual é a sua prioridade digital hoje?</h2><p>Marque os pontos que mais pesam na rotina. O resultado é uma recomendação inicial, sem promessa pronta e sem cadastro.</p></div><div className={styles.widget}><div className={styles.options}>{problems.map(([id, label]) => <label className={`${styles.option} ${selected.includes(id) ? styles.checked : ''}`} key={id}><input type="checkbox" checked={selected.includes(id)} onChange={() => toggle(id)} /><span>{label}</span></label>)}</div><div className={styles.result} aria-live="polite">{result ? <><span className={styles.resultLabel}>Sua prioridade sugerida</span><h3>{result.title}</h3><p>Um bom primeiro passo pode ser o <strong>{result.product}</strong>. Veja o escopo e converse para adaptar à sua realidade.</p><a href={url} target="_blank" rel="noopener noreferrer" className={styles.cta} onClick={() => { showResult(); trackWhatsAppClick('priority_result') }}>Falar sobre minha prioridade <span aria-hidden="true">↗</span></a></> : <><span className={styles.resultLabel}>Leitura inicial</span><h3>Escolha pelo menos uma situação</h3><p>Você recebe um caminho objetivo e pode enviar o resumo pelo WhatsApp.</p></>}</div></div></div></section>
}
export default Priority
