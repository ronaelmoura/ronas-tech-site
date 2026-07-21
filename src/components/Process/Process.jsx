import { useEffect, useRef, useState } from 'react'
import styles from './Process.module.css'

const processSteps = [
  {
    title: 'Descoberta',
    description:
      'Conversamos com o cliente para entender o negócio, os objetivos e os principais desafios.',
  },
  {
    title: 'Planejamento',
    description:
      'Definimos o escopo, as funcionalidades, os prazos e a melhor estratégia para o projeto.',
  },
  {
    title: 'Design',
    description:
      'Criamos uma experiência visual moderna, intuitiva e alinhada à identidade do negócio.',
  },
  {
    title: 'Desenvolvimento',
    description:
      'Transformamos o planejamento em uma solução funcional usando tecnologias modernas.',
  },
  {
    title: 'Testes',
    description:
      'Validamos o funcionamento, a responsividade, o desempenho e a experiência do usuário.',
  },
  {
    title: 'Entrega e suporte',
    description:
      'Publicamos o projeto, orientamos o cliente e oferecemos suporte para melhorias futuras.',
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
          <h2 id="process-title">Do planejamento à entrega</h2>
          <p className={styles.subtitle}>
            Seguimos um processo organizado para transformar necessidades reais
            em soluções digitais eficientes, modernas e fáceis de usar.
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
