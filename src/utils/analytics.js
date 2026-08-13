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
  getCampaignAttribution()
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
  const attribution = getCampaignAttribution()
  window.gtag('event', eventName, { ...eventParameters, ...attribution })
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
  const attribution = getCampaignAttribution()
  if (!Object.values(attribution).some(Boolean)) return ''
  const parts = [
    attribution.utm_source && `Origem: ${attribution.utm_source}`,
    attribution.utm_campaign && `Campanha: ${attribution.utm_campaign}`,
    attribution.utm_content && `Conteúdo: ${attribution.utm_content}`,
    attribution.utm_medium && `Mídia: ${attribution.utm_medium}`,
    attribution.fbclid && `Clique: ${attribution.fbclid.slice(0, 18)}`,
  ].filter(Boolean)
  return parts.join('\n')
}

const campaignKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'fbclid']
const campaignStorageKey = 'ronas_campaign_attribution'

export function getCampaignAttribution() {
  if (typeof window === 'undefined') return {}
  const current = Object.fromEntries(new URLSearchParams(window.location.search).entries())
  const stored = (() => {
    try { return JSON.parse(window.sessionStorage.getItem(campaignStorageKey) || '{}') } catch { return {} }
  })()
  const next = campaignKeys.reduce((result, key) => { if (current[key]) result[key] = current[key]; else if (stored[key]) result[key] = stored[key]; return result }, {})
  if (Object.keys(next).length) {
    try { window.sessionStorage.setItem(campaignStorageKey, JSON.stringify(next)) } catch { /* storage is optional */ }
  }
  return next
}

export function withCampaign(message) {
  const campaign = getCampaignContext()
  return campaign ? `${message}\n\n${campaign}` : message
}

export function trackConversion(eventName, parameters = {}) {
  trackEvent(eventName, parameters)
}
