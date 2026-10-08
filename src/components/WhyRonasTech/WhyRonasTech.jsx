import styles from './WhyRonasTech.module.css'

const reasons = [
  {
    label: 'Responsabilidade',
    title: 'Uma visão conecta todas as camadas do projeto.',
    description: 'Planejamento, interface, aplicação e dados são tratados como partes da mesma solução. Isso reduz repasses e mantém as decisões técnicas ligadas ao objetivo do negócio.',
    evidence: 'Frontend, backend, banco de dados e publicação',
  },
  {
    label: 'Transparência',
    title: 'Você consegue avaliar o que foi construído.',
    description: 'O portfólio reúne produtos publicados, código aberto quando disponível e detalhes de implementação. O trabalho pode ser examinado além da apresentação comercial.',
    evidence: 'Projetos publicados e repositórios públicos',
  },
  {
    label: 'Qualidade técnica',
    title: 'A entrega inclui critérios de manutenção.',
    description: 'Testes, controle de acesso, integração contínua e documentação aparecem nos projetos quando o contexto exige. São decisões visíveis, não uma promessa abstrata de qualidade.',
    evidence: 'Controle de acesso, integração contínua e documentação',
  },
]

function WhyRonasTech() {
  return (
    <section id="por-que-ronas" className={styles.section} aria-labelledby="why-title">
      <div className={styles.container}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Por que Ronas Tech</p>
          <h2 id="why-title">Menos distância entre a decisão e a entrega.</h2>
          <p className={styles.lead}>A Ronas Tech combina acompanhamento direto, desenvolvimento de ponta a ponta e trabalho que pode ser verificado.</p>

          <div className={styles.actions}>
            <a className={styles.primary} href="#projetos">Ver projetos reais <span aria-hidden="true">↓</span></a>
            <a className={styles.secondary} href="#contato">Conversar sobre um projeto</a>
          </div>
        </div>

        <div className={styles.reasons}>
          {reasons.map((reason, index) => (
            <article className={styles.reason} key={reason.label}>
              <div className={styles.reasonMeta}>
                <span aria-hidden="true">0{index + 1}</span>
                <p>{reason.label}</p>
              </div>
              <div className={styles.reasonCopy}>
                <h3>{reason.title}</h3>
                <p>{reason.description}</p>
                <small><span aria-hidden="true">✓</span>{reason.evidence}</small>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyRonasTech
