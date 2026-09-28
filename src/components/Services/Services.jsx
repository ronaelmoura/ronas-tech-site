const slugs = {
  'Sites Profissionais': 'sites-profissionais',
  'Landing Pages': 'landing-pages',
  'IA para Empresas': 'ia-para-empresas',
  'Automação de Processos': 'automacao-de-processos',
  'Sistemas Web': 'sistemas-web',
  'Dashboards e Integrações': 'dashboards-e-integracoes',
}

const services = [
  {
    number: '01',
    title: 'Sites Profissionais',
    text: 'Sites rápidos e responsivos para apresentar sua empresa e facilitar o contato com clientes.',
    items: ['Design responsivo', 'WhatsApp e formulários', 'SEO técnico básico'],
  },
  {
    number: '02',
    title: 'Landing Pages',
    text: 'Páginas para divulgar produtos, serviços e campanhas com uma chamada clara para ação.',
    items: ['Estrutura orientada à conversão', 'Integrações e formulários', 'Performance e responsividade'],
  },
  {
    number: '03',
    title: 'IA para Empresas',
    text: 'IA aplicada a tarefas de atendimento, organização, análise e produção de conteúdo.',
    items: ['Assistentes e chatbots', 'IA conectada aos processos', 'Automação de tarefas inteligentes'],
  },
  {
    number: '04',
    title: 'Automação de Processos',
    text: 'Ligamos ferramentas e automatizamos tarefas que hoje precisam ser feitas manualmente.',
    items: ['Integrações entre sistemas', 'Fluxos automáticos', 'Formulários e notificações'],
  },
  {
    number: '05',
    title: 'Sistemas Web',
    text: 'Sistemas web feitos para organizar informações e rotinas específicas da sua empresa.',
    items: ['Painéis administrativos', 'Clientes, pedidos e estoque', 'Autenticação e permissões'],
  },
  {
    number: '06',
    title: 'Dashboards e Integrações',
    text: 'Painéis e integrações para reunir dados e fazer diferentes sistemas trabalharem juntos.',
    items: ['Dashboards personalizados', 'APIs e integrações', 'Dados centralizados'],
  },
]

function Services() {
  return (
    <section id="servicos" className="services-section reveal" aria-labelledby="services-title">
      <div className="services-container">
        <header className="services-heading">
          <div>
            <p className="services-eyebrow">Soluções digitais</p>
            <h2 id="services-title">Ferramentas digitais para resolver problemas do dia a dia da sua empresa.</h2>
          </div>
          <p className="services-intro">Do site ao sistema interno, o trabalho começa entendendo o que precisa ser feito.</p>
        </header>
        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <span className="service-number">{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul>
              <a href={`/servicos/${slugs[service.title]}`}>Conhecer este serviço <span aria-hidden="true">→</span></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
