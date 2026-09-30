import './Hero.css'

function Hero() {
  return (
    <section id="inicio" className="rt-hero" aria-labelledby="hero-title">
      <div className="rt-hero-grid" aria-hidden="true" />
      <div className="rt-hero-glow rt-hero-glow-one" aria-hidden="true" />
      <div className="rt-hero-glow rt-hero-glow-two" aria-hidden="true" />
      <div className="rt-hero-container">
        <div className="rt-hero-copy">
          <p className="rt-kicker"><span /> RONAS TECH · DIGITAL STUDIO</p>
          <h1 id="hero-title">Problemas reais.<br /><em>Soluções digitais.</em></h1>
          <p className="rt-hero-description">Criamos sistemas, sites, automações e soluções com IA para transformar tarefas complicadas em processos mais simples.</p>
          <div className="rt-hero-actions">
            <a className="rt-button rt-button-primary" href="#contato">Quero resolver um problema <span>→</span></a>
            <a className="rt-button rt-button-ghost" href="#projetos">Ver projetos</a>
          </div>
          <div className="rt-hero-meta"><span>Projetos sob medida</span><span>Atendimento remoto</span><span>Tianguá · CE</span></div>
        </div>
        <div className="rt-transformation" aria-label="Da necessidade à solução digital">
          <div className="rt-transform-head"><span>RONAS TECH / WORKFLOW</span><i>AO VIVO</i></div>
          <div className="rt-transform-body">
            <div className="rt-transform-column">
              <small>01 · PROBLEMA</small>
              <strong>O trabalho não deveria depender disso.</strong>
              <div className="rt-chip-list"><span>Planilhas</span><span>WhatsApp</span><span>Retrabalho</span><span>Dados espalhados</span></div>
            </div>
            <div className="rt-transform-arrow"><span>→</span><small>ENTENDEMOS</small></div>
            <div className="rt-transform-column solution">
              <small>02 · SOLUÇÃO</small>
              <strong>Um processo que trabalha melhor.</strong>
              <div className="rt-solution-flow"><span>Sistema</span><span>Automação</span><span>Integração</span><span>IA</span></div>
            </div>
          </div>
          <div className="rt-transform-foot"><span><b /> Problema identificado</span><span>→</span><strong>Solução em construção</strong></div>
        </div>
      </div>
      <div className="rt-hero-bottom"><span>01</span><i /><span>DESCOBRIR O CAMINHO</span></div>
    </section>
  )
}
export default Hero
