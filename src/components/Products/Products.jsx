import { trackConversion } from '../../utils/analytics'
import { products } from '../../data/products'
import styles from './Products.module.css'


function Products() {
  const featured = ['kit-whatsapp-organizado', 'catalogo-digital', 'presenca-essencial'].map((id) => products.find((product) => product.id === id))
  const otherProducts = products.filter((product) => !featured.includes(product))
  const card = (product, featuredCard = false) => <article className={`${styles.card} ${product.discreet ? styles.discreet : ''}`} key={product.id}>
    <div className={styles.cardTop}><span className={styles.tag}>{product.discreet ? 'Porta de entrada' : 'Solução prática'}</span><span className={styles.price}>a partir de <strong>{product.price}</strong></span></div>
    <h3>{product.name}</h3><p className={styles.audience}>{product.audience}</p>
    {featuredCard && <p className={styles.solves}><strong>O que resolve:</strong> {product.solves}</p>}
    {featuredCard && <ul>{product.items.slice(0, 4).map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>}
    <a className={styles.cta} href={`/${product.id}`} onClick={() => trackConversion('product_view', { product: product.id })}>Ver detalhes da solução <span aria-hidden="true">↗</span></a>
  </article>
  return <section id="produtos" className={styles.section} aria-labelledby="products-title">
    <div className={styles.container}>
      <header className={styles.heading}>
        <p className={styles.eyebrow}>Soluções práticas</p>
        <h2 id="products-title">Produtos prontos para organizar seu negócio</h2>
        <p>Estruturas prontas, adaptadas à realidade de pequenos negócios e entregues com orientação humana. Comece pelo que resolve hoje.</p>
      </header>
      <div className={styles.grid}>{featured.map((product) => card(product, true))}</div>
      <details className={styles.allSolutions} id="outras-solucoes"><summary>Ver todas as soluções</summary><div className={styles.grid}>{otherProducts.map((product) => card(product))}</div></details>
    </div>
  </section>
}

export default Products
