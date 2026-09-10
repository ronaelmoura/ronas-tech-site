import styles from './TrustBand.module.css'

// Sinais de confiança verificáveis — não depoimentos inventados. Quem avalia
// e mexe no computador, o prazo de retorno, a política de preço e a formação
// são todos conferíveis, e por isso podem ficar na página hoje.
const reasons = [
  ['Atendimento sem intermediários', 'Quem avalia e mexe no seu computador é o Ronael — não uma equipe terceirizada.'],
  ['Resposta rápida', 'Retorno em até 1 hora, todos os dias, das 9h à meia-noite.'],
  ['Preço fechado antes de começar', 'Diagnóstico a partir de R$ 39. Nada é cobrado sem sua aprovação do valor final.'],
  ['Formação técnica reconhecida', 'Full Stack pelo SENAI, com experiência prática em suporte de TI.'],
]

// Prova real de terceiros. Esta é a informação que falta na página e que
// todos os concorrentes exibem; é também a que não pode ser inventada,
// porque o negócio é local e reputação forjada em cidade pequena não
// sobrevive. Enquanto o array estiver vazio nada é renderizado — esse é o
// comportamento correto, e não uma pendência a ser preenchida com estimativa.
//
// Cada item aceita um destes três formatos:
//
//   { kind: 'rating', value: 4.9, count: 37,
//     href: 'https://…' }              nota e nº de avaliações do Google
//                                      Perfil da Empresa. O href leva ao
//                                      perfil, para a nota ser conferível.
//
//   { kind: 'count', value: 240,
//     label: 'atendimentos realizados' } número apurado, não estimado.
//
//   { kind: 'testimonial', quote: '…',
//     author: 'Nome', city: 'Cidade' }  depoimento com autorização de quem
//                                      falou. Sem nome e cidade não entra.
//
// Ao preencher, confira que o dado é verificável na origem antes de publicar.
const proof = []

function ProofItem({ item }) {
  if (item.kind === 'rating') {
    const content = (
      <>
        <strong className={styles.proofValue}>
          {item.value.toLocaleString('pt-BR', { minimumFractionDigits: 1 })}
        </strong>
        <span className={styles.proofLabel}>
          {item.count} avaliações no Google
        </span>
      </>
    )
    return item.href
      ? <a className={styles.proofItem} href={item.href} target="_blank" rel="noopener noreferrer">{content}</a>
      : <div className={styles.proofItem}>{content}</div>
  }

  if (item.kind === 'count') {
    return (
      <div className={styles.proofItem}>
        <strong className={styles.proofValue}>{item.value.toLocaleString('pt-BR')}</strong>
        <span className={styles.proofLabel}>{item.label}</span>
      </div>
    )
  }

  if (item.kind === 'testimonial') {
    return (
      <figure className={styles.testimonial}>
        <blockquote>{item.quote}</blockquote>
        <figcaption>{item.author} · {item.city}</figcaption>
      </figure>
    )
  }

  return null
}

function TrustBand() {
  return (
    <section className={`${styles.section} reveal`} aria-labelledby="trust-title">
      <div className={styles.container}>
        <header>
          <p>Antes de decidir</p>
          <h2 id="trust-title">Motivos para confiar, não só promessas.</h2>
        </header>
        {proof.length > 0 && (
          <div className={styles.proof}>
            {proof.map((item, index) => <ProofItem item={item} key={item.kind + index} />)}
          </div>
        )}
        <div className={styles.grid}>
          {reasons.map(([title, description]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustBand
