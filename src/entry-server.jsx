import { renderToString } from 'react-dom/server'
import App from './App'
import { siteConfig } from './config/siteConfig'
import { spreadsheetProducts } from './data/spreadsheetProducts'

const homeMetadata = {
  title: 'Ronael Moura | Desenvolvedor Full Stack · Ronas Tech',
  description:
    'Portfólio de Ronael Moura, desenvolvedor Full Stack com formação pelo SENAI. Projetos com React, Node.js, Express e MySQL, testes automatizados e deploy em produção. Aberto a vagas e projetos freelance.',
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
      'Consulte as regras e condições para utilização do site e dos produtos apresentados pela Ronas Tech.',
  },
}

const spreadsheetProductMetadata = Object.fromEntries(spreadsheetProducts.map((product) => [product.path, {
  title: `${product.title} | ${siteConfig.companyName}`,
  description: product.lead,
  ogImage: `${siteConfig.siteUrl}${product.image.slice(1)}`,
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: `${siteConfig.siteUrl}${product.image.slice(1)}`,
    url: `${siteConfig.siteUrl}${product.path.slice(1)}`,
    brand: { '@type': 'Brand', name: siteConfig.companyName },
    offers: {
      '@type': 'Offer',
      price: product.priceValue,
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
      url: `${siteConfig.siteUrl}${product.path.slice(1)}`,
    },
  },
}]))

const productMetadata = {
  ...Object.fromEntries(['boxmotor', 'ronas-oficina'].flatMap((prefix) => ['cadastro', 'entrar', 'conta'].map((route) => [`/${prefix}/${route}`, {
    title: `${({ cadastro: 'Criar conta', entrar: 'Entrar', conta: 'Minha conta' })[route]} | BoxMotor`,
    description: 'Ambiente de teste do BoxMotor. Cadastro, acesso e planos para Pessoa Física e Empresa.',
    noindex: true,
  }]))),
  ...Object.fromEntries(['boxmotor', 'ronas-oficina'].map((prefix) => [`/${prefix}`, {
    title: 'BoxMotor | Gestão digital para oficinas | Ronas Tech',
    description: 'Conheça o BoxMotor: uma solução digital em desenvolvimento para organizar clientes, veículos, serviços e orçamentos de oficinas.',
    canonical: `${siteConfig.siteUrl}boxmotor`,
    ogImage: `${siteConfig.siteUrl}images/boxmotor-logo.png`,
    ogImageAlt: 'BoxMotor — gestão digital para oficinas',
  }])),
  '/produtos-digitais': {
    title: `Planilhas e Produtos Digitais | ${siteConfig.companyName}`,
    description: 'Conheça as planilhas inteligentes da Ronas Tech para finanças, vendas, estoque, precificação, serviços e organização de negócios.',
    ogImage: `${siteConfig.siteUrl}og-kit-financeiro-mei.png`,
    canonical: `${siteConfig.siteUrl}produtos-digitais`,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Produtos Digitais Ronas Tech',
      description: 'Catálogo de planilhas inteligentes para pessoas e pequenos negócios.',
      url: `${siteConfig.siteUrl}produtos-digitais`,
    },
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
  '/produtos-digitais/kit-financeiro-mei': {
    title: `Kit Financeiro Inteligente para MEI | ${siteConfig.companyName}`,
    description: 'Organize receitas, despesas, fluxo de caixa, contas a pagar e precificação com o Kit Financeiro Inteligente para MEI da Ronas Tech.',
    ogImage: `${siteConfig.siteUrl}og-kit-financeiro-mei.png`,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Kit Financeiro Inteligente para MEI',
      description: 'Planilha financeira empresarial, dashboard, contas e calculadora de precificação para MEI.',
      image: `${siteConfig.siteUrl}og-kit-financeiro-mei.png`,
      brand: { '@type': 'Brand', name: siteConfig.companyName },
      offers: { '@type': 'Offer', price: '37.90', priceCurrency: 'BRL', availability: 'https://schema.org/InStock', url: `${siteConfig.siteUrl}produtos-digitais/kit-financeiro-mei` },
    },
  },
  ...spreadsheetProductMetadata,
}

export const staticPaths = [
  '/',
  ...Object.keys(legalMetadata),
  ...Object.keys(productMetadata),
]

export function render(pathname) {
  return renderToString(<App pathname={pathname} />)
}

export function getPageMetadata(pathname) {
  if (pathname === '/') return homeMetadata

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
      canonical: product.canonical || `${siteConfig.siteUrl}${pathname.slice(1)}`,
    }
  }

  return {
    title: `Página não encontrada | ${siteConfig.companyName}`,
    description: 'A página solicitada não foi encontrada.',
    canonical: null,
    noindex: true,
  }
}
