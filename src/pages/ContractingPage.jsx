import { useEffect, useMemo, useState } from 'react'
import { siteConfig } from '../config/siteConfig'
import { contractingServices, getContractingService } from '../data/contractingServices'
import { createOrderDraft, orderCapabilities } from '../features/contracting/orderModel'
import styles from './ContractingPage.module.css'

const steps = ['Serviço', 'Domínio', 'Briefing', 'Resumo']

const domainOptions = [
  {
    id: 'register',
    title: 'Quero registrar um domínio',
    description: 'Informe o endereço desejado. A disponibilidade e o valor serão confirmados antes da contratação.',
  },
  {
    id: 'existing',
    title: 'Já tenho um domínio',
    description: 'Usaremos seu domínio existente e orientaremos os ajustes necessários.',
  },
  {
    id: 'vercel',
    title: 'Começar sem domínio próprio',
    description: 'O projeto poderá começar com uma URL gratuita da Vercel e receber um domínio depois.',
  },
]

const domainLabels = {
  register: 'Registrar um domínio',
  existing: 'Usar domínio existente',
  vercel: 'Começar com URL gratuita da Vercel',
}

function Field({ label, children, hint }) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      {children}
      {hint && <small>{hint}</small>}
    </label>
  )
}

function ContractingPage() {
  const [step, setStep] = useState(1)
  const [order, setOrder] = useState(createOrderDraft)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    document.title = `Contratar serviços digitais | ${siteConfig.companyName}`
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', 'Escolha um serviço, personalize seu projeto e envie um pré-pedido para a Ronas Tech.')
    const serviceId = new URLSearchParams(window.location.search).get('servico')
    if (getContractingService(serviceId)) {
      setOrder((current) => ({ ...current, serviceId }))
    }
  }, [])

  const selectedService = getContractingService(order.serviceId)
  const supportMessage = selectedService
    ? `Olá! Preciso de ajuda para contratar ${selectedService.name}. Estou na etapa ${step} do formulário.`
    : `Olá! Preciso de ajuda para escolher um serviço da Ronas Tech. Estou na etapa ${step} do formulário.`
  const supportUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(supportMessage)}`

  const orderMessage = useMemo(() => {
    if (!selectedService) return ''
    const domainDetail = order.domain.value ? ` (${order.domain.value})` : ''
    return [
      'Olá! Concluí meu pré-pedido pelo site da Ronas Tech.',
      '',
      `Serviço: ${selectedService.name}`,
      `Projeto: ${order.personalization.projectName}`,
      `Objetivo: ${order.personalization.primaryGoal}`,
      `Início desejado: ${order.personalization.desiredStart || 'A combinar'}`,
      `Domínio: ${domainLabels[order.domain.option]}${domainDetail}`,
      `Nome: ${order.customer.name}`,
      `Empresa: ${order.customer.company || 'Não informada'}`,
      `E-mail: ${order.customer.email}`,
      `WhatsApp: ${order.customer.whatsapp}`,
      `Briefing: ${order.customer.briefing}`,
      order.personalization.notes ? `Observações: ${order.personalization.notes}` : '',
    ].filter(Boolean).join('\n')
  }, [order, selectedService])

  const updateNested = (section, field, value) => {
    setOrder((current) => ({
      ...current,
      [section]: { ...current[section], [field]: value },
    }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const validateStep = () => {
    const nextErrors = {}
    if (step === 1) {
      if (!order.serviceId) nextErrors.serviceId = 'Escolha um serviço para continuar.'
      if (!order.personalization.projectName.trim()) nextErrors.projectName = 'Informe um nome para o projeto.'
      if (!order.personalization.primaryGoal.trim()) nextErrors.primaryGoal = 'Conte qual é o objetivo principal.'
    }
    if (step === 2) {
      if (!order.domain.option) nextErrors.domain = 'Escolha uma opção de domínio.'
      if (['register', 'existing'].includes(order.domain.option) && !order.domain.value.trim()) {
        nextErrors.domainValue = 'Informe o domínio desejado ou existente.'
      }
    }
    if (step === 3) {
      if (!order.customer.name.trim()) nextErrors.name = 'Informe seu nome.'
      if (!/^\S+@\S+\.\S+$/.test(order.customer.email)) nextErrors.email = 'Informe um e-mail válido.'
      if (!order.customer.whatsapp.trim()) nextErrors.whatsapp = 'Informe seu WhatsApp.'
      if (order.customer.briefing.trim().length < 20) nextErrors.briefing = 'Descreva sua necessidade em pelo menos 20 caracteres.'
    }
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const goForward = () => {
    if (!validateStep()) return
    setStep((current) => Math.min(current + 1, steps.length))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goBack = () => {
    setErrors({})
    setStep((current) => Math.max(current - 1, 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a className={styles.brand} href="/" aria-label={`${siteConfig.companyName} — página inicial`}>
          <img src={siteConfig.logoPath} alt="" width="44" height="41" />
          <span>{siteConfig.companyName}</span>
        </a>
        <a className={styles.projectsLink} href={orderCapabilities.customerPortal.route}>
          Meus projetos <span>Em breve</span>
        </a>
      </header>

      <main id="conteudo-principal" className={styles.main} tabIndex="-1">
        <div className={styles.intro}>
          <p>Contratação guiada</p>
          <h1>Vamos tirar seu projeto do papel</h1>
          <span>Revise tudo antes de enviar. Nenhum pagamento é feito nesta etapa.</span>
        </div>

        <ol className={styles.stepper} aria-label="Etapas da contratação">
          {steps.map((label, index) => {
            const number = index + 1
            return (
              <li key={label} className={step === number ? styles.activeStep : step > number ? styles.completedStep : ''}>
                <span>{step > number ? '✓' : number}</span><small>{label}</small>
              </li>
            )
          })}
        </ol>

        <div className={styles.layout}>
          <section className={styles.panel} aria-live="polite">
            {step === 1 && (
              <>
                <div className={styles.sectionHeading}>
                  <span>Etapa 1 de 4</span><h2>Escolha e personalize o serviço</h2>
                  <p>Selecione a opção mais próxima da sua necessidade. Os detalhes poderão ser refinados antes do início.</p>
                </div>
                <div className={styles.serviceGrid}>
                  {contractingServices.map((service) => (
                    <label key={service.id} className={`${styles.choiceCard} ${order.serviceId === service.id ? styles.selected : ''}`}>
                      <input type="radio" name="service" value={service.id} checked={order.serviceId === service.id} onChange={(event) => {
                        setOrder((current) => ({ ...current, serviceId: event.target.value }))
                        setErrors((current) => ({ ...current, serviceId: undefined }))
                      }} />
                      <span className={styles.radioMark} />
                      <strong>{service.name}</strong><small>{service.audience}</small>
                      <b>{service.priceLabel} {service.price}</b>
                    </label>
                  ))}
                </div>
                {errors.serviceId && <p className={styles.error}>{errors.serviceId}</p>}
                <div className={styles.formGrid}>
                  <Field label="Nome do projeto">
                    <input value={order.personalization.projectName} onChange={(event) => updateNested('personalization', 'projectName', event.target.value)} placeholder="Ex.: Site da Padaria Central" />
                    {errors.projectName && <small className={styles.error}>{errors.projectName}</small>}
                  </Field>
                  <Field label="Quando gostaria de começar?">
                    <select value={order.personalization.desiredStart} onChange={(event) => updateNested('personalization', 'desiredStart', event.target.value)}>
                      <option value="">A combinar</option><option>Assim que possível</option>
                      <option>Nas próximas 2 semanas</option><option>No próximo mês</option>
                      <option>Ainda estou planejando</option>
                    </select>
                  </Field>
                </div>
                <Field label="Qual é o objetivo principal?">
                  <input value={order.personalization.primaryGoal} onChange={(event) => updateNested('personalization', 'primaryGoal', event.target.value)} placeholder="Ex.: receber mais pedidos pelo WhatsApp" />
                  {errors.primaryGoal && <small className={styles.error}>{errors.primaryGoal}</small>}
                </Field>
                <Field label="Observações (opcional)">
                  <textarea rows="3" value={order.personalization.notes} onChange={(event) => updateNested('personalization', 'notes', event.target.value)} placeholder="Referências, funcionalidades ou informações importantes" />
                </Field>
              </>
            )}

            {step === 2 && (
              <>
                <div className={styles.sectionHeading}>
                  <span>Etapa 2 de 4</span><h2>Como será o domínio?</h2>
                  <p>Domínio é o endereço usado para acessar seu site. Você pode decidir ou alterar esta escolha depois.</p>
                </div>
                <div className={styles.domainList}>
                  {domainOptions.map((option) => (
                    <label key={option.id} className={`${styles.choiceCard} ${order.domain.option === option.id ? styles.selected : ''}`}>
                      <input type="radio" name="domain" value={option.id} checked={order.domain.option === option.id} onChange={(event) => {
                        updateNested('domain', 'option', event.target.value)
                        if (event.target.value === 'vercel') updateNested('domain', 'value', '')
                      }} />
                      <span className={styles.radioMark} /><strong>{option.title}</strong><small>{option.description}</small>
                    </label>
                  ))}
                </div>
                {errors.domain && <p className={styles.error}>{errors.domain}</p>}
                {['register', 'existing'].includes(order.domain.option) && (
                  <Field label={order.domain.option === 'register' ? 'Domínio desejado' : 'Seu domínio atual'} hint={order.domain.option === 'register' ? 'A escolha não garante disponibilidade. Faremos a verificação antes de qualquer cobrança.' : 'Não compartilhe senhas agora. Pediremos apenas os acessos necessários no momento certo.'}>
                    <input value={order.domain.value} onChange={(event) => updateNested('domain', 'value', event.target.value)} placeholder="exemplo.com.br" />
                    {errors.domainValue && <small className={styles.error}>{errors.domainValue}</small>}
                  </Field>
                )}
                {order.domain.option === 'vercel' && (
                  <div className={styles.infoBox}><strong>Sem custo de domínio agora</strong><p>Seu projeto poderá usar um endereço como <code>seu-negocio.vercel.app</code>. A disponibilidade do nome será confirmada na publicação.</p></div>
                )}
              </>
            )}

            {step === 3 && (
              <>
                <div className={styles.sectionHeading}>
                  <span>Etapa 3 de 4</span><h2>Seus dados e briefing inicial</h2>
                  <p>Estas informações serão usadas apenas para entrar em contato e preparar a revisão do pedido.</p>
                </div>
                <div className={styles.formGrid}>
                  <Field label="Seu nome"><input autoComplete="name" value={order.customer.name} onChange={(event) => updateNested('customer', 'name', event.target.value)} />{errors.name && <small className={styles.error}>{errors.name}</small>}</Field>
                  <Field label="Empresa (opcional)"><input autoComplete="organization" value={order.customer.company} onChange={(event) => updateNested('customer', 'company', event.target.value)} /></Field>
                  <Field label="E-mail"><input type="email" autoComplete="email" value={order.customer.email} onChange={(event) => updateNested('customer', 'email', event.target.value)} />{errors.email && <small className={styles.error}>{errors.email}</small>}</Field>
                  <Field label="WhatsApp"><input type="tel" autoComplete="tel" value={order.customer.whatsapp} onChange={(event) => updateNested('customer', 'whatsapp', event.target.value)} placeholder="(88) 99999-9999" />{errors.whatsapp && <small className={styles.error}>{errors.whatsapp}</small>}</Field>
                </div>
                <Field label="Conte um pouco sobre o negócio e o que precisa">
                  <textarea rows="6" value={order.customer.briefing} onChange={(event) => updateNested('customer', 'briefing', event.target.value)} placeholder="O que sua empresa faz, quem deseja alcançar e qual problema este projeto deve resolver?" />
                  {errors.briefing && <small className={styles.error}>{errors.briefing}</small>}
                </Field>
              </>
            )}

            {step === 4 && selectedService && (
              <>
                <div className={styles.sectionHeading}>
                  <span>Etapa 4 de 4</span><h2>Revise seu pré-pedido</h2>
                  <p>Nenhuma cobrança será realizada agora. Escopo, prazo e valor final serão confirmados antes da contratação.</p>
                </div>
                <div className={styles.summary}>
                  <div><span>Serviço</span><strong>{selectedService.name}</strong><small>{selectedService.priceLabel} {selectedService.price}</small></div>
                  <div><span>Projeto</span><strong>{order.personalization.projectName}</strong><small>{order.personalization.primaryGoal}</small></div>
                  <div><span>Domínio</span><strong>{domainLabels[order.domain.option]}</strong><small>{order.domain.value || 'Endereço definido na publicação'}</small></div>
                  <div><span>Contato</span><strong>{order.customer.name}</strong><small>{order.customer.email} · {order.customer.whatsapp}</small></div>
                  <div className={styles.fullSummary}><span>Briefing</span><p>{order.customer.briefing}</p></div>
                </div>
                <div className={styles.nextModules}>
                  <div><span>01</span><p><strong>Revisão do pedido</strong>Você confirma escopo, prazo e valor com a Ronas Tech.</p></div>
                  <div><span>02</span><p><strong>Pagamento seguro</strong>Será adicionado em uma próxima versão, após a confirmação.</p></div>
                  <div><span>03</span><p><strong>Meus projetos</strong>A área de acompanhamento já está prevista na arquitetura.</p></div>
                </div>
                <a className={styles.submitButton} href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(orderMessage)}`} target="_blank" rel="noopener noreferrer">
                  Enviar pré-pedido pelo WhatsApp <span aria-hidden="true">→</span>
                </a>
                <p className={styles.privacyNote}>O WhatsApp abrirá com o resumo preenchido para você revisar antes do envio.</p>
              </>
            )}

            <div className={styles.actions}>
              {step > 1 && <button type="button" className={styles.backButton} onClick={goBack}>Voltar</button>}
              {step < 4 && <button type="button" className={styles.nextButton} onClick={goForward}>Continuar <span aria-hidden="true">→</span></button>}
            </div>
          </section>

          <aside className={styles.supportCard}>
            <span className={styles.supportIcon}>💬</span>
            <p>Prefere atendimento humano?</p><strong>Fale diretamente com a Ronas Tech</strong>
            <small>Peça ajuda ou continue a contratação pelo WhatsApp em qualquer etapa.</small>
            <a href={supportUrl} target="_blank" rel="noopener noreferrer">Falar no WhatsApp <span aria-hidden="true">↗</span></a>
            <em>Normalmente respondemos em horário comercial.</em>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default ContractingPage
