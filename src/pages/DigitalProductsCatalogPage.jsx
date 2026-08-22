import { siteConfig } from '../config/siteConfig'
import { spreadsheetProducts } from '../data/spreadsheetProducts'
import styles from './DigitalProductsCatalogPage.module.css'

const products = [
  {
    path: '/produtos-digitais/kit-financeiro-mei',
    category: 'Finanças para MEI',
    title: 'Kit Financeiro Inteligente para MEI',
    price: 'R$ 37,90',
    description: 'Dashboard, controle financeiro, precificação e fluxo de caixa para o pequeno negócio.',
    image: '/capa-kit-financeiro-mei-v2.png',
    featured: true,
  },
  {
    path: '/produtos-digitais/planilha-financeira-pessoal',
    category: 'Finanças pessoais',
    title: 'Planilha Financeira Pessoal',
    price: 'R$ 37,90',
    description: 'Organize ganhos, gastos, cartões e metas com acompanhamento automático.',
    image: '/og-planilha-financeira-pessoal.png',
  },
  ...spreadsheetProducts,
]

function DigitalProductsCatalogPage() {
  return <div className={styles.page}>
    <header className={styles.header}>
      <a className={styles.brand} href="/"><img src={siteConfig.logoPath} alt="" width="48" height="45" /><span><strong>Ronas Tech</strong><small>Planilhas inteligentes</small></span></a>
      <a className={styles.back} href="/">Voltar ao site</a>
    </header>

    <main id="conteudo-principal">
      <section className={styles.hero}>
        <p>Produtos digitais Ronas Tech</p>
        <h1>Planilhas inteligentes para uma rotina mais organizada.</h1>
        <span>Escolha a solução ideal para controlar finanças, vendas, estoque, serviços ou conteúdo com cálculos automáticos e visual profissional.</span>
      </section>

      <section className={styles.catalog} aria-labelledby="catalog-title">
        <div className={styles.catalogHeading}><div><p>Catálogo completo</p><h2 id="catalog-title">Conheça todos os produtos</h2></div><span>{products.length} soluções disponíveis</span></div>
        <div className={styles.grid}>{products.map((product) => <a className={`${styles.card} ${product.featured ? styles.featured : ''}`} href={product.path} key={product.path}>
          <div className={styles.cover}><img src={product.image} alt={`Capa de ${product.title}`} loading="lazy" />{product.featured && <b>Mais completo</b>}</div>
          <div className={styles.cardBody}><span className={styles.category}>{product.category}</span><h3>{product.title}</h3><p>{product.description}</p><div className={styles.cardBottom}><strong>Ver produto <span aria-hidden="true">→</span></strong><b>{product.price}</b></div></div>
        </a>)}</div>
      </section>

      <section className={styles.help}><div><p>Não sabe qual escolher?</p><h2>Conte o que você precisa organizar.</h2><span>A Ronas Tech ajuda você a identificar a planilha mais adequada para sua rotina.</span></div><a href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Olá! Preciso de ajuda para escolher uma planilha da Ronas Tech.')}`} target="_blank" rel="noopener noreferrer">Falar no WhatsApp</a></section>
    </main>

    <footer className={styles.footer}><a href="/"><img src={siteConfig.logoPath} alt="Ronas Tech" width="43" height="40" /></a><p>© {new Date().getFullYear()} Ronas Tech. Todos os direitos reservados.</p><div><a href="/politica-de-privacidade">Privacidade</a><a href="/termos-de-uso">Termos</a></div></footer>
  </div>
}

export default DigitalProductsCatalogPage
