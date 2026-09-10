// Horário real de atendimento da Ronas Tech: todos os dias, das 09h à
// meia-noite, no fuso de Tianguá (Ceará). O indicador que aparece no site
// é calculado a partir do relógio, nunca de um texto fixo — se estiver
// fora do horário, o visitante lê exatamente isso em vez de uma promessa
// que não será cumprida naquele momento.
export const OPENING_HOUR = 9
export const CLOSING_HOUR = 24
const TIME_ZONE = 'America/Fortaleza'

function currentHourInFortaleza(now) {
  const formatter = new Intl.DateTimeFormat('pt-BR', { timeZone: TIME_ZONE, hour: 'numeric', hour12: false })
  return Number(formatter.format(now))
}

export function getAvailability(now = new Date()) {
  let hour
  try {
    hour = currentHourInFortaleza(now)
  } catch {
    // Sem suporte a fuso horário: cai para o relógio local do visitante.
    hour = now.getHours()
  }
  // O formatador devolve 24 para a meia-noite em pt-BR; normalizamos.
  if (hour === 24) hour = 0
  const isOpen = hour >= OPENING_HOUR && hour < CLOSING_HOUR

  if (isOpen) {
    return {
      isOpen: true,
      label: 'Atendendo agora',
      detail: 'Resposta inicial em até 1 hora, até a meia-noite de hoje.',
    }
  }

  return {
    isOpen: false,
    label: 'Fora do horário',
    detail: 'Deixe sua mensagem agora — respondo a partir das 09h.',
  }
}
