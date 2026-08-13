import { siteConfig } from '../../config/siteConfig'
import { trackWhatsAppClick, withCampaign } from '../../utils/analytics'
import styles from './Pricing.module.css'

const plans = [
  { id: 'presenca-essencial', name: 'Presença Essencial', price: 'R$ 497', items: ['Site de uma página', 'Apresentação de serviços', 'Botão de WhatsApp', 'Formulário de contato', 'Versão responsiva', 'Publicação orientada'] },
  { id: 'negocio-profissional', name: 'Negócio Profissional', price: 'R$ 997', featured: true, items: ['Tudo do plano Essencial', 'Até 5 páginas', 'Formulário de orçamento', 'Integração com redes sociais', 'Estrutura básica para Google', 'Treinamento simples para atualização, quando aplicável'] },
  { id: 'operacao-sob-medida', name: 'Operação Sob Medida', price: 'Orçamento personalizado', items: ['Sistemas internos', 'Organização de pedidos, agenda ou clientes', 'Automações simples', 'Integrações conforme necessidade', 'Evolução por etapas'] },
]

function planUrl(plan) { const message = withCampaign(`Olá, Ronael. Quero conversar sobre o plano ${plan.name}.`); return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}` }

function Pricing() { return <section id="pacotes" className={styles.section} aria-labelledby="pricing-title"><div className={styles.container}><header className={styles.heading}><p className={styles.eyebrow}>Pacotes acessíveis</p><h2 id="pricing-title">Comece com o que cabe hoje</h2><p>Escolha uma base clara e evolua quando o negócio pedir. O escopo é explicado antes do início.</p></header><div className={styles.grid}>{plans.map((plan) => <article className={`${styles.card} ${plan.featured ? styles.featured : ''}`} key={plan.id}>{plan.featured && <span className={styles.badge}>Mais escolhido</span>}<h3>{plan.name}</h3><p className={styles.price}><small>a partir de</small><strong>{plan.price}</strong></p><ul>{plan.items.map((item) => <li key={item}>{item}</li>)}</ul><a href={planUrl(plan)} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick(`plano_${plan.id}`)}>Falar sobre este plano <span aria-hidden="true">↗</span></a></article>)}</div><div className={styles.notes}><p>Valores variam conforme o escopo. Hospedagem, domínio e ferramentas de terceiros são explicados antes do início.</p><p>Entrada + parcelamento a combinar.</p></div></div></section> }
export default Pricing
