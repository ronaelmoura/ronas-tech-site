import { useEffect, useState } from "react";
import { oficinaPains } from "../data/oficinaPains";
import { trackEvent } from "../utils/analytics";
import OficinaConsent from "../components/Oficina/OficinaConsent";
import { siteConfig } from "../config/siteConfig";
import { formatOficinaPrice, oficinaPlans } from "../data/oficinaPlans";
import styles from "./BoxMotorPage.module.css";

const whatsappMessage = "Olá! Quero conhecer a demonstração do Box Motor e conversar sobre a rotina da minha oficina.";
const wa = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.7A8.5 8.5 0 1 1 20.5 11.8Z" />
      <path d="M8.5 7.8c-.8.3-1 1.3-.7 2.2 1 3 3.1 5 6 5.7 1 .2 1.9-.3 2.1-1.1l-2.2-1.4-.9 1c-1.5-.6-2.8-1.8-3.4-3.3l.9-.9-1.1-2.2Z" />
    </svg>
  );
}

export function OficinaHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.nav}>
        <a className={styles.brand} href="/boxmotor" aria-label="Box Motor, página inicial">
          <img src="/images/boxmotor-logo.png" width="2172" height="724" alt="Box Motor" />
        </a>
        <nav aria-label="Navegação Box Motor">
          <a href="/boxmotor#produto">Produto</a><a href="/boxmotor#rotina">Rotina</a><a href="/boxmotor#estagio">Estágio</a><a href="/boxmotor#planos">Planos</a><a href="/boxmotor#duvidas">Dúvidas</a>
        </nav>
        <a className={styles.navContact} data-oficina-cta="header" href={wa} target="_blank" rel="noreferrer">
          <WhatsAppIcon /><span>Solicitar demonstração</span>
        </a>
      </div>
    </header>
  );
}

export function OficinaFooter() {
  return (
    <footer className={styles.footer}>
      <div><img src="/images/boxmotor-logo.png" width="2172" height="724" alt="" /><span>Um produto Ronas Tech</span></div>
      <p>© {new Date().getFullYear()} Box Motor · Tianguá, CE</p>
      <nav aria-label="Links institucionais"><a href="/">Ronas Tech</a><a href="/politica-de-privacidade">Privacidade</a><a href="/termos-de-uso">Termos</a></nav>
    </footer>
  );
}

const routine = [
  ["01", "Cliente", "Contato e identificação reunidos."], ["02", "Veículo", "Placa, modelo e histórico associados."],
  ["03", "Ordem de serviço", "Demanda, etapa e previsão registradas."], ["04", "Orçamento", "Itens, desconto e total calculados."],
  ["05", "Decisão", "Aprovação ou recusa por link temporário."], ["06", "Execução", "Acompanhamento do serviço autorizado."],
  ["07", "Recebimento", "Pagamentos parciais registrados."], ["08", "Entrega", "Conclusão registrada no histórico."],
];

const implemented = [
  "Login e criação da oficina", "Cadastro de clientes e veículos", "Criação e acompanhamento de ordens de serviço",
  "Orçamentos com itens, desconto e total", "Aprovação ou recusa por link temporário e de uso único",
  "Pagamentos parciais, com rejeição de referência duplicada", "Rascunhos temporários na mesma aba para cadastros e orçamentos",
];
const planned = [
  "Emissão fiscal e PDF nativo", "Notificações automáticas por WhatsApp", "Agenda de serviços", "Conciliação e estornos",
  "Operação offline e migração automática", "Produção homologada",
];

export default function RonasOficinaPage() {
  const [painId, setPainId] = useState("aprovacao");
  const [profile, setProfile] = useState("Trabalho sozinho");
  const [testAvailable, setTestAvailable] = useState(false);
  const pain = oficinaPains.find((item) => item.id === painId);
  const personalizedWhatsApp = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    `Olá, Ronas Tech! Quero solicitar uma demonstração do Box Motor.\nMinha rotina: ${profile}.\nMinha principal dificuldade: ${pain.label}.`,
  )}`;

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/oficina/config", { signal: controller.signal }).then((res) => (res.ok ? res.json() : null)).then((data) => setTestAvailable(data?.mode === "test")).catch(() => {});
    return () => controller.abort();
  }, []);

  function measureClick(event) {
    const link = event.target.closest("a[data-oficina-cta]");
    if (link) trackEvent("oficina_contact_intent", { placement: link.dataset.oficinaCta });
  }

  return (
    <div className={styles.page} onClick={measureClick}>
      <a className="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a>
      <OficinaHeader />
      <main id="conteudo-principal">
        <section className={styles.hero} aria-labelledby="boxmotor-title">
          <div className={styles.heroCopy}>
            <p className={styles.signature}>UM PRODUTO RONAS TECH · EM VALIDAÇÃO</p>
            <h1 id="boxmotor-title">Carro no elevador.<br />Orçamento no WhatsApp.<br /><em>Tudo na sua cabeça?</em></h1>
            <p className={styles.heroLead}>O Box Motor organiza cliente, veículo, ordem de serviço, orçamento e recebimento em um fluxo único. O sistema está em validação e já possui os principais fluxos testados em ambiente local.</p>
            <div className={styles.actions}>
              <a className={styles.primaryButton} data-oficina-cta="hero" href={wa} target="_blank" rel="noreferrer"><WhatsAppIcon /> Solicitar demonstração <span aria-hidden="true">→</span></a>
              <a className={styles.textLink} href="#produto">Ver prévia do sistema ↓</a>
            </div>
            <dl className={styles.heroFacts}>
              <div><dt>ESTÁGIO</dt><dd>Validação do produto</dd></div><div><dt>ACESSO</dt><dd>Demonstração sob solicitação</dd></div><div><dt>DADOS</dt><dd>Exemplos fictícios</dd></div>
            </dl>
          </div>
          <figure className={styles.heroPreview}>
            <div className={styles.previewLabel}><span>PRÉVIA 01</span> Painel da oficina</div>
            <picture><source media="(max-width: 620px)" srcSet="/images/boxmotor-dashboard-mobile.png" /><img src="/images/boxmotor-dashboard-desktop.png" width="1258" height="1247" alt="Painel demonstrativo do Box Motor com indicadores, ordens de serviço e alertas da oficina" fetchPriority="high" /></picture>
            <figcaption>Demonstração do sistema local · dados fictícios · captura de 4 de outubro de 2026</figcaption>
          </figure>
        </section>

        <section id="produto" className={styles.productPreview} aria-labelledby="preview-title">
          <div className={styles.sectionIntro}><p className={styles.kicker}>01 / PRÉVIA REAL DO SISTEMA</p><h2 id="preview-title">A rotina visível antes de virar urgência.</h2><p>Esta é uma captura atual da demonstração local, em modo somente leitura. Os nomes, placas e valores exibidos são fictícios.</p></div>
          <figure className={styles.screenFigure}><img src="/images/boxmotor-dashboard-desktop.png" width="1258" height="1247" alt="Visão geral do Box Motor com menu de operação, indicadores e lista de veículos em atendimento" loading="lazy" /><figcaption><b>VISÃO GERAL / DESKTOP</b><span>Captura atual · demonstração local · dados fictícios</span></figcaption></figure>
        </section>

        <section id="rotina" className={styles.routine} aria-labelledby="routine-title">
          <div className={styles.sectionIntro}><p className={styles.kicker}>02 / DA RECEPÇÃO À ENTREGA</p><h2 id="routine-title">Um registro acompanha o carro até a chave voltar ao cliente.</h2></div>
          <ol className={styles.routineList}>{routine.map(([number, title, description]) => <li key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></li>)}</ol>
          <p className={styles.precisionNote}>O registro de pagamento controla informação financeira dentro da oficina; ele não processa pagamentos.</p>
        </section>

        <section id="situacoes" className={styles.situations} aria-labelledby="situations-title">
          <div className={styles.sectionIntro}><p className={styles.kicker}>03 / SITUAÇÕES DO DIA A DIA</p><h2 id="situations-title">Qual pergunta mais interrompe a sua oficina?</h2><p>Selecione uma situação para ver o registro que ajuda a responder com mais clareza.</p></div>
          <div className={styles.situationGrid}>
            <div className={styles.situationTabs} role="group" aria-label="Situações da rotina da oficina">
              {oficinaPains.map((item, index) => <button key={item.id} aria-pressed={painId === item.id} onClick={() => setPainId(item.id)}><span>0{index + 1}</span>{item.question}<b aria-hidden="true">→</b></button>)}
            </div>
            <article className={styles.situationDetail} aria-live="polite">
              <p className={styles.recordRef}>REGISTRO / {pain.id.toUpperCase()}</p><h3>{pain.question}</h3><p>{pain.scene}</p><strong>{pain.consequence}</strong>
              <dl>{pain.paper.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><p className={styles.scope}>{pain.proposal}</p>
            </article>
          </div>
        </section>

        <section id="estagio" className={styles.stage} aria-labelledby="stage-title">
          <div className={styles.sectionIntro}><p className={styles.kicker}>04 / ESTÁGIO DO PRODUTO</p><h2 id="stage-title">O que já foi testado, o que estamos validando e o que vem depois.</h2><p>A página descreve o estado local do produto. Isso não significa disponibilidade pública nem produção homologada.</p></div>
          <div className={styles.stageGrid}>
            <article className={styles.implemented}><p><span>01</span> IMPLEMENTADO E TESTADO LOCALMENTE</p><ul>{implemented.map((item) => <li key={item}>{item}</li>)}</ul></article>
            <article><p><span>02</span> EM VALIDAÇÃO</p><ul><li>Aderência do fluxo à rotina real das oficinas</li><li>Limites e composição dos planos</li><li>Implantação, suporte e disponibilidade</li><li>Experiência da demonstração e do ambiente de teste</li></ul></article>
            <article><p><span>03</span> PLANEJADO</p><ul>{planned.map((item) => <li key={item}>{item}</li>)}</ul></article>
          </div>
          <div className={styles.stageNotes}><p><b>Rascunhos:</b> ficam temporariamente na mesma aba; não são backup na nuvem.</p><p><b>Aprovação por link:</b> registra a decisão em link temporário; não é assinatura digital certificada.</p></div>
        </section>

        <section id="planos" className={styles.plans} aria-labelledby="plans-title">
          <div className={styles.sectionIntro}><p className={styles.kicker}>05 / PLANOS E LIMITES</p><h2 id="plans-title">Três capacidades para o mesmo fluxo de gestão.</h2><p>Os módulos validados são compartilhados entre os planos. Nesta etapa, a diferença implementada está nos limites de uso abaixo.</p></div>
          <div className={styles.planGrid}>{oficinaPlans.map((plan, index) => (
            <article className={index === 1 ? styles.featuredPlan : ""} key={plan.id}>
              <p className={styles.planIndex}>0{index + 1} / {plan.name.toUpperCase()}</p><h3>{formatOficinaPrice(plan.monthlyPriceCents)} <span>/ mês</span></h3><p>{plan.audience}</p>
              <ul>{plan.limits.map((limit) => <li key={limit}>{limit}</li>)}</ul>
              {testAvailable ? <a className={styles.planButton} href={`/boxmotor/cadastro?plano=${plan.id}`} data-oficina-cta={`plan-${plan.id}`}>Criar conta de teste →</a> : <a className={styles.planButton} href={wa} target="_blank" rel="noreferrer" data-oficina-cta={`plan-${plan.id}`}>Solicitar demonstração →</a>}
            </article>
          ))}</div>
          <p className={styles.checkoutNote}>Valores mensais preservados da configuração atual. Checkout exclusivamente em teste quando disponível; cadastro não ativa assinatura nem gera cobrança.</p>
        </section>

        <section id="duvidas" className={styles.faq} aria-labelledby="faq-title">
          <div className={styles.sectionIntro}><p className={styles.kicker}>06 / PERGUNTAS FREQUENTES</p><h2 id="faq-title">Antes de avaliar o Box Motor.</h2></div>
          <div className={styles.faqList}>{[
            ["O Box Motor já está disponível publicamente?", "Ainda não anunciamos disponibilidade pública. O produto está em validação e os fluxos descritos foram testados em ambiente local. Solicite uma demonstração para conhecer o estágio atual."],
            ["A demonstração usa dados reais?", "Não. As capturas e a demonstração usam clientes, veículos, placas e valores fictícios, em modo somente leitura."],
            ["O link de orçamento é uma assinatura digital?", "Não. O link temporário registra aprovação ou recusa e bloqueia reutilização após a decisão. Ele não é uma assinatura digital certificada."],
            ["Os rascunhos ficam salvos na nuvem?", "Não. Eles ficam por tempo limitado na mesma aba do navegador para reduzir perda de preenchimento. Não substituem backup nem sincronizam entre dispositivos."],
            ["O Box Motor processa pagamentos?", "Não. O sistema registra recebimentos informados pela oficina e rejeita referências duplicadas. O processamento do pagamento ocorre fora desse registro."],
            ["Criar uma conta ou escolher um plano gera cobrança?", "Não. O cadastro e o checkout permanecem em ambiente de teste quando habilitados. Nenhuma assinatura é ativada somente pelo retorno do navegador."],
            ["Quais recursos ainda estão planejados?", "Emissão fiscal, PDF nativo, notificações automáticas por WhatsApp, agenda, conciliação e estornos, operação offline, migração automática e produção homologada."],
          ].map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
        </section>

        <section id="conversar" className={styles.contact} aria-labelledby="contact-title">
          <div><p className={styles.kicker}>07 / CONTATO COM A RONAS TECH</p><h2 id="contact-title">Mostre como a sua oficina trabalha hoje.</h2><p>A demonstração começa pela sua rotina. Conte o tamanho da operação e a situação que mais precisa de clareza.</p>
            <div className={styles.ronasSignature}><b>RONAS TECH</b><span>Tecnologia para negócios · {siteConfig.location}</span><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><a href={`tel:+${siteConfig.whatsappNumber}`}>{siteConfig.whatsappDisplay}</a></div>
          </div>
          <div className={styles.contactForm}>
            <label htmlFor="workshop-profile">Como você trabalha hoje?</label><select id="workshop-profile" value={profile} onChange={(event) => setProfile(event.target.value)}><option>Trabalho sozinho</option><option>Tenho uma equipe pequena</option><option>Tenho uma operação maior</option><option>Estou abrindo minha oficina</option></select>
            <label htmlFor="workshop-pain">O que mais precisa de atenção?</label><select id="workshop-pain" value={painId} onChange={(event) => setPainId(event.target.value)}>{oficinaPains.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select>
            <p>Mensagem preparada sobre <b>{pain.label.toLowerCase()}</b>. Você pode revisar antes de enviar.</p>
            <a className={styles.primaryButton} href={personalizedWhatsApp} target="_blank" rel="noreferrer" data-oficina-cta="qualified-contact"><WhatsAppIcon /> Solicitar demonstração <span aria-hidden="true">→</span></a>
            <small>Nenhum dado é enviado por esta página. O envio só acontece quando você confirma no WhatsApp.</small>
          </div>
        </section>
      </main>
      <OficinaFooter />
      <OficinaConsent />
    </div>
  );
}
