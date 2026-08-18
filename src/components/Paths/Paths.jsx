import styles from './Paths.module.css'

const paths = [
  { title: 'Quero ser encontrado', text: 'Para mostrar serviços, produtos e contato com clareza.', result: 'Uma presença simples para o cliente entender e pedir.', links: [['Presença Essencial', '/presenca-essencial'], ['Negócio Encontrável', '/negocio-encontravel']] },
  { title: 'Quero atender melhor', text: 'Para organizar respostas, pedidos e orçamentos que chegam pelo WhatsApp.', result: 'Conversas com mais contexto e menos perda de informação.', links: [['Kit WhatsApp Organizado', '/kit-whatsapp-organizado'], ['Painel de Clientes', '/painel-clientes-orcamentos']] },
  { title: 'Quero organizar minha rotina', text: 'Para quem controla agenda, pedidos ou clientes manualmente.', result: 'Uma rotina acompanhável, começando pelo ponto mais importante.', links: [['Agenda Digital', '/agenda-digital'], ['Solução sob medida', '/sistemas-web']] },
]

function Paths() { return <section id="caminhos" className={`${styles.section} reveal`} aria-labelledby="paths-title"><div className={styles.container}><header><p className={styles.eyebrow}>Escolha pelo problema</p><h2 id="paths-title">Comece pela necessidade, não pelo nome da ferramenta.</h2></header><div className={styles.grid}>{paths.map((path) => <article className={styles.card} key={path.title}><h3>{path.title}</h3><p>{path.text}</p><strong>{path.result}</strong><div>{path.links.map(([label, href]) => <a href={href} key={href}>Ver essa solução <span>{label}</span><b aria-hidden="true">↗</b></a>)}</div></article>)}</div></div></section> }
export default Paths
