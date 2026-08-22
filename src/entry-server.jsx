import { renderToString } from 'react-dom/server'
import App from './App'
import { servicePages } from './data/servicePages'
import { siteConfig } from './config/siteConfig'
import { campaignPages } from './data/campaignPages'
import { products } from './data/products'

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

const productMetadata = {
  '/contratar': {
    title: `Contratar serviços digitais | ${siteConfig.companyName}`,
    description: 'Escolha um serviço, personalize seu projeto e envie um pré-pedido para a Ronas Tech.',
  },
  '/meus-projetos': {
    title: `Meus projetos | ${siteConfig.companyName}`,
    description: 'Área de acompanhamento de projetos da Ronas Tech em preparação.',
  },
  '/produtos-digitais/planilha-financeira-pessoal': {
    title: `Planilha Financeira Pessoal | ${siteConfig.companyName}`,
    description: 'Organize ganhos, gastos, cartões e metas em uma planilha automática, visual e fácil de acompanhar pelo celular.',
    ogImage: `${siteConfig.siteUrl}og-planilha-financeira-pessoal.png`,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Planilha Financeira Pessoal',
      description: 'Planilha automática para organizar ganhos, gastos, cartões e metas financeiras.',
      image: `${siteConfig.siteUrl}og-planilha-financeira-pessoal.png`,
      brand: { '@type': 'Brand', name: siteConfig.companyName },
      offers: {
        '@type': 'Offer',
        price: '37.90',
        priceCurrency: 'BRL',
        availability: 'https://schema.org/InStock',
        url: `${siteConfig.siteUrl}produtos-digitais/planilha-financeira-pessoal`,
      },
    },
  },
}

export const staticPaths = [
  '/',
  ...Object.keys(servicePages),
  ...Object.keys(legalMetadata),
  ...Object.keys(productMetadata),
  ...Object.keys(campaignPages),
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

  const product = productMetadata[pathname]
  if (product) {
    return {
      ...product,
      canonical: `${siteConfig.siteUrl}${pathname.slice(1)}`,
    }
  }

  const campaign = campaignPages[pathname]
  if (campaign) {
    const product = products.find((item) => item.id === campaign.productId)
    return {
      title: `${campaign.title} | ${siteConfig.companyName}`,
      description: campaign.description,
      canonical: `${siteConfig.siteUrl}${pathname.slice(1)}`,
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: product?.name || campaign.title,
        description: campaign.description,
        offers: product ? { '@type': 'Offer', price: product.price.replace(/[^0-9]/g, ''), priceCurrency: 'BRL' } : undefined,
        provider: { '@type': 'Organization', name: siteConfig.companyName, url: siteConfig.siteUrl },
      },
    }
  }

  return {
    title: `Página não encontrada | ${siteConfig.companyName}`,
    description: 'A página solicitada não foi encontrada.',
    canonical: null,
    noindex: true,
  }
}
