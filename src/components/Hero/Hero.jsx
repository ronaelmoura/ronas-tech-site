import styles from './Hero.module.css'
import Icon from '../Icon/Icon'

const layers = [
  ['01', 'Interface', 'React', 'Uma experiência clara em cada tela.'],
  ['02', 'Aplicação', 'Node.js + Express', 'Regras de negócio e acesso protegido.'],
  ['03', 'Dados', 'MySQL', 'Informação organizada e consistente.'],
]

function DeliveryCard() {
  return <div className={styles.console}>
    <div className={styles.consoleBar}>
      <div aria-hidden="true"><i /><i /><i /></div>
      <span>projeto / ronas-desk</span>
      <strong><b />Em produção</strong>
    </div>
    <div className={styles.consoleBody}>
      <div className={styles.consoleHeading}>
        <div><small>DA INTERFACE AO BANCO DE DADOS</small><h2>Uma solução.<br />Todas as camadas.</h2></div>
        <span><Icon name="code" size={34} /></span>
      </div>
      <ol className={styles.layers}>
        {layers.map(([number, name, tech, description]) => <li key={number}>
          <span className={styles.number}><Icon name={{ '01': 'layout', '02': 'server', '03': 'database' }[number]} size={19} /></span>
          <div><div className={styles.layerTitle}><strong>{name}</strong><code>{tech}</code></div><p>{description}</p></div>
        </li>)}
      </ol>
      <div className={styles.delivery}><span><strong>122</strong> testes automatizados</span><span><Icon name="check" size={14} /> CI + deploy</span></div>
    </div>
    <a className={styles.projectLink} href="#projetos">Conheça o Ronas Desk <Icon name="arrowUpRight" size={18} /></a>
  </div>
}

function Hero() {
  return <section id="inicio" className={styles.hero} aria-labelledby="hero-title">
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.eyebrow}><span aria-hidden="true" />Projetos digitais com contato direto</p>
        <p className={styles.intro}>Ronas Tech <span>/ Por Ronael Moura</span></p>
        <h1 id="hero-title" className={styles.title}>Sites e sistemas web.<br /><span>Automação e IA.</span></h1>
        <p className={styles.description}>Crio sites para apresentar seu negócio e sistemas web para organizar a operação. Também desenvolvo automações e aplicações de IA para tarefas bem definidas. Você conversa direto com quem planeja e constrói.</p>
        <div className={styles.actions}>
          <a className={styles.primaryButton} href="#contato">Falar sobre meu projeto <Icon name="arrowUpRight" size={18} /></a>
          <a className={styles.secondaryButton} href="#projetos">Ver projetos <Icon name="arrowRight" size={18} /></a>
        </div>
        <div className={styles.signature}><span className={styles.monogram} aria-hidden="true">rm.</span><p>Desenvolvimento Full Stack · SENAI<strong>Tianguá, Ceará · Trabalho remoto</strong></p></div>
      </div>
      <div className={styles.visual}><DeliveryCard /></div>
    </div>
    <div className={styles.bottomLine}><span>Clareza no processo. Cuidado na entrega.</span><ul aria-label="Tecnologias principais"><li>React</li><li>Node.js</li><li>Express</li><li>MySQL</li><li>Docker</li></ul><a href="#projetos" aria-label="Ir para os projetos">Role para conhecer <Icon name="arrowDown" size={16} /></a></div>
  </section>
}

export default Hero
