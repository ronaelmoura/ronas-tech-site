const problems = [
  ['O site não traz clientes', 'Apresentamos sua empresa de forma clara e facilitamos o contato.'],
  ['A equipe perde tempo em tarefas repetitivas', 'Automatizamos etapas que hoje dependem de trabalho manual.'],
  ['A empresa depende de planilhas', 'Criamos sistemas para organizar informações e rotinas.'],
  ['Os dados estão espalhados', 'Reunimos informações de diferentes fontes em um painel.'],
  ['Você quer usar IA, mas não sabe por onde começar', 'Encontramos tarefas em que a IA pode ser realmente útil.'],
]

function Problems() {
  return (
    <section id="problemas" className="problems-section" aria-labelledby="problems-title">
      <div className="problems-container">
        <header className="problems-heading">
          <p>Talvez o problema seja um destes</p>
          <h2>Antes de escolher uma tecnologia, resolva o que está atrapalhando seu trabalho.</h2>
        </header>
        <div className="problems-list">
          {problems.map(([problem, answer], index) => (
            <article key={problem} className="problem-item">
              <span>0{index + 1}</span>
              <div><h3>{problem}</h3><p>{answer}</p></div>
              <a href="#contato" aria-label={`Conversar sobre: ${problem}`}>→</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Problems
