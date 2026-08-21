import { trackConversion } from '../../utils/analytics'
import styles from './CheckupCallout.module.css'

function CheckupCallout() {
  return <section className={`${styles.section} reveal`} aria-labelledby="checkup-callout-title"><div className={styles.container}><div className={styles.card}><span className={styles.tag}>Comece por aqui · baixo risco</span><h2 id="checkup-callout-title">Não sabe por onde começar?</h2><p>Uma conversa de 20 minutos onde eu olho seu atendimento hoje e te digo, sem compromisso, qual é o primeiro passo que faz sentido pro seu caso.</p><div className={styles.footer}><span className={styles.price}><strong>R$ 97</strong> · Check-up Digital do Negócio</span><a className={styles.cta} href="/check-up-digital" onClick={() => trackConversion('checkup_callout_click', { product: 'check-up-digital' })}>Quero meu Check-up <span aria-hidden="true">→</span></a></div></div></div></section>
}
export default CheckupCallout
