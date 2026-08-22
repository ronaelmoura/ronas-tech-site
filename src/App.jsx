import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Caretaker from './components/Caretaker/Caretaker'
import CheckupCallout from './components/CheckupCallout/CheckupCallout'
import Problems from './components/Problems/Problems'
import Paths from './components/Paths/Paths'
import Products from './components/Products/Products'
import DigitalProducts from './components/DigitalProducts/DigitalProducts'
import Process from './components/Process/Process'
import About from './components/About/About'
import Portfolio from './components/Portfolio/Portfolio'
import OrderBuilder from './components/OrderBuilder/OrderBuilder'
import Footer from './components/Footer/Footer'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfUse from './pages/TermsOfUse'
import ServicePage from './pages/ServicePage'
import NotFound from './pages/NotFound'
import ContractingPage from './pages/ContractingPage'
import ProjectsPortalPreview from './pages/ProjectsPortalPreview'
import CampaignPage from './pages/CampaignPage'
import PersonalFinanceProductPage from './pages/PersonalFinanceProductPage'
import KitFinanceProductPage from './pages/KitFinanceProductPage'
import DigitalProductsCatalogPage from './pages/DigitalProductsCatalogPage'
import SpreadsheetProductPage from './pages/SpreadsheetProductPage'
import { campaignPages } from './data/campaignPages'
import { servicePages } from './data/servicePages'
import { spreadsheetProductsByPath } from './data/spreadsheetProducts'
import { siteConfig } from './config/siteConfig'
import { Aurora, CursorGlow, ScrollProgress } from './motion/effects'
import { useScrollReveals, useSmoothScroll } from './motion/scroll'

const legalPages = { '/politica-de-privacidade': PrivacyPolicy, '/termos-de-uso': TermsOfUse }

// Motion is intentionally scoped to the homepage only — service, campaign
// and checkout pages are conversion/SEO-critical and stay untouched.
function HomeMotion() {
  useSmoothScroll()
  useScrollReveals()
  return <><Aurora /><CursorGlow /><ScrollProgress /></>
}

function App({ pathname: pathnameProp }) {
  const currentPathname = pathnameProp ?? (typeof window !== 'undefined' ? window.location.pathname : '/')
  const pathname = currentPathname.replace(/\/$/, '') || '/'
  const LegalPage = legalPages[pathname]
  const service = servicePages[pathname]
  const campaign = campaignPages[pathname]
  const spreadsheetProduct = spreadsheetProductsByPath[pathname]
  if (pathname === '/contratar') return <><a className="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a><ContractingPage /></>
  if (pathname === '/meus-projetos') return <><a className="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a><ProjectsPortalPreview /></>
  if (pathname === '/produtos-digitais') return <><a className="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a><DigitalProductsCatalogPage /></>
  if (pathname === '/produtos-digitais/planilha-financeira-pessoal') return <><a className="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a><PersonalFinanceProductPage /></>
  if (pathname === '/produtos-digitais/kit-financeiro-mei') return <><a className="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a><KitFinanceProductPage /></>
  if (spreadsheetProduct) return <><a className="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a><SpreadsheetProductPage product={spreadsheetProduct} /></>
  if (LegalPage) return <><a className="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a><LegalPage /></>
  if (service) return <><a className="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a><ServicePage service={service} /></>
  if (campaign) return <CampaignPage campaign={campaign} />
  if (pathname !== '/') return <NotFound />
  return <><a className="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a><HomeMotion /><Navbar /><main id="conteudo-principal" tabIndex="-1"><Hero /><Caretaker /><CheckupCallout /><Problems /><Paths /><Products /><DigitalProducts /><Process /><About /><Portfolio /><OrderBuilder /></main><a className="floating-contact" href={`https://wa.me/${siteConfig.whatsappNumber}?text=Olá! Vim pelo site da Ronas Tech e quero conversar sobre meu negócio.`} target="_blank" rel="noopener noreferrer" aria-label="Conversar com a Ronas Tech pelo WhatsApp"><span className="floating-contact__brand" aria-hidden="true"><img src="/whatsapp.svg" alt="" width="25" height="25" /></span><span className="floating-contact__copy"><small>Fale pelo</small><strong>WhatsApp</strong></span></a><Footer /></>
}

export default App
