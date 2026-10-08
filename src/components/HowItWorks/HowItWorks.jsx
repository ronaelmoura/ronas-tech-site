import styles from './HowItWorks.module.css'
import Icon from '../Icon/Icon'

const steps = [
  {
    number: '01',
    title: 'Conversa',
    description: 'Você conta o que está travando a rotina — sem precisar chegar com a solução pronta.',
    icon: 'message',
  },
  {
    number: '02',
    title: 'Diagnóstico',
    description: 'Mapeamos o processo e identificamos o que realmente precisa mudar.',
    icon: 'search',
  },
  {
    number: '03',
    title: 'Plano',
    description: 'Definimos solução, prioridades, escopo e investimento antes de começar.',
    icon: 'route',
  },
  {
    number: '04',
    title: 'Desenvolvimento',
    description: 'Criamos e integramos a solução, validando cada etapa com você.',
    icon: 'code',
  },
  {
    number: '05',
    title: 'Entrega e evolução',
    description: 'Colocamos o produto em uso e preparamos a base para os próximos passos.',
    icon: 'check',
  },
]

function HowItWorks() {
  return (
    <section id="como-funciona" className={styles.section} aria-labelledby="how-title">
      <div className={styles.container}>
        <header className={styles.heading}>
          <div className={styles.headingCopy}>
            <p className={styles.eyebrow}>Como trabalhamos</p>
            <h2 id="how-title">Da primeira conversa ao produto em uso.</h2>
          </div>
          <p className={styles.subtitle}>
            A tecnologia entra depois de entender o desafio. Assim, cada etapa
            responde a uma necessidade real — e você sabe o que vem a seguir.
          </p>
        </header>

        <ol className={styles.process} aria-label="Etapas do processo de trabalho">
          {steps.map((step) => (
            <li className={styles.step} key={step.number}>
              <span className={styles.number}>{step.number}</span>
              <div className={styles.stepHeading}>
                <span className={styles.icon}><Icon name={step.icon} size={20} /></span>
                <h3>{step.title}</h3>
              </div>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>

        <aside className={styles.note} aria-label="Nosso compromisso">
          <strong>Sem proposta no escuro.</strong>
          <p>Você entende o caminho e o investimento antes de decidir avançar.</p>
        </aside>
      </div>
    </section>
  )
}

export default HowItWorks
