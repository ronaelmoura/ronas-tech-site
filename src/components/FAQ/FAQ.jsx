import { useCallback, useState } from 'react'
import LeadCaptureModal from '../LeadCaptureModal/LeadCaptureModal'
import { trackConversion, withCampaign } from '../../utils/analytics'
import styles from './FAQ.module.css'

const questions = [
  ['Como funciona o acesso remoto?', 'Se o atendimento remoto for indicado, você recebe pelo WhatsApp a orientação para iniciar uma sessão. O acesso só começa com a sua autorização, você acompanha a tela e pode encerrar quando quiser.'],
  ['É seguro dar acesso ao meu computador?', 'Sim. Você vê a tela inteira durante o atendimento, aprova cada etapa e pode encerrar o acesso quando quiser.'],
  ['Quanto custa o atendimento?', 'A triagem inicial pelo WhatsApp é gratuita. Quando for necessário acessar o computador, o diagnóstico técnico começa em R$ 29; os demais serviços e o valor final são confirmados para sua aprovação antes do trabalho começar. O atendimento avulso simples começa em R$ 60, a hora técnica custa R$ 70 e a limpeza de vírus e programas indesejados começa em R$ 80. O plano mensal para empresas com 1 a 5 computadores custa R$ 250.'],
  ['Preciso instalar algum programa antes do atendimento?', 'Só quando for começar. Você acessa um link, autoriza por alguns minutos e acompanha tudo em tempo real.'],
  ['Quanto tempo demora um atendimento?', 'A maioria dos casos resolve entre 20 e 40 minutos, dependendo do problema.'],
  ['Como funciona o pagamento?', 'Só depois do atendimento, com o problema resolvido e você aprovando.'],
  ['E se não conseguir resolver o problema?', 'Você só paga pelo que for resolvido. Se eu identificar que não dá para resolver remotamente, explico o motivo antes de cobrar.'],
  ['Funciona também para notebook e Mac?', 'Notebook sim, sempre. Para Mac, chame no WhatsApp antes para confirmar se o seu caso está no escopo.'],
  ['Qual é o horário de atendimento?', 'O atendimento funciona todos os dias, das 09h à meia-noite. A resposta inicial acontece em até 1 hora dentro desse período; o início do serviço depende da disponibilidade e pode ser agendado.'],
  ['Alguém pode acessar meu computador depois?', 'Não pela sessão encerrada. Um novo atendimento exige uma nova autorização sua. Durante o serviço, abra somente o que for necessário e nunca compartilhe senhas pessoais.'],
  ['Todo problema pode ser resolvido pela internet?', 'Não. Tela quebrada, bateria defeituosa, superaquecimento, peças danificadas e um computador que nem liga geralmente precisam de avaliação presencial. Se houver esse indício, você será avisado antes de contratar.'],
  ['E se eu não souber qual serviço escolher?', 'Escolha apenas “Diagnóstico remoto” ou fale direto pelo WhatsApp. Você pode descrever o que vê na tela, quando começou e o que já tentou; não precisa conhecer termos técnicos.'],
]

function doubtMessage(name) {
  return withCampaign(`Olá, Ronael! Me chamo ${name}. Vi o site da Ronas Tech e ficou uma dúvida que não estava na lista. Pode me explicar?`)
}

function FAQ() {
  const [showAll, setShowAll] = useState(false)
  const [openQuestion, setOpenQuestion] = useState(null)
  // O CTA passa pelo modal de captação antes de abrir o WhatsApp: é ele
  // quem dispara a conversão "Contato" e alimenta as Conversões
  // Otimizadas do Google Ads com nome e telefone.
  const [leadModalOpen, setLeadModalOpen] = useState(false)
  const closeLeadModal = useCallback(() => setLeadModalOpen(false), [])
  const visibleQuestions = showAll ? questions : questions.slice(0, 5)

  function openDoubtChat() {
    trackConversion('faq_free_doubt', { location: 'faq_cta' })
    setLeadModalOpen(true)
  }

  return <section id="duvidas" className={`${styles.section} reveal`} aria-labelledby="faq-title"><div className={styles.container}><header className={styles.heading}><p className={styles.eyebrow}>Dúvidas frequentes</p><h2 id="faq-title">Ainda com dúvida? Eu te explico de graça.</h2><p>Entenda o acesso, os limites do atendimento e a cobrança antes de permitir qualquer alteração no computador. Se a sua pergunta não estiver aqui, é só chamar no WhatsApp — explicar não custa nada.</p></header><div className={styles.list}>{visibleQuestions.map(([question, answer]) => {
    const open = openQuestion === question
    const panelId = `faq-panel-${question.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase()}`
    return <div className={`${styles.item} ${open ? styles.itemOpen : ''}`} key={question}><h3 className={styles.itemTitle}><button type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenQuestion((current) => current === question ? null : question)}>{question}<span aria-hidden="true">+</span></button></h3><div className={styles.panel} id={panelId} hidden={!open}><p>{answer}</p></div></div>
  })}<button className={styles.showMore} type="button" aria-expanded={showAll} onClick={() => setShowAll((current) => !current)}>{showAll ? 'Mostrar menos perguntas' : 'Ver todas as perguntas'}</button><div className={styles.doubtCta}><strong>Não achou sua dúvida aqui?</strong><span>Fale agora comigo pelo WhatsApp — sem custo, sem compromisso.</span><button className={styles.doubtButton} type="button" onClick={openDoubtChat}>Tirar dúvida grátis no WhatsApp <span aria-hidden="true">→</span></button></div></div><LeadCaptureModal open={leadModalOpen} onClose={closeLeadModal} trackingLocation="faq_duvida_gratis" buildMessage={doubtMessage} title="Tirar dúvida grátis" description="Deixe seu nome e telefone que eu já chamo você no WhatsApp e explico sem custo." /></div></section>
}

export default FAQ
