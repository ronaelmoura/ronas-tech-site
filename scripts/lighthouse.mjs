// Mede o desempenho do site já construído (dist) com o Lighthouse.
//
//   npm run perf -- --label antes      # antes de mexer no site
//   npm run perf -- --label depois     # depois das alterações
//   npm run perf -- --label depois --compare antes
//
// Os relatórios ficam em lighthouse-reports/ (fora do Git). Rode sempre
// com o mesmo aparelho, a mesma rede e sem outros programas pesados
// abertos — o Lighthouse varia bastante entre execuções.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { launch } from 'chrome-launcher'
import lighthouse from 'lighthouse'
import { preview } from 'vite'

const args = process.argv.slice(2)

function readOption(name, fallback) {
  const index = args.indexOf(`--${name}`)
  return index === -1 ? fallback : args[index + 1]
}

const label = readOption('label', 'run')
const compareLabel = readOption('compare')
const port = Number(readOption('port', '4173'))
const isDesktop = args.includes('--desktop')
const runs = Number(readOption('runs', '1'))
const reportsDirectory = path.resolve('lighthouse-reports')

// As páginas que realmente importam para conversão: home, uma página de
// suporte e uma página de serviço de site.
const pages = [
  { name: 'home', route: '/' },
  { name: 'computador-lento', route: '/computador-lento' },
  { name: 'criacao-de-sites', route: '/criacao-de-sites' },
]

const metricKeys = [
  ['first-contentful-paint', 'FCP'],
  ['largest-contentful-paint', 'LCP'],
  ['total-blocking-time', 'TBT'],
  ['cumulative-layout-shift', 'CLS'],
  ['speed-index', 'SI'],
]

// Sobe o preview do Vite pela API do próprio Vite (nada de subprocesso:
// no Windows o Node 24 não executa npm.cmd sem shell).
function startPreviewServer() {
  return preview({ preview: { port, strictPort: true } })
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b)
  return sorted[Math.floor(sorted.length / 2)]
}

async function auditPage(chrome, page) {
  const results = []
  for (let run = 0; run < runs; run += 1) {
    const result = await lighthouse(
      `http://localhost:${port}${page.route}`,
      { port: chrome.port, output: 'html', logLevel: 'error' },
      isDesktop ? (await import('lighthouse/core/config/desktop-config.js')).default : undefined,
    )
    results.push(result)
  }

  const best = results[Math.floor(results.length / 2)]
  await writeFile(path.join(reportsDirectory, `${label}-${page.name}.html`), best.report)

  return {
    page: page.name,
    performance: median(results.map((item) => Math.round(item.lhr.categories.performance.score * 100))),
    accessibility: median(results.map((item) => Math.round(item.lhr.categories.accessibility.score * 100))),
    seo: median(results.map((item) => Math.round(item.lhr.categories.seo.score * 100))),
    metrics: Object.fromEntries(metricKeys.map(([id, short]) => [
      short,
      median(results.map((item) => item.lhr.audits[id].numericValue)),
    ])),
  }
}

function formatMetric(short, value) {
  if (short === 'CLS') return value.toFixed(3)
  return `${Math.round(value)} ms`
}

function formatDelta(short, current, previous) {
  const difference = current - previous
  if (Math.abs(difference) < (short === 'CLS' ? 0.001 : 1)) return 'igual'
  const formatted = short === 'CLS' ? difference.toFixed(3) : `${Math.round(difference)} ms`
  return `${difference > 0 ? '+' : ''}${formatted}`
}

await mkdir(reportsDirectory, { recursive: true })
const server = await startPreviewServer()
const chrome = await launch({ chromeFlags: ['--headless=new', '--no-sandbox'] })
let summary

try {
  summary = []
  for (const page of pages) {
    summary.push(await auditPage(chrome, page))
  }
} finally {
  // No Windows o chrome-launcher às vezes falha ao apagar o perfil
  // temporário porque o processo ainda está soltando os arquivos. Isso
  // não invalida a medição, então não deixamos derrubar o relatório.
  try { await chrome.kill() } catch { /* limpeza do perfil temporário */ }
  await server.close()
}

await writeFile(
  path.join(reportsDirectory, `${label}.json`),
  JSON.stringify({ label, device: isDesktop ? 'desktop' : 'mobile', runs, date: new Date().toISOString(), summary }, null, 2),
)

const previous = compareLabel
  ? JSON.parse(await readFile(path.join(reportsDirectory, `${compareLabel}.json`), 'utf8'))
  : null

console.log(`\nLighthouse — ${label} (${isDesktop ? 'desktop' : 'mobile'}, ${runs} execução(ões) por página)\n`)
for (const page of summary) {
  const before = previous?.summary.find((item) => item.page === page.page)
  const scoreDelta = before ? ` (antes ${before.performance})` : ''
  console.log(`${page.page}`)
  console.log(`  Performance ${page.performance}${scoreDelta} · Acessibilidade ${page.accessibility} · SEO ${page.seo}`)
  console.log(`  ${metricKeys.map(([, short]) => {
    const value = formatMetric(short, page.metrics[short])
    return before ? `${short} ${value} (${formatDelta(short, page.metrics[short], before.metrics[short])})` : `${short} ${value}`
  }).join(' · ')}\n`)
}
console.log(`Relatórios completos em ${reportsDirectory}`)
