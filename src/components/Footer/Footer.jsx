import styles from './Footer.module.css'

const navigationLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Processo', href: '#processo' },
  { label: 'Tecnologias', href: '#tecnologias' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
]

const serviceLinks = [
  { label: 'Sites profissionais', href: '#servicos' },
  { label: 'Landing Pages', href: '#servicos' },
  { label: 'Sistemas Web', href: '#servicos' },
  { label: 'APIs e integrações', href: '#servicos' },
  { label: 'Manutenção e melhorias', href: '#contato' },
]

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/ronaelmoura', icon: 'github' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ronael-moura',
    icon: 'linkedin',
  },
  // Adicionar o YouTube quando a URL oficial do canal estiver definida.
  {
    label: 'Portfólio',
    href: 'https://ronaelmoura.github.io/portfolio-ronas-tech/',
    icon: 'portfolio',
  },
]

const icons = {
  github: (
    <path d="M12 2.8a9.3 9.3 0 0 0-2.9 18.1v-2.2c-2.4.5-2.9-1-2.9-1-.4-1-.9-1.3-.9-1.3-.8-.5 0-.5 0-.5.8.1 1.3.9 1.3.9.7 1.3 1.9.9 2.5.7.1-.5.3-.9.5-1.1-1.9-.2-3.9-1-3.9-4.1 0-.9.3-1.7.9-2.3-.1-.2-.4-1.1.1-2.3 0 0 .7-.2 2.5.9a8.5 8.5 0 0 1 4.5 0c1.7-1.1 2.5-.9 2.5-.9.5 1.2.2 2.1.1 2.3.6.6.9 1.4.9 2.3 0 3.2-2 3.9-3.9 4.1.3.3.6.8.6 1.6v3.6A9.3 9.3 0 0 0 12 2.8Z" />
  ),
  linkedin: (
    <>
      <path d="M6.3 8.2H3.5V20h2.8V8.2ZM4.9 3.5a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM20.5 13.2c0-3.6-1.9-5.3-4.5-5.3-2.1 0-3 1.1-3.5 1.9V8.2H9.7V20h2.8v-5.8c0-1.5.3-3 2.2-3 1.9 0 1.9 1.8 1.9 3.1V20h2.8l1.1-6.8Z" />
    </>
  ),
  portfolio: (
    <>
      <rect x="3" y="5.5" width="18" height="14" rx="2" />
      <path d="M8 5.5V4h8v1.5M3 10h18M9.5 14h5" className={styles.iconStroke} />
    </>
  ),
}

function SocialIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {icons[name]}
    </svg>
  )
}

function LinkList({ links }) {
  return (
    <ul className={styles.linkList}>
      {links.map(({ label, href }) => (
        <li key={label}>
          <a href={href}>{label}</a>
        </li>
      ))}
    </ul>
  )
}

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brandColumn}>
            <a className={styles.brand} href="#inicio" aria-label="Ronas Tech — início">
              <span aria-hidden="true">R</span>
              Ronas <strong>Tech</strong>
            </a>
            <p>
              Desenvolvimento de sites, sistemas web e soluções digitais
              personalizadas para empresas que desejam crescer com tecnologia.
            </p>
            <div className={styles.socials} aria-label="Redes sociais">
              {socialLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  title={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SocialIcon name={icon} />
                </a>
              ))}
            </div>
          </div>

          <nav className={styles.column} aria-labelledby="footer-navigation">
            <h2 id="footer-navigation">Navegação</h2>
            <LinkList links={navigationLinks} />
          </nav>

          <nav className={styles.column} aria-labelledby="footer-services">
            <h2 id="footer-services">Serviços</h2>
            <LinkList links={serviceLinks} />
          </nav>

          <div className={`${styles.column} ${styles.contactColumn}`}>
            <h2>Contato</h2>
            <address>
              <a href="https://wa.me/55889998857134" target="_blank" rel="noopener noreferrer">
                <span>WhatsApp</span>
                (88) 99988-57134
              </a>
              <a href="mailto:ronaelmoura240@gmail.com">
                <span>E-mail</span>
                ronaelmoura240@gmail.com
              </a>
              <p><span>Localização</span>Tianguá, Ceará</p>
              <p>Atendimento online para todo o Brasil</p>
            </address>
            <a className={styles.cta} href="#contato">
              Solicitar orçamento <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p>© {currentYear} Ronas Tech. Todos os direitos reservados.</p>
          <p>
            Desenvolvido por{' '}
            <a
              href="https://ronaelmoura.github.io/portfolio-ronas-tech/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ronael Moura
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
