import { useEffect, useRef, useState } from 'react'
import { getTrackingConsent, setTrackingConsent } from '../../utils/consent'
import styles from './CookieNotice.module.css'
import Icon from '../Icon/Icon'

function CookieNotice() {
  const [visible, setVisible] = useState(true)
  const settingsRef = useRef(null)
  const titleRef = useRef(null)
  const reopened = useRef(false)
  useEffect(() => { setVisible(!getTrackingConsent()) }, [])
  useEffect(() => {
    if (visible && reopened.current) titleRef.current?.focus()
  }, [visible])

  function choose(choice) {
    setTrackingConsent(choice)
    document.documentElement.dataset.cookieNotice = 'dismissed'
    setVisible(false)
    if (reopened.current) settingsRef.current?.focus()
  }

  return <>
    <div className={styles.settingsBar}>
      <button ref={settingsRef} type="button" onClick={() => {
        reopened.current = true
        delete document.documentElement.dataset.cookieNotice
        setVisible(true)
      }}>Preferências de cookies</button>
    </div>
    {visible && <aside className={`${styles.notice} cookie-notice`} aria-labelledby="cookie-notice-title">
      <h2 ref={titleRef} tabIndex="-1" id="cookie-notice-title"><Icon name="shield" size={20} />Sua privacidade, sua escolha.</h2>
      <p>Podemos usar Google e Meta para medir visitas e anúncios. Essas ferramentas só são ativadas se você aceitar. <a href="/politica-de-privacidade">Saiba mais</a>.</p>
      <div className={styles.actions}>
        <button type="button" onClick={() => choose('declined')}>Só essenciais</button>
        <button className={styles.accept} type="button" onClick={() => choose('accepted')}>Aceitar todos</button>
      </div>
    </aside>}
  </>
}

export default CookieNotice
