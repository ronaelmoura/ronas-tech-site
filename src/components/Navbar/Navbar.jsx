import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '../../config/siteConfig'
import styles from './Navbar.module.css'
import Icon from '../Icon/Icon'

// A ordem dos itens acompanha a ordem da página: projetos primeiro, porque
// é o que recrutadores e clientes vêm avaliar.
const navigationItems = [
  { label: 'Projetos', href: '#projetos' },
  { label: 'Stack', href: '#stack' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
]

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef(null)
  const firstLinkRef = useRef(null)
  const navigationRef = useRef(null)

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 841px)')
    const handleResize = () => { if (desktop.matches) setIsMenuOpen(false) }
    desktop.addEventListener('change', handleResize)
    return () => desktop.removeEventListener('change', handleResize)
  }, [])

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
    const main = document.querySelector('main')
    const footer = document.querySelector('.site-footer')
    if (main) main.inert = true
    if (footer) footer.inert = true
    const focusTimer = setTimeout(() => firstLinkRef.current?.focus(), 320)
    return () => {
      clearTimeout(focusTimer)
      document.body.style.overflow = previousOverflow
      if (main) main.inert = false
      if (footer) footer.inert = false
    }
  }, [isMenuOpen])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Tab' && isMenuOpen) {
        const links = [...navigationRef.current.querySelectorAll('#main-navigation a'), menuButtonRef.current]
        const first = links[0]
        const last = links[links.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

  return <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
    <nav ref={navigationRef} className={styles.navbar} aria-label="Navegação principal">
      <a className={styles.brand} href="#inicio" onClick={closeMenu}><img className={styles.logo} src={siteConfig.logoPath} alt="" width="47" height="44" loading="eager" /><span className={styles.brandName}>{siteConfig.companyName}</span></a>
      <div className={`${styles.menuBackdrop} ${isMenuOpen ? styles.open : ''}`} onClick={closeMenu} aria-hidden="true" />
      <div id="main-navigation" className={`${styles.menu} ${isMenuOpen ? styles.open : ''}`}>
        <ul className={styles.links}>{navigationItems.map(({ label, href }, index) => <li key={href}><a ref={index === 0 ? firstLinkRef : undefined} className={styles.link} href={href} onClick={closeMenu}>{label}</a></li>)}</ul>
        <a className={styles.cta} href="#contato" onClick={closeMenu}>Falar comigo <Icon name="arrowUpRight" size={17} /></a>
      </div>
      <button ref={menuButtonRef} className={`${styles.menuButton} ${isMenuOpen ? styles.open : ''}`} type="button" aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'} aria-controls="main-navigation" aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen((isOpen) => !isOpen)}><span /><span /><span /></button>
    </nav>
  </header>
}

export default Navbar
