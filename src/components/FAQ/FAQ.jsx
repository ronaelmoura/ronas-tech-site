import styles from './FAQ.module.css'
import Icon from '../Icon/Icon'

const questions = [
  ['Ainda não sei qual solução preciso. Por onde começo?', 'Conte o que você quer melhorar, como trabalha hoje e onde encontra dificuldades. A primeira conversa ajuda a entender se o caminho é um site, um sistema, uma automação ou uma combinação dessas soluções.'],
  ['Quanto custa e quanto tempo leva um projeto?', 'O investimento e o prazo dependem do escopo, das integrações e do conteúdo necessário. Esses pontos são definidos na proposta, antes do início do desenvolvimento.'],
  ['Já tenho um site ou sistema. Você pode melhorar?', 'Sim. Primeiro avaliamos a estrutura existente, os acessos disponíveis e o que precisa mudar. A partir disso, definimos quais melhorias fazem sentido e o que pode ser aproveitado.'],
  ['O atendimento pode ser feito a distância?', 'Sim. A Ronas Tech fica em Tianguá, no Ceará, e o contato pode ser feito remotamente. Você conversa diretamente com Ronael Moura sobre o planejamento, o andamento e a entrega.'],
  ['E a manutenção depois da entrega?', 'Hospedagem, manutenção, suporte e novas funcionalidades precisam ter responsabilidades e condições definidas na proposta. Assim, você sabe o que está incluído e como combinar os próximos passos.'],
]

export default function FAQ() {
  return <section id="duvidas" className={styles.section} aria-labelledby="faq-title"><div className={styles.container}>
    <header className={styles.heading}><p>Antes de começar</p><h2 id="faq-title">Boas perguntas.<br />Respostas claras.</h2><span>Um projeto começa melhor quando você sabe o que esperar.</span><a href="#contato">Falar sobre minha ideia <Icon name="arrowUpRight" size={18} /></a></header>
    <div className={styles.questions}>{questions.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true"><Icon name="plus" size={20} /></span></summary><p>{answer}</p></details>)}</div>
  </div></section>
}
