import { siteConfig } from '../config/siteConfig'
import styles from './NotFound.module.css'

function NotFound() {
  return (
    <main className={styles.page} id="conteudo-principal" tabIndex="-1">
      <a className={styles.brand} href="/">
        <img src={siteConfig.logoPath} alt="" width="47" height="44" />
        {siteConfig.companyName}
      </a>
      <section className={styles.content}>
        <p className={styles.code}>Erro 404</p>
        <h1>Esta página não está por aqui.</h1>
        <p>
          O endereço pode ter mudado ou deixado de existir. Volte ao início para
          conhecer nossos serviços e projetos.
        </p>
        <a className={styles.action} href="/">
          Voltar para a página inicial <span aria-hidden="true">→</span>
        </a>
      </section>
    </main>
  )
}

export default NotFound
