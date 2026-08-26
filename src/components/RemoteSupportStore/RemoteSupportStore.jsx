import { useEffect, useState } from 'react'
import { siteConfig } from '../../config/siteConfig'
import { trackConversion, trackWhatsAppClick, withCampaign } from '../../utils/analytics'
import styles from './RemoteSupportStore.module.css'
import conversion from './Conversion.module.css'

const services = [
  {
    id: 'diagnostico',
    category: 'Diagnóstico',
    title: 'Diagnóstico remoto do computador',
    description: 'Análise inicial para identificar possíveis causas de lentidão, travamentos e erros do Windows.',
    includes: ['Verificação do sistema', 'Análise dos sintomas', 'Orientação sobre o próximo passo'],
    audience: 'personal',
    price: 'R$ 49',
  },
  {
    id: 'otimizacao',
    category: 'Mais procurado',
    title: 'Otimização completa de PC ou notebook',
    description: 'Revisão de inicialização, programas, armazenamento e configurações que afetam o desempenho.',
    includes: ['Limpeza de arquivos temporários', 'Revisão de programas desnecessários', 'Ajustes de desempenho'],
    featured: true,
    audience: 'personal',
    price: 'R$ 119',
  },
  {
    id: 'seguranca',
    category: 'Segurança',
    title: 'Limpeza de programas indesejados',
    description: 'Verificação de anúncios, extensões, programas suspeitos e configurações básicas de segurança.',
    includes: ['Revisão de programas instalados', 'Verificação do navegador', 'Orientações de segurança'],
    audience: 'personal',
    price: 'R$ 119',
  },
  {
    id: 'windows',
    category: 'Windows',
    title: 'Correção de erros do Windows',
    description: 'Diagnóstico de atualizações com falha, mensagens de erro e recursos do sistema que pararam de funcionar.',
    includes: ['Análise dos erros', 'Reparo de componentes do sistema', 'Teste após a correção'],
    audience: 'personal',
    price: 'R$ 129',
  },
  {
    id: 'programas',
    category: 'Programas',
    title: 'Programas, Office e drivers',
    description: 'Instalação, atualização e correção de programas usados no trabalho, estudo ou rotina pessoal.',
    includes: ['Instalação acompanhada', 'Correção de falhas', 'Atualização de drivers compatíveis'],
    audience: 'personal',
    price: 'R$ 89',
  },
  {
    id: 'backup',
    category: 'Arquivos',
    title: 'Backup e transferência de arquivos',
    description: 'Organização de documentos e cópia para outro computador, armazenamento externo ou nuvem.',
    includes: ['Análise do que será protegido', 'Organização de pastas', 'Transferência acompanhada'],
    audience: 'personal',
    price: 'R$ 129',
  },
  {
    id: 'microsoft-365',
    category: 'Produtividade',
    title: 'Microsoft 365, Outlook e Teams',
    description: 'Configuração e correção das ferramentas Microsoft usadas por profissionais e pequenas equipes.',
    includes: ['Configuração de conta', 'Correção de sincronização', 'Orientação de uso'],
    audience: 'business',
    price: 'R$ 119',
  },
  {
    id: 'contadores',
    category: 'Profissionais',
    title: 'Suporte remoto para contadores',
    description: 'Ajuda com Windows, Office, programas de escritório, arquivos e ferramentas de produtividade.',
    includes: ['Atendimento direto', 'Diagnóstico de software', 'Orientação após o serviço'],
    audience: 'business',
    price: 'R$ 149',
  },
  {
    id: 'suporte-mensal',
    category: 'Empresas',
    title: 'Suporte remoto recorrente',
    description: 'Atendimento continuado para profissionais e pequenos negócios que precisam de suporte no dia a dia.',
    includes: ['Avaliação da necessidade', 'Plano de atendimento', 'Acompanhamento remoto'],
    audience: 'business',
    price: 'R$ 299/mês',
  },
]

const quickIssues = [
  ['Está lento ou travando', 'otimizacao'],
  ['Aparecem anúncios', 'seguranca'],
  ['Programa não abre', 'programas'],
  ['Erro no Windows', 'windows'],
  ['Não sei o que é', 'diagnostico'],
]

function ServiceCard({ service, selected, onToggle }) {
  return <article className={`${styles.card} ${service.featured ? styles.featured : ''} ${selected ? styles.selected : ''}`}>
    <div className={styles.cardTop}><span className={styles.category}>{service.category}</span>{selected ? <span className={styles.selectedLabel}>Adicionado</span> : null}</div>
    <h3>{service.title}</h3>
    <p>{service.description}</p>
    <ul>{service.includes.map((item) => <li key={item}>{item}</li>)}</ul>
    <div className={styles.cardFooter}><span><small>A partir de</small><strong>{service.price}</strong></span><button type="button" aria-pressed={selected} onClick={() => onToggle(service.id)}>{selected ? 'Remover do pedido' : 'Adicionar ao pedido'}</button></div>
  </article>
}

function RemoteSupportStore() {
  const [selectedIds, setSelectedIds] = useState([])
  const [audience, setAudience] = useState('personal')
  const [recommendation, setRecommendation] = useState('')
  const selectedServices = services.filter((service) => selectedIds.includes(service.id))
  const visibleServices = services.filter((service) => service.audience === audience)

  useEffect(() => {
    const handleRecommendation = ({ detail }) => {
      const service = services.find((item) => item.id === detail.id)
      if (!service) return
      setAudience(service.audience)
      setSelectedIds((current) => current.includes(service.id) ? current : [...current, service.id])
      setRecommendation(detail.explanation)
    }
    window.addEventListener('select-support-service', handleRecommendation)
    return () => window.removeEventListener('select-support-service', handleRecommendation)
  }, [])

  function toggleService(id) {
    setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  function chooseIssue(id) {
    const service = services.find((item) => item.id === id)
    setSelectedIds((current) => current.includes(id) ? current : [...current, id])
    setRecommendation(service ? `Recomendação inicial: ${service.title}. A escolha será confirmada depois que você explicar os sintomas.` : '')
  }

  function sendOrder() {
    if (selectedServices.length === 0) return
    const list = selectedServices.map((service, index) => `${index + 1}. ${service.title}`).join('\n')
    const message = withCampaign(`Olá, Ronael! Montei um pedido na loja da Ronas Tech.\n\nServiços selecionados:\n${list}\n\nGostaria de explicar meu problema e receber uma avaliação.`)
    const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener,noreferrer')
    trackConversion('remote_store_order', { services: selectedIds.join(',') })
    trackWhatsAppClick('remote_store')
  }

  return <section id="loja" className={`${styles.section} reveal`} aria-labelledby="store-title">
    <div className={styles.container}>
      <header className={styles.heading}><div><p className={styles.eyebrow}>Loja de serviços remotos</p><h2 id="store-title">Escolha o suporte que você precisa.</h2><p>Veja o preço inicial e adicione um ou mais serviços. Depois de entender o problema, o valor final é confirmado pelo WhatsApp antes de começar.</p></div><div className={styles.safety}><strong>Todos os dias · 09h à meia-noite</strong><span>Resposta inicial em até 1 hora durante o horário de atendimento. O serviço pode ser agendado conforme a disponibilidade.</span></div></header>
      <div className={conversion.audience} aria-label="Escolha o tipo de atendimento"><button type="button" className={audience === 'personal' ? conversion.activeAudience : ''} aria-pressed={audience === 'personal'} onClick={() => setAudience('personal')}><small>Para você</small><strong>PC ou notebook pessoal</strong></button><button type="button" className={audience === 'business' ? conversion.activeAudience : ''} aria-pressed={audience === 'business'} onClick={() => setAudience('business')}><small>Para empresas</small><strong>Profissionais e pequenas equipes</strong></button></div>
      <div className="quick-pick" aria-labelledby="quick-pick-title"><div><small>AJUDA PARA ESCOLHER</small><strong id="quick-pick-title">O que está acontecendo?</strong></div><div><button className={conversion.unknownIssue} type="button" aria-pressed={selectedIds.includes('diagnostico')} onClick={() => chooseIssue('diagnostico')}>Não sei qual serviço escolher — fale com um técnico<span aria-hidden="true">+</span></button>{quickIssues.slice(0, -1).map(([label, id]) => <button type="button" key={label} aria-pressed={selectedIds.includes(id)} onClick={() => chooseIssue(id)}>{label}<span aria-hidden="true">+</span></button>)}</div></div>
      {recommendation ? <div className={conversion.recommendation} role="status"><strong>Por que este serviço foi indicado</strong><span>{recommendation}</span></div> : null}
      <p className="selection-status" aria-live="polite">{selectedServices.length > 0 ? `${selectedServices.length} ${selectedServices.length === 1 ? 'serviço selecionado' : 'serviços selecionados'}. Revise o pedido ao lado.` : 'Nenhum serviço selecionado.'}</p>
      <div className={styles.layout}>
        <div className={styles.grid}>{visibleServices.map((service) => <ServiceCard key={service.id} service={service} selected={selectedIds.includes(service.id)} onToggle={toggleService} />)}</div>
        <aside className={styles.order} aria-labelledby="order-summary-title">
          <div className={styles.orderHeader}><span>Seu pedido</span><strong>{selectedServices.length}</strong></div>
          <h3 id="order-summary-title">Serviços selecionados</h3>
          {selectedServices.length > 0 ? <ul>{selectedServices.map((service) => <li key={service.id}><span>{service.title}</span><button type="button" onClick={() => toggleService(service.id)} aria-label={`Remover ${service.title}`}>Remover</button></li>)}</ul> : <p className={styles.empty}>Escolha um serviço para começar seu pedido.</p>}
          <div className={styles.orderNote}><strong>Sem cobrança agora</strong><span>Os preços são iniciais. Você recebe o valor final para aprovar depois do diagnóstico e antes do serviço.</span></div>
          <button className={styles.checkout} type="button" disabled={selectedServices.length === 0} onClick={sendOrder}>Enviar pedido pelo WhatsApp</button>
          <small className={styles.privacy}>Nenhum dado é armazenado no site.</small>
        </aside>
      </div>
    </div>
  </section>
}

export default RemoteSupportStore
