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
  return <section id="inicio" className={styles.hero} aria-labelledby="hero-title"><div className={styles.glow} aria-hidden="true" /><div className={styles.container}><div className={styles.content}><p className={`${styles.eyebrow} hero-eyebrow-anim`}><span aria-hidden="true" />Loja de suporte técnico remoto</p><div className="hero-mask"><h1 id="hero-title" className={styles.title}>Resolva problemas do seu <span>PC ou notebook</span> sem sair de casa.</h1></div><p className={`${styles.description} hero-desc-anim`}>Escolha o serviço, monte seu pedido e fale diretamente com Ronael pelo WhatsApp. Atendimento remoto para lentidão, travamentos, configurações, segurança e suporte do dia a dia.</p><div className={`${styles.actions} hero-actions-anim`}><a ref={primaryRef} className={styles.primaryButton} href="#loja">Escolher um serviço</a><a ref={secondaryRef} className={styles.secondaryButton} href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={openWhatsApp}>Explicar meu problema</a></div><p className={`${styles.proof} hero-actions-anim`}>Atendimento remoto para todo o Brasil · Diagnóstico antes da confirmação do valor</p></div><div className={`${styles.visual} hero-visual-anim`} aria-label="Pedido de suporte técnico remoto" role="img"><div ref={phoneRef} className={`${styles.phone} tilt`}><div className={styles.phoneBar}><span /><strong>Pedido de suporte</strong><small>online</small></div><div className={styles.chat}><div className={styles.message}>Meu notebook está lento e demora para abrir os programas.</div><div className={`${styles.message} ${styles.reply}`}>Vou entender os sintomas e confirmar o que pode ser resolvido remotamente.</div><div className={styles.labels}><span>Diagnóstico</span><span>Remoto</span></div><div className={styles.summary}><small>PEDIDO MONTADO</small><strong>Otimização completa</strong><span>Valor confirmado após avaliação</span></div></div><div className={styles.phoneInput}>Atendimento acompanhado <b>✓</b></div></div></div></div></section>
}
export default Hero
