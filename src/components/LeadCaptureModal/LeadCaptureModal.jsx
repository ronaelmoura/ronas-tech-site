import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '../../config/siteConfig'
import { setEnhancedConversionUserData, trackWhatsAppClick } from '../../utils/analytics'
import { isValidBrazilPhone, toE164BrazilPhone } from '../../utils/phone'
import styles from './LeadCaptureModal.module.css'

function defaultMessage(name) {
  return `Olá! Me chamo ${name}. Acessei o site da Ronas Tech e gostaria de explicar meu problema e solicitar atendimento.`
}

// Modal de captura rápida (nome + telefone) exibido antes de redirecionar o
// visitante ao WhatsApp. Os dados alimentam as Conversões Otimizadas do
// Google Ads, melhorando a atribuição da conversão "Contato".
function LeadCaptureModal({
  open,
  onClose,
  trackingLocation,
  buildMessage = defaultMessage,
  title = 'Antes de continuar',
  description = 'Deixe seu nome e telefone para agilizarmos seu atendimento no WhatsApp.',
}) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const nameInputRef = useRef(null)
  const dialogRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const previouslyFocused = document.activeElement
    nameInputRef.current?.focus()

    // Esc fecha o modal e o Tab circula apenas entre os campos do diálogo.
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll('input, button')
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previouslyFocused?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedName = name.trim()

    if (trimmedName.length < 2) {
      setError('Informe seu nome para continuarmos.')
      return
    }
    if (!isValidBrazilPhone(phone)) {
      setError('Informe um telefone com DDD, por exemplo (88) 99302-1946.')
      return
    }
    setError('')

    // O window.open precisa acontecer de forma síncrona dentro do gesto do
    // usuário: qualquer espera (setTimeout, Promise, await) faz o navegador
    // perder a "user activation" e bloquear a aba silenciosamente — no Safari
    // do iOS e em vários Android isso contava a conversão sem abrir o
    // WhatsApp. O tracking vai logo depois, ainda de forma síncrona, porque o
    // gtag.js envia os dados por sendBeacon e a navegação não cancela isso.
    const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(buildMessage(trimmedName))}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')

    const phoneE164 = toE164BrazilPhone(phone)
    setEnhancedConversionUserData({ name: trimmedName, phoneE164 })
    trackWhatsAppClick(trackingLocation)

    setName('')
    setPhone('')
    onClose()
  }

  return (
    <div
      className={styles.overlay}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-capture-title"
        aria-describedby="lead-capture-description"
      >
        <h2 id="lead-capture-title">{title}</h2>
        <p id="lead-capture-description">{description}</p>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="lead-capture-name">Seu nome</label>
          <input
            id="lead-capture-name"
            ref={nameInputRef}
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Como podemos te chamar?"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <label htmlFor="lead-capture-phone">Seu telefone (WhatsApp)</label>
          <input
            id="lead-capture-phone"
            type="tel"
            name="phone"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(88) 99302-1946"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
          />

          <p className={styles.error} role="alert">{error || ' '}</p>

          <button className={styles.submit} type="submit">
            Continuar para o WhatsApp <span aria-hidden="true">→</span>
          </button>
        </form>

        <button className={styles.cancel} type="button" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </div>
  )
}

export default LeadCaptureModal
