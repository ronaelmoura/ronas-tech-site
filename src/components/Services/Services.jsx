const groups = [
  {
    number: '01', label: 'PRESENÇA', title: 'Sua empresa precisa ser encontrada e entendida.',
    text: 'Experiências digitais que apresentam seu negócio com clareza e levam o visitante até a próxima ação.',
    links: [['Sites profissionais','sites-profissionais'], ['Landing pages','landing-pages']],
  },
  {
    number: '02', label: 'OPERAÇÃO', title: 'Sua rotina precisa de uma ferramenta que acompanhe o trabalho.',
    text: 'Sistemas, dashboards e APIs para organizar informações e transformar controles espalhados em uma operação mais clara.',
    links: [['Sistemas web','sistemas-web'], ['Dashboards e integrações','dashboards-e-integracoes']],
  },
  {
    number: '03', label: 'AUTOMAÇÃO', title: 'O trabalho repetitivo não deveria ocupar o tempo da equipe.',
    text: 'Fluxos conectados para reduzir tarefas manuais, integrar ferramentas e fazer processos acontecerem com menos intervenção.',
    links: [['Automação de processos','automacao-de-processos']],
  },
  {
    number: '04', label: 'INTELIGÊNCIA', title: 'IA precisa resolver uma tarefa real — não só aparecer no projeto.',
    text: 'Aplicações práticas de IA para consultar informações, apoiar decisões, atender clientes ou automatizar partes da rotina.',
    links: [['IA para empresas','ia-para-empresas']],
  },
]

function Services() {
  return (
    <section id="solucoes" className="services-section" aria-labelledby="services-title">
      <div className="services-container">
        <header className="services-heading">
          <div>
            <p className="services-eyebrow">O que podemos construir</p>
            <h2 id="services-title">Quatro caminhos. Uma pergunta: o que precisa funcionar melhor?</h2>
          </div>
          <div className="services-intro">
            <strong>Não precisa escolher um serviço antes de falar com a gente.</strong>
            <span>A solução nasce do problema — e pode combinar mais de uma dessas frentes.</span>
          </div>
        </header>

        <div className="services-index">
          {groups.map((group) => (
            <article className="service-row" key={group.number}>
              <div className="service-identity">
                <span className="service-number">{group.number}</span>
                <p>{group.label}</p>
              </div>
              <div className="service-copy">
                <h3>{group.title}</h3>
                <p>{group.text}</p>
              </div>
              <nav className="service-links" aria-label={`Serviços de ${group.label.toLowerCase()}`}>
                {group.links.map(([label, slug]) => <a key={slug} href={`/servicos/${slug}`}>{label}<span aria-hidden="true">↗</span></a>)}
              </nav>
            </article>
          ))}
        </div>

        <div className="services-bottom">
          <span>Problema → caminho → solução</span>
          <strong>Uma tecnologia só entra quando ajuda a resolver o problema.</strong>
          <a href="#contato">Falar sobre o meu projeto <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  )
}
export default Services
