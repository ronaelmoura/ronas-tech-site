import { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Problems from './components/Problems/Problems'
import Safety from './components/Safety/Safety'
import TrustBand from './components/TrustBand/TrustBand'
import RemoteSupportStore from './components/RemoteSupportStore/RemoteSupportStore'
import Services from './components/Services/Services'
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
import { trackWhatsAppClick } from './utils/analytics'

const legalPages = { '/politica-de-privacidade': PrivacyPolicy, '/termos-de-uso': TermsOfUse }

// Motion is intentionally scoped to the homepage only — service, campaign
// and checkout pages are conversion/SEO-critical and stay untouched.
//
// O módulo de movimento (GSAP + Lenis) é carregado depois da hidratação,
// quando o navegador estiver ocioso: ele é decoração e não pode atrasar a
// primeira renderização do conteúdo. Se o carregamento falhar, a home
// continua completa e utilizável, apenas sem as animações.
function HomeMotion() {
  const [Motion, setMotion] = useState(null)

  useEffect(() => {
    let cancelled = false
    const load = () => {
      import('./motion/HomeMotion')
        .then((module) => { if (!cancelled) setMotion(() => module.default) })
        .catch(() => { /* sem animações, o conteúdo já está visível */ })
    }
    const idle = window.requestIdleCallback
    const handle = idle ? idle(load, { timeout: 1500 }) : setTimeout(load, 200)
    return () => {
      cancelled = true
      if (idle) window.cancelIdleCallback(handle)
      else clearTimeout(handle)
    }
  }, [])

  return Motion ? <Motion /> : null
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
  else content = <><a className="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a><HomeMotion /><Navbar /><main id="conteudo-principal" tabIndex="-1"><Hero /><Problems /><Safety /><TrustBand /><RemoteSupportStore /><Services /><Process /><About /><FAQ /></main><a className="floating-contact" href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Olá! Preciso de suporte técnico remoto para meu computador.')}`} target="_blank" rel="noopener noreferrer" aria-label="Pedir suporte técnico remoto pelo WhatsApp" onClick={() => trackWhatsAppClick('floating_button')}><span className="floating-contact__brand" aria-hidden="true"><img src="/whatsapp.svg" alt="" width="25" height="25" /></span><span className="floating-contact__copy"><small>Suporte pelo</small><strong>WhatsApp</strong></span></a><Footer /></>

  return <>{content}<CookieNotice /></>
}

export default App
