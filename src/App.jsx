import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Diagnosis from './components/Diagnosis/Diagnosis'
import Priority from './components/Priority/Priority'
import Products from './components/Products/Products'
import OrderBuilder from './components/OrderBuilder/OrderBuilder'
import About from './components/About/About'
import Services from './components/Services/Services'
import Pricing from './components/Pricing/Pricing'
import Process from './components/Process/Process'
import Portfolio from './components/Portfolio/Portfolio'
import Contact from './components/Contact/Contact'
import FAQ from './components/FAQ/FAQ'
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
        <Diagnosis />
        <Priority />
        <Services />
        <Pricing />
        <Products />
        <Portfolio />
        <Process />
        <About />
        <FAQ />
        <OrderBuilder />
        <section className="home-cta" aria-labelledby="home-cta-title"><div><p>Comece pelo que cabe hoje</p><h2 id="home-cta-title">Você não precisa começar com um sistema grande.</h2><span>Escolha uma solução prática agora e evolua no ritmo do seu negócio.</span></div><a href="#produtos">Ver soluções acessíveis <span aria-hidden="true">→</span></a></section>
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
