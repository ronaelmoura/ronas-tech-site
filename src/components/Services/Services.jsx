const services = [
  {
    number: '01',
    title: 'Sites Profissionais',
    text: 'Sites rápidos, responsivos e pensados para transformar presença digital em oportunidades de negócio.',
    items: ['Design responsivo', 'WhatsApp e formulários', 'SEO técnico básico'],
  },
  {
    number: '02',
    title: 'Landing Pages',
    text: 'Páginas focadas em campanhas, produtos e serviços, com uma jornada clara até o contato ou conversão.',
    items: ['Estrutura orientada à conversão', 'Integrações e formulários', 'Performance e responsividade'],
  },
  {
    number: '03',
    title: 'IA para Empresas',
    text: 'Soluções práticas de IA para atendimento, vendas, produtividade e análise de informações.',
    items: ['Assistentes e chatbots', 'IA conectada aos processos', 'Automação de tarefas inteligentes'],
  },
  {
    number: '04',
    title: 'Automação de Processos',
    text: 'Conectamos ferramentas e eliminamos tarefas repetitivas para sua equipe ganhar tempo.',
    items: ['Integrações entre sistemas', 'Fluxos automáticos', 'Formulários e notificações'],
  },
  {
    number: '05',
    title: 'Sistemas Web',
    text: 'Sistemas sob medida para processos que precisam de mais controle, segurança e organização.',
    items: ['Painéis administrativos', 'Clientes, pedidos e estoque', 'Autenticação e permissões'],
  },
  {
    number: '06',
    title: 'Dashboards e Integrações',
    text: 'Transformamos dados espalhados em informações úteis e conectamos sistemas que precisam conversar.',
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
            <h2 id="services-title">Tecnologia aplicada ao que sua empresa precisa resolver.</h2>
          </div>
          <p className="services-intro">Do primeiro site a sistemas e automações mais complexos, cada solução parte do processo real do negócio.</p>
        </header>
        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <span className="service-number">{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul>
              <a href="#contato">Conversar sobre este serviço <span aria-hidden="true">→</span></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
