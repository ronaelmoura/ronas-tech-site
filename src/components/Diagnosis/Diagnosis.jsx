import { useState } from 'react'
import { siteConfig } from '../../config/siteConfig'
import { trackWhatsAppClick } from '../../utils/analytics'
import styles from './Diagnosis.module.css'

const scenarios = [
  {
    id: 'presenca',
    label: 'Poucas pessoas encontram meu negócio',
    problem:
      'Seu negócio pode ser excelente, mas uma presença confusa ou difícil de encontrar reduz as oportunidades de contato.',
    path: 'Presença digital estratégica',
    result: 'Um site claro e rápido, preparado para transformar visitas em contatos.',
    message:
      'Olá, Ronael! Fiz o Diagnóstico Ronas Tech. Poucas pessoas encontram meu negócio e quero conversar sobre uma presença digital estratégica.',
  },
  {
    id: 'automacao',
    label: 'Minha equipe perde tempo com tarefas repetitivas',
    problem:
      'Atividades manuais que se repetem todos os dias consomem tempo, aumentam o retrabalho e afastam a equipe do atendimento ao cliente.',
    path: 'Automação por etapas',
    result: 'Menos retrabalho e mais tempo disponível para cuidar dos clientes.',
    message:
      'Olá, Ronael! Fiz o Diagnóstico Ronas Tech. Minha equipe perde tempo com tarefas repetitivas e quero avaliar uma automação por etapas.',
  },
  {
    id: 'controle',
    label: 'Não consigo acompanhar o que está acontecendo',
    problem:
      'Quando informações ficam espalhadas entre planilhas, mensagens e anotações, acompanhar a operação e decidir fica mais difícil.',
    path: 'Sistema web sob medida',
    result: 'Uma operação centralizada, organizada e fácil de acompanhar.',
    message:
      'Olá, Ronael! Fiz o Diagnóstico Ronas Tech. Não consigo acompanhar bem a operação e quero conversar sobre um sistema web sob medida.',
  },
]

function Diagnosis() {
  const [activeId, setActiveId] = useState(scenarios[0].id)
  const activeScenario = scenarios.find(({ id }) => id === activeId)
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(activeScenario.message)}`

  return (
    <section
      id="diagnostico"
      className={styles.section}
      aria-labelledby="diagnosis-title"
    >
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.container}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>Diagnóstico Ronas Tech</p>
          <h2 id="diagnosis-title">
            Antes de falar em tecnologia, vamos entender o que está travando
            seu negócio.
          </h2>
          <p>
            Escolha a situação mais próxima da sua realidade e veja um caminho
            inicial recomendado para resolver o problema.
          </p>
        </header>

        <div className={styles.diagnostic}>
          <div
            className={styles.options}
            role="tablist"
            aria-label="Situações do negócio"
          >
            {scenarios.map((scenario, index) => (
              <button
                id={`diagnosis-tab-${scenario.id}`}
                className={`${styles.option} ${activeId === scenario.id ? styles.active : ''}`}
                type="button"
                role="tab"
                aria-selected={activeId === scenario.id}
                aria-controls="diagnosis-panel"
                onClick={() => setActiveId(scenario.id)}
                key={scenario.id}
              >
                <span aria-hidden="true">0{index + 1}</span>
                {scenario.label}
              </button>
            ))}
          </div>

          <div
            id="diagnosis-panel"
            className={styles.panel}
            role="tabpanel"
            aria-labelledby={`diagnosis-tab-${activeScenario.id}`}
            tabIndex="0"
          >
            <div className={styles.panelIntro}>
              <span className={styles.signal}>Leitura inicial</span>
              <h3>{activeScenario.label}</h3>
              <p>{activeScenario.problem}</p>
            </div>

            <dl className={styles.recommendation}>
              <div>
                <dt>Caminho indicado</dt>
                <dd>{activeScenario.path}</dd>
              </div>
              <div>
                <dt>Resultado esperado</dt>
                <dd>{activeScenario.result}</dd>
              </div>
            </dl>

            <a
              className={styles.whatsappButton}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick(`diagnostico_${activeScenario.id}`)}
            >
              Conversar sobre este diagnóstico
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Diagnosis
