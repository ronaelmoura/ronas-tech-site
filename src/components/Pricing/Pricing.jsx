import { siteConfig } from '../../config/siteConfig'
import { trackExternalLink } from '../../utils/analytics'
import styles from './Pricing.module.css'

const packages = [
  {
    name: 'Site Essencial',
    audience: 'Para começar com presença profissional',
    price: 'R$ 790',
    priceLabel: 'a partir de',
    features: [
      'Página única com apresentação do negócio',
      'Layout adaptado para celular',
      'Botão e contato pelo WhatsApp',
      'Configuração básica para buscas',
      'Publicação e orientação inicial',
    ],
    message: 'Olá, Ronael! Tenho interesse no pacote Site Essencial.',
  },
  {
    name: 'Site Profissional',
    audience: 'Para apresentar melhor e gerar oportunidades',
    price: 'R$ 1.490',
    priceLabel: 'a partir de',
    featured: true,
    features: [
      'Estrutura personalizada para sua oferta',
      'Até cinco seções estratégicas',
      'Formulário integrado ao WhatsApp',
      'Google Analytics configurado',
      'Ajustes iniciais após a publicação',
    ],
    message: 'Olá, Ronael! Tenho interesse no pacote Site Profissional.',
  },
  {
    name: 'Automação Sob Medida',
    audience: 'Para reduzir tarefas manuais e retrabalho',
    price: 'Orçamento personalizado',
    priceLabel: 'conforme a necessidade',
    features: [
      'Análise do processo atual',
      'Solução focada no problema principal',
      'Implantação em etapas',
      'Treinamento para utilização',
      'Acompanhamento após a entrega',
    ],
    message:
      'Olá, Ronael! Quero conversar sobre uma automação para meu negócio.',
  },
]

function Pricing() {
  return (
    <section id="pacotes" className={styles.section} aria-labelledby="pricing-title">
      <div className={styles.container}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>Comece pelo essencial</p>
          <h2 id="pricing-title">Opções claras para tirar seu projeto do papel</h2>
          <p className={styles.subtitle}>
            Valores iniciais para projetos com escopo objetivo. Antes de começar,
            você recebe a proposta completa com entregas, prazo e investimento.
          </p>
        </header>

        <div className={styles.grid}>
          {packages.map((item) => {
            const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(item.message)}`

            return (
              <article
                className={`${styles.card} ${item.featured ? styles.featured : ''}`}
                key={item.name}
              >
                {item.featured && <span className={styles.badge}>Melhor escolha</span>}
                <p className={styles.audience}>{item.audience}</p>
                <h3>{item.name}</h3>
                <div className={styles.price}>
                  <span>{item.priceLabel}</span>
                  <strong>{item.price}</strong>
                </div>
                <ul>
                  {item.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackExternalLink(`pacote_${item.name}`, whatsappUrl)}
                >
                  Conversar sobre este pacote
                  <span aria-hidden="true">→</span>
                </a>
              </article>
            )
          })}
        </div>

        <p className={styles.note}>
          A conversa inicial é gratuita e sem compromisso. Domínio, hospedagem e
          serviços externos são informados separadamente quando necessários.
        </p>
      </div>
    </section>
  )
}

export default Pricing
