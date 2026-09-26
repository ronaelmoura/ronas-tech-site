import { useMagnetic, useTilt } from '../../motion/hooks'
import styles from './Hero.module.css'

// Resumo do fluxo de entrega do Ronas Desk, o projeto em destaque do
// portfólio: os números vêm do próprio projeto (testes, CI e deploy).
const pipeline = [
  { command: 'testes + CI', result: '370 testes documentados' },
  { command: 'git push origin main', result: 'CI concluído' },
  { command: 'deploy', result: 'Ronas Desk em produção' },
]

function DeliveryCard() {
  const cardRef = useTilt(4)
  return (
    <div ref={cardRef} className={`${styles.console} tilt`}>
      <div className={styles.consoleBar}>
        <div><i /><i /><i /></div>
        <span>ronas-desk</span>
        <strong>main</strong>
      </div>
      <div className={styles.consoleBody}>
        <div className={styles.consoleHeading}>
          <div>
            <small>DO CÓDIGO À PRODUÇÃO</small>
            <h2>React · Express · MySQL</h2>
          </div>
          <span>Full Stack</span>
        </div>
        <ol className={styles.checks}>
          {pipeline.map(({ command, result }) => (
            <li className={styles.check} key={command}>
              <span className={styles.checkIcon} aria-hidden="true">✓</span>
              <code>$ {command}</code>
              <small>{result}</small>
            </li>
          ))}
        </ol>
        <div className={styles.terminal}>
          <span>&gt; autenticação e permissões por perfil</span>
          <span>&gt; painéis para usuários e administradores</span>
        </div>
      </div>
    </div>
  )
}

function Hero() {
  // A animação de entrada do hero é disparada pelo módulo de movimento
  // carregado sob demanda em App.jsx (ela usa seletores globais).
  const primaryRef = useMagnetic(14)
  const secondaryRef = useMagnetic(14)

  return (
    <section id="inicio" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={`${styles.eyebrow} hero-eyebrow-anim`}><span aria-hidden="true" />Desenvolvedor Full Stack · Tianguá, CE</p>
          <div className="hero-mask">
            <h1 id="hero-title" className={styles.title}>Ronael Moura. Sistemas web <span>do banco de dados à interface.</span></h1>
          </div>
          <p className={`${styles.description} hero-desc-anim`}>
            Desenvolvedor Full Stack com formação pelo SENAI. Construo aplicações com React, Node.js, Express e MySQL, com testes automatizados, integração contínua e deploy em produção.
          </p>
          <div className={`${styles.actions} hero-actions-anim`}>
            <a ref={primaryRef} className={styles.primaryButton} href="#projetos">Ver projetos</a>
            <a ref={secondaryRef} className={styles.secondaryButton} href="#contato">Falar comigo</a>
          </div>
          <ul className={`${styles.trustList} hero-actions-anim`}>
            <li>Aberto a vagas CLT e PJ</li>
            <li>Disponível para projetos freelance</li>
            <li>Código público no GitHub</li>
          </ul>
        </div>
        <div className={`${styles.visual} hero-visual-anim`} role="img" aria-label="Cartão ilustrativo do fluxo de entrega do Ronas Desk: testes, integração contínua e deploy">
          <DeliveryCard />
        </div>
      </div>
    </section>
  )
}

export default Hero
