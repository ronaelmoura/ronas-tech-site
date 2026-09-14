<div align="center">

<img src="./public/logo-ronas-tech.png" alt="Logo da Ronas Tech" width="120">

# Ronas Tech

Portfólio de Ronael Moura, desenvolvedor Full Stack, publicado sob a marca Ronas Tech: projetos, stack e canais de contato para recrutadores e clientes de projetos.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)

[Acessar o site](https://www.ronastech.com.br/) · [Reportar problema](https://github.com/ronaelmoura/ronas-tech-site/issues)

</div>

## Sobre o projeto

O Ronas Tech Site apresenta o trabalho de Ronael Moura como desenvolvedor Full Stack. A home reúne projetos publicados, tecnologias, trajetória e contato, com dois caminhos: vagas (LinkedIn e e-mail) e projetos freelance (WhatsApp). O site também mantém o catálogo de produtos digitais (planilhas).

A aplicação é feita em React, com as páginas pré-renderizadas no build para SEO e integrações opcionais de métricas.

## Funcionalidades

- Página inicial com apresentação, projetos, stack, sobre e contato.
- Portfólio com projetos publicados, links para a aplicação e para o código.
- Catálogo e páginas de produtos digitais.
- Formulário de contato que abre o WhatsApp com a mensagem preenchida.
- Redirecionamentos 301 (em `vercel.json`) das antigas páginas de suporte, serviços e campanhas para a home.
- Páginas de Política de Privacidade e Termos de Uso.
- Layout responsivo para dispositivos móveis, tablets e desktops.
- Metadados para SEO e compartilhamento em redes sociais.
- Sitemap e arquivo `robots.txt`.
- Google Analytics 4 e Google Ads opcionais. Nome e mensagem do formulário não são enviados; o telefone vai para as Conversões Otimizadas do Google Ads com hash gerado no navegador.
- Estrutura de acessibilidade com link para pular ao conteúdo principal e marcação semântica.

## Tecnologias

- React 19
- Vite 8
- JavaScript
- CSS Modules
- Google Analytics 4
- Vercel
- Oxlint

## Estrutura principal

```text
ronas-tech-site/
├── public/                  # Imagens, sitemap e robots.txt
├── src/
│   ├── components/         # Seções e componentes da interface
│   ├── config/             # Dados institucionais centralizados
│   ├── data/               # Conteúdo dos produtos digitais
│   ├── pages/              # Produtos digitais, privacidade e termos
│   ├── styles/             # Estilos globais
│   ├── utils/              # Integrações e utilitários
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── index.html
├── vercel.json
└── vite.config.js
```

## Executando localmente

### Pré-requisitos

- Node.js compatível com o Vite 8
- npm

### Instalação

```bash
git clone https://github.com/ronaelmoura/ronas-tech-site.git
cd ronas-tech-site
npm install
```

Crie o arquivo de ambiente local:

```bash
cp .env.example .env.local
```

No Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local da aplicação.

## Variáveis de ambiente

As integrações de métricas e verificação são opcionais:

```env
VITE_GA_MEASUREMENT_ID=
VITE_GOOGLE_SITE_VERIFICATION=
VITE_GOOGLE_ADS_ID=
VITE_GOOGLE_ADS_CONVERSION_LABEL=
VITE_META_PIXEL_ID=
```

| Variável | Finalidade |
| --- | --- |
| `VITE_GA_MEASUREMENT_ID` | Measurement ID do Google Analytics 4, no formato `G-XXXXXXXXXX`. |
| `VITE_GOOGLE_SITE_VERIFICATION` | Código da meta tag de verificação do Google Search Console. |
| `VITE_GOOGLE_ADS_ID` | ID da conta do Google Ads, no formato `AW-XXXXXXXXX`. |
| `VITE_GOOGLE_ADS_CONVERSION_LABEL` | Rótulo da ação de conversão do Google Ads (ex: "Enviar mensagem no WhatsApp"), obtido ao criar a conversão no painel do Google Ads. |
| `VITE_META_PIXEL_ID` | ID numérico do Meta Pixel (Gerenciador de Eventos do Facebook/Instagram). |

Quando `VITE_GA_MEASUREMENT_ID` e `VITE_GOOGLE_ADS_ID` estão vazios, nenhum script do Google é carregado. Quando `VITE_META_PIXEL_ID` está vazio, o Meta Pixel não carrega. Todas as integrações são independentes entre si.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o ambiente de desenvolvimento. |
| `npm run build` | Gera a versão otimizada para produção. |
| `npm run lint` | Executa a análise estática com Oxlint. |
| `npm run preview` | Visualiza localmente o build de produção. |

## Analytics

Os eventos implementados são:

- `whatsapp_click`: cliques em links do WhatsApp;
- `contact_form_submit`: envio válido do formulário, incluindo somente o assunto (vaga CLT, vaga PJ, projeto freelance ou outro);
- `external_link_click`: cliques em GitHub, LinkedIn, Instagram e portfólio.

Nome, empresa, telefone e mensagem do formulário não são enviados ao Google Analytics. No envio do formulário, o telefone é repassado ao Google Ads (`gtag('set', 'user_data')`, Conversões Otimizadas), que gera o hash no navegador antes de enviar.

Todo clique em WhatsApp (`whatsapp_click`) é tratado como lead e, além do evento
no GA4, também dispara:

- a conversão do Google Ads, quando `VITE_GOOGLE_ADS_ID` e
  `VITE_GOOGLE_ADS_CONVERSION_LABEL` estiverem configurados;
- o evento `Lead` do Meta Pixel, quando `VITE_META_PIXEL_ID` estiver configurado.

Um aviso de cookies (`src/components/CookieNotice`) é exibido na primeira
visita, informando o uso de Google Analytics, Google Ads e Meta, com link para
a Política de Privacidade. A preferência de ter fechado o aviso fica salva no
`localStorage` do navegador.

## Deploy

As páginas são pré-renderizadas no build (`scripts/prerender.mjs`). O `vercel.json` define `cleanUrls` e os redirecionamentos permanentes das URLs antigas de suporte, serviços e campanhas para a home.

Para publicar na Vercel:

1. Importe este repositório.
2. Mantenha os comandos padrão de build do Vite.
3. Cadastre as variáveis opcionais em **Project Settings → Environment Variables**.
4. Realize o deploy.

## Autor

Desenvolvido por **Ronael Moura**.

- [Site da Ronas Tech](https://www.ronastech.com.br/)
- [GitHub](https://github.com/ronaelmoura)
- [LinkedIn](https://www.linkedin.com/in/ronael-moura)
- [Instagram](https://www.instagram.com/ronas_tech/)
