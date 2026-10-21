import { useEffect, useState } from 'react'
import { siteConfig } from '../config/siteConfig'
import styles from './ServicePage.module.css'
import { trackWhatsAppClick } from '../utils/analytics'

const services = {
  'sites-profissionais': {
    eyebrow: '01 · Sites Profissionais',
    title: 'Criação de sites profissionais que geram confiança.',
    intro: 'Tenha um site rápido, responsivo e fácil de usar, com as informações que seus clientes precisam para confiar e entrar em contato.',
    problem: 'Muitas empresas perdem contatos porque o site está desatualizado, confuso ou não funciona bem no celular.',
    solution: 'Criamos o site de acordo com os serviços da empresa, com versão para celular, informações organizadas e canais de contato.',
    deliverables: ['Layout responsivo para celular, tablet e desktop', 'Integração com WhatsApp e formulários', 'Estrutura preparada para SEO', 'Performance e acessibilidade', 'Publicação e configuração inicial'],
    faq: [
      ['Quanto custa criar um site profissional?', 'O investimento depende da quantidade de páginas, conteúdo e integrações. Antes do desenvolvimento, você recebe uma proposta com escopo, prazo e valor definidos.'],
      ['O site funciona bem no celular?', 'Sim. O projeto é construído e testado para celular, tablet e computador, com navegação clara e botões de contato fáceis de usar.'],
      ['Domínio, hospedagem e publicação estão incluídos?', 'A proposta informa o que será configurado e os custos externos envolvidos. Também podemos orientar ou executar a publicação inicial.'],
      ['O site já fica preparado para o Google?', 'Entregamos estrutura semântica, títulos, descrições, sitemap, desempenho e indexação técnica. O crescimento orgânico também depende de conteúdo, concorrência e autoridade ao longo do tempo.'],
    ],
  },
  'landing-pages': {
    eyebrow: '02 · Landing Pages',
    title: 'Criação de landing pages focadas em conversão.',
    intro: 'Landing pages profissionais, rápidas e responsivas para apresentar sua oferta com clareza e apoiar campanhas no Google Ads.',
    problem: 'Seu anúncio gera visitas, mas a página não deixa claro o que você oferece, por que a pessoa deveria confiar ou qual ação deve tomar.',
    solution: 'Criamos páginas objetivas e orientadas à conversão, alinhando anúncio, mensagem, prova, chamada para ação e medição dos contatos.',
    deliverables: ['Estrutura de conversão', 'Copy e hierarquia visual orientadas ao objetivo', 'Formulário ou WhatsApp', 'Design responsivo', 'Medição e eventos básicos'],
    faq: [
      ['Quanto custa uma landing page?', 'O valor varia conforme a oferta, o conteúdo, as integrações e a medição necessária. Você recebe escopo, prazo e investimento definidos antes do início.'],
      ['A página pode ser usada no Google Ads?', 'Sim. A estrutura pode ser alinhada ao anúncio, à palavra-chave e à ação esperada, com carregamento rápido e experiência adequada no celular.'],
      ['É possível medir cliques no WhatsApp e formulários?', 'Sim. Configuramos eventos básicos e, quando você fornece os acessos necessários, integramos a página às ferramentas de medição da campanha.'],
      ['Em quanto tempo a landing page fica pronta?', 'O prazo depende do conteúdo e das integrações. Projetos mais diretos costumam avançar rapidamente depois da aprovação do escopo e do envio dos materiais.'],
    ],
  },
  'ia-para-empresas': {
    eyebrow: '03 · IA para Empresas',
    title: 'Use IA para resolver tarefas reais da sua operação.',
    intro: 'IA aplicada a tarefas específicas da empresa, como atendimento, organização de informações e análise de dados.',
    problem: 'Sua equipe perde tempo respondendo as mesmas perguntas, organizando informações ou executando tarefas que poderiam ser assistidas por IA.',
    solution: 'Primeiro definimos a tarefa. Depois avaliamos onde a IA pode ajudar e integramos o recurso ao processo existente.',
    deliverables: ['Assistentes e chatbots', 'Classificação e organização de informações', 'Geração e análise de conteúdo', 'Integração com sistemas e APIs', 'Fluxos com revisão e controle'],
  },
  'automacao-de-processos': {
    eyebrow: '04 · Automação de Processos',
    title: 'Menos trabalho repetitivo. Mais tempo para sua equipe.',
    intro: 'Automatize tarefas repetitivas e faça as ferramentas usadas pela equipe trocarem informações sem trabalho manual.',
    problem: 'Informações são copiadas manualmente entre planilhas, sistemas, e-mails ou WhatsApp e pequenas tarefas consomem horas da equipe.',
    solution: 'Analisamos o processo atual, identificamos as tarefas repetitivas e montamos o fluxo automático necessário.',
    deliverables: ['Mapeamento do processo', 'Integrações entre ferramentas', 'Formulários e notificações automáticas', 'APIs e webhooks', 'Logs e tratamento de erros'],
  },
  'sistemas-web': {
    eyebrow: '05 · Sistemas Web',
    title: 'Um sistema sob medida para o jeito que sua empresa trabalha.',
    intro: 'Sistemas web feitos para reunir informações e organizar rotinas que não cabem bem em planilhas.',
    problem: 'Planilhas e ferramentas genéricas não acompanham mais a operação e sua equipe precisa improvisar para controlar informações importantes.',
    solution: 'O sistema é desenvolvido conforme as regras da empresa, incluindo usuários, permissões, banco de dados e painéis quando necessário.',
    deliverables: ['Painéis administrativos', 'Gestão de clientes, pedidos e estoque', 'Autenticação e permissões', 'APIs REST e banco de dados', 'Deploy e documentação'],
  },
  'dashboards-e-integracoes': {
    eyebrow: '06 · Dashboards e Integrações',
    title: 'Transforme dados espalhados em informação útil.',
    intro: 'Painéis e integrações para reunir os dados importantes em um só lugar.',
    problem: 'Os dados estão espalhados em planilhas e ferramentas diferentes, dificultando acompanhar indicadores e tomar decisões com rapidez.',
    solution: 'Conectamos as fontes necessárias e organizamos os indicadores que a equipe precisa acompanhar.',
    deliverables: ['Dashboards personalizados', 'Integração com APIs', 'Centralização de dados', 'Filtros e indicadores', 'Atualização e tratamento de dados'],
  },
}

function ServicePage({ slug }) {
  const service = services[slug]
  const [open, setOpen] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = `${service?.eyebrow?.replace(/^\d+ · /, '') || 'Serviço'} | Ronas Tech`
  }, [service?.eyebrow])

  if (!service) return null

  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`Olá, Ronael! Quero conversar sobre o serviço de ${service.eyebrow.replace(/^\d+ · /, '')}.`)}`

  return (
    <>
    <a className="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a>
    <main id="conteudo-principal" className={styles.page}>
      <header className={styles.nav}>
        <a href="/" className={styles.logo}><img src={siteConfig.logoPath} alt="" width="40" height="38" /><span>{siteConfig.companyName}</span></a>
        <a href="/" className={styles.back}>← Voltar para o início</a>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>{service.eyebrow}</p>
          <h1>{service.title}</h1>
          <p className={styles.intro}>{service.intro}</p>
          <div className={styles.actions}>
            <a className={styles.primary} href={whatsappUrl} target="_blank" rel="noopener noreferrer" data-ronas-cta={`service_${slug}_hero`} onClick={() => trackWhatsAppClick(`service_${slug}_hero`)}>Solicitar orçamento <span>→</span></a>
            <a className={styles.secondary} href="#como-funciona">Como funciona</a>
          </div>
          <p className={styles.contactNote}>Atendimento direto com Ronael Moura. Escopo, prazo e investimento definidos antes de começar.</p>
        </div>
        <div className={styles.heroCard}>
          <small>RONAS TECH / SERVIÇO</small>
          <strong>{service.eyebrow.replace(/^\d+ · /, '')}</strong>
          <div className={styles.line}><span /> Entendimento do problema</div>
          <div className={styles.line}><span /> Desenvolvimento da solução</div>
          <div className={styles.line}><span /> Implementação e evolução</div>
        </div>
      </section>

      <section className={styles.problem}>
        <div><p className={styles.label}>O problema</p><h2>{['sites-profissionais', 'landing-pages'].includes(slug) ? 'Seu cliente precisa entender o que você oferece.' : 'Sua rotina pode funcionar melhor.'}</h2></div>
        <p>{service.problem}</p>
      </section>

      <section className={styles.solution}>
        <div><p className={styles.label}>A solução</p><h2>A tecnologia precisa resolver uma necessidade concreta.</h2></div>
        <p>{service.solution}</p>
      </section>

      <section className={styles.deliverables}>
        <header><p className={styles.label}>O que podemos entregar</p><h2>O que entra no projeto depende do que sua empresa precisa.</h2></header>
        <div className={styles.items}>
          {service.deliverables.map((item, index) => (
            <button key={item} className={styles.item} type="button" aria-expanded={open === index} aria-controls={open === index ? `deliverable-${index}` : undefined} onClick={() => setOpen(open === index ? null : index)}>
              <span>0{index + 1}</span><strong>{item}</strong><i aria-hidden="true">{open === index ? '−' : '+'}</i>
              {open === index && <em id={`deliverable-${index}`}>A entrega é definida conforme o processo e o objetivo do projeto.</em>}
            </button>
          ))}
        </div>
      </section>

      {service.faq && (
        <section className={styles.faq} aria-labelledby="service-faq-title">
          <header>
            <p className={styles.label}>Dúvidas comuns</p>
            <h2 id="service-faq-title">O que você precisa saber antes de começar.</h2>
          </header>
          <div className={styles.faqList}>
            {service.faq.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      <section id="como-funciona" className={styles.process}>
        <p className={styles.label}>Como funciona</p>
        <h2>Como trabalhamos.</h2>
        <div className={styles.steps}>
          <article><b>01</b><h3>Entendemos</h3><p>Conversamos sobre o processo, objetivo e problema.</p></article>
          <article><b>02</b><h3>Planejamos</h3><p>Definimos escopo, prioridades e a solução adequada.</p></article>
          <article><b>03</b><h3>Construímos</h3><p>Desenvolvemos, testamos e validamos a solução.</p></article>
          <article><b>04</b><h3>Colocamos no ar</h3><p>Publicamos e deixamos a solução pronta para evoluir.</p></article>
        </div>
      </section>

      <aside className={styles.proof} aria-label="Conheça o responsável pelo projeto">
        <div><p className={styles.label}>Quem constrói com você</p><h2>Ronael Moura, da conversa à entrega.</h2><p>Desenvolvedor Full Stack formado pelo SENAI. Conheça os projetos, explore as soluções e veja como o trabalho é feito.</p></div>
        <a className={styles.secondary} href="/#projetos">Conhecer os projetos</a>
      </aside>
      <section className={styles.cta}>
        <p className={styles.label}>Vamos conversar?</p>
        <h2>Conte o que sua empresa precisa resolver.</h2>
        <p>Você não precisa saber qual tecnologia usar. Conte o que está acontecendo e avaliamos o caminho mais adequado.</p>
        <a className={styles.primary} href={whatsappUrl} target="_blank" rel="noopener noreferrer" data-ronas-cta={`service_${slug}_footer`} onClick={() => trackWhatsAppClick(`service_${slug}_footer`)}>Falar com a Ronas Tech <span>→</span></a>
      </section>
    </main>
    <footer className={styles.footer}><span>Ronas Tech · Tianguá, Ceará · Atendimento remoto</span><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><a href="/politica-de-privacidade">Privacidade</a><a href="/termos-de-uso">Termos de uso</a></footer>
    </>
  )
}

export default ServicePage
