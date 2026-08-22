import styles from './DigitalProducts.module.css'
import { spreadsheetProducts } from '../../data/spreadsheetProducts'

function DigitalProducts() {
  return <section className={styles.section} id="produtos-digitais" aria-labelledby="digital-products-title">
    <div className={styles.container}>
      <header className={styles.heading}><p>Ronas Tech Planilhas</p><h2 id="digital-products-title">Produtos digitais para organizar sua rotina</h2><span>Planilhas e modelos prontos, com visual profissional e instruções simples para começar.</span></header>
      <div className={styles.grid}>
        <a className={`${styles.card} ${styles.available}`} href="/produtos-digitais/kit-financeiro-mei"><div className={styles.cover}><img src="/kit-mei-capa.png" alt="Kit Financeiro Inteligente para MEI" loading="lazy" /></div><div className={styles.cardBody}><span className={styles.category}>Finanças para MEI</span><h3>Kit Financeiro Inteligente para MEI</h3><p>Controle financeiro, contas e precificação para pequenos negócios.</p><div className={styles.cardBottom}><strong>Conhecer produto</strong><b>R$ 37,90</b></div></div></a>
        <a className={`${styles.card} ${styles.available}`} href="/produtos-digitais/planilha-financeira-pessoal"><div className={styles.cover}><img src="/og-planilha-financeira-pessoal.png" alt="Planilha Financeira Pessoal" loading="lazy" /></div><div className={styles.cardBody}><span className={styles.category}>Finanças pessoais</span><h3>Planilha Financeira Pessoal</h3><p>Organize ganhos, gastos, cartões e metas com acompanhamento automático.</p><div className={styles.cardBottom}><strong>Conhecer produto</strong><b>R$ 37,90</b></div></div></a>
        {spreadsheetProducts.map((product) => <a className={`${styles.card} ${styles.available}`} href={product.path} key={product.path}><div className={styles.cover}><img src={product.image} alt={`Painel de ${product.title}`} loading="lazy" /></div><div className={styles.cardBody}><span className={styles.category}>{product.category}</span><h3>{product.title}</h3><p>{product.description}</p><div className={styles.cardBottom}><strong>Conhecer produto</strong><b>Disponível</b></div></div></a>)}
      </div>
      <a className={styles.catalogLink} href="/produtos-digitais/planilha-financeira-pessoal">Ver catálogo da Ronas Tech Planilhas</a>
    </div>
  </section>
}

export default DigitalProducts
