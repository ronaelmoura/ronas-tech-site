export const ORDER_STATUS = {
  draft: 'Rascunho',
  received: 'Pedido recebido',
  awaitingMaterials: 'Aguardando materiais',
  inDevelopment: 'Em desenvolvimento',
  awaitingApproval: 'Aguardando aprovação',
  published: 'Publicado',
}

export const createOrderDraft = () => ({
  version: 1,
  serviceId: '',
  personalization: {
    projectName: '',
    primaryGoal: '',
    desiredStart: '',
    notes: '',
  },
  domain: {
    option: '',
    value: '',
  },
  customer: {
    name: '',
    company: '',
    email: '',
    whatsapp: '',
    briefing: '',
  },
  status: 'draft',
})

// Pontos de extensão planejados. Nenhum provedor externo é chamado nesta versão.
export const orderCapabilities = {
  payment: { enabled: false, provider: null },
  customerPortal: { enabled: false, route: '/meus-projetos' },
}
