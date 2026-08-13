import { useMemo, useState } from 'react'
import { siteConfig } from '../../config/siteConfig'
import { trackEvent, trackWhatsAppClick } from '../../utils/analytics'
import styles from './StrategyStudio.module.css'

const initialState = {
  business: '',
  audience: '',
  challenge: '',
  goal: 'Gerar mais contatos',
  consent: false,
}

const goals = [
  'Gerar mais contatos',
  'Organizar atendimento',
  'Reduzir tarefas repetitivas',
  'Centralizar minha operação',
]

function StrategyStudio() {
  const [form, setForm] = useState(initialState)
  const [status, setStatus] = useState('idle')
  const [plan, setPlan] = useState('')
  const [error, setError] = useState('')

  const whatsappUrl = useMemo(() => {
    const message = plan
      ? `Olá, Ronael! Usei o Ronas Studio e gostaria de conversar sobre este plano inicial:\n\n${plan}`
      : 'Olá, Ronael! Quero conversar sobre uma solução digital para meu negócio.'
    return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`
  }, [plan])

  function updateField(event) {
    const { name, value, checked, type } = event.target
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setPlan('')

    if (!form.business.trim() || !form.challenge.trim() || !form.consent) {
      setError('Informe o negócio, o principal desafio e confirme o uso da IA para continuar.')
      return
    }

    setStatus('loading')
    trackEvent('ai_strategy_requested', { goal: form.goal })

    try {
      const response = await fetch('/api/strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Não foi possível gerar o plano agora.')
      setPlan(data.plan)
      setStatus('done')
      trackEvent('ai_strategy_completed', { goal: form.goal })
    } catch (requestError) {
      setStatus('error')
      setError(requestError.message || 'Não foi possível gerar o plano agora.')
    }
  }

  return (
    <section id="studio" className={styles.section} aria-labelledby="studio-title">
      <div className={styles.container}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}><span aria-hidden="true" /> RONAS STUDIO / IA</p>
          <h2 id="studio-title">Descreva seu negócio. Receba um plano inicial em menos de um minuto.</h2>
          <p>Uma IA orientada pela forma como a Ronas Tech trabalha: problema real, solução proporcional e próximo passo claro.</p>
        </header>

        <div className={styles.workspace}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.consoleBar}><span><i aria-hidden="true" /> BRIEF INTELIGENTE</span><small>ETAPA 01 / 01</small></div>
            <label>
              <span>Qual é o seu negócio?</span>
              <input name="business" value={form.business} onChange={updateField} maxLength="90" placeholder="Ex.: Clínica odontológica, loja, oficina..." required />
            </label>
            <label>
              <span>Quem você quer atender?</span>
              <input name="audience" value={form.audience} onChange={updateField} maxLength="90" placeholder="Ex.: moradores da cidade, empresas, pacientes..." />
            </label>
            <label>
              <span>O que mais trava sua rotina hoje?</span>
              <textarea name="challenge" value={form.challenge} onChange={updateField} maxLength="600" placeholder="Ex.: muitos pedidos chegam pelo WhatsApp e se perdem; não temos site; uso planilhas para tudo..." required rows="4" />
            </label>
            <label>
              <span>Qual resultado você busca primeiro?</span>
              <select name="goal" value={form.goal} onChange={updateField}>{goals.map((goal) => <option key={goal}>{goal}</option>)}</select>
            </label>
            <label className={styles.consent}>
              <input type="checkbox" name="consent" checked={form.consent} onChange={updateField} />
              <span>Concordo em enviar estas informações para a IA gerar uma orientação inicial. Não inclua senhas, dados financeiros ou informações sensíveis.</span>
            </label>
            {error && <p className={styles.error} role="alert">{error}</p>}
            <button type="submit" disabled={status === 'loading'}>{status === 'loading' ? 'Montando seu plano...' : 'Gerar plano inicial com IA'} <span aria-hidden="true">→</span></button>
          </form>

          <aside className={styles.result} aria-live="polite">
            <div className={styles.resultBar}><span><i aria-hidden="true" /> {status === 'done' ? 'PLANO GERADO' : 'PRÉVIA DO PLANO'}</span><small>RONAS TECH</small></div>
            {status === 'done' ? (
              <>
                <div className={styles.plan}><p>{plan}</p></div>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick('ai_strategy_result')}>Quero conversar sobre este plano <span aria-hidden="true">↗</span></a>
              </>
            ) : (
              <div className={styles.placeholder}>
                <span>01</span><h3>Seu plano vai aparecer aqui.</h3><p>Você receberá uma leitura objetiva do problema, a solução digital indicada e o primeiro passo para começar.</p>
                <ul><li>Leitura do cenário</li><li>Solução recomendada</li><li>Próximo passo prático</li></ul>
              </div>
            )}
          </aside>
        </div>
        <p className={styles.disclaimer}>A resposta é uma orientação inicial, não uma proposta comercial definitiva. O escopo e valores são definidos após conversar sobre a sua operação.</p>
      </div>
    </section>
  )
}

export default StrategyStudio
