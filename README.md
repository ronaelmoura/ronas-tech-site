<div align="center">

<img src="./public/logo-ronas-tech.png" alt="Logo da Ronas Tech" width="120">

# Ronas Tech

Site institucional da Ronas Tech, desenvolvido para apresentar serviços, projetos e canais de contato com uma experiência moderna, rápida e responsiva.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)

[Acessar o site](https://www.ronastech.com.br/) · [Reportar problema](https://github.com/ronaelmoura/ronas-tech-site/issues)

</div>

## Sobre o projeto

O Ronas Tech Site é o canal digital oficial da Ronas Tech. O projeto apresenta a empresa, detalha suas soluções para presença online e reúne formas diretas de contato para novos clientes.

A aplicação foi construída como uma Single Page Application em React, com páginas dedicadas aos serviços, conteúdo otimizado para mecanismos de busca e integrações opcionais de métricas.

## Funcionalidades

- Página inicial com apresentação, serviços, processo de trabalho e tecnologias.
- Portfólio com projetos selecionados e links externos.
- Páginas individuais para criação de sites, landing pages, manutenção e sistemas web.
- Formulário de contato e acesso direto ao WhatsApp.
- Páginas de Política de Privacidade e Termos de Uso.
- Layout responsivo para dispositivos móveis, tablets e desktops.
- Metadados para SEO e compartilhamento em redes sociais.
- Sitemap e arquivo `robots.txt`.
- Google Analytics 4 opcional, sem envio dos dados pessoais preenchidos no formulário.
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
│   ├── data/               # Conteúdo das páginas de serviços
│   ├── pages/              # Serviços, privacidade e termos
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
```

| Variável | Finalidade |
| --- | --- |
| `VITE_GA_MEASUREMENT_ID` | Measurement ID do Google Analytics 4, no formato `G-XXXXXXXXXX`. |
| `VITE_GOOGLE_SITE_VERIFICATION` | Código da meta tag de verificação do Google Search Console. |

Quando `VITE_GA_MEASUREMENT_ID` está vazio, o script do Google Analytics não é carregado.

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
- `contact_form_submit`: envio válido do formulário, incluindo somente o tipo de projeto;
- `external_link_click`: cliques em GitHub, LinkedIn, Instagram e portfólio.

Nome, email, telefone, mensagem e demais dados pessoais do formulário não são enviados ao Google Analytics.

## Deploy

O projeto possui configuração de rewrite em `vercel.json` para que as rotas da SPA sejam direcionadas ao `index.html`.

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
