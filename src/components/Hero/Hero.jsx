import { useState } from 'react'
import styles from './Hero.module.css'
import Icon from '../Icon/Icon'
import { ProjectVisual } from '../Portfolio/Portfolio'

const projects = [
  { name: 'Ronas Desk', type: 'dashboard', category: 'Gestão de atendimentos', description: 'Cada solicitação no lugar certo. Do primeiro contato à resolução.', status: 'Projeto publicado' },
  { name: 'Nexo', type: 'finance', category: 'Finanças com clareza', description: 'Receitas, despesas e decisões do mês em uma visão organizada.', status: 'Projeto publicado' },
  { name: 'BoxMotor', type: 'workshop', category: 'Gestão para oficinas', description: 'Uma rotina mais organizada, do atendimento à ordem de serviço.', status: 'Em desenvolvimento' },
]

function Hero() {
  const [selected, setSelected] = useState(0)
  const project = projects[selected]
  return <section id="inicio" className={styles.hero} aria-labelledby="hero-title">
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.eyebrow}><span aria-hidden="true" />Desenvolvimento com Ronael Moura</p>
        <h1 id="hero-title" className={styles.title}>Seu próximo passo merece um bom projeto.</h1>
        <p className={styles.description}>Sites que apresentam seu negócio. Sistemas que organizam sua rotina. Automação e IA para resolver o que toma seu tempo.</p>
        <div className={styles.actions}>
          <a className={styles.primaryButton} href="#contato">Falar sobre meu projeto <Icon name="arrowUpRight" size={18} /></a>
          <a className={styles.secondaryButton} href="#projetos">Explorar projetos <Icon name="arrowDown" size={18} /></a>
        </div>
        <div className={styles.signature}><span className={styles.monogram} aria-hidden="true">rm.</span><p>Da primeira conversa à entrega.<strong>Contato direto com quem constrói.</strong></p></div>
      </div>
      <div className={styles.showcase}>
        <div className={styles.showcaseTop}><span>Ideias que viram produto</span><Icon name="layers" size={22} /></div>
        <div className={styles.projectPicker} role="group" aria-label="Escolha um projeto para conhecer">
          {projects.map((item, index) => <button key={item.name} type="button" aria-pressed={selected === index} aria-controls="hero-project-preview" onClick={() => setSelected(index)}>{item.name}</button>)}
        </div>
        <div id="hero-project-preview" className={styles.preview}>
          <div className={styles.projectInfo} aria-live="polite" aria-atomic="true"><p>{project.status}</p><h2>{project.category}</h2><span>{project.description}</span></div>
          <div className={styles.projectVisual}><ProjectVisual type={project.type} /></div>
          <span className={styles.caption}>Prévia ilustrativa do projeto</span>
        </div>
        <a className={styles.projectLink} href="#projetos">Conheça os projetos e suas histórias <Icon name="arrowUpRight" size={18} /></a>
      </div>
    </div>
    <div className={styles.bottomLine}><span>Feito para funcionar no seu dia a dia.</span><ul><li><Icon name="message" size={17} />Conversa sem intermediários</li><li><Icon name="layout" size={17} />Do celular ao desktop</li><li><Icon name="location" size={17} />Do Ceará para o Brasil</li></ul></div>
  </section>
}
export default Hero
