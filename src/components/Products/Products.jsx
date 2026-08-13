import { siteConfig } from '../../config/siteConfig'
import { trackConversion, trackWhatsAppClick, withCampaign } from '../../utils/analytics'
import { products } from '../../data/products'
import styles from './Products.module.css'


function productMessage(product) {
  return withCampaign(`Olá, Ronael. Quero saber mais sobre o ${product.name} para o meu negócio.`)
}

function productWhatsappUrl(product) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(productMessage(product))}`
}

function Products() {
  return <section id="produtos" className={styles.section} aria-labelledby="products-title">
    <div className={styles.container}>
      <header className={styles.heading}>
        <p className={styles.eyebrow}>Soluções práticas</p>
        <h2 id="products-title">Produtos prontos para organizar seu negócio</h2>
        <p>Estruturas prontas, adaptadas à realidade de pequenos negócios e entregues com orientação humana. Comece pelo que resolve hoje.</p>
      </header>
      <div className={styles.grid}>
        {products.map((product) => <article className={`${styles.card} ${product.discreet ? styles.discreet : ''}`} key={product.id}>
          <div className={styles.cardTop}><span className={styles.tag}>{product.discreet ? 'Porta de entrada' : 'Entrega orientada'}</span><span className={styles.price}>a partir de <strong>{product.price}</strong></span></div>
          <h3>{product.name}</h3><p className={styles.audience}>{product.audience}</p>
          <p className={styles.solves}><strong>O que resolve:</strong> {product.solves}</p>
          <ul>{product.items.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>
          <a className={styles.cta} href={productWhatsappUrl(product)} target="_blank" rel="noopener noreferrer" onClick={() => { trackWhatsAppClick(`produto_${product.id}`); trackConversion('product_view', { product: product.id }) }}>Falar sobre esta solução <span aria-hidden="true">↗</span></a>
        </article>)}
      </div>
    </div>
  </section>
}

export default Products
