import styles from './FAQ.module.css'

const questions = [
  ['Como funciona o acesso remoto?', 'Se o atendimento remoto for indicado, você recebe pelo WhatsApp a orientação para iniciar uma sessão. O acesso só começa com a sua autorização, você acompanha a tela e pode encerrar quando quiser.'],
  ['Alguém pode acessar meu computador depois?', 'Não pela sessão encerrada. Um novo atendimento exige uma nova autorização sua. Durante o serviço, abra somente o que for necessário e nunca compartilhe senhas pessoais.'],
  ['Quanto custa o atendimento?', 'Os serviços avulsos começam em R$ 49 e o suporte recorrente para empresas começa em R$ 299 por mês. O valor final depende do problema e é confirmado para sua aprovação antes do trabalho começar.'],
  ['Qual é o horário de atendimento?', 'O atendimento funciona todos os dias, das 09h à meia-noite. A resposta inicial acontece em até 1 hora dentro desse período; o início do serviço depende da disponibilidade e pode ser agendado.'],
  ['Todo problema pode ser resolvido pela internet?', 'Não. Tela quebrada, bateria defeituosa, superaquecimento, peças danificadas e um computador que nem liga geralmente precisam de avaliação presencial. Se houver esse indício, você será avisado antes de contratar.'],
  ['Preciso instalar algum programa?', 'Talvez. Se for necessário, você recebe a orientação durante a conversa no WhatsApp e decide se quer continuar. Não instale ferramentas enviadas por desconhecidos.'],
  ['E se eu não souber qual serviço escolher?', 'Escolha apenas “Diagnóstico remoto” ou fale direto pelo WhatsApp. Você pode descrever o que vê na tela, quando começou e o que já tentou; não precisa conhecer termos técnicos.'],
]

function FAQ() {
  return <section id="duvidas" className={`${styles.section} reveal`} aria-labelledby="faq-title"><div className={styles.container}><header className={styles.heading}><p className={styles.eyebrow}>Dúvidas frequentes</p><h2 id="faq-title">Segurança e clareza antes de começar.</h2><p>Entenda o acesso, os limites do atendimento e a cobrança antes de permitir qualquer alteração no computador.</p></header><div className={styles.list}>{questions.map(([question, answer]) => <details className={styles.item} key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>
}

export default FAQ
