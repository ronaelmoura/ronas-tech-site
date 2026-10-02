import styles from './WhyRonasTech.module.css'
import Icon from '../Icon/Icon'

const reasons = [
  { number:'01', label:'CONVERSA DIRETA', title:'Você fala com quem desenvolve', description:'A necessidade chega diretamente a quem vai pensar, construir e acompanhar a solução.', tone:'blue', icon:'message' },
  { number:'02', label:'ANTES DO CÓDIGO', title:'Começamos pelo problema', description:'Primeiro entendemos o que está travando sua rotina. Depois decidimos se o caminho é site, sistema, automação, IA ou outra solução.', tone:'violet', icon:'search' },
  { number:'03', label:'SEM ENROLAÇÃO', title:'Você sabe o que está sendo feito', description:'Explicamos a solução em linguagem clara, alinhamos o que entra no projeto e definimos o próximo passo antes de desenvolver.', tone:'cyan', icon:'eye' },
  { number:'04', label:'FEITO PARA A ROTINA', title:'A tecnologia se adapta ao seu processo', description:'Quando uma ferramenta pronta não resolve, construímos o que falta sem transformar a operação em algo mais complicado.', tone:'pink', icon:'workflow' },
]

function WhyRonasTech() {
  return (
    <section id="por-que-ronas" className={styles.section} aria-labelledby="why-title">
      <div className={styles.container}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Por que Ronas Tech</p>
          <h2 id="why-title">Não é sobre usar mais tecnologia. É sobre fazer a tecnologia trabalhar para o seu negócio.</h2>
          <p className={styles.lead}>A diferença está no processo: entender antes de construir, explicar antes de desenvolver e entregar algo que possa ser usado na rotina.</p>

          <div className={styles.signature}>
            <span className={styles.signatureDot} />
            <div><strong>Problema → solução → tecnologia</strong><span>nessa ordem.</span></div>
          </div>

          <div className={styles.principles}>
            <span><b>01</b> Entender</span>
            <span><b>02</b> Simplificar</span>
            <span><b>03</b> Construir</span>
          </div>
        </div>

        <div className={styles.grid}>
          {reasons.map((reason) => (
            <article className={`${styles.card} ${styles[reason.tone]}`} key={reason.number}>
              <div className={styles.cardTop}><span className={styles.number}>{reason.number}</span><span className={styles.label}>{reason.label}</span></div>
              <div className={styles.icon}><Icon name={reason.icon} size={23} /></div>
              <h3>{reason.title}</h3>
              <p>{reason.description}</p>
              <div className={styles.cardLine} />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyRonasTech
