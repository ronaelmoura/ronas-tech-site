export const oficinaPlans = [
  {
    id: "basico",
    name: "Básico",
    audience: "Para quem está começando",
    monthlyPriceCents: 7990,
    limits: ["Até 300 clientes", "Até 100 ordens por mês", "1 membro"],
  },
  {
    id: "intermediario",
    name: "Intermediário",
    audience: "Para uma rotina em crescimento",
    monthlyPriceCents: 14990,
    limits: ["Até 1.500 clientes", "Até 500 ordens por mês", "Até 5 membros"],
  },
  {
    id: "avancado",
    name: "Avançado",
    audience: "Para equipes e operações maiores",
    monthlyPriceCents: 24990,
    limits: ["Até 10.000 clientes", "Até 3.000 ordens por mês", "Até 25 membros"],
  },
];

export const formatOficinaPrice = (cents) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100);
