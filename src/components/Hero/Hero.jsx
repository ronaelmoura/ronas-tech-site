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
  const message = withCampaign('Olá, Ronael! Quero organizar o jeito como meu negócio aparece, atende e acompanha oportunidades.')
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`
  function openWhatsApp(event) { event.preventDefault(); window.open(whatsappUrl, '_blank', 'noopener,noreferrer'); trackExternalLink('hero_whatsapp', whatsappUrl) }
  return <section id="inicio" className={styles.hero} aria-labelledby="hero-title"><div className={styles.glow} aria-hidden="true" /><div className={styles.container}><div className={styles.content}><p className={`${styles.eyebrow} hero-eyebrow-anim`}><span aria-hidden="true" />Atendimento pessoal em Tianguá, CE e região</p><div className="hero-mask"><h1 id="hero-title" className={styles.title}>Pare de perder <span>clientes</span> no meio das mensagens.</h1></div><p className={`${styles.description} hero-desc-anim`}>Sou eu, Ronael Moura, quem atende pessoalmente — em Tianguá e região, ou remoto pra todo o Brasil — organizando o jeito como seu negócio aparece, atende e acompanha oportunidades, sem sistema gigante e sem complicação.</p><div className={`${styles.actions} hero-actions-anim`}><a ref={primaryRef} className={styles.primaryButton} href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={openWhatsApp}>Quero organizar meu negócio <span aria-hidden="true">→</span></a><a ref={secondaryRef} className={styles.secondaryButton} href="#caminhos">Ver soluções práticas</a></div><p className={`${styles.proof} hero-actions-anim`}>Atendimento direto com Ronael Moura · Tianguá, CE · projetos para todo o Brasil</p></div><div className={`${styles.visual} hero-visual-anim`} aria-label="Exemplo de conversa organizada no WhatsApp" role="img"><div ref={phoneRef} className={`${styles.phone} tilt`}><div className={styles.phoneBar}><span /><strong>Atendimento</strong><small>online</small></div><div className={styles.chat}><div className={styles.message}>Olá! Quero saber o preço do serviço.</div><div className={`${styles.message} ${styles.reply}`}>Oi! Claro. Vou te enviar as opções e registrar seu pedido.</div><div className={styles.labels}><span>Novo pedido</span><span>Orçamento</span></div><div className={styles.summary}><small>RESUMO DO PEDIDO</small><strong>Site para serviço local</strong><span>Próximo passo: enviar informações</span></div></div><div className={styles.phoneInput}>Escrever mensagem <b>＋</b></div></div></div></div></section>
}
export default Hero
