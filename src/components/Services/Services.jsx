const slugs = {
  'Sites Profissionais': 'sites-profissionais',
  'Landing Pages': 'landing-pages',
  'IA para Empresas': 'ia-para-empresas',
  'Automação de Processos': 'automacao-de-processos',
  'Sistemas Web': 'sistemas-web',
  'Dashboards e Integrações': 'dashboards-e-integracoes',
}

const services = [
  { number:'01', type:'PRESENÇA', title:'Sites Profissionais', text:'Para apresentar sua empresa com clareza e transformar visitas em oportunidades de contato.', items:['Página institucional','WhatsApp e formulários','SEO e performance'], icon:'↗' },
  { number:'02', type:'CONVERSÃO', title:'Landing Pages', text:'Para divulgar uma oferta, serviço ou campanha com uma página construída para levar o visitante à próxima ação.', items:['Página de campanha','Formulários e integrações','Estrutura orientada à conversão'], icon:'◆' },
  { number:'03', type:'INTELIGÊNCIA', title:'IA para Empresas', text:'Para aplicar inteligência artificial em tarefas reais, sem colocar complexidade onde ela não é necessária.', items:['Assistentes e chatbots','Consulta e organização de informações','IA integrada ao processo'], icon:'✦' },
  { number:'04', type:'FLUXO', title:'Automação de Processos', text:'Para conectar etapas e reduzir tarefas manuais que consomem tempo todos os dias.', items:['Integração entre ferramentas','Fluxos automáticos','Notificações e formulários'], icon:'⌁' },
  { number:'05', type:'OPERAÇÃO', title:'Sistemas Web', text:'Para transformar controles espalhados em uma ferramenta que acompanha a rotina da sua empresa.', items:['Clientes, pedidos e estoque','Painéis administrativos','Usuários e permissões'], icon:'▦' },
  { number:'06', type:'DADOS', title:'Dashboards e Integrações', text:'Para reunir informações importantes e fazer sistemas que hoje estão separados trabalharem juntos.', items:['Dashboards personalizados','APIs e integrações','Dados centralizados'], icon:'⇄' },
]

function Services() {
  return (
    <section id="servicos" className="services-section reveal" aria-labelledby="services-title">
      <div className="services-container">
        <header className="services-heading">
          <div>
            <p className="services-eyebrow">Soluções digitais</p>
            <h2 id="services-title">Você traz o problema. A gente encontra o formato da solução.</h2>
          </div>
          <div className="services-intro">
            <strong>Não sabe se precisa de um site, sistema, automação ou IA?</strong>
            <span>Tudo bem. A primeira conversa serve justamente para entender o cenário e definir o que faz sentido.</span>
          </div>
        </header>

        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <div className="service-top"><span className="service-number">{service.number}</span><span className="service-type">{service.type}</span></div>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul>
              <a href={'/servicos/' + slugs[service.title]}>Explorar solução <span aria-hidden="true">→</span></a>
            </article>
          ))}
        </div>

        <div className="services-bottom">
          <span>06 frentes de solução</span>
          <i />
          <strong>Uma tecnologia só entra quando ela ajuda a resolver o problema.</strong>
          <a href="#contato">Falar sobre meu projeto →</a>
        </div>
      </div>
    </section>
  )
}

export default Services
