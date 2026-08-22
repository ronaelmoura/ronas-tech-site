import { useEffect } from 'react'
import { siteConfig } from '../config/siteConfig'
import { trackConversion } from '../utils/analytics'
import { trackPixelEvent } from '../utils/metaPixel'
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
  ['/kit-mei-contas.png', 'Contas a pagar e a receber, com status e atrasos'],
  ['/kit-mei-precificacao.png', 'Calculadora de precificação'],
  ['/kit-mei-instrucoes.png', 'Manual ilustrado de uso'],
]

const audience = [
  'MEIs que precisam separar as contas do negócio das contas pessoais',
  'Autônomos e prestadores de serviço',
  'Pequenos negócios sem sistema financeiro',
  'Quem quer formar preço considerando custos reais',
]

const notAudience = [
  'Quem procura consultoria contábil ou fiscal personalizada',
  'Quem busca orientação de investimentos',
  'Quem espera promessa de lucro ou retorno garantido',
]

// Shared by the pixel and GA so the ad platform and the reports agree on what
// the product is. Keep in sync with the Offer in entry-server.jsx.
const product = {
  id: 'kit-financeiro-mei',
  name: 'Kit Financeiro Inteligente para MEI',
  value: 37.9,
  currency: 'BRL',
}

const contentPayload = {
  content_name: product.name,
  content_ids: [product.id],
  content_type: 'product',
  value: product.value,
  currency: product.currency,
}

// Fires on every path to the Kiwify checkout, so no CTA is left unmeasured.
// The sale itself is reported by Kiwify — this is intent only.
function trackCheckoutClick(location) {
  trackPixelEvent('InitiateCheckout', { ...contentPayload, location })
  trackConversion('begin_checkout', { product: product.id, location, value: product.value, currency: product.currency })
}

function BuyButton({ location, label = 'Comprar agora' }) {
  return <a className={`${styles.buyButton} ${fixes.buyButton} ${kit.buyButton}`} href={siteConfig.kiwifyCheckoutUrl} target="_blank" rel="noopener noreferrer" data-location={location} onClick={() => trackCheckoutClick(location)}>{label}</a>
}

// Each route is its own document (no client-side router), so one page load must
// report exactly one view. Guards against StrictMode's double effect in dev and
// against any future remount inflating the numbers Meta optimises on.
let viewContentSent = false

function KitFinanceProductPage() {
  useEffect(() => {
    if (viewContentSent) return
    viewContentSent = true
    trackPixelEvent('ViewContent', contentPayload)
    trackConversion('view_item', { product: product.id, value: product.value, currency: product.currency })
  }, [])

  return <div className={`${styles.page} ${kit.page}`}>
    <header className={styles.header}>
      <a className={styles.brand} href="/"><img src={siteConfig.logoPath} alt="" width="48" height="45" /><span><strong>Ronas Tech</strong><small>Planilhas inteligentes</small></span></a>
      <nav aria-label="Navegação da página"><a href="/produtos-digitais">Ver todos os produtos</a><a className={`${styles.headerCta} ${kit.headerCta}`} href={siteConfig.kiwifyCheckoutUrl} target="_blank" rel="noopener noreferrer" data-location="cabecalho" onClick={() => trackCheckoutClick('cabecalho')}>Comprar agora</a></nav>
    </header>

    <main id="conteudo-principal">
      <section className={`${styles.hero} ${kit.hero}`}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Finanças organizadas para MEI</p>
          <h1>Kit Financeiro Inteligente para MEI</h1>
          <p className={styles.lead}>Controle o caixa, acompanhe o resultado e forme preços com segurança em uma planilha premium, automática e pronta para a rotina do pequeno negócio.</p>
          <div className={styles.trustRow}><span>✓ Dashboard automático</span><span>✓ Manual ilustrado</span><span>✓ Pagamento único</span></div>
          <div className={styles.offer}><div><small>OFERTA DE LANÇAMENTO</small><strong><span>R$</span> 37,90</strong><p>pagamento único • sem mensalidade</p></div><BuyButton location="hero" label="Quero acessar agora" /></div>
          <p className={styles.support}>Pagamento seguro pela Kiwify • Acesso imediato após a aprovação</p>
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

      <section className={kit.audience} aria-labelledby="audience-title">
        <p className={styles.sectionLabel}>Antes de decidir</p>
        <h2 id="audience-title">Veja se o kit combina com o seu momento.</h2>
        <div className={kit.audienceGrid}>
          <article className={kit.audienceFor}><h3>Para quem é</h3><ul>{audience.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul></article>
          <article className={kit.audienceNot}><h3>Para quem não é</h3><ul>{notAudience.map((item) => <li key={item}><span aria-hidden="true">–</span>{item}</li>)}</ul></article>
        </div>
      </section>

      <section className={kit.guarantee} aria-labelledby="guarantee-title"><div className={kit.guaranteeBadge}><strong>7</strong><span>dias</span></div><div><p className={styles.sectionLabel}>Sua compra protegida</p><h2 id="guarantee-title">Garantia incondicional de 7 dias.</h2><p>Você pode conhecer o material com tranquilidade. Se o kit não fizer sentido para sua rotina, solicite o reembolso dentro do prazo da garantia.</p></div></section>

      <section className={styles.faq}>
        <div><p className={styles.sectionLabel}>Perguntas frequentes</p><h2>Antes de começar.</h2></div>
        <div>{[
          ['Preciso entender de Excel?', 'Não. Os campos de preenchimento são indicados e os cálculos e gráficos já estão configurados.'],
          ['O kit funciona no celular?', 'O arquivo pode ser aberto em aplicativos compatíveis. Para editar tabelas e analisar os painéis completos, o computador oferece mais conforto.'],
          ['É uma assinatura mensal?', 'Não. O valor de R$ 37,90 é um pagamento único, sem mensalidade.'],
          ['Como recebo o material?', 'Após a confirmação do pagamento no checkout, você recebe as instruções de acesso ao produto digital no e-mail informado na compra.'],
          ['O acesso é imediato?', 'Sim, assim que o pagamento é aprovado. Pagamentos por cartão costumam ser aprovados na hora; boleto e Pix podem levar mais tempo para compensar.'],
          ['O pagamento é seguro?', 'Sim. Toda a compra é processada pela Kiwify, plataforma especializada em produtos digitais. A Ronas Tech não recebe nem armazena os dados do seu cartão.'],
          ['Funciona no Excel e no Google Planilhas?', 'O kit foi desenvolvido e testado no Microsoft Excel. Em outros editores de planilha, alguns recursos e gráficos podem se comportar de forma diferente — em caso de dúvida, confirme a compatibilidade com a gente antes da compra.'],
          ['A planilha já vem com fórmulas automáticas?', 'Sim. Os cálculos, totais, indicadores e gráficos já estão configurados. Você preenche apenas os campos indicados.'],
          ['Como funciona a garantia?', 'Você tem 7 dias após a compra para conhecer o kit e solicitar o reembolso, se necessário.'],
          ['Substitui um contador?', 'Não. O kit ajuda na organização e na visão gerencial, mas não substitui orientação contábil ou fiscal.'],
        ].map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
      </section>

      <section className={`${styles.finalCta} ${kit.finalCta}`}><div><p className={styles.sectionLabel}>Organize o dinheiro do negócio</p><h2>Comece hoje a organizar melhor o seu negócio.</h2><p>Controle, acompanhe e tome decisões com informações organizadas.</p></div><div><strong><span>R$</span> 37,90</strong><small>pagamento único</small><BuyButton location="final" label="Quero acessar o Kit Financeiro MEI" /><p className={kit.finalCtaNote}>Pagamento seguro pela Kiwify • Acesso imediato após a aprovação</p></div></section>
    </main>

    <div className={kit.mobileBar}>
      <div><small>pagamento único</small><strong>R$ 37,90</strong></div>
      <BuyButton location="barra-mobile" label="Quero acessar agora" />
    </div>

    <footer className={`${styles.footer} ${kit.footer}`}>
      <a href="/"><img src={siteConfig.logoPath} alt="Ronas Tech" width="43" height="40" /></a>
      <p>© {new Date().getFullYear()} Ronas Tech. Todos os direitos reservados.<br />Pagamento processado pela Kiwify.</p>
      <div><a href={`mailto:${siteConfig.email}`}>Contato</a><a href="/politica-de-privacidade">Privacidade</a><a href="/termos-de-uso">Termos</a></div>
    </footer>
  </div>
}

export default KitFinanceProductPage
