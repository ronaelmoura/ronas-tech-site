import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Industries from './components/Industries/Industries'
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
import { servicePages } from './data/servicePages'

const legalPages = {
  '/politica-de-privacidade': PrivacyPolicy,
  '/termos-de-uso': TermsOfUse,
}

function App() {
  const pathname = window.location.pathname.replace(/\/$/, '') || '/'
  const LegalPage = legalPages[pathname]
  const service = servicePages[pathname]

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

  return (
    <>
      <a className="skip-link" href="#conteudo-principal">
        Pular para o conteúdo principal
      </a>
      <Navbar />
      <main id="conteudo-principal" tabIndex="-1">
        <Hero />
        <Industries />
        <Services />
        <Pricing />
        <Process />
        <Portfolio />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
