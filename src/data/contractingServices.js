export const contractingServices = [
  {
    id: 'site-profissional',
    name: 'Site Profissional',
    audience: 'Para apresentar sua empresa e transformar visitas em oportunidades',
    price: 'R$ 1.490',
    priceLabel: 'a partir de',
    featured: true,
    delivery: 'Prazo estimado: 15 a 25 dias úteis',
    features: [
      'Estrutura personalizada para sua oferta',
      'Até cinco seções estratégicas',
      'Formulário integrado ao WhatsApp',
      'Google Analytics configurado',
      'Ajustes iniciais após a publicação',
    ],
  },
  {
    id: 'landing-page',
    name: 'Landing Page',
    audience: 'Para campanhas, lançamentos e captação de contatos',
    price: 'R$ 890',
    priceLabel: 'a partir de',
    delivery: 'Prazo estimado: 7 a 15 dias úteis',
    features: [
      'Página única focada em conversão',
      'Seções planejadas para sua campanha',
      'Botão de contato ou chamada principal',
      'Layout responsivo para celular',
      'Publicação e orientação inicial',
    ],
  },
  {
    id: 'presenca-digital-local',
    name: 'Presença Digital para Negócios Locais',
    audience: 'Para ser encontrado e transmitir confiança na sua região',
    price: 'R$ 690',
    priceLabel: 'a partir de',
    delivery: 'Prazo estimado: 7 a 12 dias úteis',
    features: [
      'Página de apresentação do negócio',
      'Informações de contato, horário e localização',
      'Integração com WhatsApp e mapa',
      'Orientação para o Perfil da Empresa no Google',
      'Configuração básica para buscas locais',
    ],
  },
]

export const getContractingService = (serviceId) =>
  contractingServices.find((service) => service.id === serviceId)
