// Faixa de garantia. Nada aqui é promessa nova: são os mesmos compromissos
// que já aparecem no hero, na seção de segurança e no FAQ, reunidos no ponto
// em que o visitante decide. A objeção de quem nunca contratou suporte
// remoto é sempre a mesma — "e se me cobrarem sem resolver?".
const guarantees = [
  ['Triagem gratuita', 'Você explica o problema pelo WhatsApp sem pagar nada e sem compromisso de contratar.'],
  ['Valor aprovado antes', 'O preço final é informado depois do diagnóstico. Nenhum serviço começa sem o seu "pode fazer".'],
  ['Pagamento depois', 'Você paga com o problema resolvido. Se não der para resolver remotamente, eu explico o motivo antes de cobrar.'],
]

function Assurance() {
  return (
    <div className="assurance reveal" aria-label="Compromissos do atendimento">
      {guarantees.map(([title, description]) => (
        <div key={title}>
          <b aria-hidden="true">✓</b>
          <strong>{title}</strong>
          <span>{description}</span>
        </div>
      ))}
    </div>
  )
}

export default Assurance
