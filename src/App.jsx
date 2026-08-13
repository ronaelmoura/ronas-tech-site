import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Priority from './components/Priority/Priority'
import Products from './components/Products/Products'
import OrderBuilder from './components/OrderBuilder/OrderBuilder'
import Services from './components/Services/Services'
import Process from './components/Process/Process'
import Portfolio from './components/Portfolio/Portfolio'
import Footer from './components/Footer/Footer'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfUse from './pages/TermsOfUse'
import ServicePage from './pages/ServicePage'
import NotFound from './pages/NotFound'
import ContractingPage from './pages/ContractingPage'
import ProjectsPortalPreview from './pages/ProjectsPortalPreview'
import CampaignPage from './pages/CampaignPage'
import { campaignPages } from './data/campaignPages'
import { servicePages } from './data/servicePages'

const legalPages = {
  '/politica-de-privacidade': PrivacyPolicy,
  '/termos-de-uso': TermsOfUse,
}

function App({ pathname: pathnameProp }) {
  const currentPathname =
    pathnameProp ?? (typeof window !== 'undefined' ? window.location.pathname : '/')
  const pathname = currentPathname.replace(/\/$/, '') || '/'
  const LegalPage = legalPages[pathname]
  const service = servicePages[pathname]
  const campaign = campaignPages[pathname]

  if (pathname === '/contratar') {
    return (
      <>
        <a className="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a>
        <ContractingPage />
      </>
    )
  }

  if (pathname === '/meus-projetos') {
    return (
      <>
        <a className="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a>
        <ProjectsPortalPreview />
      </>
    )
  }

  if (LegalPage) {
    return (
      <>
        <a className="skip-link" href="#conteudo-principal">
          Pular para o conteúdo principal
        </a>
        <LegalPage />
      </>
    )
  }

  if (service) {
    return (
      <>
        <a className="skip-link" href="#conteudo-principal">
          Pular para o conteúdo principal
        </a>
        <ServicePage service={service} />
      </>
    )
  }

  if (campaign) {
    return <CampaignPage campaign={campaign} />
  }

  if (pathname !== '/') {
    return <NotFound />
  }

  return (
    <>
      <a className="skip-link" href="#conteudo-principal">
        Pular para o conteúdo principal
      </a>
      <Navbar />
      <main id="conteudo-principal" tabIndex="-1">
        <Hero />
        <Priority />
        <Services />
        <Products />
        <Portfolio />
        <Process />
        <OrderBuilder />
        <section className="home-cta" id="contato" aria-labelledby="home-cta-title"><div><p>Comece pelo que cabe hoje</p><h2 id="home-cta-title">Você não precisa começar com um sistema grande.</h2><span>Escolha uma solução prática agora e evolua no ritmo do seu negócio.</span><div className="home-contact-links"><a href="https://wa.me/5588993021946" target="_blank" rel="noopener noreferrer">Falar no WhatsApp</a><a href="mailto:contato@ronastech.com.br">contato@ronastech.com.br</a></div></div><a href="#pedido">Montar meu pedido <span aria-hidden="true">→</span></a></section>
      </main>
      <Footer />
    </>
  )
}

export default App
