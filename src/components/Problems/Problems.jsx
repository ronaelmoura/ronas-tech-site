const problems = [
  ['O site existe, mas não gera contatos', 'Melhoramos a apresentação da empresa e o caminho até o contato.'],
  ['A equipe perde tempo fazendo a mesma coisa', 'Automatizamos etapas repetitivas para reduzir trabalho manual.'],
  ['A operação depende de planilhas e controles manuais', 'Organizamos a rotina em um sistema feito para o seu processo.'],
  ['Cada informação está em um lugar diferente', 'Conectamos dados e reunimos o que importa em um só lugar.'],
  ['Quero usar IA, mas não sei onde ela realmente ajuda', 'Identificamos tarefas práticas em que a IA pode economizar tempo.'],
]

function Problems() {
  return (
    <section id="problemas" className="problems-section" aria-labelledby="problems-title">
      <div className="problems-container">
        <header className="problems-heading">
          <p>O que está travando sua empresa?</p>
          <h2>Se a tecnologia virou parte do problema, está na hora de simplificar.</h2>
          <span>Você conta o que acontece hoje. A gente ajuda a encontrar uma forma melhor de fazer.</span>
        </header>
        <div className="problems-list">
          {problems.map(([problem, answer], index) => (
            <article key={problem} className="problem-item">
              <span>0{index + 1}</span>
              <div><h3>{problem}</h3><p>{answer}</p></div>
              <a href="#contato" aria-label={'Conversar sobre: ' + problem}>→</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Problems
