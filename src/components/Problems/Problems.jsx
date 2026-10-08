const problems = [
  ['01', 'Tempo', 'Sua equipe faz a mesma tarefa todos os dias.', 'Automação'],
  ['02', 'Operação', 'Sua rotina ainda depende de planilhas e controles manuais.', 'Sistema web'],
  ['03', 'Integração', 'Suas informações estão espalhadas em ferramentas diferentes.', 'Integrações'],
  ['04', 'Presença', 'Sua empresa é melhor do que a experiência digital mostra.', 'Site ou landing page'],
  ['05', 'Inteligência', 'Você quer usar IA, mas ainda não encontrou uma aplicação prática.', 'IA aplicada'],
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

        <ol className="problems-list" aria-label="Problemas que podemos ajudar a resolver">
          {problems.map(([number, type, title, answer]) => (
            <li className="problem-row" key={number}>
              <div className="problem-index" aria-hidden="true">{number}</div>
              <article className="problem-content">
                <p>{type}</p>
                <h3>{title}</h3>
              </article>
              <div className="problem-connection" aria-hidden="true"><span /></div>
              <div className="problem-answer">
                <small>Caminho possível</small>
                <strong>{answer}</strong>
              </div>
              <a className="problem-link" href="#contato" aria-label={`Conversar sobre ${title}`}>
                <span>Conversar</span><b aria-hidden="true">↗</b>
              </a>
            </li>
          ))}
        </ol>

        <div className="problems-bridge">
          <span className="problems-bridge-label">Próximo passo</span>
          <div><strong>Você traz o contexto. A Ronas Tech encontra o caminho.</strong><span>Primeiro entendemos o que precisa mudar. Depois definimos a solução.</span></div>
          <a href="#solucoes">Ver as soluções <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </section>
  )
}
export default Problems
