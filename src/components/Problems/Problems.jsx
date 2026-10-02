import Icon from '../Icon/Icon'

const problems = [
  ['01', 'TEMPO', 'Sua equipe faz a mesma tarefa todos os dias.', 'Automação', 'repeat'],
  ['02', 'OPERAÇÃO', 'Sua rotina ainda depende de planilhas e controles manuais.', 'Sistema web', 'layout'],
  ['03', 'INTEGRAÇÃO', 'Suas informações estão espalhadas em ferramentas diferentes.', 'Integrações', 'link'],
  ['04', 'PRESENÇA', 'Sua empresa é melhor do que a experiência digital mostra.', 'Site / Landing Page', 'globe'],
  ['05', 'IA', 'Você quer usar IA, mas ainda não encontrou uma aplicação prática.', 'IA aplicada', 'sparkles'],
]

function Problems() {
  return (
    <section id="problemas" className="problems-section" aria-labelledby="problems-title">
      <div className="problems-container">
        <header className="problems-heading">
          <div>
            <p className="problems-eyebrow">Começamos pelo que importa</p>
            <h2 id="problems-title">O que está fazendo seu negócio perder tempo?</h2>
          </div>
          <div className="problems-intro">
            <strong>Você não precisa saber qual tecnologia precisa.</strong>
            <span>Conte o que está acontecendo hoje. A primeira conversa serve para encontrar o caminho.</span>
          </div>
        </header>

        <div className="problems-grid">
          {problems.map(([number, type, title, answer, icon]) => (
            <article className="problem-card" key={number}>
              <div className="problem-card-top"><span>{number}</span><b>{type}</b></div>
              <div className="problem-icon"><Icon name={icon} size={23} /></div>
              <h3>{title}</h3>
              <div className="problem-answer"><small>CAMINHO POSSÍVEL</small><p>{answer}</p></div>
              <a href="#contato">Conversar sobre isso <span>→</span></a>
            </article>
          ))}
        </div>

        <div className="problems-bridge">
          <i /><div><strong>Você traz o contexto → a gente encontra o caminho → construímos a solução</strong><span>Sem começar pelo código. Primeiro entendemos o que realmente precisa mudar.</span></div>
        </div>
      </div>
    </section>
  )
}
export default Problems
