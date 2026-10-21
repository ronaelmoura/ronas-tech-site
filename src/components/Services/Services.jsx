import Icon from '../Icon/Icon'

const groups = [
  { icon: 'globe', label: 'Presença digital', title: 'Um site à altura do seu negócio.', text: 'Apresente seus serviços com clareza e facilite o caminho de quem quer contratar você.', links: [['Sites profissionais', 'sites-profissionais'], ['Landing pages', 'landing-pages']] },
  { icon: 'layout', label: 'Sistemas e integrações', title: 'Sua operação, bem organizada.', text: 'Reúna informações, acompanhe o trabalho e conecte ferramentas em um sistema feito para sua rotina.', links: [['Sistemas web', 'sistemas-web'], ['Dashboards e integrações', 'dashboards-e-integracoes']] },
  { icon: 'workflow', label: 'Automação de processos', title: 'Menos repetição. Mais tempo útil.', text: 'Conecte as etapas do trabalho e reduza tarefas manuais que ocupam o dia da sua equipe.', links: [['Conhecer automações', 'automacao-de-processos']] },
  { icon: 'sparkles', label: 'Inteligência artificial', title: 'IA com uma função bem definida.', text: 'Use suas informações para apoiar atendimentos, consultar conteúdos e simplificar tarefas específicas.', links: [['IA para empresas', 'ia-para-empresas']] },
]

export default function Services() {
  return <section id="solucoes" className="services-section" aria-labelledby="services-title">
    <div className="services-container">
      <header className="services-heading"><div><p className="services-eyebrow">O que podemos construir</p><h2 id="services-title">Tecnologia que faz sentido para você.</h2></div><p className="services-intro">Não precisa chegar com a solução pronta. Começamos pelo seu desafio e escolhemos o caminho juntos.</p></header>
      <div className="services-index">{groups.map(group => <article className="service-row" key={group.label}>
        <div className="service-identity"><span className="service-icon"><Icon name={group.icon} size={24} /></span><p>{group.label}</p></div>
        <div className="service-copy"><h3>{group.title}</h3><p>{group.text}</p></div>
        <nav className="service-links" aria-label={`Serviços de ${group.label.toLowerCase()}`}>{group.links.map(([label, slug]) => <a key={slug} href={`/servicos/${slug}`}>{label}<Icon name="arrowUpRight" size={18} /></a>)}</nav>
      </article>)}</div>
      <div className="services-bottom"><p>Seu desafio combina mais de uma dessas frentes?</p><a href="#contato">Vamos encontrar o caminho <Icon name="arrowUpRight" size={18} /></a></div>
    </div>
  </section>
}
