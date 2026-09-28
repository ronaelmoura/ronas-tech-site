import styles from './WhyRonasTech.module.css'

const reasons = [
  { title: 'Você fala com quem desenvolve', description: 'Sem repassar sua necessidade para uma equipe comercial. A conversa é diretamente com quem vai entender e construir a solução.' },
  { title: 'Começamos pelo problema', description: 'Antes de escolher ferramenta ou tecnologia, procuramos entender onde sua operação está perdendo tempo, dinheiro ou oportunidades.' },
  { title: 'Tecnologia sem complicação', description: 'A explicação precisa fazer sentido para quem toca o negócio. Jargão técnico não resolve problema de empresa.' },
  { title: 'Feito para a sua rotina', description: 'Quando uma solução pronta não encaixa no processo, desenvolvemos o que falta em vez de obrigar sua equipe a trabalhar de outro jeito.' },
]

function WhyRonasTech() {
  return (
    <section id="por-que-ronas" className={styles.section} aria-labelledby="why-title">
      <div className={styles.container}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Por que Ronas Tech</p>
          <h2 id="why-title">Tecnologia precisa caber no jeito que sua empresa trabalha.</h2>
          <p>A Ronas Tech é uma operação independente. Isso deixa a conversa mais direta e permite construir cada projeto de acordo com a necessidade real.</p>
        </div>
        <div className={styles.grid}>
          {reasons.map((reason,index) => (
            <article className={styles.card} key={reason.title}>
              <span>{String(index+1).padStart(2,'0')}</span>
              <h3>{reason.title}</h3>
              <p>{reason.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyRonasTech
