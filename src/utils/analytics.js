import { siteConfig } from '../config/siteConfig'

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim()
const hasValidMeasurementId = /^G-[A-Z0-9]+$/.test(measurementId || '')
const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}`

const externalLinks = {
  github: siteConfig.github,
  linkedin: siteConfig.linkedin,
  portfolio: siteConfig.portfolio,
}

export function initializeAnalytics() {
  if (
    !hasValidMeasurementId ||
    typeof window === 'undefined' ||
    typeof document === 'undefined' ||
    window.__ronasAnalyticsInitialized
  ) {
    return
  }

  window.__ronasAnalyticsInitialized = true
  window.dataLayer = window.dataLayer || []
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments)
    }

  window.gtag('js', new Date())
  window.gtag('config', measurementId)

  if (!document.getElementById('google-analytics-script')) {
    const script = document.createElement('script')
    script.id = 'google-analytics-script'
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
    document.head.appendChild(script)
  }
}

export function trackEvent(eventName, eventParameters = {}) {
  if (!hasValidMeasurementId || typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', eventName, eventParameters)
}

export function trackWhatsAppClick(location) {
  trackEvent('whatsapp_click', {
    location,
    link_url: whatsappUrl,
  })
}

export function trackContactFormSubmit(projectType) {
  trackEvent('contact_form_submit', {
    project_type: projectType,
    contact_method: 'whatsapp',
  })
}

export function trackExternalLink(platform, linkUrl = externalLinks[platform]) {
  trackEvent('external_link_click', {
    platform,
    link_url: linkUrl,
  })
}

export function getCampaignContext() {
  if (typeof window === 'undefined') return ''
  const params = new URLSearchParams(window.location.search)
  const source = params.get('utm_source')
  const medium = params.get('utm_medium')
  const campaign = params.get('utm_campaign')
  const content = params.get('utm_content')
  if (!source && !medium && !campaign && !content) return ''
  const parts = [
    source && `Origem: ${source}`,
    medium && `mídia: ${medium}`,
    campaign && `campanha: ${campaign}`,
    content && `criativo: ${content}`,
  ].filter(Boolean)
  return parts.join(' — ')
}

export function withCampaign(message) {
  const campaign = getCampaignContext()
  return campaign ? `${message}\n\n${campaign}` : message
}

export function trackConversion(eventName, parameters = {}) {
  trackEvent(eventName, parameters)
}
