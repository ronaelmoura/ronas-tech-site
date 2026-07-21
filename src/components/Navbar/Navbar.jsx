import { useEffect, useState } from 'react'
import styles from './Navbar.module.css'

const navigationItems = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Contato', href: '#contato' },
]

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
    >
      <nav className={styles.navbar} aria-label="Navegação principal">
        <a className={styles.brand} href="#inicio" onClick={closeMenu}>
          <span className={styles.logo} aria-hidden="true">
            RT
          </span>
          <span className={styles.brandName}>Ronas Tech</span>
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
            {navigationItems.map(({ label, href }) => (
              <li key={href}>
                <a className={styles.link} href={href} onClick={closeMenu}>
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
