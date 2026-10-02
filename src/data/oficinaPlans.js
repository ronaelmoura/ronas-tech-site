export const oficinaPlans = [
  {
    id: "basico",
    name: "Básico",
    audience: "Para quem está começando",
    description: "O essencial para organizar seus atendimentos.",
    monthlyPriceCents: 7990,
    features: [
      "Clientes e veículos",
      "Ordens de serviço",
      "Histórico de atendimentos",
    ],
  },
  {
    id: "intermediario",
    name: "Intermediário",
    audience: "Para uma rotina em crescimento",
    description: "Mais controle do orçamento à entrega.",
    monthlyPriceCents: 14990,
    features: [
      "Tudo do Básico",
      "Orçamentos e aprovações",
      "Agenda de serviços",
      "Relatórios da operação",
    ],
  },
  {
    id: "avancado",
    name: "Avançado",
    audience: "Para equipes e operações maiores",
    description: "Uma visão integrada para sua oficina.",
    monthlyPriceCents: 24990,
    features: [
      "Tudo do Intermediário",
      "Equipe e permissões",
      "Controle de estoque",
      "Indicadores de gestão",
    ],
  },
];

export const formatOficinaPrice = (cents) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100);
