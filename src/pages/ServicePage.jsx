import { useEffect, useState } from 'react'
import { siteConfig } from '../config/siteConfig'
import styles from './ServicePage.module.css'

const services = {
  'sites-profissionais': {
    eyebrow: '01 · Sites Profissionais',
    title: 'Um site profissional que trabalha pelo seu negócio.',
    intro: 'Crie uma presença digital rápida, confiável e preparada para transformar visitantes em contatos.',
    problem: 'Seu negócio existe, mas quem procura por você encontra pouca informação, uma experiência ruim ou não consegue entrar em contato com facilidade.',
    solution: 'Construímos sites sob medida, responsivos e focados no objetivo da empresa — apresentar serviços, gerar contatos e fortalecer a presença digital.',
    deliverables: ['Layout responsivo para celular, tablet e desktop', 'Integração com WhatsApp e formulários', 'Estrutura preparada para SEO', 'Performance e acessibilidade', 'Publicação e configuração inicial'],
  },
  'landing-pages': {
    eyebrow: '02 · Landing Pages',
    title: 'Uma página criada para transformar atenção em ação.',
    intro: 'Landing pages focadas em campanhas, produtos e serviços, com uma jornada clara até a conversão.',
    problem: 'Seu anúncio gera visitas, mas a página não deixa claro o que você oferece, por que a pessoa deveria confiar ou qual ação deve tomar.',
    solution: 'Criamos páginas objetivas, rápidas e orientadas à conversão, alinhando mensagem, estrutura, prova e chamada para ação.',
    deliverables: ['Estrutura de conversão', 'Copy e hierarquia visual orientadas ao objetivo', 'Formulário ou WhatsApp', 'Design responsivo', 'Medição e eventos básicos'],
  },
  'ia-para-empresas': {
    eyebrow: '03 · IA para Empresas',
    title: 'Use IA para resolver tarefas reais da sua operação.',
    intro: 'Aplicações práticas de inteligência artificial para atendimento, vendas, produtividade e análise de informações.',
    problem: 'Sua equipe perde tempo respondendo as mesmas perguntas, organizando informações ou executando tarefas que poderiam ser assistidas por IA.',
    solution: 'Identificamos onde a IA realmente pode gerar valor e construímos uma solução integrada ao fluxo da empresa, com regras, validações e supervisão.',
    deliverables: ['Assistentes e chatbots', 'Classificação e organização de informações', 'Geração e análise de conteúdo', 'Integração com sistemas e APIs', 'Fluxos com revisão e controle'],
  },
  'automacao-de-processos': {
    eyebrow: '04 · Automação de Processos',
    title: 'Menos trabalho repetitivo. Mais tempo para sua equipe.',
    intro: 'Automatize tarefas e conecte ferramentas para deixar processos mais rápidos, organizados e rastreáveis.',
    problem: 'Informações são copiadas manualmente entre planilhas, sistemas, e-mails ou WhatsApp e pequenas tarefas consomem horas da equipe.',
    solution: 'Mapeamos o processo, encontramos os pontos repetitivos e criamos fluxos automáticos que conectam as ferramentas já usadas pela empresa.',
    deliverables: ['Mapeamento do processo', 'Integrações entre ferramentas', 'Formulários e notificações automáticas', 'APIs e webhooks', 'Logs e tratamento de erros'],
  },
  'sistemas-web': {
    eyebrow: '05 · Sistemas Web',
    title: 'Um sistema sob medida para o jeito que sua empresa trabalha.',
    intro: 'Aplicações web personalizadas para centralizar processos, dados, usuários e operações.',
    problem: 'Planilhas e ferramentas genéricas não acompanham mais a operação e sua equipe precisa improvisar para controlar informações importantes.',
    solution: 'Desenvolvemos sistemas web alinhados às regras do negócio, com autenticação, permissões, banco de dados e painéis para os usuários.',
    deliverables: ['Painéis administrativos', 'Gestão de clientes, pedidos e estoque', 'Autenticação e permissões', 'APIs REST e banco de dados', 'Deploy e documentação'],
  },
  'dashboards-e-integracoes': {
    eyebrow: '06 · Dashboards e Integrações',
    title: 'Transforme dados espalhados em informação útil.',
    intro: 'Dashboards e integrações para conectar sistemas, centralizar dados e facilitar decisões.',
    problem: 'Os dados estão espalhados em planilhas e ferramentas diferentes, dificultando acompanhar indicadores e tomar decisões com rapidez.',
    solution: 'Conectamos as fontes necessárias e construímos uma visão centralizada dos indicadores que realmente importam para a operação.',
    deliverables: ['Dashboards personalizados', 'Integração com APIs', 'Centralização de dados', 'Filtros e indicadores', 'Atualização e tratamento de dados'],
  },
}

function ServicePage({ slug }) {
  const service = services[slug]
  const [open, setOpen] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = `${service?.eyebrow?.replace(/^\\d+ · /, '') || 'Serviço'} | Ronas Tech`
  }, [slug])

  if (!service) return null

  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`Olá, Ronael! Quero conversar sobre o serviço de ${service.eyebrow.replace(/^\\d+ · /, '')}.`)}`

  return (
    <main className={styles.page}>
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
            <a className={styles.primary} href={whatsappUrl} target="_blank" rel="noopener noreferrer">Solicitar orçamento <span>→</span></a>
            <a className={styles.secondary} href="#como-funciona">Como funciona</a>
          </div>
        </div>
        <div className={styles.heroCard}>
          <small>RONAS TECH / SOLUÇÃO</small>
          <strong>{service.eyebrow.replace(/^\\d+ · /, '')}</strong>
          <div className={styles.line}><span /> Entendimento do problema</div>
          <div className={styles.line}><span /> Desenvolvimento da solução</div>
          <div className={styles.line}><span /> Implementação e evolução</div>
        </div>
      </section>

      <section className={styles.problem}>
        <div><p className={styles.label}>O problema</p><h2>Quando o processo começa a consumir mais tempo do que deveria.</h2></div>
        <p>{service.problem}</p>
      </section>

      <section className={styles.solution}>
        <div><p className={styles.label}>A solução</p><h2>Não entregamos tecnologia por tecnologia.</h2></div>
        <p>{service.solution}</p>
      </section>

      <section className={styles.deliverables}>
        <header><p className={styles.label}>O que podemos entregar</p><h2>Construído de acordo com sua necessidade.</h2></header>
        <div className={styles.items}>
          {service.deliverables.map((item, index) => (
            <button key={item} className={styles.item} type="button" onClick={() => setOpen(open === index ? null : index)}>
              <span>0{index + 1}</span><strong>{item}</strong><i>{open === index ? '−' : '+'}</i>
              {open === index && <em>Definimos o escopo dessa entrega de acordo com o seu processo, objetivo e contexto.</em>}
            </button>
          ))}
        </div>
      </section>

      <section id="como-funciona" className={styles.process}>
        <p className={styles.label}>Como funciona</p>
        <h2>Do problema à solução.</h2>
        <div className={styles.steps}>
          <article><b>01</b><h3>Entendemos</h3><p>Conversamos sobre o processo, objetivo e problema.</p></article>
          <article><b>02</b><h3>Planejamos</h3><p>Definimos escopo, prioridades e a solução adequada.</p></article>
          <article><b>03</b><h3>Construímos</h3><p>Desenvolvemos, testamos e validamos a solução.</p></article>
          <article><b>04</b><h3>Colocamos no ar</h3><p>Publicamos e deixamos a solução pronta para evoluir.</p></article>
        </div>
      </section>

      <section className={styles.cta}>
        <p className={styles.label}>Vamos conversar?</p>
        <h2>Conte o que sua empresa precisa resolver.</h2>
        <p>Não precisa chegar com a solução pronta. A primeira conversa serve justamente para entender o problema.</p>
        <a className={styles.primary} href={whatsappUrl} target="_blank" rel="noopener noreferrer">Falar com a Ronas Tech <span>→</span></a>
      </section>
    </main>
  )
}

export { services }
export default ServicePage
