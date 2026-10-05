// Scenarios authored for the landing, informed by sector research; not testimonials.
export const oficinaPains = [
  {
    id: "aprovacao",
    question: "Esse serviço foi autorizado?",
    label: "Orçamento e autorização",
    scene:
      "O orçamento foi por mensagem. A resposta veio em áudio. Na hora de executar, alguém precisa procurar o que ficou combinado.",
    consequence: "A dúvida chega à bancada e pode voltar na hora da cobrança.",
    record:
      "Serviço, valor apresentado e decisão do cliente ligados ao mesmo atendimento.",
    proposal:
      "Orçamentos e decisão por link temporário foram implementados e testados localmente.",
    paper: [
      ["Serviço", "Revisão do sistema de freios"],
      ["Orçamento", "Enviado ao cliente"],
      ["Autorização", "Ainda não registrada"],
      ["Próximo passo", "Confirmar antes de executar"],
    ],
  },
  {
    id: "prazo",
    question: "Dá para entregar hoje?",
    label: "Andamento e prazo",
    scene:
      "O cliente quer uma previsão. Você precisa saber se a peça chegou, quem está com o carro e o que ainda falta fazer.",
    consequence:
      "Responder vira mais uma interrupção entre um serviço e outro.",
    record:
      "Etapa do serviço, pendência e próximo passo visíveis para quem atende.",
    proposal: "Ordens de serviço e acompanhamento de etapas foram implementados e testados localmente.",
    paper: [
      ["Atendimento", "Troca do conjunto de embreagem"],
      ["Etapa", "Aguardando peça"],
      ["Pendência", "Confirmar entrega com fornecedor"],
      ["Próximo passo", "Revisar a previsão com o cliente"],
    ],
  },
  {
    id: "historico",
    question: "O que foi feito nesse carro?",
    label: "Histórico do veículo",
    scene:
      "O carro voltou. O cliente lembra de uma troca, mas a informação ficou num papel ou com quem atendeu da última vez.",
    consequence:
      "O atendimento recomeça procurando uma informação que já deveria estar à mão.",
    record:
      "Cliente, veículo e serviços anteriores associados, com as observações do atendimento.",
    proposal: "Clientes, veículos e ordens associados foram implementados e testados localmente.",
    paper: [
      ["Veículo", "Exemplo de retorno à oficina"],
      ["Consulta", "Serviços anteriores"],
      ["Registro necessário", "Data, serviço e observações"],
      ["Próximo passo", "Conferir antes de novo orçamento"],
    ],
  },
  {
    id: "resultado",
    question: "Teve serviço. Mas sobrou quanto?",
    label: "Peças, custos e resultado",
    scene:
      "Entrou dinheiro, saíram peças e houve despesas. Olhar só o movimento não mostra o resultado da oficina.",
    consequence:
      "Fica difícil perceber quais serviços compensam e onde o dinheiro está indo.",
    record:
      "Peças, mão de obra e movimentações separados para uma análise mais clara.",
    proposal:
      "Pagamentos parciais e saldo foram testados localmente; conciliação e estornos continuam planejados.",
    paper: [
      ["Na operação", "Serviços e peças movimentados"],
      ["Separar", "Peças e mão de obra"],
      ["Conferir", "Entradas, saídas e pendências"],
      ["Próximo passo", "Entender o resultado do período"],
    ],
  },
];
