import styles from './Hero.module.css'
import { siteConfig } from '../../config/siteConfig'
import { trackExternalLink, withCampaign } from '../../utils/analytics'
import { useMagnetic, useTilt } from '../../motion/hooks'
import { useHeroIntro } from '../../motion/scroll'

function Hero() {
  useHeroIntro()
  const primaryRef = useMagnetic(14)
  const secondaryRef = useMagnetic(14)
  const phoneRef = useTilt(6)
  const message = withCampaign('Olá, Ronael! Quero otimizar meu PC ou notebook por atendimento remoto.')
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`
  function openWhatsApp(event) { event.preventDefault(); window.open(whatsappUrl, '_blank', 'noopener,noreferrer'); trackExternalLink('hero_whatsapp', whatsappUrl) }
  return <section id="inicio" className={styles.hero} aria-labelledby="hero-title"><div className={styles.glow} aria-hidden="true" /><div className={styles.container}><div className={styles.content}><p className={`${styles.eyebrow} hero-eyebrow-anim`}><span aria-hidden="true" />Suporte técnico e desenvolvimento Full Stack</p><div className="hero-mask"><h1 id="hero-title" className={styles.title}>Tecnologia para seu <span>computador</span> e para seu <span>negócio.</span></h1></div><p className={`${styles.description} hero-desc-anim`}>Otimização remota de PCs e notebooks, criação de sites, sistemas web, APIs e automações. Atendimento direto com quem entende o problema e também desenvolve a solução.</p><div className={`${styles.actions} hero-actions-anim`}><a ref={primaryRef} className={styles.primaryButton} href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={openWhatsApp}>Otimizar meu computador</a><a ref={secondaryRef} className={styles.secondaryButton} href="#desenvolvimento">Criar uma solução digital</a></div><p className={`${styles.proof} hero-actions-anim`}>Atendimento remoto para todo o Brasil · Suporte e desenvolvimento com Ronael Moura</p></div><div className={`${styles.visual} hero-visual-anim`} aria-label="Suporte técnico e desenvolvimento de soluções digitais" role="img"><div ref={phoneRef} className={`${styles.phone} tilt`}><div className={styles.phoneBar}><span /><strong>Ronas Tech</strong><small>online</small></div><div className={styles.chat}><div className={styles.message}>Preciso melhorar meu computador e organizar meu negócio.</div><div className={`${styles.message} ${styles.reply}`}>Posso ajudar com suporte remoto e também desenvolver sua solução digital.</div><div className={styles.labels}><span>Suporte</span><span>Full Stack</span></div><div className={styles.summary}><small>DUAS ÁREAS, UM ATENDIMENTO</small><strong>PCs + Soluções Web</strong><span>Diagnóstico, desenvolvimento e acompanhamento</span></div></div><div className={styles.phoneInput}>Atendimento direto <b>✓</b></div></div></div></div></section>
}
export default Hero
