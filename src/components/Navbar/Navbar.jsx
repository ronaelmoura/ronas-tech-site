import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '../../config/siteConfig'
import styles from './Navbar.module.css'

const navigationItems = [
  { label: 'Início', href: '#inicio' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Processo', href: '#processo' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
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

    return () => {
      document.body.style.overflow = previousOverflow
    }
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

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
    >
      <nav className={styles.navbar} aria-label="Navegação principal">
        <a className={styles.brand} href="#inicio" onClick={closeMenu}>
          <img
            className={styles.logo}
            src={siteConfig.logoPath}
            alt=""
            width="47"
            height="44"
            loading="eager"
          />
          <span className={styles.brandName}>{siteConfig.companyName}</span>
        </a>

        <div
          className={`${styles.menuBackdrop} ${isMenuOpen ? styles.open : ''}`}
          onClick={closeMenu}
          aria-hidden="true"
        />

        <div
          id="main-navigation"
          className={`${styles.menu} ${isMenuOpen ? styles.open : ''}`}
        >
          <ul className={styles.links}>
            {navigationItems.map(({ label, href }, index) => (
              <li key={href}>
                <a
                  ref={index === 0 ? firstLinkRef : undefined}
                  className={styles.link}
                  href={href}
                  onClick={closeMenu}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <a className={styles.cta} href="#contato" onClick={closeMenu}>
            Solicitar Orçamento
          </a>
        </div>

        <button
          ref={menuButtonRef}
          className={`${styles.menuButton} ${isMenuOpen ? styles.open : ''}`}
          type="button"
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-controls="main-navigation"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
    </header>
  )
}

export default Navbar
