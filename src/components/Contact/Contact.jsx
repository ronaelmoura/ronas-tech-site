import { useState } from 'react'
import { siteConfig } from '../../config/siteConfig'
import { setEnhancedConversionUserData, trackContactFormSubmit, trackExternalLink, trackWhatsAppClick } from '../../utils/analytics'
import { isValidBrazilPhone, toE164BrazilPhone } from '../../utils/phone'
import styles from './Contact.module.css'

const initialFormData = { name: '', company: '', phone: '', reason: '', message: '' }
const reasons = ['Ainda não sei — quero entender o caminho', 'Sites Profissionais', 'Landing Pages', 'Sistemas Web', 'Automação de Processos', 'Dashboards e Integrações', 'IA para Empresas', 'Outro assunto']

function validateForm(formData) {
  const errors = {}
  if (formData.name.trim().length < 2) errors.name = 'Informe seu nome.'
  if (!isValidBrazilPhone(formData.phone)) errors.phone = 'Informe um telefone com DDD, por exemplo (88) 99302-1946.'
  if (!formData.reason) errors.reason = 'Selecione como podemos começar.'
  if (!formData.message.trim()) errors.message = 'Conte brevemente o que sua empresa precisa.'
  return errors
}

function createWhatsAppMessage(formData) {
  return ['Olá, Ronael! Vim pelo site da Ronas Tech.', '', `Nome: ${formData.name.trim()}`, formData.company.trim() ? `Empresa: ${formData.company.trim()}` : null, `Serviço: ${formData.reason}`, `Mensagem: ${formData.message.trim()}`].filter((line) => line !== null).join('\n')
}

function Contact() {
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
    setErrors((currentErrors) => {
      if (!currentErrors[name]) return currentErrors
      const nextErrors = { ...currentErrors }
      delete nextErrors[name]
      return nextErrors
    })
    setSubmitError('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    const validationErrors = validateForm(formData)
    setErrors(validationErrors)
    setSubmitError('')
    if (Object.keys(validationErrors).length > 0) {
      document.getElementById(`contact-${Object.keys(validationErrors)[0]}`)?.focus()
      return
    }
    const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(createWhatsAppMessage(formData))}`
    const whatsappWindow = window.open(whatsappUrl, '_blank')
    if (!whatsappWindow) {
      setSubmitError('Não foi possível abrir o WhatsApp. Permita pop-ups no navegador ou escreva para ' + siteConfig.email + '.')
      return
    }
    whatsappWindow.opener = null
    setEnhancedConversionUserData({ phoneE164: toE164BrazilPhone(formData.phone) })
    trackWhatsAppClick('contact_form')
    trackContactFormSubmit(formData.reason)
    setFormData(initialFormData)
    setErrors({})
  }

  function fieldAccessibility(fieldName) {
    const hasError = Boolean(errors[fieldName])
    return { 'aria-invalid': hasError, 'aria-describedby': hasError ? `${fieldName}-error` : undefined }
  }

  return (
    <section id="contato" className={`${styles.section} reveal`} aria-labelledby="contact-title">
      <div className={styles.container}>
        <div className={styles.information}>
          <div className={styles.diagnosticLabel}><span>DIAGNÓSTICO INICIAL</span><i /><span>~ 2 MINUTOS</span></div>
          <div className={styles.availability}><i /> Atendimento para novos projetos</div>
          <p className={styles.eyebrow}>Contato</p>
          <h2 id="contact-title">Seu problema não precisa chegar com uma solução pronta.</h2>
          <p className={styles.subtitle}>Conte o que está acontecendo hoje. A partir disso, identificamos onde uma solução digital pode simplificar, automatizar, integrar ou organizar sua operação.</p>
          <div className={styles.trustLine}><span>✓</span> Resposta inicial pelo WhatsApp <span>✓</span> Sem compromisso</div><div className={styles.promise}>
            <span>Depois desta mensagem</span>
            <strong>Você explica o cenário. A primeira conversa ajuda a definir o próximo passo.</strong>
            <div><b>01</b> Entendemos o cenário <b>02</b> Avaliamos a solução <b>03</b> Combinamos o próximo passo</div>
          </div>
          <div className={styles.paths}>
            <article className={styles.path}><h3>Projetos digitais</h3><p>Sites, sistemas, automações e soluções com IA para empresas.</p><ul><li><a href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Olá, Ronael! Quero conversar sobre uma solução digital para minha empresa.')}`} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick('contact_project')}>WhatsApp <span>→</span></a></li><li><a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" onClick={() => trackExternalLink('linkedin')}>LinkedIn <span>→</span></a></li></ul></article>
            <article className={styles.path}><h3>Conheça os projetos</h3><p>Veja sistemas e aplicações desenvolvidos pela Ronas Tech.</p><ul><li><a href="#projetos">Ver projetos <span>→</span></a></li><li><a href={siteConfig.github} target="_blank" rel="noopener noreferrer" onClick={() => trackExternalLink('github')}>GitHub <span>→</span></a></li></ul></article>
          </div>
        </div>
        <div className={styles.formCard}>
          <header className={styles.formHeader}>
            <span className={styles.formKicker}>DIAGNÓSTICO INICIAL · 01</span>
            <h3>Vamos descobrir o que realmente precisa funcionar melhor.</h3>
            <p>Sem briefing técnico e sem precisar escolher uma tecnologia. Explique a situação com suas palavras — o que acontece hoje, o que atrasa sua rotina e o que você gostaria que funcionasse melhor.</p>
          </header>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.fieldRow}>
              <div className={styles.field}><label htmlFor="contact-name">Nome</label><input id="contact-name" name="name" type="text" value={formData.name} onChange={handleChange} autoComplete="name" required placeholder="Seu nome" {...fieldAccessibility('name')} />{errors.name && <span id="name-error" className={styles.error}>{errors.name}</span>}</div>
              <div className={styles.field}><label htmlFor="contact-company">Empresa <small>(opcional)</small></label><input id="contact-company" name="company" type="text" value={formData.company} onChange={handleChange} autoComplete="organization" placeholder="Nome da empresa" /></div>
            </div>
            <div className={styles.fieldRow}>
              <div className={styles.field}><label htmlFor="contact-phone">Telefone / WhatsApp</label><input id="contact-phone" name="phone" type="tel" inputMode="tel" value={formData.phone} onChange={handleChange} autoComplete="tel" required placeholder="(00) 00000-0000" {...fieldAccessibility('phone')} />{errors.phone && <span id="phone-error" className={styles.error}>{errors.phone}</span>}</div>
              <div className={styles.field}><label htmlFor="contact-reason">Como podemos começar?</label><select id="contact-reason" name="reason" value={formData.reason} onChange={handleChange} required {...fieldAccessibility('reason')}><option value="" disabled>Escolha uma opção</option>{reasons.map((reason) => <option value={reason} key={reason}>{reason}</option>)}</select>{errors.reason && <span id="reason-error" className={styles.error}>{errors.reason}</span>}</div>
            </div>
            <div className={styles.field}><label htmlFor="contact-message">O que está acontecendo hoje?</label><textarea id="contact-message" name="message" value={formData.message} onChange={handleChange} rows="5" required placeholder="Ex.: hoje controlamos isso por planilhas e WhatsApp, e está tomando muito tempo da equipe." {...fieldAccessibility('message')} />{errors.message && <span id="message-error" className={styles.error}>{errors.message}</span>}</div>
            {submitError && <p className={styles.submitError} role="alert">{submitError}</p>}
            <button className={styles.submitButton} type="submit"><span>Enviar diagnóstico pelo WhatsApp</span><span aria-hidden="true">→</span></button>
            <small className={styles.formNote}>A conversa abre diretamente no WhatsApp. Sem compromisso.</small>
          </form>
        </div>
      </div>
    </section>
  )
}
export default Contact
