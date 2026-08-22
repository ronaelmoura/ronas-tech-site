import styles from './DigitalProducts.module.css'

function DigitalProducts() {
  return <section className={styles.section} id="produtos-digitais" aria-labelledby="digital-products-title">
    <div className={styles.container}>
      <div className={styles.copy}><p>Ronas Tech Planilhas</p><h2 id="digital-products-title">Organize as finanças do seu negócio.</h2><span>Conheça o Kit Financeiro Inteligente para MEI: controle, dashboard e precificação em uma estrutura prática e automática.</span><a className={styles.button} href="/produtos-digitais">Ver produtos digitais <span aria-hidden="true">→</span></a></div>
      <a className={styles.visual} href="/produtos-digitais" aria-label="Ver o Kit Financeiro Inteligente para MEI"><img src="/capa-kit-financeiro-mei-v2.png" alt="Kit Financeiro Inteligente para MEI" loading="lazy" /></a>
    </div>
  </section>
}

export default DigitalProducts
