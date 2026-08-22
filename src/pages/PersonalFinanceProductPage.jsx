import { siteConfig } from '../config/siteConfig'
import styles from './PersonalFinanceProductPage.module.css'
import fixes from './PersonalFinanceProductPageFixes.module.css'

const whatsappMessage = 'Olá! Quero comprar a Planilha Financeira Pessoal por R$ 37,90.'
const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

const benefits = [
  ['Visão clara do mês', 'Veja saldo, receitas, despesas e compromissos em um painel simples de entender.'],
  ['Cartões sob controle', 'Acompanhe limites e gastos sem misturar a fatura com o dinheiro disponível.'],
  ['Metas que saem do papel', 'Crie cofrinhos, defina objetivos e acompanhe o progresso de cada conquista.'],
  ['Uso prático no celular', 'Registre movimentações rapidamente e consulte seu financeiro de onde estiver.'],
]

const included = [
  'Painel financeiro automático',
  'Registro de ganhos e gastos',
  'Controle de contas fixas',
  'Limites e gastos dos cartões',
  'Cofrinhos para metas financeiras',
  'Filtros e indicadores prontos',
]

const previews = [
  ['/planilha-pessoal-painel.png', 'Painel principal da Planilha Financeira Pessoal'],
  ['/planilha-pessoal-movimentos.png', 'Tela de lançamentos financeiros'],
  ['/planilha-pessoal-fixos.png', 'Tela de controle de contas fixas'],
  ['/planilha-pessoal-limites.png', 'Tela de controle de limites dos cartões'],
  ['/planilha-pessoal-cofrinhos.png', 'Tela de metas e cofrinhos'],
]

function BuyButton({ location = 'pagina' }) {
  return <a className={`${styles.buyButton} ${fixes.buyButton}`} href={whatsappUrl} target="_blank" rel="noopener noreferrer" data-location={location}>Quero a minha planilha</a>
}

function PersonalFinanceProductPage() {
  return <div className={styles.page}>
    <header className={styles.header}>
      <a className={styles.brand} href="/"><img src={siteConfig.logoPath} alt="" width="48" height="45" /><span><strong>Ronas Tech</strong><small>Planilhas inteligentes</small></span></a>
      <nav aria-label="Navegação da página"><a href="/produtos-digitais">Ver produtos digitais</a><a className={styles.headerCta} href={whatsappUrl} target="_blank" rel="noopener noreferrer">Comprar agora</a></nav>
    </header>

    <main id="conteudo-principal">
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Finanças pessoais • planilha automática</p>
          <h1>Planilha Financeira Pessoal</h1>
          <p className={styles.lead}>Organize ganhos, gastos, cartões e metas em um só lugar — com uma experiência simples, visual e pronta para acompanhar pelo celular.</p>
          <div className={styles.trustRow}><span>✓ Acesso imediato</span><span>✓ Pagamento único</span><span>✓ Fácil de usar</span></div>
          <div className={styles.offer}><div><small>POR APENAS</small><strong><span>R$</span> 37,90</strong><p>sem mensalidade</p></div><BuyButton location="hero" /></div>
          <p className={styles.support}>Dúvidas? Você fala diretamente com a Ronas Tech pelo WhatsApp.</p>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.deviceDesktop}><span /><span /><span /><img src="/planilha-pessoal-painel.png" alt="Painel automático da Planilha Financeira Pessoal" width="1366" height="768" /></div>
          <div className={`${styles.devicePhone} ${fixes.devicePhone}`}><div /><img src="/planilha-pessoal-movimentos.png" alt="Lançamentos da planilha exibidos no celular" width="390" height="844" /></div>
          <div className={styles.floatCard}><span>Saldo do mês</span><strong>Atualização automática</strong></div>
        </div>
      </section>

      <section className={styles.problem}>
        <p className={styles.sectionLabel}>Dinheiro organizado de verdade</p>
        <h2>Chega de anotar em vários lugares e continuar sem saber para onde o dinheiro foi.</h2>
        <div className={styles.benefitGrid}>{benefits.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className={styles.inside}>
        <div className={styles.insideCopy}>
          <p className={styles.sectionLabel}>Tudo em um único arquivo</p>
          <h2>Uma planilha que trabalha por você.</h2>
          <p>Você só registra as informações. Os totais, indicadores e acompanhamentos são atualizados automaticamente para mostrar a situação real das suas finanças.</p>
          <ul>{included.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul>
          <BuyButton location="conteudo" />
        </div>
        <div className={`${styles.insideVisual} ${fixes.insideVisual}`}><img src="/planilha-pessoal-cofrinhos.png" alt="Painel de metas financeiras e cofrinhos" width="390" height="844" /><div><small>METAS FINANCEIRAS</small><strong>Veja seu progresso sem fazer contas</strong></div></div>
      </section>

      <section className={styles.preview}>
        <div className={styles.sectionHeading}><p className={styles.sectionLabel}>Veja por dentro</p><h2>Bonita, intuitiva e feita para facilitar sua rotina.</h2><p>As telas foram organizadas para você encontrar o que precisa rapidamente, inclusive em telas menores.</p></div>
        <div className={`${styles.previewTrack} ${fixes.previewTrack}`}>{previews.map(([src, alt]) => <figure key={src}><img src={src} alt={alt} loading="lazy" /><figcaption>{alt.replace(' da Planilha Financeira Pessoal', '').replace('Tela de ', '')}</figcaption></figure>)}</div>
      </section>

      <section className={styles.steps}>
        <p className={styles.sectionLabel}>Comece sem complicação</p><h2>Em três passos, suas finanças entram nos trilhos.</h2>
        <ol><li><span>01</span><div><strong>Receba a planilha</strong><p>Após a confirmação, você recebe o arquivo e pode fazer sua cópia.</p></div></li><li><span>02</span><div><strong>Faça a configuração inicial</strong><p>Cadastre contas, cartões, categorias e objetivos conforme a sua realidade.</p></div></li><li><span>03</span><div><strong>Registre e acompanhe</strong><p>Adicione os movimentos e deixe os painéis mostrarem sua evolução.</p></div></li></ol>
      </section>

      <section className={styles.faq}>
        <div><p className={styles.sectionLabel}>Perguntas frequentes</p><h2>O que você precisa saber antes de começar.</h2></div>
        <div>{[
          ['Preciso saber usar fórmulas?', 'Não. As fórmulas e indicadores já estão configurados. Você preenche apenas os campos de uso diário.'],
          ['Consigo usar no celular?', 'Sim. A estrutura foi organizada para facilitar os lançamentos e as consultas pelo celular, além do computador.'],
          ['Existe mensalidade?', 'Não. O valor de R$ 37,90 é um pagamento único pela planilha.'],
          ['A planilha serve para casal ou família?', 'Sim. Você pode adaptar categorias, contas, cartões e metas para acompanhar as finanças da casa.'],
        ].map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
      </section>

      <section className={styles.finalCta}><div><p className={styles.sectionLabel}>Seu dinheiro merece clareza</p><h2>Comece hoje a organizar sua vida financeira.</h2><p>Tenha uma visão simples do presente e transforme seus planos em metas acompanháveis.</p></div><div><strong><span>R$</span> 37,90</strong><small>pagamento único</small><BuyButton location="final" /></div></section>
    </main>

    <footer className={styles.footer}><a href="/"><img src={siteConfig.logoPath} alt="Ronas Tech" width="43" height="40" /></a><p>© {new Date().getFullYear()} Ronas Tech. Todos os direitos reservados.</p><div><a href="/politica-de-privacidade">Privacidade</a><a href="/termos-de-uso">Termos</a></div></footer>
  </div>
}

export default PersonalFinanceProductPage
