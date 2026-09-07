import { useEffect, useState } from 'react'
import styles from './CookieNotice.module.css'

const STORAGE_KEY = 'ronas_cookie_notice_dismissed'

// Aviso de cookies/rastreamento — não bloqueia o carregamento do Google
// Analytics, do Google Ads nem do Meta Pixel (eles já são opcionais e só
// entram em ação quando os IDs estão configurados), mas garante que o
// visitante veja o aviso antes de navegar, como recomenda a LGPD para o uso
// de cookies de análise e publicidade.
// O aviso já vem no HTML renderizado no servidor: ele é o maior bloco de
// texto da página e, quando só aparecia depois da hidratação, era ele que
// determinava o LCP da home. Para quem já aceitou, um script curto no
// index.html marca o <html> antes da primeira pintura e o CSS esconde o
// aviso — sem piscada e sem depender do React.
function CookieNotice() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY)) setVisible(false)
    } catch {
      /* localStorage indisponível — o aviso continua visível */
    }
  }, [])

  function dismiss() {
    setVisible(false)
    document.documentElement.dataset.cookieNotice = 'dismissed'
    try {
      window.localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* localStorage indisponível — o aviso volta a aparecer na próxima visita */
    }
  }

  if (!visible) return null

  return (
    <div className={`${styles.notice} cookie-notice`} role="dialog" aria-labelledby="cookie-notice-title">
      <p id="cookie-notice-title">
        Usamos cookies e ferramentas de análise (Google Analytics, Google Ads e
        Meta) para entender o uso do site e mostrar anúncios mais relevantes.
        Saiba mais na{' '}
        <a href="/politica-de-privacidade">Política de Privacidade</a>.
      </p>
      <button type="button" onClick={dismiss}>
        Entendi
      </button>
    </div>
  )
}

export default CookieNotice
