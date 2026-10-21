import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '../../config/siteConfig'
import styles from './Navbar.module.css'
import Icon from '../Icon/Icon'

// A navegação acompanha a jornada de descoberta até o contato.
const navigationItems = [
  { label: 'Serviços', href: '#solucoes' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Produtos', href: '/produtos-digitais' },
  { label: 'BoxMotor', href: '/boxmotor' },
  { label: 'Sobre', href: '#sobre' },
]

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef(null)
  const firstLinkRef = useRef(null)
  const navigationRef = useRef(null)

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1101px)')
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
    // Isolate every background branch, including cookie controls outside the home.
    const background = []
    let branch = navigationRef.current.closest('header')
    while (branch && branch !== document.body) {
      for (const sibling of branch.parentElement.children) {
        if (sibling !== branch) {
          background.push([sibling, sibling.inert])
          sibling.inert = true
        }
      }
      branch = branch.parentElement
    }
    const focusFrame = requestAnimationFrame(() => firstLinkRef.current?.focus())
    return () => {
      cancelAnimationFrame(focusFrame)
      document.body.style.overflow = previousOverflow
      background.forEach(([element, inert]) => { element.inert = inert })
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

  const closeMenu = (event) => {
    if (!isMenuOpen) return
    setIsMenuOpen(false)
    const hash = event?.currentTarget.getAttribute('href')
    requestAnimationFrame(() => {
      const target = hash?.startsWith('#') ? document.getElementById(hash.slice(1)) : null
      if (target) {
        target.setAttribute('tabindex', '-1')
        target.focus({ preventScroll: true })
        target.scrollIntoView({ behavior: 'instant' })
      } else menuButtonRef.current?.focus()
    })
  }

  return <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
    <nav ref={navigationRef} className={styles.navbar} aria-label="Navegação principal">
      <a className={styles.brand} href="#inicio" onClick={closeMenu}><img className={styles.logo} src={siteConfig.logoPath} alt="" width="47" height="44" loading="eager" /><span className={styles.brandName}>{siteConfig.companyName}</span></a>
      <div className={`${styles.menuBackdrop} ${isMenuOpen ? styles.open : ''}`} onClick={closeMenu} aria-hidden="true" />
      <div id="main-navigation" className={`${styles.menu} ${isMenuOpen ? styles.open : ''}`}>
        <ul className={styles.links}>{navigationItems.map(({ label, href }, index) => <li key={href}><a ref={index === 0 ? firstLinkRef : undefined} className={styles.link} href={href} onClick={closeMenu}>{label}</a></li>)}</ul>
        <a className={styles.cta} href="#contato" onClick={closeMenu}>Falar sobre meu projeto <Icon name="arrowUpRight" size={17} /></a>
      </div>
      <button ref={menuButtonRef} className={`${styles.menuButton} ${isMenuOpen ? styles.open : ''}`} type="button" aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'} aria-controls="main-navigation" aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen((isOpen) => !isOpen)}><span /><span /><span /></button>
    </nav>
  </header>
}

export default Navbar
