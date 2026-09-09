import { useEffect, useState } from 'react'
import { getAvailability } from '../../utils/availability'
import styles from './AvailabilityBadge.module.css'

// A home é pré-renderizada no build, então o estado do relógio só pode ser
// calculado depois da hidratação — antes disso o selo mostra o horário fixo,
// que é verdadeiro em qualquer momento do dia.
function AvailabilityBadge({ variant = 'inline' }) {
  const [availability, setAvailability] = useState(null)

  useEffect(() => {
    setAvailability(getAvailability())
    const timer = setInterval(() => setAvailability(getAvailability()), 60000)
    return () => clearInterval(timer)
  }, [])

  const isOpen = availability?.isOpen ?? true
  const label = availability?.label ?? 'Todos os dias · 09h à meia-noite'
  const detail = availability?.detail ?? 'Resposta inicial em até 1 hora dentro do horário de atendimento.'

  return (
    <p className={`${styles.badge} ${styles[variant]} ${isOpen ? styles.open : styles.closed}`}>
      <span className={styles.dot} aria-hidden="true" />
      <strong>{label}</strong>
      <span className={styles.detail}>{detail}</span>
    </p>
  )
}

export default AvailabilityBadge
