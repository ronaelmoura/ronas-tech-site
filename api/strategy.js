import { generateText, gateway } from 'ai'

const requestsByIp = new Map()
const WINDOW_MS = 60 * 60 * 1000
const MAX_REQUESTS_PER_WINDOW = 5

function getClientIp(request) {
  const forwarded = request.headers['x-forwarded-for']
  return Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0]?.trim() || 'unknown'
}

function withinLimit(ip) {
  const now = Date.now()
  const recent = (requestsByIp.get(ip) || []).filter((time) => now - time < WINDOW_MS)
  if (recent.length >= MAX_REQUESTS_PER_WINDOW) return false
  recent.push(now)
  requestsByIp.set(ip, recent)
  return true
}

function clean(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Método não permitido.' })
  const ip = getClientIp(request)
  if (!withinLimit(ip)) return response.status(429).json({ error: 'Limite de diagnósticos atingido. Tente novamente mais tarde.' })

  const business = clean(request.body?.business, 90)
  const audience = clean(request.body?.audience, 90)
  const challenge = clean(request.body?.challenge, 600)
  const goal = clean(request.body?.goal, 90)
  const consent = request.body?.consent === true

  if (!business || !challenge || !consent) return response.status(400).json({ error: 'Dados insuficientes para gerar o plano.' })

  try {
    const apiKey = process.env.AI_GATEWAY_API_KEY
    if (!apiKey) throw new Error('AI_GATEWAY_API_KEY não configurada no servidor.')

    const { text } = await generateText({
      model: gateway('openai/gpt-5.4'),
      maxOutputTokens: 360,
      instructions: 'Você é o estrategista de produto da Ronas Tech, empresa brasileira que cria sites, automações e sistemas para pequenos negócios. Responda em português do Brasil, sem prometer resultados garantidos, sem inventar números e sem usar jargão excessivo. Gere um plano objetivo com exatamente estes títulos em linhas separadas: LEITURA DO CENÁRIO, SOLUÇÃO INICIAL, PRIMEIRO PASSO. Em cada título, escreva no máximo dois parágrafos curtos. Não fale sobre preços.',
      prompt: `Negócio: ${business}\nPúblico: ${audience || 'não informado'}\nDesafio: ${challenge}\nObjetivo principal: ${goal}`,
    })
    return response.status(200).json({ plan: text })
  } catch {
    return response.status(502).json({ error: 'Não foi possível gerar o plano agora. Você pode falar diretamente pelo WhatsApp.' })
  }
}
