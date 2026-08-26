import { useState } from 'react'
import { siteConfig } from '../../config/siteConfig'
import { trackConversion, trackWhatsAppClick, withCampaign } from '../../utils/analytics'
import styles from './OrderBuilder.module.css'

const stages = [
  { key: 'situation', title: 'Qual mais parece com seu problema?', options: ['Está muito lento.', 'Demora para ligar.', 'Trava ao usar programas.', 'Aparecem avisos ou programas estranhos.', 'Ainda não sei.'] },
  { key: 'business', title: 'Qual equipamento você usa?', options: ['Notebook com Windows.', 'PC de mesa com Windows.', 'Não sei informar.', 'Outro.'] },
]

function OrderBuilder() {
  const [stage, setStage] = useState(0)
  const [data, setData] = useState({ situation: '', business: '', name: '', company: '' })
  const [sent, setSent] = useState(false)
  function choose(value) { setData((current) => ({ ...current, [stages[stage].key]: value })); setStage((current) => current + 1) }
  function submit(event) { event.preventDefault(); if (!data.name.trim()) return; const message = withCampaign(`Olá, Ronael. Quero solicitar uma avaliação para otimização remota.\n\nProblema: ${data.situation}\nEquipamento: ${data.business}\nNome: ${data.name.trim()}${data.company.trim() ? `\nMelhor horário: ${data.company.trim()}` : ''}`); window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer'); trackConversion('order_builder_complete', { situation: data.situation, business: data.business }); trackWhatsAppClick('order_builder'); setSent(true) }
  return <section id="pedido" className={`${styles.section} reveal`} aria-labelledby="order-title"><div className={styles.container}><div className={styles.heading}><p className={styles.eyebrow}>Peça uma avaliação</p><h2 id="order-title">Conte como seu computador está se comportando.</h2><p>Responda três passos rápidos e continue o atendimento pelo WhatsApp.</p></div><div className={styles.card} aria-live="polite">{sent ? <><span className={styles.success}>Mensagem preparada</span><h3>Seu resumo está pronto no WhatsApp.</h3><p>Se quiser, você pode montar outra mensagem.</p><button className={styles.cta} type="button" onClick={() => { setSent(false); setStage(0); setData({ situation: '', business: '', name: '', company: '' }) }}>Começar novamente</button></> : stage < stages.length ? <><span className={styles.progress}>Etapa {stage + 1} de 3</span><h3>{stages[stage].title}</h3><div className={styles.choices}>{stages[stage].options.map((option) => <button type="button" key={option} onClick={() => choose(option)}>{option}<span aria-hidden="true">→</span></button>)}</div></> : <form onSubmit={submit}><span className={styles.progress}>Etapa 3 de 3</span><h3>Como podemos chamar você?</h3><label>Nome<input required value={data.name} onChange={(event) => setData({ ...data, name: event.target.value })} /></label><label>Melhor horário <small>(opcional)</small><input placeholder="Ex.: depois das 18h" value={data.company} onChange={(event) => setData({ ...data, company: event.target.value })} /></label><button className={styles.cta} type="submit">Pedir avaliação pelo WhatsApp <span aria-hidden="true">↗</span></button><small>Não armazenamos dados; usamos as respostas apenas para montar a mensagem.</small></form>}</div></div></section>
}
export default OrderBuilder
