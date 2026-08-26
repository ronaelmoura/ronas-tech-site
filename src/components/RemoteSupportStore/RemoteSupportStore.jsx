import { useState } from 'react'
import { siteConfig } from '../../config/siteConfig'
import { trackConversion, trackWhatsAppClick, withCampaign } from '../../utils/analytics'
import styles from './RemoteSupportStore.module.css'

const services = [
  {
    id: 'diagnostico',
    category: 'Diagnóstico',
    title: 'Diagnóstico remoto do computador',
    description: 'Análise inicial para identificar possíveis causas de lentidão, travamentos e erros do Windows.',
    includes: ['Verificação do sistema', 'Análise dos sintomas', 'Orientação sobre o próximo passo'],
  },
  {
    id: 'otimizacao',
    category: 'Mais procurado',
    title: 'Otimização completa de PC ou notebook',
    description: 'Revisão de inicialização, programas, armazenamento e configurações que afetam o desempenho.',
    includes: ['Limpeza de arquivos temporários', 'Revisão de programas desnecessários', 'Ajustes de desempenho'],
    featured: true,
  },
  {
    id: 'seguranca',
    category: 'Segurança',
    title: 'Limpeza de programas indesejados',
    description: 'Verificação de anúncios, extensões, programas suspeitos e configurações básicas de segurança.',
    includes: ['Revisão de programas instalados', 'Verificação do navegador', 'Orientações de segurança'],
  },
  {
    id: 'configuracao',
    category: 'Configuração',
    title: 'Instalação e configuração de programas',
    description: 'Ajuda para instalar e configurar ferramentas de trabalho, estudo, comunicação e produtividade.',
    includes: ['Instalação acompanhada', 'Configuração inicial', 'Teste de funcionamento'],
  },
  {
    id: 'backup',
    category: 'Arquivos',
    title: 'Backup e organização de arquivos',
    description: 'Orientação para organizar documentos e configurar cópias em armazenamento externo ou nuvem.',
    includes: ['Análise do que será protegido', 'Organização de pastas', 'Configuração do método escolhido'],
  },
  {
    id: 'suporte-mensal',
    category: 'Empresas',
    title: 'Suporte remoto recorrente',
    description: 'Atendimento continuado para profissionais e pequenos negócios que precisam de suporte no dia a dia.',
    includes: ['Avaliação da necessidade', 'Plano de atendimento', 'Acompanhamento remoto'],
  },
]

const quickIssues = [
  ['Está lento ou travando', 'otimizacao'],
  ['Aparecem anúncios', 'seguranca'],
  ['Programa não abre', 'configuracao'],
  ['Não sei o que é', 'diagnostico'],
]

function ServiceCard({ service, selected, onToggle }) {
  return <article className={`${styles.card} ${service.featured ? styles.featured : ''} ${selected ? styles.selected : ''}`}>
    <div className={styles.cardTop}><span className={styles.category}>{service.category}</span>{selected ? <span className={styles.selectedLabel}>Adicionado</span> : null}</div>
    <h3>{service.title}</h3>
    <p>{service.description}</p>
    <ul>{service.includes.map((item) => <li key={item}>{item}</li>)}</ul>
    <div className={styles.cardFooter}><span><small>Valor</small><strong>Após diagnóstico</strong></span><button type="button" aria-pressed={selected} onClick={() => onToggle(service.id)}>{selected ? 'Remover do pedido' : 'Adicionar ao pedido'}</button></div>
  </article>
}

function RemoteSupportStore() {
  const [selectedIds, setSelectedIds] = useState([])
  const selectedServices = services.filter((service) => selectedIds.includes(service.id))

  function toggleService(id) {
    setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  function chooseIssue(id) {
    setSelectedIds((current) => current.includes(id) ? current : [...current, id])
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
      <header className={styles.heading}><div><p className={styles.eyebrow}>Loja de serviços remotos</p><h2 id="store-title">Escolha o suporte que você precisa.</h2><p>Adicione um ou mais serviços ao pedido. O atendimento continua pelo WhatsApp, onde o problema é avaliado antes da confirmação do valor.</p></div><div className={styles.safety}><strong>Atendimento acompanhado</strong><span>Você vê o que está sendo feito e pode encerrar o acesso remoto quando quiser.</span></div></header>
      <div className="quick-pick" aria-labelledby="quick-pick-title"><div><small>AJUDA PARA ESCOLHER</small><strong id="quick-pick-title">O que está acontecendo?</strong></div><div>{quickIssues.map(([label, id]) => <button type="button" key={label} aria-pressed={selectedIds.includes(id)} onClick={() => chooseIssue(id)}>{label}<span aria-hidden="true">+</span></button>)}</div></div>
      <p className="selection-status" aria-live="polite">{selectedServices.length > 0 ? `${selectedServices.length} ${selectedServices.length === 1 ? 'serviço selecionado' : 'serviços selecionados'}. Revise o pedido ao lado.` : 'Nenhum serviço selecionado.'}</p>
      <div className={styles.layout}>
        <div className={styles.grid}>{services.map((service) => <ServiceCard key={service.id} service={service} selected={selectedIds.includes(service.id)} onToggle={toggleService} />)}</div>
        <aside className={styles.order} aria-labelledby="order-summary-title">
          <div className={styles.orderHeader}><span>Seu pedido</span><strong>{selectedServices.length}</strong></div>
          <h3 id="order-summary-title">Serviços selecionados</h3>
          {selectedServices.length > 0 ? <ul>{selectedServices.map((service) => <li key={service.id}><span>{service.title}</span><button type="button" onClick={() => toggleService(service.id)} aria-label={`Remover ${service.title}`}>Remover</button></li>)}</ul> : <p className={styles.empty}>Escolha um serviço para começar seu pedido.</p>}
          <div className={styles.orderNote}><strong>Sem cobrança agora</strong><span>O valor é informado após entender o problema e confirmar o que pode ser feito remotamente.</span></div>
          <button className={styles.checkout} type="button" disabled={selectedServices.length === 0} onClick={sendOrder}>Enviar pedido pelo WhatsApp</button>
          <small className={styles.privacy}>Nenhum dado é armazenado no site.</small>
        </aside>
      </div>
    </div>
  </section>
}

export default RemoteSupportStore
