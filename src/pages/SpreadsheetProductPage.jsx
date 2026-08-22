import { siteConfig } from '../config/siteConfig'
import styles from './PersonalFinanceProductPage.module.css'
import fixes from './PersonalFinanceProductPageFixes.module.css'
import pageStyles from './SpreadsheetProductPage.module.css'

function SpreadsheetProductPage({ product }) {
  const whatsappMessage = `Olá! Quero comprar ${product.title} por ${product.price}.`
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
  const [currency, amount] = product.price.split(' ')

  const BuyButton = ({ location }) => <a
    className={`${styles.buyButton} ${fixes.buyButton}`}
    href={whatsappUrl}
    target="_blank"
    rel="noopener noreferrer"
    data-location={location}
  >Quero esta planilha</a>

  return <div className={styles.page}>
    <header className={styles.header}>
      <a className={styles.brand} href="/"><img src={siteConfig.logoPath} alt="" width="48" height="45" /><span><strong>Ronas Tech</strong><small>Planilhas inteligentes</small></span></a>
      <nav aria-label="Navegação da página"><a href="/#produtos-digitais">Ver outros produtos</a><a className={styles.headerCta} href={whatsappUrl} target="_blank" rel="noopener noreferrer">Pedir pelo WhatsApp</a></nav>
    </header>

    <main id="conteudo-principal">
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{product.category} • planilha automática</p>
          <h1>{product.title}</h1>
          <p className={styles.lead}>{product.lead}</p>
          <div className={styles.trustRow}><span>✓ Painel automático</span><span>✓ Campos guiados</span><span>✓ Pagamento único</span></div>
          <div className={styles.offer}><div><small>POR APENAS</small><strong><span>{currency}</span> {amount}</strong><p>sem mensalidade</p></div><BuyButton location="hero" /></div>
          <p className={styles.support}>Atendimento direto com a Ronas Tech pelo WhatsApp.</p>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.deviceDesktop}><span /><span /><span /><img src={product.image} alt={`Painel automático de ${product.title}`} /></div>
          <div className={styles.floatCard}><span>{product.highlight[0]}</span><strong>{product.highlight[1]}</strong></div>
        </div>
      </section>

      <section className={styles.problem}>
        <p className={styles.sectionLabel}>Organização sem complicação</p>
        <h2>Menos controles soltos. Mais clareza para acompanhar a rotina.</h2>
        <div className={styles.benefitGrid}>{product.benefits.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className={styles.inside}>
        <div className={styles.insideCopy}>
          <p className={styles.sectionLabel}>Tudo conectado</p>
          <h2>{product.insideTitle}</h2>
          <p>{product.insideText}</p>
          <ul>{product.included.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul>
          <BuyButton location="conteudo" />
        </div>
        <div className={`${styles.insideVisual} ${fixes.insideVisual}`}><img src={product.previews[2][0]} alt={product.previews[2][1]} /><div><small>{product.highlight[0]}</small><strong>{product.highlight[1]}</strong></div></div>
      </section>

      <section className={styles.preview}>
        <div className={styles.sectionHeading}><p className={styles.sectionLabel}>Veja por dentro</p><h2>Telas reais da planilha.</h2><p>O que deve ser preenchido aparece destacado e os resultados ficam organizados em painéis e tabelas.</p></div>
        <div className={`${styles.previewTrack} ${fixes.previewTrack} ${pageStyles.previewTrack}`}>{product.previews.map(([src, alt]) => <figure key={src}><img src={src} alt={alt} loading="lazy" /><figcaption>{alt}</figcaption></figure>)}</div>
      </section>

      <section className={styles.steps}>
        <p className={styles.sectionLabel}>Comece em três passos</p><h2>Abra, personalize e acompanhe.</h2>
        <ol><li><span>01</span><div><strong>Conheça</strong><p>Veja as abas de exemplo e entenda a estrutura em poucos minutos.</p></div></li><li><span>02</span><div><strong>Personalize</strong><p>Substitua os exemplos pelos dados da sua rotina.</p></div></li><li><span>03</span><div><strong>Acompanhe</strong><p>Use o painel e os alertas para orientar suas próximas ações.</p></div></li></ol>
      </section>

      <section className={styles.faq}>
        <div><p className={styles.sectionLabel}>Perguntas frequentes</p><h2>Antes de começar.</h2></div>
        <div>{[
          ['Preciso dominar o Excel?', 'Não. As células de preenchimento são destacadas e os cálculos principais já estão configurados.'],
          ['Consigo usar no celular?', 'Sim, em aplicativos compatíveis com arquivos Excel. Para editar tabelas largas e analisar gráficos, o computador oferece mais conforto.'],
          ['Posso personalizar os dados?', 'Sim. Você pode trocar os exemplos e adaptar categorias, nomes e parâmetros à sua rotina.'],
          ['É um sistema com mensalidade?', `Não. O valor de ${product.price} é um pagamento único, sem assinatura mensal.`],
        ].map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
      </section>

      <section className={`${styles.finalCta} ${pageStyles.finalCta}`}><div><p className={styles.sectionLabel}>Comece com mais clareza</p><h2>Leve esta planilha para sua rotina.</h2><p>{product.description}</p></div><div><strong><span>{currency}</span> {amount}</strong><small>pagamento único</small><BuyButton location="final" /></div></section>
    </main>

    <footer className={styles.footer}><a href="/"><img src={siteConfig.logoPath} alt="Ronas Tech" width="43" height="40" /></a><p>© {new Date().getFullYear()} Ronas Tech. Todos os direitos reservados.</p><div><a href="/politica-de-privacidade">Privacidade</a><a href="/termos-de-uso">Termos</a></div></footer>
  </div>
}

export default SpreadsheetProductPage
