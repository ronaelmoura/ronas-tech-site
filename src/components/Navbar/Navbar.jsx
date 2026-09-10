import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '../../config/siteConfig'
import { trackWhatsAppClick, withCampaign } from '../../utils/analytics'
import styles from './Navbar.module.css'

// A ordem dos itens acompanha a ordem da página: o visitante reconhece o
// problema, entende como funciona e só então vê os atendimentos. O rótulo
// "Atendimentos" é o mesmo usado no título da seção, no hero e no rodapé —
// antes o mesmo destino tinha cinco nomes diferentes.
const navigationItems = [
  { label: 'Problemas', href: '#problemas' },
  { label: 'Como funciona', href: '#processo' },
  { label: 'Atendimentos', href: '#loja' },
  { label: 'Dúvidas', href: '#duvidas' },
]

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef(null)
  const firstLinkRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstLinkRef.current?.focus()
    return () => { document.body.style.overflow = previousOverflow }
  }, [isMenuOpen])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

  // O botão fixo do topo passa a ser a porta de entrada sem risco (triagem
  // gratuita pelo WhatsApp) em vez de um segundo atalho para a loja: assim
  // ele deixa de competir com o botão principal do hero.
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(withCampaign('Olá, Ronael! Quero a triagem gratuita: meu computador está com problema e queria explicar o que está acontecendo.'))}`

  return <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
    <nav className={styles.navbar} aria-label="Navegação principal">
      <a className={styles.brand} href="#inicio" onClick={closeMenu}><img className={styles.logo} src={siteConfig.logoPath} alt="" width="47" height="44" loading="eager" /><span className={styles.brandName}>{siteConfig.companyName}</span></a>
      <div className={`${styles.menuBackdrop} ${isMenuOpen ? styles.open : ''}`} onClick={closeMenu} aria-hidden="true" />
      <div id="main-navigation" className={`${styles.menu} ${isMenuOpen ? styles.open : ''}`}>
        <ul className={styles.links}>{navigationItems.map(({ label, href }, index) => <li key={href}><a ref={index === 0 ? firstLinkRef : undefined} className={styles.link} href={href} onClick={closeMenu}>{label}</a></li>)}</ul>
        <a className={styles.cta} data-ronas-cta="navbar_cta" href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => { closeMenu(); trackWhatsAppClick('navbar_cta') }}>Triagem gratuita</a>
      </div>
      <button ref={menuButtonRef} className={`${styles.menuButton} ${isMenuOpen ? styles.open : ''}`} type="button" aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'} aria-controls="main-navigation" aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen((isOpen) => !isOpen)}><span /><span /><span /></button>
    </nav>
  </header>
}

export default Navbar
