import test from 'node:test'
import assert from 'node:assert/strict'
import { isValidBrazilPhone, toE164BrazilPhone } from '../src/utils/phone.js'
import { createWhatsAppMessage } from '../src/utils/contact.js'

test('accepts local DDD 55 and equivalent international numbers', () => {
  for (const number of ['(55) 99999-1234', '(55) 3333-1234', '+55 55 99999-1234', '+55 55 3333-1234', '(88) 99302-1946']) {
    assert.equal(isValidBrazilPhone(number), true, number)
  }
  assert.equal(toE164BrazilPhone('(55) 99999-1234'), '+5555999991234')
  assert.equal(toE164BrazilPhone('+55 55 99999-1234'), '+5555999991234')
})

test('rejects empty, incomplete and malformed numbers', () => {
  for (const number of ['', '123', '00000000000', '(88) 12345-6789', '+1 415 555 1234', '+55 88 99302-19460']) {
    assert.equal(isValidBrazilPhone(number), false, number)
  }
})

test('includes the supplied contact phone and preserves punctuation through URL encoding', () => {
  const message = createWhatsAppMessage({ name: ' Ana ', company: '', phone: '(55) 99999-1234', reason: 'Projeto freelance', message: 'Site & API? Sim! #projeto' })
  const url = new URL(`https://wa.me/5588993021946?text=${encodeURIComponent(message)}`)
  assert.equal(url.searchParams.get('text'), message)
  assert.match(message, /Nome: Ana\nTelefone: \(55\) 99999-1234/)
  assert.doesNotMatch(message, /Empresa:/)
})
