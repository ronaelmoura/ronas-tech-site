import { useEffect } from 'react'
import { siteConfig } from '../config/siteConfig'
import styles from './ServicePage.module.css'
import conversion from './ServicePageConversion.module.css'

const processSteps = [
  {
    title: 'Entendimento',
    description:
      'Conversamos sobre o negócio, o objetivo do projeto e o resultado esperado.',
  },
  {
    title: 'Planejamento',
    description:
      'Definimos escopo, conteúdo, responsabilidades, prazo e forma de entrega.',
  },
  {
    title: 'Desenvolvimento',
    description:
      'Construímos a solução e validamos as principais etapas durante o projeto.',
  },
  {
    title: 'Publicação',
    description:
      'Realizamos os testes finais, publicamos e orientamos sobre a utilização.',
  },
]

const supportProcessSteps = [
  { title: 'Conte o problema', description: 'Explique pelo WhatsApp o que aparece na tela, quando começou e o que você já tentou.' },
  { title: 'Receba a avaliação', description: 'Confirmamos se o caso pode ser atendido remotamente e informamos o preço antes de começar.' },
  { title: 'Autorize o acesso', description: 'Você inicia a sessão temporária, acompanha tudo pela tela e pode encerrar quando quiser.' },
  { title: 'Confira o resultado', description: 'Testamos o funcionamento e você recebe um resumo com as orientações finais.' },
]

const serviceLinks = [
  { href: '/criacao-de-sites', label: 'Criação de sites' },
  { href: '/landing-pages', label: 'Landing pages' },
  {
    href: '/automacao-para-pequenos-negocios',
    label: 'Automações para negócios',
  },
  { href: '/sistemas-web', label: 'Sistemas web' },
  { href: '/manutencao-de-sites', label: 'Manutenção de sites' },
  { href: '/computador-lento', label: 'Computador lento' },
  { href: '/remocao-de-virus', label: 'Remoção de vírus' },
  { href: '/corrigir-erros-windows', label: 'Erros do Windows' },
  { href: '/suporte-tecnico-remoto', label: 'Suporte técnico remoto' },
  { href: '/suporte-ti-para-contadores', label: 'Suporte para contadores' },
]

const supportServicePaths = new Set([
  '/computador-lento',
  '/remocao-de-virus',
  '/corrigir-erros-windows',
  '/suporte-tecnico-remoto',
  '/suporte-ti-para-contadores',
])

function setMetaContent(selector, content) {
  document.querySelector(selector)?.setAttribute('content', content)
}

function ServicePage({ service }) {
  const isSupport = service.kind === 'support'
  const activeProcess = isSupport ? supportProcessSteps : processSteps
  useEffect(() => {
    const pageUrl = `${siteConfig.siteUrl}${service.slug}`
    const canonical = document.querySelector('link[rel="canonical"]')

    document.title = service.metaTitle
    setMetaContent('meta[name="description"]', service.metaDescription)
    setMetaContent('meta[property="og:title"]', service.metaTitle)
    setMetaContent('meta[property="og:description"]', service.metaDescription)
    setMetaContent('meta[property="og:url"]', pageUrl)
    setMetaContent('meta[name="twitter:title"]', service.metaTitle)
    setMetaContent('meta[name="twitter:description"]', service.metaDescription)
    canonical?.setAttribute('href', pageUrl)

    const existingStructuredData = document.getElementById(
      'service-structured-data',
    )
    const structuredData =
      existingStructuredData ?? document.createElement('script')
    structuredData.id = 'service-structured-data'
    structuredData.type = 'application/ld+json'
    structuredData.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: service.eyebrow,
          description: service.metaDescription,
          url: pageUrl,
          areaServed: { '@type': 'Country', name: 'Brasil' },
          provider: {
            '@type': 'Organization',
            name: siteConfig.companyName,
            url: siteConfig.siteUrl,
            email: siteConfig.email,
            sameAs: [siteConfig.github, siteConfig.linkedin, siteConfig.instagram],
          },
        },
        {
          '@type': 'FAQPage',
          mainEntity: service.faq.map(({ question, answer }) => ({
            '@type': 'Question',
            name: question,
            acceptedAnswer: { '@type': 'Answer', text: answer },
          })),
        },
      ],
    })
    if (!existingStructuredData) document.head.appendChild(structuredData)
    window.scrollTo(0, 0)

    return () => {
      if (!existingStructuredData) structuredData.remove()
    }
  }, [service])

  const whatsappMessage = encodeURIComponent(
    `Olá! Acessei a página de ${service.eyebrow.toLowerCase()} da Ronas Tech e gostaria de ${isSupport ? 'explicar meu problema e solicitar atendimento' : 'solicitar um orçamento'}.`,
  )
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${whatsappMessage}`

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a
          className={styles.brand}
          href="/"
          aria-label={`${siteConfig.companyName} — página inicial`}
        >
          <img src={siteConfig.logoPath} alt="" width="41" height="38" />
          {siteConfig.companyName}
        </a>
        <a className={styles.backLink} href="/#servicos">
          ← Ver todos os serviços
        </a>
      </header>

      <main id="conteudo-principal" tabIndex="-1">
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>{service.eyebrow}</p>
            <h1>{service.title}</h1>
            <p className={styles.lead}>{service.introduction}</p>
            {isSupport ? <div className={conversion.servicePrice}><small>Preço inicial</small><strong>{service.priceLabel}</strong><span>O valor final é confirmado antes do serviço.</span></div> : null}
            <div className={styles.actions}>
              <a
                className={styles.primaryAction}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {isSupport ? 'Explicar meu problema' : 'Solicitar orçamento'}
                <span aria-hidden="true">→</span>
              </a>
              <a className={styles.secondaryAction} href="#como-funciona">
                Entender o processo
              </a>
            </div>
            <ul className={styles.trustList} aria-label="Diferenciais do atendimento">
              <li>{isSupport ? 'Atendimento remoto nacional' : 'Atendimento on-line'}</li>
              <li>{isSupport ? 'Você acompanha o acesso' : 'Escopo transparente'}</li>
              <li>{isSupport ? 'Valor confirmado antes' : 'Solução responsiva'}</li>
            </ul>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="beneficios-title">
          <div className={styles.container}>
            <header className={styles.sectionHeading}>
              <p>Benefícios</p>
              <h2 id="beneficios-title">Uma solução pensada para o seu objetivo</h2>
            </header>
            <div className={styles.cardGrid}>
              {service.outcomes.map((outcome) => (
                <article className={styles.card} key={outcome.title}>
                  <span aria-hidden="true">✓</span>
                  <h3>{outcome.title}</h3>
                  <p>{outcome.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionMuted}`}>
          <div className={`${styles.container} ${styles.split}`}>
            <div>
              <header className={styles.sectionHeading}>
                <p>O que pode estar incluído</p>
                <h2>{isSupport ? 'O que será verificado e realizado' : 'Entrega definida antes do início'}</h2>
              </header>
              <p className={styles.sectionText}>
                {isSupport ? 'O atendimento é proporcional ao problema encontrado. Antes de qualquer alteração, você sabe o que será feito e confirma se deseja continuar.' : 'Cada projeto recebe um escopo próprio. Antes de começar, você sabe quais itens serão desenvolvidos e quais são as responsabilidades de cada parte.'}
              </p>
            </div>
            <ul className={styles.checkList}>
              {service.deliverables.map((deliverable) => (
                <li key={deliverable}>
                  <span aria-hidden="true">✓</span>
                  {deliverable}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="como-funciona"
          className={styles.section}
          aria-labelledby="process-title"
        >
          <div className={styles.container}>
            <header className={styles.sectionHeading}>
              <p>Como funciona</p>
              <h2 id="process-title">{isSupport ? 'Do primeiro contato até o computador testado' : 'Do primeiro contato até a publicação'}</h2>
            </header>
            <ol className={styles.processGrid}>
              {activeProcess.map((step, index) => (
                <li key={step.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionMuted}`}>
          <div className={`${styles.container} ${styles.audience}`}>
            <div>
              <p className={styles.eyebrow}>Para quem é</p>
              <h2>{isSupport ? 'Este atendimento serve para o seu caso?' : 'Este serviço pode ajudar o seu negócio?'}</h2>
            </div>
            <p>{service.audience}</p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="faq-title">
          <div className={`${styles.container} ${styles.faqLayout}`}>
            <header className={styles.sectionHeading}>
              <p>Dúvidas frequentes</p>
              <h2 id="faq-title">{isSupport ? 'Antes de permitir o acesso remoto' : 'Antes de solicitar um orçamento'}</h2>
            </header>
            <div className={styles.faqList}>
              {service.faq.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <nav className={styles.related} aria-label="Outros serviços da Ronas Tech">
          <div className={styles.container}>
            <p>{isSupport ? 'Outros problemas atendidos remotamente' : 'Outras formas de colocar a tecnologia para trabalhar'}</p>
            <div className={styles.relatedLinks}>
              {serviceLinks
                .filter(({ href }) => isSupport ? supportServicePaths.has(href) : !supportServicePaths.has(href))
                .filter(({ href }) => href !== `/${service.slug}`)
                .map(({ href, label }) => (
                  <a href={href} key={href}>
                    {label} <span aria-hidden="true">→</span>
                  </a>
                ))}
            </div>
          </div>
        </nav>

        <section className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <p>{isSupport ? 'Precisa de ajuda agora?' : 'Vamos conversar sobre sua necessidade?'}</p>
            <h2>{isSupport ? 'Conte o que aparece na tela e receba uma orientação clara.' : 'Conte o que sua empresa precisa e receba uma proposta clara.'}</h2>
            <a
              className={styles.primaryAction}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {isSupport ? 'Pedir suporte pelo WhatsApp' : 'Falar com a Ronas Tech'}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} {siteConfig.companyName}</p>
        <div>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <a href="/politica-de-privacidade">Privacidade</a>
          <a href="/termos-de-uso">Termos de uso</a>
        </div>
      </footer>
    </div>
  )
}

export default ServicePage
