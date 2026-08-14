import { trackExternalLink } from '../../utils/analytics'
import styles from './Portfolio.module.css'

const projects = [
  {
    title: 'Ronas Desk',
    category: 'Sistema de gestão de chamados',
    need:
      'Substituir solicitações espalhadas por um fluxo organizado para registrar, priorizar e acompanhar atendimentos.',
    solution:
      'Sistema web publicado com acesso protegido, abertura e acompanhamento de chamados, controle de prioridade e status e painéis para usuários e administradores.',
    benefits: [
      'Solicitações centralizadas em um único lugar',
      'Prioridades e andamento visíveis para a equipe',
      'Histórico organizado para acompanhar cada atendimento',
    ],
    status: 'Publicado',
    projectUrl: 'https://ronas-desk.onrender.com/',
    actionLabel: 'Conhecer o Ronas Desk',
    featured: true,
    visual: 'dashboard',
    repositoryUrl: 'https://github.com/ronaelmoura/ronas-desk',
  },
  {
    title: 'Nexo',
    category: 'Dashboard financeiro pessoal',
    need:
      'Transformar movimentações financeiras em uma visão clara para acompanhar receitas, despesas e decisões do mês.',
    solution:
      'Dashboard em React com gráficos, filtros por período e categoria, cadastro de transações, modo escuro persistente e experiência responsiva.',
    benefits: [
      'Resumo financeiro compreensível em poucos segundos',
      'Filtros e gráficos para explorar os dados',
      'Uso confortável no celular e no computador',
    ],
    status: 'Publicado',
    projectUrl: 'https://ronaelmoura.github.io/nexo-dashboard-financeiro/',
    repositoryUrl: 'https://github.com/ronaelmoura/nexo-dashboard-financeiro',
    actionLabel: 'Testar o dashboard',
    visual: 'finance',
  },
  {
    title: 'StockFlow API',
    category: 'Backend de estoque e pedidos',
    need:
      'Controlar estoque e pedidos sem perder consistência quando várias operações alteram os mesmos produtos.',
    solution:
      'API REST com Node.js, Express e MySQL, autenticação por perfis, reservas transacionais, idempotência, auditoria e documentação OpenAPI.',
    benefits: [
      'Regras de negócio protegidas por transações',
      'Histórico de movimentações e eventos de auditoria',
      'Documentação pronta para integração',
    ],
    status: 'Código público',
    repositoryUrl: 'https://github.com/ronaelmoura/stockflow-api',
    actionLabel: 'Explorar a API',
    visual: 'api',
  },
  {
    title: 'ClimaZen',
    category: 'Landing page comercial',
    need:
      'Apresentar um serviço técnico de forma simples, profissional e orientada à geração de oportunidades comerciais.',
    solution:
      'Landing page responsiva com posicionamento de marca, serviços, planos, prova social, simulador de economia e formulário de diagnóstico.',
    benefits: [
      'Proposta de valor clara desde a primeira tela',
      'Conteúdo organizado para apoiar a decisão',
      'Experiência de conversão adaptada ao mobile',
    ],
    status: 'Publicado',
    projectUrl: 'https://ronaelmoura.github.io/climazen-landing-page/',
    repositoryUrl: 'https://github.com/ronaelmoura/climazen-landing-page',
    actionLabel: 'Abrir a landing page',
    visual: 'landing',
  },
]

function ExternalIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M11 4h5v5M9 11l7-7M16 11v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4" />
    </svg>
  )
}

function ProjectVisual({ type }) {
  if (type === 'dashboard') {
    return (
      <div className={styles.dashboardMockup} aria-hidden="true">
        <aside>
          <span className={styles.mockLogo}>R</span>
          <i />
          <i />
          <i />
        </aside>
        <div className={styles.dashboardContent}>
          <div className={styles.mockTopbar}>
            <span />
            <i />
          </div>
          <div className={styles.mockMetrics}>
            <span />
            <span />
            <span />
          </div>
          <div className={styles.mockTable}>
            <strong>Chamados recentes</strong>
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className={styles.floatingStatus}>Painel de chamados</div>
      </div>
    )
  }

  if (type === 'finance') {
    return (
      <div className={styles.dataPortfolioMockup} aria-hidden="true">
        <div className={styles.browserBar}>
          <span />
          <span />
          <span />
          <i>nexo-dashboard-financeiro</i>
        </div>
        <div className={styles.dataPortfolioScreen}>
          <div className={styles.dataIntro}>
            <small>Visão do mês</small>
            <strong>R$ 8.420</strong>
            <span>Saldo disponível para acompanhar.</span>
          </div>
          <div className={styles.dataChart}>
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
    )
  }

  if (type === 'api') {
    return (
      <div className={styles.apiMockup} aria-hidden="true">
        <div className={styles.apiSidebar}>
          <strong>StockFlow</strong>
          <span className={styles.apiActive}>POST</span>
          <span>GET</span>
          <span>PATCH</span>
        </div>
        <div className={styles.apiContent}>
          <small>API / V1 / ORDERS</small>
          <strong>Criar pedido</strong>
          <div className={styles.codeBlock}>
            <i><b>201</b> Created</i>
            <span>{`{ "status": "CONFIRMED" }`}</span>
            <span>{`{ "stock": "reserved" }`}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.portfolioMockup} aria-hidden="true">
      <div className={styles.browserBar}>
        <span />
        <span />
        <span />
        <i>climazen-landing-page</i>
      </div>
      <div className={styles.portfolioScreen}>
        <div>
          <small>Climatização inteligente</small>
          <strong>ClimaZen</strong>
          <span />
          <span />
          <button type="button" tabIndex="-1">Economize energia</button>
        </div>
        <div className={styles.profileShape}>❄</div>
      </div>
    </div>
  )
}

function Portfolio() {
  return (
    <section
      id="projetos"
      className={styles.section}
      aria-labelledby="portfolio-title"
    >
      <div className={styles.container}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>Projetos publicados</p>
          <h2 id="portfolio-title">Projetos que mostram como eu resolvo problemas</h2>
          <p className={styles.subtitle}>
            Frontend, backend e produto apresentados com contexto, decisões de
            engenharia e links para você avaliar a entrega.
          </p>
        </header>

        <div className={styles.grid}>
          {projects.map((project) => (
            <article
              className={`${styles.card} ${project.featured ? styles.featured : ''}`}
              key={project.title}
            >
              <div className={styles.visual}>
                {project.featured && (
                  <span className={styles.featuredBadge}>Projeto em destaque</span>
                )}
                <ProjectVisual type={project.visual} />
              </div>

              <div className={styles.content}>
                <div className={styles.meta}>
                  <span className={styles.category}>{project.category}</span>
                  <span
                    className={`${styles.status} ${project.status === 'Publicado' ? styles.published : ''}`}
                  >
                    <i aria-hidden="true" />
                    {project.status}
                  </span>
                </div>

                <h3>{project.title}</h3>

                <div className={styles.features}>
                  <h4>Necessidade</h4>
                  <p className={styles.description}>{project.need}</p>
                </div>

                <div className={styles.features}>
                  <h4>Solução desenvolvida</h4>
                  <p className={styles.description}>{project.solution}</p>
                </div>

                <div className={styles.features}>
                  <h4>Resultado prático</h4>
                  <ul className={styles.businessBenefits}>
                    {project.benefits.map((benefit) => (
                      <li key={benefit}>{benefit}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.features}>
                  <h4>Andamento</h4>
                  <p className={styles.description}>
                    {project.status} · Projeto autoral de portfólio
                  </p>
                </div>

                <div className={styles.actions}>
                  {project.projectUrl ? (
                    <a
                      className={styles.primaryButton}
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackExternalLink('portfolio', project.projectUrl)
                      }
                    >
                      {project.actionLabel}
                      <ExternalIcon />
                    </a>
                  ) : (
                    <a
                      className={styles.primaryButton}
                      href={project.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackExternalLink('portfolio', project.repositoryUrl)
                      }
                    >
                      {project.actionLabel}
                      <ExternalIcon />
                    </a>
                  )}
                  {project.projectUrl && project.repositoryUrl && (
                    <a
                      className={styles.secondaryButton}
                      href={project.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackExternalLink('portfolio', project.repositoryUrl)
                      }
                    >
                      Ver código
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
