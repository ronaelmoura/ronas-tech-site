import { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Services from './components/Services/Services'
import Problems from './components/Problems/Problems'
import HowItWorks from './components/HowItWorks/HowItWorks'
import WhyRonasTech from './components/WhyRonasTech/WhyRonasTech'
import Portfolio from './components/Portfolio/Portfolio'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import CookieNotice from './components/CookieNotice/CookieNotice'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfUse from './pages/TermsOfUse'
import NotFound from './pages/NotFound'
import PersonalFinanceProductPage from './pages/PersonalFinanceProductPage'
import KitFinanceProductPage from './pages/KitFinanceProductPage'
import DigitalProductsCatalogPage from './pages/DigitalProductsCatalogPage'
import SpreadsheetProductPage from './pages/SpreadsheetProductPage'
import ServicePage from './pages/ServicePage'
import { spreadsheetProductsByPath } from './data/spreadsheetProducts'
import './components/Services/Services.css'
import './components/Problems/Problems.css'

const legalPages = { '/politica-de-privacidade': PrivacyPolicy, '/termos-de-uso': TermsOfUse }
const serviceSlugs = ['sites-profissionais', 'landing-pages', 'ia-para-empresas', 'automacao-de-processos', 'sistemas-web', 'dashboards-e-integracoes']

function HomeMotion() {
  const [Motion, setMotion] = useState(null)
  useEffect(() => {
    let cancelled = false
    const load = () => import('./motion/HomeMotion').then((module) => { if (!cancelled) setMotion(() => module.default) }).catch(() => {})
    const idle = window.requestIdleCallback
    const handle = idle ? idle(load, { timeout: 1500 }) : setTimeout(load, 200)
    return () => { cancelled = true; if (idle) window.cancelIdleCallback(handle); else clearTimeout(handle) }
  }, [])
  return Motion ? <Motion /> : null
}

function App({ pathname: pathnameProp }) {
  const currentPathname = pathnameProp ?? (typeof window !== 'undefined' ? window.location.pathname : '/')
  const pathname = currentPathname.replace(/\/$/, '') || '/'
  const LegalPage = legalPages[pathname]
  const spreadsheetProduct = spreadsheetProductsByPath[pathname]
  const serviceSlug = pathname.startsWith('/servicos/') ? pathname.replace('/servicos/', '') : null

  let content
  if (pathname === '/produtos-digitais') content = <><a className="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a><DigitalProductsCatalogPage /></>
  else if (pathname === '/produtos-digitais/planilha-financeira-pessoal') content = <><a className="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a><PersonalFinanceProductPage /></>
  else if (pathname === '/produtos-digitais/kit-financeiro-mei') content = <><a className="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a><KitFinanceProductPage /></>
  else if (serviceSlug && serviceSlugs.includes(serviceSlug)) content = <ServicePage slug={serviceSlug} />
  else if (spreadsheetProduct) content = <><a className="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a><SpreadsheetProductPage product={spreadsheetProduct} /></>
  else if (LegalPage) content = <><a className="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a><LegalPage /></>
  else if (pathname !== '/') content = <NotFound />
  else content = <><a className="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a><HomeMotion /><Navbar /><main id="conteudo-principal" className="home"><Hero /><Problems /><Services /><HowItWorks /><WhyRonasTech /><Portfolio /><About /><Contact /></main><Footer /></>

  return <>{content}<CookieNotice /></>
}

export default App
