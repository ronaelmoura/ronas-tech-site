import { siteConfig } from '../config/siteConfig'
import styles from './PersonalFinanceProductPage.module.css'
import fixes from './PersonalFinanceProductPageFixes.module.css'
import kit from './KitFinanceProductPage.module.css'

const benefits = [
  ['Dashboard automático', 'Acompanhe faturamento, despesas, saldo, lucro e indicadores sem montar fórmulas.'],
  ['Controle financeiro', 'Registre entradas, saídas e vencimentos em uma rotina simples e centralizada.'],
  ['Precificação inteligente', 'Considere custos, taxas, impostos e margem para chegar a um preço sustentável.'],
  ['Fluxo de caixa', 'Antecipe compromissos e entenda quanto realmente está disponível no negócio.'],
]

const included = [
  'Dashboard financeiro anual',
  'Controle de receitas e despesas',
  'Contas a pagar e a receber',
  'Fluxo de caixa organizado',
  'Calculadora de precificação',
  'Categorias personalizáveis',
  'Gráficos e indicadores automáticos',
  'Manual ilustrado de uso',
]

const previews = [
  ['/kit-mei-dashboard.png', 'Dashboard financeiro anual'],
  ['/kit-mei-lancamentos.png', 'Controle de lançamentos e fluxo de caixa'],
  ['/kit-mei-precificacao.png', 'Calculadora de precificação'],
]

function BuyButton({ location }) {
  return <a className={`${styles.buyButton} ${fixes.buyButton} ${kit.buyButton}`} href={siteConfig.kiwifyCheckoutUrl} target="_blank" rel="noopener noreferrer" data-location={location}>Comprar agora</a>
}

function KitFinanceProductPage() {
  return <div className={`${styles.page} ${kit.page}`}>
    <header className={styles.header}>
      <a className={styles.brand} href="/"><img src={siteConfig.logoPath} alt="" width="48" height="45" /><span><strong>Ronas Tech</strong><small>Planilhas inteligentes</small></span></a>
      <nav aria-label="Navegação da página"><a href="/">Voltar ao site</a><a className={`${styles.headerCta} ${kit.headerCta}`} href={siteConfig.kiwifyCheckoutUrl} target="_blank" rel="noopener noreferrer">Comprar agora</a></nav>
    </header>

    <main id="conteudo-principal">
      <section className={`${styles.hero} ${kit.hero}`}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Finanças organizadas para MEI</p>
          <h1>Kit Financeiro Inteligente para MEI</h1>
          <p className={styles.lead}>Controle o caixa, acompanhe o resultado e forme preços com segurança em uma planilha premium, automática e pronta para a rotina do pequeno negócio.</p>
          <div className={styles.trustRow}><span>✓ Dashboard automático</span><span>✓ Manual ilustrado</span><span>✓ Pagamento único</span></div>
          <div className={styles.offer}><div><small>OFERTA DE LANÇAMENTO</small><strong><span>R$</span> 37,90</strong><p>pagamento único • sem mensalidade</p></div><BuyButton location="hero" /></div>
          <p className={styles.support}>Compra protegida por garantia de 7 dias.</p>
        </div>
        <div className={`${styles.heroVisual} ${kit.heroVisual}`}>
          <div className={kit.productCover}><img src="/capa-kit-financeiro-mei-v2.png" alt="Capa do Kit Financeiro Inteligente para MEI" width="1280" height="720" /></div>
          <div className={styles.floatCard}><span>Visão do negócio</span><strong>Lucro e pendências em segundos</strong></div>
        </div>
      </section>

      <section className={kit.featureBar} aria-label="Recursos do Kit Financeiro"><span>Dashboard</span><span>Controle financeiro</span><span>Precificação</span><span>Fluxo de caixa</span></section>

      <section className={styles.problem}>
        <p className={styles.sectionLabel}>Decisões baseadas em números</p>
        <h2>Seu negócio precisa de clareza financeira, não de controles espalhados.</h2>
        <div className={styles.benefitGrid}>{benefits.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className={styles.inside}>
        <div className={styles.insideCopy}>
          <p className={styles.sectionLabel}>Tudo conectado em um único kit</p>
          <h2>Você registra a rotina. A planilha transforma dados em visão.</h2>
          <p>Preencha as movimentações do dia a dia e acompanhe automaticamente o caixa, os resultados, as contas e a formação dos seus preços.</p>
          <ul>{included.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul>
          <BuyButton location="conteudo" />
        </div>
        <div className={`${styles.insideVisual} ${fixes.insideVisual} ${kit.insideVisual}`}><img src="/kit-mei-precificacao.png" alt="Calculadora de precificação do Kit Financeiro para MEI" /><div><small>PREÇO SUSTENTÁVEL</small><strong>Custos, taxas e margem considerados</strong></div></div>
      </section>

      <section className={styles.preview}>
        <div className={styles.sectionHeading}><p className={styles.sectionLabel}>Veja por dentro</p><h2>Uma estrutura profissional e fácil de usar.</h2><p>Campos guiados, cálculos prontos e informações organizadas para você encontrar o que precisa.</p></div>
        <div className={`${styles.previewTrack} ${fixes.previewTrack} ${kit.previewTrack}`}>{previews.map(([src, alt]) => <figure key={src}><img src={src} alt={alt} loading="lazy" /><figcaption>{alt}</figcaption></figure>)}</div>
      </section>

      <section className={styles.steps}>
        <p className={styles.sectionLabel}>Comece em três passos</p><h2>Configure, registre e acompanhe.</h2>
        <ol><li><span>01</span><div><strong>Personalize</strong><p>Informe seu negócio, o período e ajuste as categorias.</p></div></li><li><span>02</span><div><strong>Registre</strong><p>Adicione receitas, despesas, valores e vencimentos.</p></div></li><li><span>03</span><div><strong>Decida</strong><p>Use o dashboard, o fluxo de caixa e a precificação para orientar suas escolhas.</p></div></li></ol>
      </section>

      <section className={kit.guarantee} aria-labelledby="guarantee-title"><div className={kit.guaranteeBadge}><strong>7</strong><span>dias</span></div><div><p className={styles.sectionLabel}>Sua compra protegida</p><h2 id="guarantee-title">Garantia incondicional de 7 dias.</h2><p>Você pode conhecer o material com tranquilidade. Se o kit não fizer sentido para sua rotina, solicite o reembolso dentro do prazo da garantia.</p></div></section>

      <section className={styles.faq}>
        <div><p className={styles.sectionLabel}>Perguntas frequentes</p><h2>Antes de começar.</h2></div>
        <div>{[
          ['Preciso entender de Excel?', 'Não. Os campos de preenchimento são indicados e os cálculos e gráficos já estão configurados.'],
          ['O kit funciona no celular?', 'O arquivo pode ser aberto em aplicativos compatíveis. Para editar tabelas e analisar os painéis completos, o computador oferece mais conforto.'],
          ['É uma assinatura mensal?', 'Não. O valor de R$ 37,90 é um pagamento único, sem mensalidade.'],
          ['Como recebo o material?', 'Após a confirmação do pagamento no checkout, você recebe as instruções de acesso ao produto digital.'],
          ['Como funciona a garantia?', 'Você tem 7 dias após a compra para conhecer o kit e solicitar o reembolso, se necessário.'],
          ['Substitui um contador?', 'Não. O kit ajuda na organização e na visão gerencial, mas não substitui orientação contábil ou fiscal.'],
        ].map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
      </section>

      <section className={`${styles.finalCta} ${kit.finalCta}`}><div><p className={styles.sectionLabel}>Organize o dinheiro do negócio</p><h2>Comece hoje com mais clareza financeira.</h2><p>Controle, acompanhe e tome decisões com informações organizadas.</p></div><div><strong><span>R$</span> 37,90</strong><small>pagamento único</small><BuyButton location="final" /></div></section>
    </main>

    <footer className={styles.footer}><a href="/"><img src={siteConfig.logoPath} alt="Ronas Tech" width="43" height="40" /></a><p>© {new Date().getFullYear()} Ronas Tech. Todos os direitos reservados.</p><div><a href="/politica-de-privacidade">Privacidade</a><a href="/termos-de-uso">Termos</a></div></footer>
  </div>
}

export default KitFinanceProductPage
