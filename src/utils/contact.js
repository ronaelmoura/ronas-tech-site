export function createWhatsAppMessage(formData) {
  return [
    'Olá, Ronael! Vim pelo seu site.',
    '',
    `Nome: ${formData.name.trim()}`,
    formData.company.trim() ? `Empresa: ${formData.company.trim()}` : null,
    `Telefone: ${formData.phone.trim()}`,
    `Assunto: ${formData.reason}`,
    `Mensagem: ${formData.message.trim()}`,
  ].filter((line) => line !== null).join('\n')
}
