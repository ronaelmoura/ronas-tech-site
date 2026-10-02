import test from 'node:test'
import assert from 'node:assert/strict'

test('tracking stays disabled until acceptance; rejection revokes and reloads', async () => {
  const storage = new Map()
  let reloads = 0
  const events = []
  globalThis.window = {
    localStorage: { getItem: (key) => storage.get(key), setItem: (key, value) => storage.set(key, value) },
    dispatchEvent: (event) => events.push(event.type),
    location: { reload: () => reloads++ },
  }
  try {
    const consent = await import('../src/utils/consent.js?fresh')
    assert.equal(consent.hasTrackingConsent(), false)
    storage.set(consent.CONSENT_KEY, 'invalid')
    assert.equal(consent.getTrackingConsent(), null)
    consent.setTrackingConsent('declined')
    assert.equal(consent.hasTrackingConsent(), false)
    assert.equal(reloads, 0)
    consent.setTrackingConsent('accepted')
    assert.equal(consent.hasTrackingConsent(), true)
    assert.equal(storage.get(consent.CONSENT_KEY), 'accepted')
    consent.setTrackingConsent('declined')
    assert.equal(consent.hasTrackingConsent(), false)
    assert.equal(reloads, 1)
    assert.equal(events.length, 3)
  } finally { delete globalThis.window }
})

test('blocked storage does not break the current choice', async () => {
  globalThis.window = {
    localStorage: { getItem() { throw Error('blocked') }, setItem() { throw Error('blocked') } },
    dispatchEvent() {}, location: { reload() {} },
  }
  try {
    const consent = await import('../src/utils/consent.js?blocked')
    assert.equal(consent.hasTrackingConsent(), false)
    consent.setTrackingConsent('accepted')
    assert.equal(consent.hasTrackingConsent(), true)
  } finally { delete globalThis.window }
})
