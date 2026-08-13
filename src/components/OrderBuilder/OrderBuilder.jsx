import { useMemo, useState } from 'react'
import { siteConfig } from '../../config/siteConfig'
import { trackConversion, trackWhatsAppClick, withCampaign } from '../../utils/analytics'
import styles from './OrderBuilder.module.css'

const steps = [
  { key: 'businessType', title: 'Qual é o seu tipo de negócio?', options: ['Comércio local', 'Prestação de serviços', 'Profissional autônomo', 'Outro negócio'] },
  { key: 'difficulty', title: 'O que mais dificulta sua rotina?', options: ['Ser encontrado na internet', 'Responder e acompanhar clientes', 'Organizar pedidos e orçamentos', 'Mostrar produtos ou serviços'] },
  { key: 'solution', title: 'Qual solução chamou sua atenção?', options: ['Site ou presença digital', 'Kit WhatsApp Organizado', 'Painel ou agenda digital', 'Ainda não sei'] },
]
function OrderBuilder() {
  const [step, setStep] = useState(0); const [data, setData] = useState({ businessType: '', difficulty: '', solution: '', name: '', contact: ''}); const [done, setDone] = useState(false)
  const current = steps[step]
  const summary = useMemo(() => Object.entries(data).filter(([, value]) => value).map(([key, value]) => `${key}: ${value}`).join('\n'), [data])
  function choose(value) { setData((old) => ({ ...old, [current.key]: value })); setStep((old) => old + 1) }
  function submit(event) { event.preventDefault(); if (!data.name.trim() || !data.contact.trim()) return; setDone(true); trackConversion('order_builder_complete', { solution: data.solution }); const message = withCampaign(`Olá, Ronael. Montei meu pedido na Ronas Tech:\n\n${summary}\nNome: ${data.name}\nMelhor contato: ${data.contact}`); window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer'); trackWhatsAppClick('order_builder') }
  return <section id="pedido" className={styles.section} aria-labelledby="order-title"><div className={styles.container}><div className={styles.heading}><p className={styles.eyebrow}>Atendimento guiado</p><h2 id="order-title">Monte seu pedido</h2><p>Responda em poucos passos. No final, você revisa o resumo e decide se quer abrir o WhatsApp. Nada é armazenado no site.</p></div><div className={styles.card} aria-live="polite">{done ? <><span className={styles.success}>Pedido preparado</span><h3>Seu resumo está pronto no WhatsApp.</h3><p>Se a janela não abriu, tente novamente pelo botão abaixo.</p><button className={styles.cta} type="button" onClick={(event) => { setDone(false); setStep(steps.length) }}>Montar outro pedido</button></> : step < steps.length ? <><span className={styles.progress}>Etapa {step + 1} de {steps.length}</span><h3>{current.title}</h3><div className={styles.choices}>{current.options.map((option) => <button type="button" key={option} onClick={() => choose(option)}>{option}<span aria-hidden="true">→</span></button>)}</div></> : <form onSubmit={submit}><span className={styles.progress}>Última etapa</span><h3>Como podemos retornar?</h3><label>Seu nome<input value={data.name} required onChange={(event) => setData({ ...data, name: event.target.value })} /></label><label>WhatsApp ou melhor forma de retorno<input value={data.contact} required onChange={(event) => setData({ ...data, contact: event.target.value })} /></label><div className={styles.summary}><strong>Resumo do pedido</strong><pre>{summary}</pre></div><button className={styles.cta} type="submit">Abrir resumo no WhatsApp <span aria-hidden="true">↗</span></button><small>Usamos esses dados apenas para montar sua mensagem. Não armazenamos o formulário.</small></form>}</div></div></section>
}
export default OrderBuilder
