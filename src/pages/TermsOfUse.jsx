import { useEffect } from 'react'
import { siteConfig } from '../config/siteConfig'
import styles from './TermsOfUse.module.css'

const LAST_UPDATED = '21 de julho de 2026'

function TermsOfUse() {
  useEffect(() => {
    document.title = `Termos de Uso | ${siteConfig.companyName}`
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        'content',
        'Consulte as regras e condições para utilização do site e dos serviços apresentados pela Ronas Tech.',
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
          <p>Condições de utilização</p>
          <h1>Termos de Uso</h1>
          <p>
            Estes termos apresentam as condições aplicáveis à utilização do site
            e das informações disponibilizadas pela Ronas Tech.
          </p>
        </header>

        <div className={styles.content}>
          <section>
            <h2>1. Aceitação dos termos</h2>
            <p>Ao utilizar este site, o visitante declara que leu e concorda com estes termos.</p>
          </section>

          <section>
            <h2>2. Objetivo do site</h2>
            <p>
              O site apresenta serviços, projetos, tecnologias, informações
              institucionais, formas de contato e solicitação de orçamento.
            </p>
          </section>

          <section>
            <h2>3. Uso adequado</h2>
            <p>O usuário não pode:</p>
            <ul>
              <li>tentar acessar áreas restritas ou prejudicar o funcionamento do site;</li>
              <li>utilizar o conteúdo para atividades ilegais;</li>
              <li>copiar ou distribuir materiais sem autorização;</li>
              <li>enviar informações falsas pelo formulário.</li>
            </ul>
          </section>

          <section>
            <h2>4. Orçamentos e contratação</h2>
            <p>
              O envio do formulário não representa contratação automática.
              Preços e prazos são definidos após análise, e cada projeto pode
              possuir proposta e contrato específicos. Alterações fora do escopo
              podem gerar novos custos e prazos.
            </p>
          </section>

          <section>
            <h2>5. Propriedade intelectual</h2>
            <p>
              Textos, identidade visual, código, imagens, logotipos e demais
              elementos pertencem à Ronas Tech ou aos respectivos proprietários.
              Esta disposição não restringe as licenças próprias das tecnologias
              de código aberto utilizadas no projeto.
            </p>
          </section>

          <section>
            <h2>6. Projetos apresentados</h2>
            <p>
              Os projetos exibidos no portfólio possuem finalidade demonstrativa
              e podem estar em desenvolvimento ou passar por modificações.
            </p>
          </section>

          <section>
            <h2>7. Links externos</h2>
            <p>
              A Ronas Tech não controla o conteúdo, as práticas ou a disponibilidade
              dos sites e serviços externos acessados por meio de links.
            </p>
          </section>

          <section>
            <h2>8. Limitação de responsabilidade</h2>
            <p>
              São adotados esforços para manter o conteúdo correto, mas o site
              pode passar por atualizações ou indisponibilidades. A Ronas Tech não
              garante o funcionamento permanente de serviços externos. Decisões
              comerciais não devem ser tomadas somente com base neste conteúdo.
            </p>
          </section>

          <section>
            <h2>9. Privacidade</h2>
            <p>
              O tratamento das informações está descrito na{' '}
              <a href="/politica-de-privacidade">Política de Privacidade</a>.
            </p>
          </section>

          <section>
            <h2>10. Alterações nos termos</h2>
            <p>Estes termos podem ser atualizados para acompanhar mudanças no site ou nos serviços.</p>
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

export default TermsOfUse
