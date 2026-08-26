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
  return <section id="inicio" className={styles.hero} aria-labelledby="hero-title"><div className={styles.glow} aria-hidden="true" /><div className={styles.container}><div className={styles.content}><p className={`${styles.eyebrow} hero-eyebrow-anim`}><span aria-hidden="true" />Otimização remota para todo o Brasil</p><div className="hero-mask"><h1 id="hero-title" className={styles.title}>Seu PC ou notebook <span>rápido de novo</span>, sem sair de casa.</h1></div><p className={`${styles.description} hero-desc-anim`}>Atendimento remoto e acompanhado para corrigir lentidão, travamentos, inicialização demorada e excesso de programas. Você vê o que está sendo feito e recebe orientação clara do início ao fim.</p><div className={`${styles.actions} hero-actions-anim`}><a ref={primaryRef} className={styles.primaryButton} href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={openWhatsApp}>Quero otimizar meu computador <span aria-hidden="true">→</span></a><a ref={secondaryRef} className={styles.secondaryButton} href="#servicos">Ver o que pode ser feito</a></div><p className={`${styles.proof} hero-actions-anim`}>Atendimento direto com Ronael Moura · Remoto, seguro e explicado passo a passo</p></div><div className={`${styles.visual} hero-visual-anim`} aria-label="Resumo de uma otimização remota de computador" role="img"><div ref={phoneRef} className={`${styles.phone} tilt`}><div className={styles.phoneBar}><span /><strong>Otimização</strong><small>remota</small></div><div className={styles.chat}><div className={styles.message}>Meu notebook está lento e demora para ligar.</div><div className={`${styles.message} ${styles.reply}`}>Vamos fazer um diagnóstico e otimizar somente o que for necessário.</div><div className={styles.labels}><span>Diagnóstico</span><span>Seguro</span></div><div className={styles.summary}><small>SERVIÇO CONCLUÍDO</small><strong>Inicialização otimizada</strong><span>Programas e sistema revisados</span></div></div><div className={styles.phoneInput}>Atendimento acompanhado <b>✓</b></div></div></div></div></section>
}
export default Hero
