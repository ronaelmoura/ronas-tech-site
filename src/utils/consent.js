export const CONSENT_KEY = 'ronas_tracking_consent_v1'
let sessionChoice

export function getTrackingConsent() {
  if (typeof window === 'undefined') return null
  if (sessionChoice !== undefined) return sessionChoice
  try {
    const saved = window.localStorage.getItem(CONSENT_KEY)
    return saved === 'accepted' || saved === 'declined' ? saved : null
  } catch { return null }
}

export const hasTrackingConsent = () => getTrackingConsent() === 'accepted'

export function setTrackingConsent(choice) {
  if (choice !== 'accepted' && choice !== 'declined') return
  const wasAccepted = hasTrackingConsent()
  sessionChoice = choice
  try { window.localStorage.setItem(CONSENT_KEY, choice) } catch { /* Choice still applies in this document. */ }
  window.dispatchEvent(new Event('ronas:consent'))
  // Reload removes previously loaded third-party scripts after revocation.
  if (wasAccepted && choice === 'declined') window.location.reload()
}
