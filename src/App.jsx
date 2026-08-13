import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Diagnosis from './components/Diagnosis/Diagnosis'
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
        <Services />
        <Portfolio />
        <Pricing />
        <Process />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
