import { useRef, useState } from 'react'
import useStudioMotion from './useStudioMotion'
import Navbar from '../Navbar/Navbar'
import Contact from '../Contact/Contact'
import FAQ from '../FAQ/FAQ'
import Icon from '../Icon/Icon'
import { siteConfig } from '../../config/siteConfig'
import { trackExternalLink, trackWhatsAppClick } from '../../utils/analytics'
import styles from './StudioHome.module.css'

const services = [
  { title: 'Sites & landing pages', subtitle: 'Para ser visto. E escolhido.', text: 'Uma presença digital que traduz o valor do seu negócio. Design próprio, experiência mobile e caminhos claros para o cliente entrar em contato.', links: [['Sites profissionais', 'sites-profissionais'], ['Landing pages', 'landing-pages']], icon: 'globe' },
  { title: 'Sistemas & plataformas', subtitle: 'Seu jeito de trabalhar, em um sistema.', text: 'Transforme planilhas e informações espalhadas em uma operação organizada. Interfaces, permissões e integrações desenvolvidas para sua rotina.', links: [['Sistemas web', 'sistemas-web'], ['Dashboards e integrações', 'dashboards-e-integracoes']], icon: 'layout' },
  { title: 'Automação & integrações', subtitle: 'Tempo para o que precisa de você.', text: 'Conecte ferramentas e reduza tarefas repetitivas. Do formulário à atualização do sistema, cada etapa faz parte de um fluxo pensado para sua equipe.', links: [['Explorar automações', 'automacao-de-processos']], icon: 'workflow' },
  { title: 'Inteligência artificial', subtitle: 'Uma aplicação real. Um objetivo claro.', text: 'Assistentes, consultas e fluxos com IA para tarefas específicas. Começamos pela necessidade e definimos os limites, as integrações e a revisão humana.', links: [['IA para empresas', 'ia-para-empresas']], icon: 'sparkles' },
]
const projects = [
  { title: 'Nexo', kind: 'Dashboard financeiro', image: '/images/studio-nexo.webp', description: 'Visualização de informações financeiras em uma interface de dashboard.', href: 'https://ronaelmoura.github.io/nexo-dashboard-financeiro/', status: 'Publicado', theme: 'nexo' },
  { title: 'BoxMotor', kind: 'Produto para oficinas', image: '/images/boxmotor-dashboard-desktop.png', description: 'Produto em desenvolvimento para organizar a rotina de oficinas.', href: '/boxmotor', status: 'Em desenvolvimento', theme: 'box' },
  { title: 'ClimaZen', kind: 'Landing page comercial', image: '/images/studio-climazen.webp', description: 'Apresentação de serviços de climatização com caminho direto para contato.', href: 'https://ronaelmoura.github.io/climazen-landing-page/', status: 'Publicado', theme: 'clima' },
  { title: 'Ronas Desk', kind: 'Sistema de chamados', image: '/images/studio-desk.webp', concept: true, description: 'Interface para organizar chamados e acompanhar atendimentos.', href: 'https://ronas-desk.onrender.com/', status: 'Publicado', theme: 'desk' },
]
const steps = [
  ['Entender', 'Seu negócio, seu contexto e o que precisa mudar. A conversa vem antes da tecnologia.'],
  ['Desenhar', 'Uma direção visual e um escopo claro. Você sabe o que vamos construir e por quê.'],
  ['Construir', 'Interface, código e integrações. Você acompanha e valida as etapas do projeto.'],
  ['Colocar em uso', 'Testes, publicação e próximos passos. A entrega é combinada desde o início.'],
]

export default function StudioHome() {
  const [activeService, setActiveService] = useState(0)
  const rootRef = useRef(null)
  useStudioMotion(rootRef)
  function toggleService(index, event) {
    const opening = activeService !== index
    setActiveService(opening ? index : null)
    if (!opening || event.detail === 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    requestAnimationFrame(() => {
      rootRef.current?.querySelector(`#studio-service-${index}`)?.animate(
        [{ opacity: .4, transform: 'translateY(-8px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 220, easing: 'ease-out' },
      )
    })
  }
  const whatsapp = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Olá, Ronael! Quero conversar sobre um projeto para minha empresa.')}`
  return <div className={styles.studio} ref={rootRef}>
    <Navbar />
    <main id="conteudo-principal" tabIndex={-1}>
      <section id="inicio" className={styles.hero} aria-labelledby="studio-title">
        <img className={styles.heroArt} src="/images/studio-chrome.webp" alt="" width="1536" height="1024" fetchPriority="high" />
        <div className={styles.heroVeil} />
        <div className={styles.heroTop}><span>Sites, sistemas e automações sob medida</span><span className={styles.location}>Tianguá, CE / Brasil</span></div>
        <div className={styles.heroContent}>
          <h1 id="studio-title">Sites e sistemas.<br />Seu próximo<br />passo.</h1>
          <div className={styles.heroBottom}><p>Apresente seus serviços, organize sua operação e conecte suas ferramentas. Do planejamento à publicação, fale direto com quem desenvolve.</p><div className={styles.heroActions}><a className={styles.heroCta} href={whatsapp} target="_blank" rel="noopener noreferrer" data-ronas-cta="studio_hero" onClick={() => trackWhatsAppClick('studio_hero')}>Conversar no WhatsApp <Icon name="arrowUpRight" size={23} /></a><a className={styles.secondaryCta} href="#projetos">Conhecer os projetos <Icon name="arrowDown" size={17} /></a></div></div>
        </div>
        <a className={styles.scrollCue} href="#solucoes"><span>Encontre a solução para você</span><Icon name="arrowDown" size={23} /></a>
        <span className={styles.artCaption}>Ideias ganham forma.</span>
      </section>
      <div className={styles.assurance} aria-label="Como trabalhamos"><span>Contato direto com o desenvolvedor</span><span>Escopo e orçamento antes de começar</span><span>Atendimento remoto em todo o Brasil</span></div>
      <section id="solucoes" className={styles.services} aria-labelledby="solutions-title">
        <span id="problemas" className={styles.legacyAnchor} />
        <header className={styles.sectionHeading}><div><p className={styles.sectionLabel}>O que fazemos</p><h2 id="solutions-title">O que você precisa<br />tirar do papel?</h2></div><p>Escolha seu objetivo para conhecer a solução.<br />Ainda não sabe? Vamos entender juntos.</p></header>
        <div className={styles.serviceList}>{services.map((service, index) => <article className={styles.service} key={service.title}>
          <h3><button type="button" onClick={event => toggleService(index, event)} aria-expanded={activeService === index} aria-controls={`studio-service-${index}`}><Icon name={service.icon} size={28} /><span>{service.title}</span><span className={styles.serviceToggle} aria-hidden="true">{activeService === index ? '−' : '+'}</span></button></h3>
          <div id={`studio-service-${index}`} hidden={activeService !== index} className={styles.serviceBody}><h4>{service.subtitle}</h4><div><p>{service.text}</p><nav aria-label={service.title}>{service.links.map(([label, slug]) => <a key={slug} href={`/servicos/${slug}`}>{label}<Icon name="arrowUpRight" size={18} /></a>)}</nav></div></div>
        </article>)}</div>
        <div className={styles.serviceFeature} data-studio-reveal><img src="/images/studio-layers.webp" alt="" width="1536" height="1024" loading="lazy" decoding="async" /><div><span>Clareza antes de começar</span><p>Você recebe uma proposta com entregas, prazo e investimento definidos para o seu projeto.</p><a href="#contato">Conte o que você precisa <Icon name="arrowUpRight" size={18} /></a></div></div>
      </section>
      <section id="projetos" className={styles.work} aria-labelledby="work-title">
        <header className={styles.sectionHeading}><h2 id="work-title">Veja o que<br />podemos construir.</h2><p>Projetos do portfólio e produtos próprios.<br />Conheça as interfaces e o estágio de cada um.</p></header>
        <div className={styles.projectGrid}>{projects.map(project => {
          const external = project.href.startsWith('https')
          return <article className={`${styles.project} ${styles[project.theme]}`} key={project.title} data-studio-reveal>
            <a className={styles.projectImage} href={project.href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} onClick={external ? () => trackExternalLink('portfolio', project.href) : undefined}>
              <div className={styles.projectTop}><span>{project.title}</span><span className={styles.roundArrow}><Icon name="arrowUpRight" size={24} /></span></div>
              <img className={project.concept ? styles.conceptImage : undefined} src={project.image} alt={project.concept ? 'Ilustração conceitual: solicitações organizadas em um fluxo' : `Interface do ${project.title}`} width={project.concept ? '1024' : '1440'} height={project.concept ? '1024' : '1000'} loading="lazy" decoding="async" />
              {project.concept && <span className={styles.conceptLabel}>Ilustração conceitual</span>}
              <span className={styles.projectStatus}>{project.status}</span>
              {external && <span className={styles.srOnly}> (abre em outra aba)</span>}
            </a>
            <div className={styles.projectInfo}><h3>{project.title}</h3><span>{project.kind}</span><p>{project.description}</p></div>
          </article>
        })}</div>
        <a className={styles.githubLink} href="#contato">Tem um desafio parecido? Vamos conversar sobre o seu projeto. <Icon name="arrowUpRight" size={20} /></a>
      </section>
      <section id="como-funciona" className={styles.process} aria-labelledby="process-title">
        <header className={styles.sectionHeading}><h2 id="process-title">Uma parceria.<br />Do começo ao próximo passo.</h2><p>Sem proposta no escuro.<br />Escopo, prazo e investimento antes de começar.</p></header>
        <ol>{steps.map(([title, text], index) => <li key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
      </section>
      <section id="sobre" className={styles.about} aria-labelledby="about-title">
        <div className={styles.legacyAnchors} aria-hidden="true"><span id="por-que-ronas" className={styles.legacyAnchor} /><span id="stack" className={styles.legacyAnchor} /></div>
        <div className={styles.aboutImage} data-studio-reveal><img src="/workspace-editorial.webp" alt="Notebook e caderno em uma mesa de desenvolvimento" width="1200" height="800" loading="lazy" /><span>Onde as ideias encontram o código.</span></div>
        <div className={styles.aboutCopy}><p className={styles.sectionLabel}>De pessoa para pessoa</p><h2 id="about-title">Quem entende<br />o seu projeto<br />também constrói.</h2><p>Sou Ronael Moura, desenvolvedor Full Stack formado pelo SENAI. Minha experiência com suporte de TI me ensinou a começar pelo que as pessoas precisam.</p><p>Na Ronas Tech, esse olhar acompanha cada decisão: do desenho da interface ao sistema que funciona por trás dela.</p><a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" onClick={() => trackExternalLink('linkedin')}>Conheça minha trajetória <Icon name="arrowUpRight" size={19} /></a><a href={siteConfig.github} target="_blank" rel="noopener noreferrer" onClick={() => trackExternalLink('github')}>Veja o código dos projetos <Icon name="arrowUpRight" size={19} /></a></div>
      </section>
      <FAQ />
      <Contact />
    </main>
    <footer className={`${styles.footer} site-footer`}>
      <div className={styles.footerTop}><a href={whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick('studio_footer')}>A próxima ideia<br />pode ser a sua.<Icon name="arrowUpRight" size={72} /></a><div><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><span>Tianguá, Ceará<br />Atendimento remoto em todo o Brasil</span></div></div>
      <div className={styles.wordmark} aria-hidden="true">ronas tech<span>↗</span></div>
      <div className={styles.footerBottom}><span>© {new Date().getFullYear()} Ronas Tech</span><nav aria-label="Links do rodapé"><a href="/produtos-digitais">Produtos digitais</a><a href="/boxmotor">BoxMotor</a><a href="/politica-de-privacidade">Privacidade</a><a href="/termos-de-uso">Termos</a><a href="#inicio">Voltar ao topo ↑</a></nav></div>
    </footer>
  </div>
}
