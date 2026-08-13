import { siteConfig } from '../config/siteConfig'
import { trackConversion, trackWhatsAppClick, withCampaign } from '../utils/analytics'
import { products } from '../data/products'
import styles from './CampaignPage.module.css'

function CampaignPage({ campaign }) {
  const product = products.find((item) => item.id === campaign.productId)
  const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(withCampaign(`Olá, Ronael. Quero saber mais sobre o ${product.name} para o meu negócio.`))}`
  function click() { trackWhatsAppClick(`campaign_${product.id}`); trackConversion('campaign_cta', { product: product.id }) }
  return <><header className={styles.header}><a href="/"><img src={siteConfig.logoPath} alt="Ronas Tech" width="42" height="40" /><span>Ronas Tech</span></a><a className={styles.headerCta} href={url} target="_blank" rel="noopener noreferrer" onClick={click}>Falar no WhatsApp</a></header><main className={styles.main}><section className={styles.hero}><p className={styles.eyebrow}>Solução prática Ronas Tech</p><h1>{campaign.title}</h1><p>{campaign.description}</p><div className={styles.price}>a partir de <strong>{product.price}</strong></div><a className={styles.cta} href={url} target="_blank" rel="noopener noreferrer" onClick={click}>Quero organizar meu negócio <span aria-hidden="true">↗</span></a></section><section className={styles.details}><div><h2>O que esta solução resolve</h2><p>{product.solves}</p><h2>Para quem é</h2><p>{product.audience}</p></div><div className={styles.card}><h2>O que está incluído</h2><ul>{product.items.map((item) => <li key={item}>{item}</li>)}</ul><a className={styles.cta} href={url} target="_blank" rel="noopener noreferrer" onClick={click}>Montar meu pedido <span aria-hidden="true">↗</span></a></div></section><section className={styles.faq}><h2>Perguntas rápidas</h2><details><summary>Preciso contratar alguma ferramenta mensal?</summary><p>Não. A proposta é começar com uma solução prática usando recursos adequados ao seu negócio. Custos de terceiros, quando existirem, são explicados antes.</p></details><details><summary>Posso adaptar a entrega?</summary><p>Sim. O escopo é revisado com você antes do início para manter o projeto proporcional à necessidade.</p></details></section></main></>
}
export default CampaignPage
