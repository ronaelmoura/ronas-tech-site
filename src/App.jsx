import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Problems from './components/Problems/Problems'
import Safety from './components/Safety/Safety'
import TrustBand from './components/TrustBand/TrustBand'
import RemoteSupportStore from './components/RemoteSupportStore/RemoteSupportStore'
import Process from './components/Process/Process'
import About from './components/About/About'
import FAQ from './components/FAQ/FAQ'
import Footer from './components/Footer/Footer'
import CookieNotice from './components/CookieNotice/CookieNotice'
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

  let content
  if (pathname === '/contratar') content = <><a className="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a><ContractingPage /></>
  else if (pathname === '/meus-projetos') content = <><a className="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a><ProjectsPortalPreview /></>
  else if (pathname === '/produtos-digitais') content = <><a className="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a><DigitalProductsCatalogPage /></>
  else if (pathname === '/produtos-digitais/planilha-financeira-pessoal') content = <><a className="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a><PersonalFinanceProductPage /></>
  else if (pathname === '/produtos-digitais/kit-financeiro-mei') content = <><a className="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a><KitFinanceProductPage /></>
  else if (spreadsheetProduct) content = <><a className="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a><SpreadsheetProductPage product={spreadsheetProduct} /></>
  else if (LegalPage) content = <><a className="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a><LegalPage /></>
  else if (service) content = <><a className="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a><ServicePage service={service} /></>
  else if (campaign) content = <CampaignPage campaign={campaign} />
  else if (pathname !== '/') content = <NotFound />
  else content = <><a className="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a><HomeMotion /><Navbar /><main id="conteudo-principal" tabIndex="-1"><Hero /><Problems /><Safety /><TrustBand /><RemoteSupportStore /><Process /><About /><FAQ /></main><a className="floating-contact" href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Olá! Preciso de suporte técnico remoto para meu computador.')}`} target="_blank" rel="noopener noreferrer" aria-label="Pedir suporte técnico remoto pelo WhatsApp"><span className="floating-contact__brand" aria-hidden="true"><img src="/whatsapp.svg" alt="" width="25" height="25" /></span><span className="floating-contact__copy"><small>Suporte pelo</small><strong>WhatsApp</strong></span></a><Footer /></>

  return <>{content}<CookieNotice /></>
}

export default App
