import { useEffect, useRef, useState } from 'react'
import styles from './Process.module.css'

const processSteps = [
  {
    title: 'Entender o problema',
    description:
      'Você explica a rotina, a dificuldade atual e o resultado que precisa alcançar.',
  },
  {
    title: 'Definir a solução',
    description:
      'Apresentamos um escopo claro, com as funções essenciais, etapas, prazo e investimento.',
  },
  {
    title: 'Construir e validar',
    description:
      'Desenvolvemos por etapas e mostramos a evolução para validar antes da entrega final.',
  },
  {
    title: 'Entregar e acompanhar',
    description:
      'Publicamos, orientamos o uso e acompanhamos os ajustes previstos após a entrega.',
  },
]

function Process() {
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
      { threshold: 0.14 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="processo"
      ref={sectionRef}
      className={`${styles.section} ${isVisible ? styles.visible : ''}`}
      aria-labelledby="process-title"
    >
      <div className={styles.container}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>Como trabalhamos</p>
          <h2 id="process-title">Um processo simples, sem linguagem complicada</h2>
          <p className={styles.subtitle}>
            Você acompanha as decisões e sabe o que está sendo construído em
            cada etapa do projeto.
          </p>
        </header>

        <ol className={styles.timeline}>
          {processSteps.map(({ title, description }, index) => (
            <li
              className={styles.step}
              style={{ '--delay': `${index * 80}ms` }}
              key={title}
            >
              <div className={styles.marker} aria-hidden="true">
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>
              <article className={styles.card}>
                <span className={styles.stepLabel}>Etapa {index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Process
