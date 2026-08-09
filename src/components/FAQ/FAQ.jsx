import styles from './FAQ.module.css'

const questions = [
  {
    question: 'Quanto custa criar um site?',
    answer:
      'Projetos de página única começam em R$ 790 e sites profissionais começam em R$ 1.490. O valor final depende do conteúdo, das funções e do prazo definidos na proposta.',
  },
  {
    question: 'Quanto tempo demora para ficar pronto?',
    answer:
      'Um site de escopo simples costuma levar de 7 a 15 dias úteis após o envio das informações necessárias. Projetos maiores recebem um cronograma próprio.',
  },
  {
    question: 'O site funciona bem no celular?',
    answer:
      'Sim. Todos os sites são preparados para funcionar em celulares, tablets e computadores, com navegação simples e contato rápido pelo WhatsApp.',
  },
  {
    question: 'Preciso pagar mensalidade?',
    answer:
      'A criação do site é um projeto com valor definido. Domínio e hospedagem podem ter cobranças anuais de fornecedores externos. Manutenção contínua é opcional e combinada separadamente.',
  },
  {
    question: 'A Ronas Tech atende fora de Tianguá?',
    answer:
      'Sim. O atendimento é online para empresas de todo o Brasil. As etapas do projeto e as validações podem ser feitas por WhatsApp e videochamada.',
  },
  {
    question: 'E se eu não souber qual solução preciso?',
    answer:
      'Não tem problema. Você pode explicar apenas a dificuldade atual. Na conversa inicial, avaliamos juntos se um site, uma automação ou outro tipo de solução faz sentido.',
  },
]

function FAQ() {
  return (
    <section id="duvidas" className={styles.section} aria-labelledby="faq-title">
      <div className={styles.container}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>Dúvidas frequentes</p>
          <h2 id="faq-title">Respostas claras antes de começar</h2>
          <p>
            Saiba como funcionam os valores, prazos e etapas iniciais de um
            projeto com a Ronas Tech.
          </p>
        </header>

        <div className={styles.list}>
          {questions.map(({ question, answer }) => (
            <details className={styles.item} key={question}>
              <summary>
                {question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
