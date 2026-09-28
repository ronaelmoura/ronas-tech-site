const problems = [
  { number:'01', type:'PRESENÇA', title:'O site existe, mas não gera contatos', answer:'Melhoramos a apresentação da empresa e o caminho até o contato.', icon:'↗' },
  { number:'02', type:'TEMPO', title:'A equipe perde tempo fazendo a mesma coisa', answer:'Automatizamos etapas repetitivas para reduzir trabalho manual.', icon:'⌁' },
  { number:'03', type:'OPERAÇÃO', title:'A rotina depende de planilhas e controles manuais', answer:'Organizamos o processo em um sistema feito para a realidade da empresa.', icon:'▦' },
  { number:'04', type:'INTEGRAÇÃO', title:'Cada informação está em um lugar diferente', answer:'Conectamos dados e reunimos o que importa em um só lugar.', icon:'⇄' },
  { number:'05', type:'IA', title:'Quero usar IA, mas não sei onde ela realmente ajuda', answer:'Identificamos tarefas práticas em que a IA pode simplificar o trabalho.', icon:'✦' },
]

function Problems() {
  return (
    <section id="problemas" className="problems-section" aria-labelledby="problems-title">
      <div className="problems-container">
        <header className="problems-heading">
          <div>
            <p className="problems-eyebrow">Talvez seu problema esteja aqui</p>
            <h2 id="problems-title">Onde sua operação poderia funcionar melhor?</h2>
          </div>
          <div className="problems-intro">
            <strong>Você não precisa chegar com a solução pronta.</strong>
            <span>Conte o que acontece hoje. A partir daí, encontramos o caminho digital que faz sentido.</span>
          </div>
        </header>
        <div className="problems-grid">
          {problems.map((problem) => (
            <article className="problem-card" key={problem.number}>
              <div className="problem-card-top"><span>{problem.number}</span><b>{problem.type}</b></div>
              <div className="problem-icon">{problem.icon}</div>
              <h3>{problem.title}</h3>
              <div className="problem-answer"><small>COMO PODEMOS AJUDAR</small><p>{problem.answer}</p></div>
              <a href="#contato" aria-label={'Conversar sobre: ' + problem.title}>Conversar sobre isso <span>→</span></a>
            </article>
          ))}
        </div>
        <div className="problems-bridge">
          <i />
          <div><strong>Você traz o contexto → a gente encontra o caminho → construímos a solução</strong><span>Sem começar pelo código. Primeiro entendemos o que realmente precisa ser resolvido.</span></div>
        </div>
      </div>
    </section>
  )
}

export default Problems
