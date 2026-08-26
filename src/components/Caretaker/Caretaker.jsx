import styles from './Caretaker.module.css'

function Caretaker() {
  return <section className={`${styles.section} reveal`} aria-labelledby="caretaker-title"><div className={styles.container}><div className={styles.avatar} aria-hidden="true">RM</div><div className={styles.content}><p className={styles.eyebrow}>Atendimento direto e responsável</p><h2 id="caretaker-title">Sou eu, Ronael, quem analisa e otimiza seu computador — sem intermediários.</h2><p className={styles.description}>Antes de alterar qualquer coisa, verifico a causa da lentidão. Durante o acesso remoto, você acompanha a tela e pode encerrar a conexão quando quiser.</p></div></div></section>
}
export default Caretaker
