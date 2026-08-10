import { contractingServices } from '../../data/contractingServices'
import styles from './Pricing.module.css'

function Pricing() {
  return (
    <section id="pacotes" className={styles.section} aria-labelledby="pricing-title">
      <div className={styles.container}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>Contrate no seu ritmo</p>
          <h2 id="pricing-title">Serviços claros para tirar seu projeto do papel</h2>
          <p className={styles.subtitle}>
            Escolha uma opção, personalize o projeto e revise tudo antes de enviar.
            Você pode pedir atendimento humano a qualquer momento.
          </p>
        </header>

        <div className={styles.grid}>
          {contractingServices.map((item) => (
            <article
              className={`${styles.card} ${item.featured ? styles.featured : ''}`}
              key={item.name}
            >
              {item.featured && <span className={styles.badge}>Mais escolhido</span>}
              <p className={styles.audience}>{item.audience}</p>
              <h3>{item.name}</h3>
              <div className={styles.price}>
                <span>{item.priceLabel}</span>
                <strong>{item.price}</strong>
              </div>
              <ul>
                {item.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
              <a href={`/contratar?servico=${item.id}`}>
                Contratar agora <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>

        <p className={styles.note}>
          Valores iniciais para escopos objetivos. Domínio e serviços externos são
          confirmados separadamente antes de qualquer cobrança.
        </p>
      </div>
    </section>
  )
}

export default Pricing
