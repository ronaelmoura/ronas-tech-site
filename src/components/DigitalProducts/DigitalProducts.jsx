import styles from './DigitalProducts.module.css'

const futureProducts = [
  ['PO', 'Vendas', 'Modelos de Propostas e Orçamentos', 'Apresente serviços e preços com documentos profissionais e personalizáveis.'],
  ['PI', 'Finanças empresariais', 'Planilha de Precificação Inteligente', 'Calcule custos, margens e preço de venda com mais segurança e clareza.'],
  ['VC', 'Vendas', 'Controle de Vendas e Comissões', 'Acompanhe metas, vendedores, comissões e resultados em um só painel.'],
  ['CE', 'Gestão', 'Controle de Estoque Simplificado', 'Registre entradas, saídas e estoque mínimo sem depender de sistemas caros.'],
  ['OS', 'Atendimento', 'Modelo de Ordem de Serviço', 'Organize solicitações, prazos, valores e entregas de cada cliente.'],
  ['CC', 'Marketing', 'Calendário de Conteúdo para Negócios', 'Planeje publicações, campanhas e ideias para manter sua marca ativa.'],
]

function DigitalProducts() {
  return <section className={styles.section} id="produtos-digitais" aria-labelledby="digital-products-title">
    <div className={styles.container}>
      <header className={styles.heading}><p>Ronas Tech Planilhas</p><h2 id="digital-products-title">Produtos digitais para organizar sua rotina</h2><span>Planilhas e modelos prontos, com visual profissional e instruções simples para começar.</span></header>
      <div className={styles.grid}>
        <a className={`${styles.card} ${styles.available}`} href="/produtos-digitais/kit-financeiro-mei"><div className={styles.cover}><img src="/kit-mei-capa.png" alt="Kit Financeiro Inteligente para MEI" loading="lazy" /></div><div className={styles.cardBody}><span className={styles.category}>Finanças para MEI</span><h3>Kit Financeiro Inteligente para MEI</h3><p>Controle financeiro, contas e precificação para pequenos negócios.</p><div className={styles.cardBottom}><strong>Conhecer produto</strong><b>R$ 37,90</b></div></div></a>
        <a className={`${styles.card} ${styles.available}`} href="/produtos-digitais/planilha-financeira-pessoal"><div className={styles.cover}><img src="/og-planilha-financeira-pessoal.png" alt="Planilha Financeira Pessoal" loading="lazy" /></div><div className={styles.cardBody}><span className={styles.category}>Finanças pessoais</span><h3>Planilha Financeira Pessoal</h3><p>Organize ganhos, gastos, cartões e metas com acompanhamento automático.</p><div className={styles.cardBottom}><strong>Conhecer produto</strong><b>R$ 37,90</b></div></div></a>
        {futureProducts.map(([initials, category, title, description]) => <article className={styles.card} key={title}><div className={styles.placeholder}><span>Em breve</span><strong>{initials}</strong></div><div className={styles.cardBody}><span className={styles.category}>{category}</span><h3>{title}</h3><p>{description}</p><div className={styles.cardBottom}><small>Lançamento futuro</small></div></div></article>)}
      </div>
      <a className={styles.catalogLink} href="/produtos-digitais/planilha-financeira-pessoal">Ver catálogo da Ronas Tech Planilhas</a>
    </div>
  </section>
}

export default DigitalProducts
