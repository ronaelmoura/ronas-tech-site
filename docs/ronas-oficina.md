# Ronas Oficina — ambiente de teste

## Auditoria do PR #48

- O build original falhava em `Portfolio.module.css`: sequências literais `\n` tinham sido gravadas como CSS. Corrigidas para quebras de linha reais. O erro já estava na base do PR.
- A landing referenciava `/images/ronas-oficina-sistema-travado.png`, ausente no repositório. A referência quebrada foi removida. Na revisão visual solicitada, foi incluída a imagem local `public/images/ronas-oficina-workshop.png` e o logo fornecido pelo usuário em `public/images/ronas-tech-brand.png`.
- As classes `problemPhoto` e `problemCopy` não estavam definidas. O layout foi refeito com estilos responsivos próprios.
- Faltavam navegação de produto, comparação de planos e caminho para criar/acessar uma conta. Agora há os três planos, FAQ, cadastro, login e área da conta.
- Incluídos link de pular conteúdo, foco visível, rótulos nos formulários, estados de erro/carregamento, metadados e `noindex` nas rotas de conta. As páginas de conta não inicializam os rastreadores de marketing do site.

## Executar

Requer Node.js 24 ou superior. Na raiz do repositório:

```sh
npm ci
npm run build
npm test
npm start
```

Abra `http://localhost:4173/ronas-oficina`. O servidor Node serve o build e a API na mesma origem. `npm run dev` e `npm run preview` continuam sendo ferramentas do site estático e não iniciam a API; use `npm start` para testar contas.

Dados são persistidos em `data/oficina.sqlite`, ignorado pelo Git. Não versionar esse arquivo nem credenciais. O servidor escuta apenas na interface local por padrão. As contas de teste continuam existindo após reiniciar o servidor. Não usar dados pessoais reais nesta etapa.

## O que funciona

- Cadastro Pessoa Física e Empresa (nome da empresa obrigatório), e-mail, senha, aceite e escolha de plano.
- Login/logout, sessão por cookie HttpOnly/SameSite, expiração em sete dias e senhas derivadas com scrypt e salt individual. Tokens de sessão também são armazenados como hash.
- Validação no servidor, limite de tentativas de autenticação, consulta da conta e mudança do plano escolhido antes do checkout.
- Checkout de assinatura Stripe, portal de cobrança e webhook assinado, quando configurados. Preço e identidade vêm do servidor, não do navegador.
- Confirmação do pagamento pelo provedor; voltar à URL de sucesso nunca ativa assinatura. Eventos repetidos são deduplicados e a assinatura atual é consultada para tratar eventos atrasados. Checkout pendente é reutilizado e tentativas após falha usam a mesma chave de idempotência até expirar.

## Preços e pagamento de teste

Os preços mensais de referência foram definidos a partir de valores públicos de concorrentes brasileiros: **Básico R$ 79,90**, **Intermediário R$ 149,90** e **Avançado R$ 249,90**. A grade posiciona a entrada entre ofertas de R$ 47 e R$ 119,90, o plano intermediário abaixo de alternativas de R$ 167 a R$ 300 e o avançado próximo de ofertas de gestão completa. A mesma tabela vale para Pessoa Física e Empresa; não há taxa de implantação nesta proposta.

Stripe é uma integração inicial substituível, sem credenciais de produção. Os preços visíveis não criam cobrança por si só e nenhuma transação foi realizada.

Copie `server/.env.example` para `server/.env`. Configure uma chave `sk_test_...`, o segredo do webhook e três preços mensais recorrentes de teste correspondentes a R$ 79,90, R$ 149,90 e R$ 249,90. Chaves de produção são rejeitadas na inicialização. Todos os segredos ficam no servidor.

```sh
stripe listen --forward-to localhost:4173/api/oficina/webhook
```

Use o segredo `whsec_...` fornecido pelo CLI e reinicie o servidor. Cadastre os eventos `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated` e `customer.subscription.deleted` no endpoint de teste. Configure também o portal de clientes no painel Stripe.

Depois de configurar: crie uma conta, escolha e salve o plano, abra o checkout, confira o valor no provedor e use os dados de cartão de teste da documentação Stripe. Confirme o webhook, atualize o status da conta, teste cancelamento no portal e repetição dos eventos. Nunca use um cartão real. Referências: [Checkout](https://docs.stripe.com/payments/checkout), [testes](https://docs.stripe.com/testing), [webhooks](https://docs.stripe.com/webhooks).

**Validação externa ainda pendente:** sem credenciais, não foi possível executar uma transação real no sandbox Stripe. Os testes automatizados usam o SDK real para assinatura/verificação do webhook e um cliente simulado para chamadas externas. Eles não substituem o teste ponta a ponta com a conta do provedor.

## Hospedagem e limites desta etapa

O projeto Vercel existente continua hospedando o site estático. Ele **não hospeda este servidor SQLite**. A prévia do PR permite revisar o visual; sem backend, os formulários mostram indisponibilidade e não fingem salvar contas. Para testar o fluxo funcional, use o servidor local acima.

O backend foi preparado para um único processo Node com disco persistente. Antes de oferecer o SaaS publicamente, decidir hospedagem/banco gerenciado, configurar domínio e HTTPS, recuperação e verificação de e-mail, backups, monitoramento e limites distribuídos. Em ambiente HTTPS o cookie recebe `Secure`. Não usar SQLite em filesystem temporário de funções serverless. Os termos e a política do site devem ser adequados à contratação final antes de atender clientes reais.

Clientes/veículos, ordens de serviço, orçamentos, equipe, estoque e relatórios ainda são **escopo proposto**, não módulos implementados. Limites de uso, implantação e contratação fiscal PF/Empresa continuam a definir. A conta não coleta CPF/CNPJ nesta etapa, pois não há contratação real. Assinaturas canceladas continuam consultáveis no portal; uma nova contratação após cancelamento e mudanças entre planos com cobrança proporcional ficam para a próxima etapa.

## Validação executada

- Build Vite cliente + SSR + geração de 16 rotas e página 404.
- Testes da API: cadastro PF/Empresa, validações, login/logout, sessão, isolamento entre contas, expiração, planos, bloqueio sem configuração, checkout com preço do servidor e webhook assinado/duplicado/cancelamento.
- Navegador: cadastro PF e Empresa, escolha de plano a partir da landing, salvar mudança, logout/login e persistência da escolha; layouts desktop e mobile, sem rolagem horizontal em 320 e 390 px.
- Lint: sem erros, com dois avisos preexistentes em `ServicePage.jsx`.

Nenhum merge ou deploy de produção é necessário para revisar esta etapa.

## Revisão visual pela referência do usuário

Cabeçalho com logo RT fornecido pelo usuário, marca RONAS TECH, fundo de oficina gerado com a ferramenta integrada imagegen, título branco/azul, CTA WhatsApp e acesso secundário ao cadastro. No celular a foto fica acima do texto para preservar legibilidade. Planos e autenticação permanecem disponíveis. Build e interface verificados em 1440, 950, 390 e 320 px; nenhuma mudança no backend.

## Revisão de mensagem e confiança

A landing não usa depoimentos, quantidade de clientes, economia, prazo de implantação, garantia ou qualquer outra promessa sem evidência. Ela parte de quatro situações operacionais que o visitante pode reconhecer e alternar na própria página: autorização de orçamento, prazo/andamento, histórico do veículo e peças/custos/resultado. São cenários editoriais, não casos de clientes.

As dores foram pesquisadas em publicações setoriais antes de escrever a página: a cartilha Sebrae-SP/Sindirepa descreve desafios de controles financeiros, retrabalho, compras de peças, atendimento e cadastros; o Sindirepa também destaca fluxo de caixa, entradas e saídas; e Oficina Brasil ressalta orçamento transparente e comunicação ao cliente. Fontes: [Sebrae-SP/Sindirepa](https://versoassessoriadeimprensa.com.br/wp-content/uploads/2015/07/Cartilha-Oficina-Mec--nica-Sebrae-Sindirepa.pdf), [Sindirepa](https://sindirepa.org.br/noticias/sua-empresa-fatura-bem-mas-o-dinheiro-nao-sobra-no-caixa-sindirepa-promove-workshop-sobre-gestao-financeira-para-o-setor/), [Oficina Brasil](https://oficinabrasil.com.br/ford-motorcraft/noticia/como-transformar-o-orcamento-tecnico-em-uma-ferramenta-de-fidelizacao-de-clientes-na-oficina-mecanica).

A conversa pelo WhatsApp agora é contextual: o visitante escolhe como trabalha e a situação que mais pesa. Essas escolhas ficam somente na página até ele abrir o WhatsApp, onde a mensagem pode ser alterada antes do envio. A página não pede telefone, e-mail ou CNPJ para iniciar a conversa. Rastreadores opcionais permanecem desligados por padrão nas rotas Ronas Oficina; caso estejam configurados, a página pede uma escolha separada antes de iniciar análise ou publicidade.

## Referência de mercado usada na precificação

Foram consultadas páginas públicas de concorrentes em outubro de 2026: [Offista](https://www.offista.com.br/) (a partir de R$ 47,40/mês), [Gestor Oficina](https://gestoroficina.com.br/) (R$ 69,90, R$ 89,90 e R$ 119,90/mês), [BSAuto](https://www.bsauto.com.br/) (a partir de R$ 119,90/mês), [MecaX](https://www.mecax.com.br/) (R$ 97, R$ 179 e R$ 299/mês), [AutoFlow](https://autoflowapp.com.br/planos/) (R$ 150 e R$ 300/mês) e [Workly](https://www.worklyapp.com.br/) (R$ 167, R$ 297 e R$ 497/mês). A decisão privilegia uma entrada acessível, degraus simples e preço público antes do checkout. A coleta é uma referência comercial, não uma alegação de paridade funcional: os módulos Ronas Oficina ainda estão em desenvolvimento.
