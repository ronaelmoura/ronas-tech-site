import styles from './WhyRonasTech.module.css'

const reasons = [
  {
    number: '01',
    label: 'CONVERSA DIRETA',
    title: 'Você fala com quem desenvolve',
    description: 'Sem passar por uma cadeia de atendimento. A necessidade chega a quem vai pensar, construir e acompanhar a solução.',
    tone: 'blue',
  },
  {
    number: '02',
    label: 'ANTES DO CÓDIGO',
    title: 'Começamos pelo problema',
    description: 'Primeiro entendemos o que está travando sua rotina. Só depois decidimos se o caminho é um site, sistema, automação, IA ou outra solução.',
    tone: 'violet',
  },
  {
    number: '03',
    label: 'SEM ENROLAÇÃO',
    title: 'Você entende o que está sendo feito',
    description: 'Explicamos a solução de forma clara, alinhamos o que entra no projeto e deixamos o próximo passo definido antes de desenvolver.',
    tone: 'cyan',
  },
  {
    number: '04',
    label: 'FEITO PARA A ROTINA',
    title: 'A tecnologia se adapta ao seu processo',
    description: 'Quando uma ferramenta pronta não resolve o que sua empresa precisa, construímos o que falta sem complicar a operação.',
    tone: 'pink',
  },
]

function WhyRonasTech() {
  return (
    <section id="por-que-ronas" className={styles.section} aria-labelledby="why-title">
      <div className={styles.container}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Por que Ronas Tech</p>
          <h2 id="why-title">Você não precisa de mais um desenvolvedor. Precisa de uma solução que faça sentido.</h2>
          <p className={styles.lead}>
            A diferença começa antes do código: entendemos o problema, conversamos de forma direta e construímos só o que realmente precisa ser construído.
          </p>

          <div className={styles.signature}>
            <span className={styles.signatureDot} />
            <div>
              <strong>Problema → solução → tecnologia</strong>
              <span>nessa ordem.</span>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {reasons.map((reason) => (
            <article className={`${styles.card} ${styles[reason.tone]}`} key={reason.number}>
              <div className={styles.cardTop}>
                <span className={styles.number}>{reason.number}</span>
                <span className={styles.label}>{reason.label}</span>
              </div>
              <div className={styles.icon} aria-hidden="true">
                <span />
              </div>
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
