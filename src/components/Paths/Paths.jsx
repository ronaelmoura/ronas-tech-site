import styles from './Paths.module.css'

const supportServices = [
  { title: 'Otimização de PC e notebook', text: 'Diagnóstico de lentidão, revisão da inicialização, limpeza, atualizações e ajustes do Windows.', result: 'Um computador mais leve, seguro e responsivo para sua rotina.' },
  { title: 'Suporte técnico remoto', text: 'Instalação de programas, configuração de navegador, e-mail, impressora, backup e orientação de uso.', result: 'Problemas resolvidos sem sair de casa e com acompanhamento durante o acesso.' },
]

const developmentServices = [
  { title: 'Sites e landing pages', text: 'Páginas profissionais, responsivas e preparadas para apresentar sua oferta e gerar contatos.', result: 'Uma presença digital clara e conectada ao WhatsApp.' },
  { title: 'Sistemas web sob medida', text: 'Painéis, cadastros, pedidos, clientes, orçamentos e ferramentas acessíveis pelo navegador.', result: 'Um sistema proporcional à rotina real do seu negócio.' },
  { title: 'APIs e integrações', text: 'Conexão entre sistemas, serviços externos, bancos de dados e aplicações já utilizadas.', result: 'Informações circulando com menos trabalho manual e retrabalho.' },
  { title: 'Automações e manutenção', text: 'Automação de tarefas, correção de bugs, melhorias de desempenho e evolução de projetos existentes.', result: 'Processos mais rápidos e soluções digitais mantidas em funcionamento.' },
]

function ServiceCard({ service, cta }) { return <article className={styles.card}><h3>{service.title}</h3><p>{service.text}</p><strong>{service.result}</strong><a href="#pedido">{cta}<span>WhatsApp</span></a></article> }

function Paths() { return <section id="servicos" className={`${styles.section} reveal`} aria-labelledby="paths-title"><div className={styles.container}><header><p className={styles.eyebrow}>Duas áreas de atendimento</p><h2 id="paths-title">Suporte para sua máquina. Desenvolvimento para suas ideias.</h2></header><div className={styles.group}><h3 className={styles.groupTitle}>Suporte e otimização remota</h3><p className={styles.groupIntro}>Para pessoas e empresas que precisam recuperar desempenho, configurar ferramentas ou resolver problemas do computador.</p><div className={`${styles.grid} ${styles.supportGrid}`}>{supportServices.map((service) => <ServiceCard service={service} cta="Quero suporte remoto" key={service.title} />)}</div></div><div id="desenvolvimento" className={styles.group}><h3 className={styles.groupTitle}>Desenvolvimento Full Stack</h3><p className={styles.groupIntro}>Para negócios que precisam criar, integrar ou melhorar soluções digitais.</p><div className={styles.grid}>{developmentServices.map((service) => <ServiceCard service={service} cta="Quero uma solução digital" key={service.title} />)}</div></div></div></section> }
export default Paths
