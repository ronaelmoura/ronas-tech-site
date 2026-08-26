import styles from './Caretaker.module.css'

function Caretaker() {
  return <section className={`${styles.section} reveal`} aria-labelledby="caretaker-title"><div className={styles.container}><div className={styles.avatar} aria-hidden="true">RM</div><div className={styles.content}><p className={styles.eyebrow}>Atendimento direto e responsável</p><h2 id="caretaker-title">Sou eu, Ronael, quem cuida do suporte e desenvolve cada solução — sem intermediários.</h2><p className={styles.description}>Como profissional Full Stack com experiência em suporte de TI, posso atuar desde o diagnóstico do computador até a criação e manutenção de sites, sistemas e automações.</p></div></div></section>
}
export default Caretaker
