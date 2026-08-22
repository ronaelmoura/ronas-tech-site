// Meta Pixel (Facebook/Instagram Ads).
//
// The pixel only loads when VITE_META_PIXEL_ID is set, so local runs, previews
// and forks stay clean — same approach used for GA in ./analytics.
//
// Checkout happens off-site on Kiwify, so this file can only report intent
// (ViewContent, InitiateCheckout). The Purchase event has to be fired by
// Kiwify itself — set the same pixel ID in the Kiwify dashboard, otherwise
// Meta optimises against clicks it can never tie to a sale.

const pixelId = import.meta.env.VITE_META_PIXEL_ID?.trim()
const hasValidPixelId = /^\d{10,20}$/.test(pixelId || '')

export function initializeMetaPixel() {
  if (
    !hasValidPixelId ||
    typeof window === 'undefined' ||
    typeof document === 'undefined' ||
    window.__ronasPixelInitialized
  ) {
    return
  }

  window.__ronasPixelInitialized = true

  // Queue stub, so events fired before fbevents.js lands are not lost.
  window.fbq =
    window.fbq ||
    function fbq(...args) {
      if (window.fbq.callMethod) window.fbq.callMethod(...args)
      else window.fbq.queue.push(args)
    }

  window._fbq = window._fbq || window.fbq
  window.fbq.push = window.fbq
  window.fbq.loaded = true
  window.fbq.version = '2.0'
  window.fbq.queue = window.fbq.queue || []

  if (!document.getElementById('meta-pixel-script')) {
    const script = document.createElement('script')
    script.id = 'meta-pixel-script'
    script.async = true
    script.src = 'https://connect.facebook.net/en_US/fbevents.js'
    document.head.appendChild(script)
  }

  window.fbq('init', pixelId)
  window.fbq('track', 'PageView')
}

export function trackPixelEvent(eventName, parameters = {}) {
  if (!hasValidPixelId || typeof window === 'undefined' || !window.fbq) return
  window.fbq('track', eventName, parameters)
}
