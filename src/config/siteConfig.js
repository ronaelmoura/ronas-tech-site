const whatsappCheckoutFallback = 'https://wa.me/5588993021946?text=Ol%C3%A1%21%20Quero%20comprar%20o%20Kit%20Financeiro%20Inteligente%20para%20MEI.'

export const siteConfig = {
  companyName: 'Ronas Tech',
  logoPath: '/logo-ronas-tech.png',
  siteUrl: 'https://www.ronastech.com.br/',
  email: 'contato@ronastech.com.br',
  whatsappDisplay: '(88) 99302-1946',
  whatsappNumber: '5588993021946',
  location: 'Tianguá, Ceará',
  github: 'https://github.com/ronaelmoura',
  linkedin: 'https://www.linkedin.com/in/ronael-moura',
  instagram: 'https://www.instagram.com/ronas_tech/',
  portfolio: 'https://github.com/ronaelmoura',
  personalSite: 'https://ronaelmoura.github.io/',
  kiwifyCheckoutUrl: import.meta.env.VITE_KIWIFY_CHECKOUT_URL || whatsappCheckoutFallback,
}
