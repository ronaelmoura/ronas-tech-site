import { trackExternalLink } from '../../utils/analytics'
import { useTilt } from '../../motion/hooks'
import styles from './Portfolio.module.css'

const projects = [
  {
    title: 'Ronas Desk',
    category: 'Sistema de gestão de chamados',
    need:
      'Organizar solicitações que antes ficavam espalhadas e dar à equipe uma forma simples de registrar, priorizar e acompanhar cada atendimento.',
    solution:
      'Foi criado um sistema web com acesso por perfil, abertura e acompanhamento de chamados, prioridades, status e painéis para usuários e administradores.',
    highlights: [
      'Testes automatizados',
      'Autenticação e permissões por perfil',
      'CI e deploy em produção',
    ],
    stack: ['React 19', 'Express 5', 'MySQL', 'Docker'],
    status: 'Publicado',
    projectUrl: 'https://ronas-desk.onrender.com/',
    actionLabel: 'Ver o projeto',
    featured: true,
    visual: 'dashboard',
    repositoryUrl: 'https://github.com/ronaelmoura/ronas-desk',
  },
  {
    title: 'Nexo',
    category: 'Dashboard financeiro pessoal',
    need:
      'Reunir receitas e despesas em um único lugar para facilitar o acompanhamento financeiro do mês.',
    solution:
      'Foi criado um dashboard com gráficos, filtros, cadastro de transações e interface adaptada para diferentes telas.',
    highlights: [
      'Gráficos e filtros interativos',
      'Tema persistente',
      'Interface responsiva',
    ],
    stack: ['React', 'Recharts', 'CSS', 'GitHub Pages'],
    status: 'Publicado',
    projectUrl: 'https://ronaelmoura.github.io/nexo-dashboard-financeiro/',
    repositoryUrl: 'https://github.com/ronaelmoura/nexo-dashboard-financeiro',
    actionLabel: 'Ver o projeto',
    visual: 'finance',
  },
  {
    title: 'StockFlow API',
    category: 'Backend de estoque e pedidos',
    need:
      'Criar uma base para controlar estoque e pedidos com segurança quando várias operações acontecem ao mesmo tempo.',
    solution:
      'Foi desenvolvida uma API REST com autenticação, transações, reservas de estoque, auditoria e documentação para integração.',
    highlights: [
      'Transações e controle de concorrência',
      'Idempotência, auditoria e Outbox',
      'OpenAPI e integração contínua',
    ],
    stack: ['Node.js', 'Express', 'MySQL', 'OpenAPI'],
    status: 'Código público',
    repositoryUrl: 'https://github.com/ronaelmoura/stockflow-api',
    actionLabel: 'Ver o projeto',
    visual: 'api',
  },
  {
    title: 'ClimaZen',
    category: 'Landing page comercial',
    need:
      'Apresentar um serviço técnico de forma clara e levar o visitante até uma ação comercial.',
    solution:
      'Foi criada uma landing page responsiva com apresentação do serviço, planos, simulador e formulário de diagnóstico.',
    highlights: [
      'Simulador interativo',
      'Formulário com validação',
      'SEO e publicação automática',
    ],
    stack: ['React', 'Vite', 'CSS', 'GitHub Pages'],
    status: 'Publicado',
    projectUrl: 'https://ronaelmoura.github.io/climazen-landing-page/',
    repositoryUrl: 'https://github.com/ronaelmoura/climazen-landing-page',
    actionLabel: 'Ver o projeto',
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

function ProjectCard({ project }) {
  const tiltRef = useTilt(4)
  return (
    <article
      ref={tiltRef}
      className={`${styles.card} tilt reveal ${project.featured ? styles.featured : ''}`}
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

        <div className={styles.caseSummary}>
          <p><strong>Desafio:</strong> {project.need}</p>
          <p><strong>Solução:</strong> {project.solution}</p>
        </div>

        <ul className={styles.highlights} aria-label="Destaques técnicos">
          {project.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>

        <ul className={styles.stack} aria-label="Tecnologias utilizadas">
          {project.stack.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>

        <div className={styles.actions}>
          {project.projectUrl ? (
            <a
              className={styles.primaryButton}
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackExternalLink('portfolio', project.projectUrl)}
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
              onClick={() => trackExternalLink('portfolio', project.repositoryUrl)}
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
              onClick={() => trackExternalLink('portfolio', project.repositoryUrl)}
            >
              Ver código
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

function Portfolio() {
  return (
    <section
      id="projetos"
      className={`${styles.section} reveal`}
      aria-labelledby="portfolio-title"
    >
      <div className={styles.container}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>Projetos e soluções</p>
          <h2 id="portfolio-title">Alguns exemplos do que podemos construir</h2>
          <p className={styles.subtitle}>
            Projetos próprios que mostram como transformamos necessidades em sites, sistemas, dashboards e APIs. Sem inventar resultados de clientes.
          </p>
        </header>

        <div className={styles.grid}>
          {projects.map((project) => (
            <ProjectCard project={project} key={project.title} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
