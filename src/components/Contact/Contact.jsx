import { useState } from 'react'
import { siteConfig } from '../../config/siteConfig'
import {
  trackContactFormSubmit,
  trackWhatsAppClick,
} from '../../utils/analytics'
import styles from './Contact.module.css'

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  projectType: '',
  message: '',
}

const projectTypes = [
  'Site profissional',
  'Landing Page',
  'Sistema Web',
  'API ou integração',
  'Manutenção ou melhoria',
  'Outro',
]

const directWhatsappMessage =
  'Olá! Conheci a Ronas Tech pelo site e gostaria de conversar sobre um projeto.'
const directWhatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(directWhatsappMessage)}`

const contactIcons = {
  whatsapp: (
    <>
      <path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.4-4.7A8.5 8.5 0 1 1 20.5 11.6Z" />
      <path d="M8.2 7.5c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .5.4l.8 2c.1.2.1.4-.1.6l-.7.8c-.2.2-.1.4 0 .6.7 1.2 1.6 2.1 2.8 2.7.2.1.4.1.6-.1l.9-1c.2-.2.4-.3.7-.2l1.9.9c.3.1.4.3.4.5 0 .3-.2 1.4-.9 2-.6.6-1.5.8-2.4.6-1.2-.3-2.8-.9-4.7-2.6-1.5-1.4-2.6-3.1-2.9-4.3-.3-1.2.1-2 .4-2.5Z" />
    </>
  ),
  email: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  location: (
    <>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
}

function ContactIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {contactIcons[name]}
      </g>
    </svg>
  )
}

function validateForm(formData) {
  const errors = {}
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!formData.name.trim()) errors.name = 'Informe seu nome.'

  if (!formData.email.trim()) {
    errors.email = 'Informe seu e-mail.'
  } else if (!emailPattern.test(formData.email.trim())) {
    errors.email = 'Informe um e-mail válido.'
  }

  if (!formData.phone.trim()) errors.phone = 'Informe seu WhatsApp.'
  if (!formData.projectType) errors.projectType = 'Selecione o tipo de projeto.'
  if (!formData.message.trim()) errors.message = 'Conte um pouco sobre o projeto.'

  return errors
}

function createWhatsAppMessage(formData) {
  return [
    'Olá! Gostaria de solicitar um orçamento pela Ronas Tech.',
    '',
    `Nome: ${formData.name.trim()}`,
    `E-mail: ${formData.email.trim()}`,
    `WhatsApp: ${formData.phone.trim()}`,
    `Tipo de projeto: ${formData.projectType}`,
    `Mensagem: ${formData.message.trim()}`,
  ].join('\n')
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
      const firstInvalidField = Object.keys(validationErrors)[0]
      document.getElementById(`contact-${firstInvalidField}`)?.focus()
      return
    }

    const message = createWhatsAppMessage(formData)
    const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`
    const whatsappWindow = window.open(whatsappUrl, '_blank')

    if (!whatsappWindow) {
      setSubmitError(
        'Não foi possível abrir o WhatsApp. Permita pop-ups no navegador e tente novamente.',
      )
      return
    }

    whatsappWindow.opener = null
    trackWhatsAppClick('contact_form')
    trackContactFormSubmit(formData.projectType)
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

  return (
    <section
      id="contato"
      className={styles.section}
      aria-labelledby="contact-title"
    >
      <div className={styles.container}>
        <div className={styles.information}>
          <p className={styles.eyebrow}>Entre em contato</p>
          <h2 id="contact-title">Vamos tirar seu projeto do papel?</h2>
          <p className={styles.subtitle}>
            Conte um pouco sobre a sua ideia, necessidade ou desafio. A Ronas
            Tech entrará em contato para entender o projeto e apresentar a melhor
            solução.
          </p>

          <address className={styles.contactList}>
            <a
              href={directWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactItem}
              onClick={() => trackWhatsAppClick('contact')}
            >
              <span className={styles.contactIcon}>
                <ContactIcon name="whatsapp" />
              </span>
              <span>
                <small>WhatsApp</small>
                <strong>{siteConfig.whatsappDisplay}</strong>
              </span>
            </a>

            <a
              href={`mailto:${siteConfig.email}`}
              className={styles.contactItem}
            >
              <span className={styles.contactIcon}>
                <ContactIcon name="email" />
              </span>
              <span>
                <small>E-mail</small>
                <strong>{siteConfig.email}</strong>
              </span>
            </a>

            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>
                <ContactIcon name="location" />
              </span>
              <span>
                <small>Localização</small>
                <strong>{siteConfig.location} — Atendimento online para todo o Brasil</strong>
              </span>
            </div>
          </address>

          <p className={styles.supportText}>
            Atendimento próximo, comunicação clara e soluções desenvolvidas de
            acordo com a necessidade de cada negócio.
          </p>

          <a
            className={styles.whatsappButton}
            href={directWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('contact')}
          >
            <ContactIcon name="whatsapp" />
            Falar pelo WhatsApp
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className={styles.formCard}>
          <header className={styles.formHeader}>
            <span>Orçamento personalizado</span>
            <h3>Conte sobre o seu projeto</h3>
            <p>Preencha os campos abaixo. Retornaremos o contato em breve.</p>
          </header>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label htmlFor="contact-name">Nome</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  placeholder="Seu nome"
                  className={errors.name ? styles.invalid : ''}
                  {...fieldAccessibility('name')}
                />
                {errors.name && (
                  <span id="name-error" className={styles.error}>
                    {errors.name}
                  </span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-email">E-mail</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  inputMode="email"
                  placeholder="voce@empresa.com"
                  className={errors.email ? styles.invalid : ''}
                  {...fieldAccessibility('email')}
                />
                {errors.email && (
                  <span id="email-error" className={styles.error}>
                    {errors.email}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label htmlFor="contact-phone">WhatsApp</label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="(00) 0 0000-0000"
                  className={errors.phone ? styles.invalid : ''}
                  {...fieldAccessibility('phone')}
                />
                {errors.phone && (
                  <span id="phone-error" className={styles.error}>
                    {errors.phone}
                  </span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-projectType">Tipo de projeto</label>
                <select
                  id="contact-projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className={errors.projectType ? styles.invalid : ''}
                  {...fieldAccessibility('projectType')}
                >
                  <option value="" disabled>
                    Selecione uma opção
                  </option>
                  {projectTypes.map((projectType) => (
                    <option value={projectType} key={projectType}>
                      {projectType}
                    </option>
                  ))}
                </select>
                {errors.projectType && (
                  <span id="projectType-error" className={styles.error}>
                    {errors.projectType}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="contact-message">Mensagem</label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="Descreva sua ideia, necessidade ou desafio..."
                className={errors.message ? styles.invalid : ''}
                {...fieldAccessibility('message')}
              />
              {errors.message && (
                <span id="message-error" className={styles.error}>
                  {errors.message}
                </span>
              )}
            </div>

            {submitError && (
              <p className={styles.submitError} role="alert">
                {submitError}
              </p>
            )}

            <button className={styles.submitButton} type="submit">
              Solicitar orçamento
              <span aria-hidden="true">→</span>
            </button>

            <p className={styles.privacyNote}>
              Seus dados são utilizados somente para responder à sua solicitação
              de contato.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
