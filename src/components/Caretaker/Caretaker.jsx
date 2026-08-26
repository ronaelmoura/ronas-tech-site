import styles from './Caretaker.module.css'

function Caretaker() {
  return <section className={`${styles.section} reveal`} aria-labelledby="caretaker-title"><div className={styles.container}><div className={styles.avatar} aria-hidden="true">RM</div><div className={styles.content}><p className={styles.eyebrow}>Quem realiza o atendimento</p><h2 id="caretaker-title">Sou eu, Ronael, quem avalia e atende seu computador — sem intermediários.</h2><p className={styles.description}>Tenho experiência em suporte de TI e formação Full Stack pelo SENAI. Antes de alterar qualquer configuração, explico o que será feito e confirmo sua autorização.</p></div></div></section>
}
export default Caretaker
