import { useEffect, useRef, useState } from 'react'
import AvailabilityBadge from '../AvailabilityBadge/AvailabilityBadge'
import { siteConfig } from '../../config/siteConfig'
import { trackConversion, trackWhatsAppClick, withCampaign } from '../../utils/analytics'
import styles from './RemoteSupportStore.module.css'
import conversion from './Conversion.module.css'

const services = [
  { id: 'diagnostico', category: 'Diagnóstico', title: 'Diagnóstico remoto do computador', description: 'Triagem inicial gratuita pelo WhatsApp. Se for necessário acessar o computador, faço a análise técnica detalhada.', includes: ['Verificação do sistema', 'Análise dos sintomas', 'Orientação sobre o próximo passo'], audience: 'personal', price: 'R$ 29', page: '/suporte-tecnico-remoto' },
  { id: 'otimizacao', category: 'Mais procurado', title: 'Otimização completa de PC ou notebook', description: 'Revisão de inicialização, programas, armazenamento e configurações que afetam o desempenho.', includes: ['Limpeza de arquivos temporários', 'Revisão de programas desnecessários', 'Ajustes de desempenho'], featured: true, audience: 'personal', price: 'R$ 109', page: '/computador-lento' },
  { id: 'seguranca', category: 'Segurança', title: 'Limpeza de programas indesejados', description: 'Verificação de anúncios, extensões, programas suspeitos e configurações básicas de segurança.', includes: ['Revisão de programas instalados', 'Verificação do navegador', 'Orientações de segurança'], audience: 'personal', price: 'R$ 109', page: '/remocao-de-virus' },
  { id: 'gamer', category: 'Gamer', title: 'Otimização de PC para jogos', description: 'Queda de FPS, travamentos em partida, superaquecimento e drivers de vídeo desatualizados.', includes: ['Atualização limpa dos drivers de vídeo', 'Ajuste de energia, processos e overlays', 'Configuração gráfica por jogo'], gamer: true, audience: 'personal', price: 'R$ 109', page: '/otimizacao-pc-gamer' },
  { id: 'windows', category: 'Windows', title: 'Correção de erros do Windows', description: 'Diagnóstico de atualizações com falha, mensagens de erro e recursos do sistema que pararam de funcionar.', includes: ['Análise dos erros', 'Reparo de componentes do sistema', 'Teste após a correção'], audience: 'personal', price: 'R$ 119', page: '/corrigir-erros-windows' },
  { id: 'programas', category: 'Programas', title: 'Programas, Office e drivers', description: 'Instalação, atualização e correção de programas usados no trabalho, estudo ou rotina pessoal.', includes: ['Instalação acompanhada', 'Correção de falhas', 'Atualização de drivers compatíveis'], audience: 'personal', price: 'R$ 79' },
  { id: 'backup', category: 'Arquivos', title: 'Backup e transferência de arquivos', description: 'Organização de documentos e cópia para outro computador, armazenamento externo ou nuvem.', includes: ['Análise do que será protegido', 'Organização de pastas', 'Transferência acompanhada'], audience: 'personal', price: 'R$ 119' },
  { id: 'microsoft-365', category: 'Produtividade', title: 'Microsoft 365, Outlook e Teams', description: 'Configuração e correção das ferramentas Microsoft usadas por profissionais e pequenas equipes.', includes: ['Configuração de conta', 'Correção de sincronização', 'Orientação de uso'], audience: 'business', price: 'R$ 109' },
  { id: 'contadores', category: 'Profissionais', title: 'Suporte remoto para contadores', description: 'Ajuda com Windows, Office, programas de escritório, arquivos e ferramentas de produtividade.', includes: ['Atendimento direto', 'Diagnóstico de software', 'Orientação após o serviço'], audience: 'business', price: 'R$ 139', page: '/suporte-ti-para-contadores' },
  { id: 'suporte-mensal', category: 'Empresas', title: 'Plano mensal de suporte para pequenas empresas', description: 'Atendimento continuado para profissionais e pequenos negócios que precisam de suporte no dia a dia.', includes: ['Avaliação da necessidade', 'Plano de atendimento', 'Acompanhamento remoto'], audience: 'business', price: 'R$ 289/mês', page: '/plano-mensal-suporte-ti' },
]

// Cada serviço tem um ícone que anima o que ele faz: o radar do
// diagnóstico, o ponteiro da otimização, o escudo da limpeza, os quadros
// do serviço gamer. A animação roda três vezes quando o card entra na
// tela e volta no hover — nunca em looping permanente.
function ServiceGlyph({ id }) {
  const shapes = {
    diagnostico: <><circle cx="12" cy="12" r="2.5" /><circle className={styles.gPing} cx="12" cy="12" r="6" /><circle className={styles.gPing2} cx="12" cy="12" r="9.5" /></>,
    otimizacao: <><path d="M4 16a8 8 0 0 1 16 0" /><line className={styles.gNeedle} x1="12" y1="16" x2="12" y2="8.5" /></>,
    seguranca: <><path d="M12 3.5 19 6v5.5c0 4-3 7-7 8.5-4-1.5-7-4.5-7-8.5V6Z" /><line className={styles.gScanLine} x1="6.4" y1="8" x2="17.6" y2="8" /></>,
    gamer: <><rect className={styles.gBar1} x="4" y="12" width="3.4" height="7" rx="1" /><rect className={styles.gBar2} x="10.3" y="9" width="3.4" height="10" rx="1" /><rect className={styles.gBar3} x="16.6" y="6" width="3.4" height="13" rx="1" /></>,
    windows: <><rect x="3.5" y="5" width="17" height="12" rx="2" /><path className={styles.gSpark} d="M9 11h2.2l-1 2.6L14 9.6h-2.2l1-2.6z" /></>,
    programas: <><path d="M4.5 15.5V18a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5v-2.5" /><g className={styles.gDrop}><line x1="12" y1="4" x2="12" y2="13.5" /><path d="m8.4 10.2 3.6 3.6 3.6-3.6" /></g></>,
    backup: <><path className={styles.gSlide} d="M4 9h11m-3.2-3 3.6 3-3.6 3" /><path className={styles.gSlideBack} d="M20 15H9m3.2 3-3.6-3 3.6-3" /></>,
    'microsoft-365': <><path className={styles.gSync} d="M19 12a7 7 0 1 1-2.4-5.3" /><path d="M19.5 4v3.4h-3.4" /></>,
    contadores: <><path d="M6 3.5h8L18.5 8v12.5H6Z" /><path className={styles.gCheck} d="m9 13 2.4 2.4L15.6 11" /></>,
    'suporte-mensal': <><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" /><path className={styles.gBeat} d="M7 15h2.2l1.4-2.6L13 17l1.3-2h2.7" /></>,
  }
  if (!shapes[id]) return null
  return <span className={styles.glyph} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{shapes[id]}</svg></span>
}

function ServiceCard({ service, selected, onSelect }) {
  return <article className={`${styles.card} ${service.featured ? styles.featured : ''} ${service.gamer ? styles.gamerAccent : ''} ${selected ? styles.selected : ''}`} data-accent={service.gamer ? 'gamer' : undefined}><div className={styles.cardTop}><span className={styles.cardTag}><ServiceGlyph id={service.id} /><span className={styles.category}>{service.category}</span></span>{selected ? <span className={styles.selectedLabel}>Selecionado</span> : null}</div><h3>{service.title}</h3><p>{service.description}</p><ul>{service.includes.map((item) => <li key={item}>{item}</li>)}</ul>{service.page ? <a className={conversion.detailsLink} href={service.page}>Entenda este atendimento <span aria-hidden="true">→</span></a> : null}<div className={styles.cardFooter}><span><small>A partir de</small><strong>{service.price}</strong></span><button type="button" aria-pressed={selected} onClick={() => onSelect(service.id)}>{selected ? 'Remover escolha' : 'Escolher serviço'}</button></div></article>
}

function RemoteSupportStore() {
  const [selectedId, setSelectedId] = useState(null)
  const [audience, setAudience] = useState('personal')
  const [recommendation, setRecommendation] = useState('')
  // O sintoma que o visitante marcou na seção de problemas viaja até a
  // mensagem do WhatsApp, para ele não precisar redigitar o que já disse.
  const [symptom, setSymptom] = useState('')
  const [showAll, setShowAll] = useState(false)
  const gridRef = useRef(null)
  const selectedService = services.find((service) => service.id === selectedId)
  const visibleServices = services.filter((service) => service.audience === audience)
  const helpMessage = withCampaign('Olá, Ronael! Não sei qual serviço escolher. Posso explicar o que está acontecendo no meu computador?')
  const helpUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(helpMessage)}`

  useEffect(() => {
    const handleRecommendation = ({ detail }) => {
      const service = services.find((item) => item.id === detail.id)
      if (!service) return
      setAudience(service.audience)
      setSelectedId(service.id)
      setRecommendation(detail.explanation)
      setSymptom(detail.symptom || '')
    }
    window.addEventListener('select-support-service', handleRecommendation)
    return () => window.removeEventListener('select-support-service', handleRecommendation)
  }, [])

  // Dispara a animação do ícone quando o card aparece na tela.
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
    }, { threshold: 0.4 })
    for (const card of cards) observer.observe(card)
    return () => observer.disconnect()
  }, [audience, showAll])

  function changeAudience(nextAudience) {
    setAudience(nextAudience)
    setShowAll(false)
    if (selectedService?.audience !== nextAudience) {
      setSelectedId(null)
      setRecommendation('')
      setSymptom('')
    }
  }

  function selectService(id) {
    setSelectedId((current) => current === id ? null : id)
    setRecommendation('')
    setSymptom('')
  }

  function sendOrder() {
    if (!selectedService) return
    const symptomLine = symptom ? `\n\nO que acontece no meu computador: ${symptom}` : ''
    const message = withCampaign(`Olá, Ronael! Escolhi este atendimento na Ronas Tech:\n\n${selectedService.title} — a partir de ${selectedService.price}.${symptomLine}\n\nGostaria de explicar meu problema e confirmar o serviço indicado.`)
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
    trackConversion('remote_store_order', { service: selectedService.id })
    trackWhatsAppClick('remote_store')
  }

  return <section id="loja" className={`${styles.section} reveal`} aria-labelledby="store-title"><div className={styles.container}><header className={styles.heading}><div><p className={styles.eyebrow}>Atendimentos remotos</p><h2 id="store-title">Escolha apenas o problema mais próximo do seu.</h2><p>Uma escolha é suficiente. Depois de entender os sintomas, confirmo se este é realmente o serviço indicado e informo o valor final antes de começar.</p></div><div className={styles.safety}><AvailabilityBadge /><span>Todos os dias, das 09h à meia-noite. O serviço pode ser agendado conforme a disponibilidade.</span></div></header><a className={conversion.helpCard} data-ronas-cta="store_unsure" href={helpUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick('store_unsure')}><span><small>Não sabe qual escolher?</small><strong>Explique o problema para um técnico</strong></span><b aria-hidden="true">WhatsApp →</b></a><div className={conversion.audience} aria-label="Escolha o tipo de atendimento"><button type="button" className={audience === 'personal' ? conversion.activeAudience : ''} aria-pressed={audience === 'personal'} onClick={() => changeAudience('personal')}><small>Para você</small><strong>PC ou notebook pessoal</strong></button><button type="button" className={audience === 'business' ? conversion.activeAudience : ''} aria-pressed={audience === 'business'} onClick={() => changeAudience('business')}><small>Para empresas</small><strong>Profissionais e pequenas equipes</strong></button></div>{recommendation ? <div className={conversion.recommendation} role="status"><strong>Por que foi indicado</strong><span>{recommendation}</span></div> : null}<ol className="store-progress"><li data-state={selectedService ? 'done' : 'current'}><b aria-hidden="true">{selectedService ? '✓' : '1'}</b>Escolher o atendimento</li><li data-state={selectedService ? 'current' : 'todo'}><b aria-hidden="true">2</b>Receber o valor para aprovar</li></ol><p className="selection-status" aria-live="polite">{selectedService ? `${selectedService.title} selecionado. Revise o pedido ao lado.` : 'Escolha um atendimento para continuar.'}</p><div className={styles.layout}><div><div ref={gridRef} className={`${styles.grid} ${!showAll && audience === 'personal' ? conversion.serviceGridCollapsed : ''}`}>{visibleServices.map((service) => <ServiceCard key={service.id} service={service} selected={selectedId === service.id} onSelect={selectService} />)}</div>{audience === 'personal' ? <button className={conversion.showServices} type="button" aria-expanded={showAll} onClick={() => setShowAll((current) => !current)}>{showAll ? 'Mostrar somente os principais' : 'Ver outros serviços'}</button> : null}</div><aside className={styles.order} aria-labelledby="order-summary-title"><div className={styles.orderHeader}><span>Sua escolha</span><strong>{selectedService ? '1' : '0'}</strong></div><h3 id="order-summary-title">Atendimento selecionado</h3>{selectedService ? <ul><li><span>{selectedService.title}</span><button type="button" onClick={() => selectService(selectedService.id)}>Remover</button></li></ul> : <p className={styles.empty}>Escolha somente o problema que mais se aproxima do seu caso.</p>}<div className={styles.orderNote}><strong>Escolher ainda não é contratar</strong><span>O preço é inicial. Você recebe o valor final para aprovar depois do diagnóstico e antes do serviço, e só paga com o problema resolvido.</span></div><button className={styles.checkout} data-ronas-cta="remote_store" type="button" disabled={!selectedService} onClick={sendOrder}>Enviar e receber o valor</button><small className={styles.privacy}>Abre o WhatsApp com o resumo pronto. Nenhum dado é armazenado no site.</small></aside></div></div></section>
}

export default RemoteSupportStore
