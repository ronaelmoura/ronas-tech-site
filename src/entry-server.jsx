import { renderToString } from 'react-dom/server'
import App from './App'
import { servicePages } from './data/servicePages'
import { siteConfig } from './config/siteConfig'

const homeMetadata = {
  title: 'Criação de Sites, Sistemas e Automações | Ronas Tech',
  description:
    'Criação de sites, sistemas web e automações sob medida para pequenos negócios de todo o Brasil venderem mais e reduzirem tarefas manuais.',
  canonical: siteConfig.siteUrl,
}

const legalMetadata = {
  '/politica-de-privacidade': {
    title: `Política de Privacidade | ${siteConfig.companyName}`,
    description:
      'Saiba como a Ronas Tech coleta, utiliza e protege as informações enviadas por visitantes e clientes.',
  },
  '/termos-de-uso': {
    title: `Termos de Uso | ${siteConfig.companyName}`,
    description:
      'Consulte as regras e condições para utilização do site e dos serviços apresentados pela Ronas Tech.',
  },
}

export const staticPaths = [
  '/',
  ...Object.keys(servicePages),
  ...Object.keys(legalMetadata),
]

export function render(pathname) {
  return renderToString(<App pathname={pathname} />)
}

export function getPageMetadata(pathname) {
  if (pathname === '/') return homeMetadata

  const service = servicePages[pathname]
  if (service) {
    return {
      title: service.metaTitle,
      description: service.metaDescription,
      canonical: `${siteConfig.siteUrl}${service.slug}`,
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.eyebrow,
        description: service.metaDescription,
        url: `${siteConfig.siteUrl}${service.slug}`,
        areaServed: {
          '@type': 'Country',
          name: 'Brasil',
        },
        provider: {
          '@type': 'Organization',
          name: siteConfig.companyName,
          url: siteConfig.siteUrl,
          email: siteConfig.email,
          sameAs: [siteConfig.github, siteConfig.linkedin, siteConfig.instagram],
        },
      },
    }
  }

  const legal = legalMetadata[pathname]
  if (legal) {
    return {
      ...legal,
      canonical: `${siteConfig.siteUrl}${pathname.slice(1)}`,
    }
  }

  return {
    title: `Página não encontrada | ${siteConfig.companyName}`,
    description: 'A página solicitada não foi encontrada.',
    canonical: null,
    noindex: true,
  }
}
