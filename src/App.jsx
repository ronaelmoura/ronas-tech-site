import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Industries from './components/Industries/Industries'
import About from './components/About/About'
import Services from './components/Services/Services'
import Process from './components/Process/Process'
import Technologies from './components/Technologies/Technologies'
import Portfolio from './components/Portfolio/Portfolio'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfUse from './pages/TermsOfUse'

const legalPages = {
  '/politica-de-privacidade': PrivacyPolicy,
  '/termos-de-uso': TermsOfUse,
}

function App() {
  const pathname = window.location.pathname.replace(/\/$/, '') || '/'
  const LegalPage = legalPages[pathname]

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
        <Process />
        <Technologies />
        <Portfolio />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
