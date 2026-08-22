import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import {
  getPageMetadata,
  render,
  staticPaths,
} from '../.ssr/entry-server.js'

const distDirectory = path.resolve('dist')
const template = await readFile(path.join(distDirectory, 'index.html'), 'utf8')

function escapeAttribute(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function replaceMetaContent(html, attribute, value) {
  const escaped = escapeAttribute(value)
  const pattern = new RegExp(
    `(<meta\\s+${attribute}\\s+content=")[^"]*("\\s*\\/?>)`,
  )

  return html.replace(pattern, `$1${escaped}$2`)
}

function createPageHtml(pathname) {
  const metadata = getPageMetadata(pathname)
  const canonicalUrl = metadata.canonical
  const renderedPage = render(pathname).replace(
    /<link rel="preload" as="image"[^>]*\/>/g,
    '',
  )
  let html = template

  html = html.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeAttribute(metadata.title)}</title>`,
  )
  html = replaceMetaContent(html, 'name="description"', metadata.description)
  html = replaceMetaContent(html, 'property="og:title"', metadata.title)
  html = replaceMetaContent(
    html,
    'property="og:description"',
    metadata.description,
  )
  html = replaceMetaContent(html, 'name="twitter:title"', metadata.title)
  html = replaceMetaContent(
    html,
    'name="twitter:description"',
    metadata.description,
  )

  if (canonicalUrl) {
    html = replaceMetaContent(html, 'property="og:url"', canonicalUrl)
    html = html.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
      `<link rel="canonical" href="${escapeAttribute(canonicalUrl)}" />`,
    )
  } else {
    html = html.replace(/\s*<link\s+rel="canonical"[^>]*>/, '')
    html = html.replace(/\s*<meta\s+property="og:url"[^>]*>/, '')
  }

  if (metadata.noindex) {
    html = replaceMetaContent(html, 'name="robots"', 'noindex, follow')
  }

  if (metadata.ogImage) {
    html = replaceMetaContent(html, 'property="og:image"', metadata.ogImage)
    html = replaceMetaContent(html, 'name="twitter:image"', metadata.ogImage)
  }

  if (metadata.structuredData) {
    const structuredData = JSON.stringify(metadata.structuredData).replaceAll(
      '<',
      '\\u003c',
    )
    html = html.replace(
      '</head>',
      `    <script id="service-structured-data" type="application/ld+json">${structuredData}</script>\n  </head>`,
    )
  }

  return html.replace(
    '<div id="root"></div>',
    `<div id="root">${renderedPage}</div>`,
  )
}

for (const pathname of staticPaths) {
  const routeName = pathname.replace(/^\//, '')
  const outputDirectory =
    pathname === '/' ? distDirectory : path.join(distDirectory, routeName)
  const pageHtml = createPageHtml(pathname)
  await mkdir(outputDirectory, { recursive: true })
  await writeFile(path.join(outputDirectory, 'index.html'), pageHtml)

  if (pathname !== '/') {
    await writeFile(path.join(distDirectory, `${routeName}.html`), pageHtml)
  }
}

const notFoundHtml = createPageHtml('/404')
await writeFile(path.join(distDirectory, '404.html'), notFoundHtml)
await mkdir(path.join(distDirectory, '404'), { recursive: true })
await writeFile(path.join(distDirectory, '404', 'index.html'), notFoundHtml)
await rm(path.resolve('.ssr'), { recursive: true, force: true })

console.log(`Pre-rendered ${staticPaths.length} pages and the 404 page.`)
