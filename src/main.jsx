import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'
import { initializeAnalytics } from './utils/analytics'
import { initializeMetaPixel } from './utils/metaPixel'

initializeAnalytics()
initializeMetaPixel()

if (window.location.pathname === '/' && window.location.hash === '#produtos-digitais') {
  window.location.replace('/produtos-digitais')
}

const container = document.getElementById('root')
const application = (
  <StrictMode>
    <App />
  </StrictMode>
)

if (container.hasChildNodes()) {
  hydrateRoot(container, application)
} else {
  createRoot(container).render(application)
}
