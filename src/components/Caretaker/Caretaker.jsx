import styles from './Caretaker.module.css'

function Caretaker() {
  return <section className={`${styles.section} reveal`} aria-labelledby="caretaker-title"><div className={styles.container}><div className={styles.avatar} aria-hidden="true">RM</div><div className={styles.content}><p className={styles.eyebrow}>Quem vai cuidar do seu projeto</p><h2 id="caretaker-title">Sou eu, Ronael, quem atende, constrói e acompanha cada projeto — sem equipe grande, sem intermediário.</h2><p className={styles.description}>Testo tudo antes de entregar: o mesmo cuidado que usei pra construir meus próprios sistemas (um deles com mais de 120 testes automatizados) eu aplico no seu.</p></div></div></section>
}
export default Caretaker
