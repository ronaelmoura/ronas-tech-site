// Normaliza um telefone digitado pelo visitante para o formato E.164 exigido
// pelas Conversões Otimizadas do Google Ads (ex.: "+5588993021946").
// Assume Brasil: quando o visitante não digita o código do país, o "+55" é
// adicionado automaticamente.
export function toE164BrazilPhone(input) {
  const digits = String(input || '').replace(/\D/g, '')
  if (!digits) return ''
  if (digits.startsWith('55') && digits.length >= 12) return `+${digits}`
  return `+55${digits}`
}

// Um número brasileiro válido tem DDD + 8 ou 9 dígitos (10 ou 11 no total);
// aceitamos também o número já com o código do país (12 ou 13 dígitos).
export function isValidBrazilPhone(input) {
  const digits = String(input || '').replace(/\D/g, '')
  if (digits.startsWith('55')) return digits.length === 12 || digits.length === 13
  return digits.length === 10 || digits.length === 11
}
