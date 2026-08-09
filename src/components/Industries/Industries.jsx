import { useEffect, useRef, useState } from 'react'
import styles from './Industries.module.css'

const industries = [
  {
    title: 'Contatos sem acompanhamento',
    description: 'Organize interessados, próximos passos e retornos para não perder oportunidades.',
    icon: 'clinic',
  },
  {
    title: 'Orçamentos demorados',
    description: 'Simplifique propostas, informações e aprovações para responder com mais agilidade.',
    icon: 'workshop',
  },
  {
    title: 'Informações espalhadas',
    description: 'Centralize dados importantes que hoje ficam em planilhas, cadernos e conversas.',
    icon: 'office',
  },
  {
    title: 'Tarefas repetitivas',
    description: 'Automatize etapas simples para economizar tempo e reduzir retrabalho.',
    icon: 'restaurant',
  },
  {
    title: 'Presença digital fraca',
    description: 'Apresente seu negócio com clareza e facilite o contato de novos clientes.',
    icon: 'commerce',
  },
  {
    title: 'Ferramentas que não se encaixam',
    description: 'Comece com uma solução simples, adaptada ao processo real da sua empresa.',
    icon: 'services',
  },
]

const iconPaths = {
  clinic: (
    <>
      <path d="M12 4v16M4 12h16" />
      <rect x="3" y="3" width="18" height="18" rx="5" />
    </>
  ),
  workshop: (
    <>
      <path d="m14.7 6.3 3-3a4.2 4.2 0 0 1-5.4 5.4l-7.6 7.6a2.1 2.1 0 0 0 3 3l7.6-7.6a4.2 4.2 0 0 0 5.4-5.4l-3 3-3-3Z" />
      <path d="m5 5 4 4" />
    </>
  ),
  office: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 7h3M8 11h3M8 15h3M15 7h1M15 11h1M15 15h1M9 21v-2h6v2" />
    </>
  ),
  restaurant: (
    <>
      <path d="M7 3v8M4 3v5a3 3 0 0 0 6 0V3M7 11v10M17 3c-2 2-3 5-3 8h4V3h-1ZM18 11v10" />
    </>
  ),
  commerce: (
    <>
      <path d="M3 9h18l-2-5H5L3 9Z" />
      <path d="M5 9v11h14V9M9 20v-6h6v6M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
    </>
  ),
  services: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0M18 13l1.5 1.5L22 12" />
    </>
  ),
}

function IndustryIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {iconPaths[name]}
      </g>
    </svg>
  )
}

function Industries() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current

    if (!section || !('IntersectionObserver' in window)) {
      setIsVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.16 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="segmentos"
      ref={sectionRef}
      className={`${styles.section} ${isVisible ? styles.visible : ''}`}
      aria-labelledby="industries-title"
    >
      <div className={styles.container}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>Problemas que resolvemos</p>
          <h2 id="industries-title">A tecnologia deve facilitar o trabalho, não complicar</h2>
          <p className={styles.subtitle}>
            Partimos da dificuldade que sua empresa enfrenta para criar uma
            solução útil, clara e compatível com a realidade do negócio.
          </p>
        </header>

        <div className={styles.grid}>
          {industries.map(({ title, description, icon }, index) => (
            <article
              className={styles.card}
              style={{ '--delay': `${index * 70}ms` }}
              key={title}
            >
              <div className={styles.icon}>
                <IndustryIcon name={icon} />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Industries
