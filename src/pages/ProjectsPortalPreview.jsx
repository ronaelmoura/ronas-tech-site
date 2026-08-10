import { useEffect } from 'react'
import { siteConfig } from '../config/siteConfig'
import { ORDER_STATUS } from '../features/contracting/orderModel'
import styles from './ProjectsPortalPreview.module.css'

const visibleStatuses = Object.values(ORDER_STATUS).filter((status) => status !== 'Rascunho')

function ProjectsPortalPreview() {
  useEffect(() => {
    document.title = `Meus projetos | ${siteConfig.companyName}`
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', 'Área de acompanhamento de projetos da Ronas Tech em preparação.')
  }, [])

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a className={styles.brand} href="/">
          <img src={siteConfig.logoPath} alt="" width="44" height="41" />
          <span>{siteConfig.companyName}</span>
        </a>
        <a href="/contratar">Contratar um serviço</a>
      </header>
      <main id="conteudo-principal" className={styles.main} tabIndex="-1">
        <p className={styles.eyebrow}>Área do cliente</p>
        <span className={styles.badge}>Em preparação</span>
        <h1>Seus projetos, organizados em um só lugar</h1>
        <p className={styles.lead}>
          Esta será a área para acompanhar pedidos, enviar materiais e aprovar entregas.
          Login, dados e pagamentos ainda não foram integrados nesta versão.
        </p>
        <ol className={styles.timeline}>
          {visibleStatuses.map((status, index) => (
            <li key={status}><span>{String(index + 1).padStart(2, '0')}</span>{status}</li>
          ))}
        </ol>
        <a className={styles.back} href="/">← Voltar para o site</a>
      </main>
    </div>
  )
}

export default ProjectsPortalPreview
