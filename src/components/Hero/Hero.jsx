import { siteConfig } from '../../config/siteConfig'
import { trackExternalLink, withCampaign } from '../../utils/analytics'
import { useMagnetic, useTilt } from '../../motion/hooks'
import { useHeroIntro } from '../../motion/scroll'
import styles from './Hero.module.css'

const checks = ['Sistema Windows', 'Inicialização', 'Armazenamento', 'Segurança básica']

function DiagnosticConsole() {
  const consoleRef = useTilt(4)
  return <div ref={consoleRef} className={`${styles.console} tilt`}><div className={styles.consoleBar}><div><i /><i /><i /></div><span>diagnostico.ronastech</span><strong><b /> sessão segura</strong></div><div className={styles.consoleBody}><div className={styles.consoleHeading}><div><small>DIAGNÓSTICO REMOTO</small><h2>Entender antes de corrigir.</h2></div><span>Você acompanha</span></div><div className={styles.checks}>{checks.map((label, index) => <div className={styles.check} key={label} style={{ '--delay': `${index * 1.15}s` }}><span className={styles.checkIcon}>✓</span><strong>{label}</strong><small>analisando</small></div>)}</div><div className={styles.terminal}><span>&gt; suporte iniciado com sua autorização</span><span>&gt; nenhum valor cobrado antes da avaliação</span><span className={styles.prompt}>&gt; <i /></span></div></div><div className={styles.scanline} aria-hidden="true" /></div>
}

function Hero() {
  useHeroIntro()
  const primaryRef = useMagnetic(14)
  const secondaryRef = useMagnetic(14)
  const message = withCampaign('Olá, Ronael! Preciso de suporte remoto para meu PC ou notebook.')
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`
  function openWhatsApp(event) { event.preventDefault(); window.open(whatsappUrl, '_blank', 'noopener,noreferrer'); trackExternalLink('hero_whatsapp', whatsappUrl) }
  return <section id="inicio" className={styles.hero} aria-labelledby="hero-title"><div className={styles.glow} aria-hidden="true" /><div className={styles.container}><div className={styles.content}><p className={`${styles.eyebrow} hero-eyebrow-anim`}><span aria-hidden="true" />Suporte remoto para Windows · todo o Brasil</p><div className="hero-mask"><h1 id="hero-title" className={styles.title}>Seu computador volta a <span>acompanhar sua rotina.</span></h1></div><p className={`${styles.description} hero-desc-anim`}>PC lento, travando, com anúncios ou programa que não abre? Eu analiso o problema, explico sem termos complicados e confirmo o valor antes de começar.</p><div className={`${styles.actions} hero-actions-anim`}><a ref={primaryRef} className={styles.primaryButton} href="#loja">Ver serviços <span aria-hidden="true">→</span></a><a ref={secondaryRef} className={styles.secondaryButton} href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={openWhatsApp}>Explicar meu problema</a></div><ul className={`${styles.trustList} hero-actions-anim`}><li>Você acompanha tudo pela tela</li><li>Atendimento direto com Ronael</li><li>Valor combinado antes do serviço</li></ul></div><div className={`${styles.visual} hero-visual-anim`} role="img" aria-label="Painel ilustrativo de diagnóstico remoto acompanhado"><DiagnosticConsole /></div></div></section>
}

export default Hero
