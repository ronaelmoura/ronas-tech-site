import { useState } from 'react'
import { siteConfig } from '../../config/siteConfig'
import {
  setEnhancedConversionUserData,
  trackContactFormSubmit,
  trackExternalLink,
  trackWhatsAppClick,
} from '../../utils/analytics'
import { isValidBrazilPhone, toE164BrazilPhone } from '../../utils/phone'
import styles from './Contact.module.css'

const initialFormData = {
  name: '',
  company: '',
  phone: '',
  reason: '',
  message: '',
}

const reasons = ['Vaga CLT', 'Vaga PJ', 'Projeto freelance', 'Outro assunto']

// Recrutadores costumam preferir LinkedIn ou e-mail; quem quer um projeto
// costuma preferir o WhatsApp. Os dois caminhos ficam lado a lado.
const paths = [
  {
    title: 'Vagas e oportunidades',
    text: 'Para recrutadores e empresas contratando desenvolvedor Full Stack.',
    links: [
      { label: 'LinkedIn', href: siteConfig.linkedin, platform: 'linkedin', external: true },
      { label: siteConfig.email, href: `mailto:${siteConfig.email}` },
    ],
  },
  {
    title: 'Projetos freelance',
    text: 'Para quem precisa de um sistema web, uma API ou uma interface.',
    links: [
      { label: `WhatsApp ${siteConfig.whatsappDisplay}`, href: `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Olá, Ronael! Vi seu site e quero conversar sobre um projeto.')}`, whatsapp: true, external: true },
      { label: 'GitHub', href: siteConfig.github, platform: 'github', external: true },
    ],
  },
]

function validateForm(formData) {
  const errors = {}
  if (formData.name.trim().length < 2) errors.name = 'Informe seu nome.'
  if (!isValidBrazilPhone(formData.phone)) errors.phone = 'Informe um telefone com DDD, por exemplo (88) 99302-1946.'
  if (!formData.reason) errors.reason = 'Selecione o assunto.'
  if (!formData.message.trim()) errors.message = 'Escreva uma mensagem curta.'
  return errors
}

function createWhatsAppMessage(formData) {
  return [
    'Olá, Ronael! Vim pelo seu site.',
    '',
    `Nome: ${formData.name.trim()}`,
    formData.company.trim() ? `Empresa: ${formData.company.trim()}` : null,
    `Assunto: ${formData.reason}`,
    `Mensagem: ${formData.message.trim()}`,
  ].filter((line) => line !== null).join('\n')
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

    // O window.open precisa acontecer de forma síncrona dentro do gesto do
    // usuário, antes do tracking: qualquer espera faz o navegador bloquear
    // a aba. O gtag.js envia os eventos por sendBeacon logo em seguida.
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
    return {
      'aria-invalid': hasError,
      'aria-describedby': hasError ? `${fieldName}-error` : undefined,
    }
  }

  function handlePathLink(link) {
    if (link.whatsapp) trackWhatsAppClick('contact_freelance')
    else if (link.platform) trackExternalLink(link.platform)
  }

  return (
    <section id="contato" className={`${styles.section} reveal`} aria-labelledby="contact-title">
      <div className={styles.container}>
        <div className={styles.information}>
          <p className={styles.eyebrow}>Contato</p>
          <h2 id="contact-title">Tem uma vaga ou um projeto? Vamos conversar.</h2>
          <p className={styles.subtitle}>
            Respondo pessoalmente. Escolha o canal que for mais prático para você ou use o formulário.
          </p>

          <div className={styles.paths}>
            {paths.map(({ title, text, links }) => (
              <article className={styles.path} key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
                <ul>
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        data-ronas-cta={link.whatsapp ? 'contact_freelance' : undefined}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        onClick={() => handlePathLink(link)}
                      >
                        {link.label} <span aria-hidden="true">→</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.formCard}>
          <header className={styles.formHeader}>
            <h3>Enviar mensagem</h3>
            <p>A mensagem abre no WhatsApp já preenchida, pronta para enviar.</p>
          </header>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label htmlFor="contact-name">Nome</label>
                <input id="contact-name" name="name" type="text" value={formData.name} onChange={handleChange} autoComplete="name" required placeholder="Seu nome" {...fieldAccessibility('name')} />
                {errors.name && <span id="name-error" className={styles.error}>{errors.name}</span>}
              </div>
              <div className={styles.field}>
                <label htmlFor="contact-company">Empresa <small>(opcional)</small></label>
                <input id="contact-company" name="company" type="text" value={formData.company} onChange={handleChange} autoComplete="organization" placeholder="Onde você trabalha" />
              </div>
            </div>

            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label htmlFor="contact-phone">Telefone / WhatsApp</label>
                <input id="contact-phone" name="phone" type="tel" inputMode="tel" value={formData.phone} onChange={handleChange} autoComplete="tel" required placeholder="(00) 00000-0000" {...fieldAccessibility('phone')} />
                {errors.phone && <span id="phone-error" className={styles.error}>{errors.phone}</span>}
              </div>
              <div className={styles.field}>
                <label htmlFor="contact-reason">Assunto</label>
                <select id="contact-reason" name="reason" value={formData.reason} onChange={handleChange} required {...fieldAccessibility('reason')}>
                  <option value="" disabled>Selecione</option>
                  {reasons.map((reason) => <option value={reason} key={reason}>{reason}</option>)}
                </select>
                {errors.reason && <span id="reason-error" className={styles.error}>{errors.reason}</span>}
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="contact-message">Mensagem</label>
              <textarea id="contact-message" name="message" value={formData.message} onChange={handleChange} rows="5" required placeholder="Conte sobre a vaga ou o projeto em poucas linhas." {...fieldAccessibility('message')} />
              {errors.message && <span id="message-error" className={styles.error}>{errors.message}</span>}
            </div>

            {submitError && <p className={styles.submitError} role="alert">{submitError}</p>}

            <button className={styles.submitButton} type="submit">
              Abrir no WhatsApp <span aria-hidden="true">→</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
