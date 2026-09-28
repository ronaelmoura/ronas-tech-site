const slugs = {
  'Sites Profissionais': 'sites-profissionais',
  'Landing Pages': 'landing-pages',
  'IA para Empresas': 'ia-para-empresas',
  'Automação de Processos': 'automacao-de-processos',
  'Sistemas Web': 'sistemas-web',
  'Dashboards e Integrações': 'dashboards-e-integracoes',
}

const services = [
  { number: '01', title: 'Sites Profissionais', text: 'Para empresas que precisam de uma presença digital clara, rápida e preparada para receber novos contatos.', items: ['Página institucional', 'WhatsApp e formulários', 'SEO e performance'] },
  { number: '02', title: 'Landing Pages', text: 'Para divulgar um produto, serviço ou campanha com uma página focada em levar o visitante à próxima ação.', items: ['Página de campanha', 'Formulários e integrações', 'Estrutura orientada à conversão'] },
  { number: '03', title: 'IA para Empresas', text: 'Para colocar IA em tarefas onde ela pode ajudar de verdade, sem adicionar complexidade desnecessária.', items: ['Assistentes e chatbots', 'Consulta e organização de informações', 'IA integrada ao processo'] },
  { number: '04', title: 'Automação de Processos', text: 'Para deixar de repetir tarefas manuais e fazer diferentes ferramentas trabalharem juntas.', items: ['Integração entre ferramentas', 'Fluxos automáticos', 'Notificações e formulários'] },
  { number: '05', title: 'Sistemas Web', text: 'Para substituir controles espalhados por uma ferramenta criada de acordo com a rotina da sua empresa.', items: ['Clientes, pedidos e estoque', 'Painéis administrativos', 'Usuários e permissões'] },
  { number: '06', title: 'Dashboards e Integrações', text: 'Para reunir informações importantes e conectar sistemas que hoje funcionam separados.', items: ['Dashboards personalizados', 'APIs e integrações', 'Dados centralizados'] },
]

function Services() {
  return (
    <section id="servicos" className="services-section reveal" aria-labelledby="services-title">
      <div className="services-container">
        <header className="services-heading">
          <div>
            <p className="services-eyebrow">O que podemos construir</p>
            <h2 id="services-title">Uma solução diferente para cada tipo de problema.</h2>
          </div>
          <p className="services-intro">Você não precisa chegar sabendo qual tecnologia usar. Primeiro entendemos a necessidade, depois definimos o que faz sentido.</p>
        </header>
        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <span className="service-number">{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul>
              <a href={'/servicos/' + slugs[service.title]}>Ver o que podemos fazer <span aria-hidden="true">→</span></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
