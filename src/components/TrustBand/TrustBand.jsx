import styles from './TrustBand.module.css'

// Sinais de confiança verificáveis — não depoimentos inventados. Assim que
// existirem avaliações reais de clientes (Google Perfil da Empresa, por
// exemplo), este componente é o lugar certo para exibi-las.
const reasons = [
  ['Atendimento sem intermediários', 'Quem avalia e mexe no seu computador é o Ronael — não uma equipe terceirizada.'],
  ['Resposta rápida', 'Retorno em até 1 hora, todos os dias, das 9h à meia-noite.'],
  ['Preço fechado antes de começar', 'Diagnóstico a partir de R$ 29. Nada é cobrado sem sua aprovação do valor final.'],
  ['Formação técnica reconhecida', 'Full Stack pelo SENAI, com experiência prática em suporte de TI.'],
]

function TrustBand() {
  return (
    <section className={`${styles.section} reveal`} aria-labelledby="trust-title">
      <div className={styles.container}>
        <header>
          <p>Antes de decidir</p>
          <h2 id="trust-title">Motivos para confiar, não só promessas.</h2>
        </header>
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
