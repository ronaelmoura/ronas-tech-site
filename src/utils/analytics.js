import { siteConfig } from '../config/siteConfig'
import { trackPixelEvent } from './metaPixel'

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim()
const hasValidMeasurementId = /^G-[A-Z0-9]+$/.test(measurementId || '')

// Google Ads conversion tracking (separate from GA4). Both share the same
// gtag.js loader — only the conversion label needs to be set once the Google
// Ads conversion action ("Enviar mensagem no WhatsApp" ou similar) existir.
const googleAdsId = import.meta.env.VITE_GOOGLE_ADS_ID?.trim()
const hasValidGoogleAdsId = /^AW-\d+$/.test(googleAdsId || '')
const googleAdsConversionLabel = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_LABEL?.trim()
// O rótulo da ação de conversão "Contato" (a parte depois da barra em
// "AW-XXXXXXXXX/ROTULO", visível em Google Ads > Metas > Contato >
// Detalhes > "Detalhes da tag") vem sempre da variável de ambiente
// VITE_GOOGLE_ADS_CONVERSION_LABEL, nunca fixo no código.
const hasValidConversionLabel = hasValidGoogleAdsId && Boolean(googleAdsConversionLabel)
const hasAnyGoogleTag = hasValidMeasurementId || hasValidGoogleAdsId

const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}`

const externalLinks = {
  github: siteConfig.github,
  linkedin: siteConfig.linkedin,
  portfolio: siteConfig.portfolio,
}

export function initializeAnalytics() {
  getCampaignAttribution()
  if (
    !hasAnyGoogleTag ||
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
  if (hasValidMeasurementId) window.gtag('config', measurementId)
  if (hasValidGoogleAdsId) window.gtag('config', googleAdsId)

  const scriptTagId = measurementId || googleAdsId
  if (!document.getElementById('google-analytics-script')) {
    const script = document.createElement('script')
    script.id = 'google-analytics-script'
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(scriptTagId)}`
    document.head.appendChild(script)
  }
}

export function trackGoogleAdsConversion(parameters = {}) {
  if (!hasValidConversionLabel || typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', 'conversion', {
    send_to: `${googleAdsId}/${googleAdsConversionLabel}`,
    ...parameters,
  })
}

// Conversões Otimizadas: envia nome e telefone informados pelo visitante para
// o gtag.js, que gera o hash (SHA-256) no próprio navegador antes de mandar
// para o Google Ads — os dados brutos nunca saem do dispositivo.
export function setEnhancedConversionUserData({ name, phoneE164 }) {
  if (typeof window === 'undefined' || !window.gtag) return
  const userData = {}
  if (phoneE164) userData.phone_number = phoneE164
  if (name) userData.address = { first_name: name }
  if (!Object.keys(userData).length) return
  window.gtag('set', 'user_data', userData)
}

export function trackEvent(eventName, eventParameters = {}) {
  if (!hasValidMeasurementId || typeof window === 'undefined' || !window.gtag) return
  const attribution = getCampaignAttribution()
  window.gtag('event', eventName, { ...eventParameters, ...attribution })
}

export function trackWhatsAppClick(location) {
  // Abrir o WhatsApp é o momento em que o visitante vira lead — por isso,
  // além do evento no GA4, isso também dispara a conversão do Google Ads e
  // o evento "Lead" do Meta Pixel, quando cada um estiver configurado.
  trackEvent('whatsapp_click', {
    location,
    link_url: whatsappUrl,
  })
  trackGoogleAdsConversion({ location })
  trackPixelEvent('Lead', { content_name: location })
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
