# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## Analytics e Search Console

O projeto possui integração opcional com o Google Analytics 4. Obtenha o
Measurement ID no fluxo de dados da propriedade do GA4; ele possui o formato
`G-XXXXXXXXXX`. Copie `.env.example` para `.env.local` durante o desenvolvimento
e preencha as variáveis sem adicioná-las ao Git:

```env
VITE_GA_MEASUREMENT_ID=
VITE_GOOGLE_SITE_VERIFICATION=
```

`VITE_GOOGLE_SITE_VERIFICATION` deve receber somente o código fornecido pelo
Google Search Console para o método de verificação por tag HTML. Quando essa
variável está vazia, a meta tag é removida automaticamente durante o build.

Na Vercel, acesse **Project Settings > Environment Variables**, cadastre as duas
variáveis para os ambientes desejados e faça um novo deploy. Quando
`VITE_GA_MEASUREMENT_ID` está vazio, nenhum script do Google Analytics é
carregado.

Os eventos implementados são:

- `whatsapp_click`: cliques em links que abrem o WhatsApp;
- `contact_form_submit`: envio válido do formulário com o tipo de projeto;
- `external_link_click`: cliques em GitHub, LinkedIn e portfólio.

Nome, e-mail, telefone, mensagem e outros dados pessoais preenchidos no
formulário não são enviados ao Google Analytics.

Antes da publicação final, substitua `URL_DO_SITE` em `src/config/siteConfig.js`,
adicione a URL absoluta ao `public/sitemap.xml` e inclua a diretiva `Sitemap` em
`public/robots.txt`. Depois, habilite `canonical`, `og:url`, `og:image` e
`twitter:image` em `index.html` com URLs oficiais. O favicon também deve ser
configurado quando o arquivo oficial estiver disponível.
