import { useEffect } from 'react'
import { siteConfig } from '../config/siteConfig'
import styles from './PrivacyPolicy.module.css'

const LAST_UPDATED = '21 de julho de 2026'

function PrivacyPolicy() {
  useEffect(() => {
    document.title = `Política de Privacidade | ${siteConfig.companyName}`
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        'content',
        'Conheça como a Ronas Tech coleta, utiliza e protege as informações dos visitantes e clientes.',
      )
  }, [])

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a className={styles.brand} href="/" aria-label={`${siteConfig.companyName} — página inicial`}>
          <span aria-hidden="true">RT</span>
          {siteConfig.companyName}
        </a>
        <a className={styles.backLink} href="/">← Voltar para o site</a>
      </header>

      <main id="conteudo-principal" className={styles.main} tabIndex="-1">
        <header className={styles.introduction}>
          <p>Privacidade e transparência</p>
          <h1>Política de Privacidade</h1>
          <p>
            A Ronas Tech respeita a privacidade dos visitantes e utiliza os dados
            somente para atendimento, comunicação e melhoria dos serviços.
          </p>
        </header>

        <div className={styles.content}>
          <section>
            <h2>1. Dados coletados</h2>
            <p>Durante o contato com a Ronas Tech, podem ser coletados:</p>
            <ul>
              <li>nome;</li><li>e-mail;</li><li>número de WhatsApp;</li>
              <li>tipo de projeto;</li><li>mensagem enviada pelo formulário;</li>
              <li>dados técnicos de navegação, quando o Google Analytics estiver configurado.</li>
            </ul>
          </section>

          <section>
            <h2>2. Como os dados são utilizados</h2>
            <p>As informações podem ser utilizadas para:</p>
            <ul>
              <li>responder solicitações e preparar orçamentos;</li>
              <li>manter contato com o cliente;</li>
              <li>melhorar o site e analisar o desempenho das páginas;</li>
              <li>identificar os serviços mais procurados.</li>
            </ul>
          </section>

          <section>
            <h2>3. Compartilhamento de dados</h2>
            <p>
              A Ronas Tech não vende dados pessoais nem os compartilha com
              terceiros para publicidade. Serviços técnicos, como hospedagem e
              análise de acesso, podem processar informações necessárias ao
              funcionamento do site. O WhatsApp possui termos e política de
              privacidade próprios.
            </p>
          </section>

          <section>
            <h2>4. Google Analytics</h2>
            <p>
              O site pode utilizar o Google Analytics para obter estatísticas de
              acesso. Nome, e-mail, telefone, mensagem e outros dados pessoais
              preenchidos no formulário não são enviados ao Analytics.
            </p>
          </section>

          <section>
            <h2>5. Formulário e WhatsApp</h2>
            <p>
              O formulário monta uma mensagem e direciona o usuário ao WhatsApp.
              Nesta versão, os dados não são armazenados em banco de dados pelo
              site. Após a abertura da plataforma, a conversa segue as regras do
              WhatsApp, e o usuário escolhe se deseja enviar a mensagem.
            </p>
          </section>

          <section>
            <h2>6. Cookies e tecnologias semelhantes</h2>
            <p>
              Ferramentas de análise podem utilizar cookies ou tecnologias
              semelhantes para compreender a utilização do site. Esses recursos
              somente serão utilizados quando a respectiva ferramenta estiver configurada.
            </p>
          </section>

          <section>
            <h2>7. Segurança</h2>
            <p>
              São adotadas medidas razoáveis para proteger as informações.
              Entretanto, nenhum sistema ou transmissão online é totalmente livre de riscos.
            </p>
          </section>

          <section>
            <h2>8. Direitos do usuário</h2>
            <p>
              O usuário pode solicitar informações sobre seus dados, correção,
              exclusão ou esclarecimentos sobre o uso das informações. Para isso,
              entre em contato pelo e-mail{' '}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
            </p>
          </section>

          <section>
            <h2>9. Links externos</h2>
            <p>
              O site possui links para plataformas externas, como WhatsApp,
              GitHub, LinkedIn, YouTube e portfólio. Cada plataforma possui sua
              própria política de privacidade e é responsável por suas práticas.
            </p>
          </section>

          <section>
            <h2>10. Alterações nesta política</h2>
            <p>
              Esta política pode ser atualizada para acompanhar mudanças no site,
              nos serviços ou na legislação aplicável.
            </p>
          </section>

          <section>
            <h2>11. Contato</h2>
            <address>
              <strong>{siteConfig.companyName}</strong>
              <span>Responsável: Ronael Moura</span>
              <a href={`mailto:${siteConfig.email}`}>E-mail: {siteConfig.email}</a>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp: {siteConfig.whatsappDisplay}
              </a>
              <span>{siteConfig.location}</span>
              <span>Atendimento online para todo o Brasil</span>
            </address>
          </section>
        </div>

        <footer className={styles.pageFooter}>
          <p>Última atualização: {LAST_UPDATED}</p>
          <a href="/">Voltar para a página inicial</a>
        </footer>
      </main>
    </div>
  )
}

export default PrivacyPolicy
