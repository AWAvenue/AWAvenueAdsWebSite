import { readdir, readFile } from 'node:fs/promises'
import { resolve, join, posix } from 'node:path'
import { pathToFileURL } from 'node:url'
import { tutorials, tutorialMap as defaultTutorialMap, tutorialLocales } from '../.vitepress/tutorials.mjs'

const origin = 'https://awavenue.top'
const internalHosts = new Set(['awavenue.top', 'www.awavenue.top'])

async function listFiles(root, directory = '') {
  const entries = await readdir(join(root, directory), { withFileTypes: true })
  const groups = await Promise.all(
    entries.map(entry => {
      const path = posix.join(directory, entry.name)
      return entry.isDirectory() ? listFiles(root, path) : [path]
    })
  )
  return groups.flat()
}

function decodeEntities(text) {
  return text.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt);/gi, (whole, entity) => {
    if (entity.startsWith('#')) {
      const value = entity[1].toLowerCase() === 'x' ? parseInt(entity.slice(2), 16) : Number(entity.slice(1))
      return value > 0 && value <= 0x10ffff ? String.fromCodePoint(value) : whole
    }
    return { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>' }[entity.toLowerCase()]
  })
}

function htmlData(html) {
  const ids = new Set()
  const references = []
  // Keep resource-bearing opening tags, discard comments and raw text that may contain fake tags.
  const markup = html.replace(/<!--[\s\S]*?-->/g, '').replace(/(<(?:script|style|textarea)\b[^>]*>)[\s\S]*?<\/(?:script|style|textarea)\s*>/gi, '$1')
  for (const tag of markup.matchAll(/<([a-z][\w:-]*)\b((?:"[^"]*"|'[^']*'|[^'">])*)>/gi)) {
    const attributes = new Map()
    for (const attr of tag[2].matchAll(/([^\s=/'"<>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s'"=<>`]+)))?/g)) {
      attributes.set(attr[1].toLowerCase(), decodeEntities(attr[2] ?? attr[3] ?? attr[4] ?? ''))
    }
    if (attributes.has('id')) ids.add(attributes.get('id'))
    if (tag[1].toLowerCase() === 'a' && attributes.has('name')) ids.add(attributes.get('name'))
    for (const attr of ['href', 'src', 'poster', 'data']) {
      if (attr === 'data' && tag[1].toLowerCase() !== 'object') continue
      if (attributes.has(attr)) references.push({ value: attributes.get(attr), anchor: attr === 'href' })
    }
    const srcset = attributes.get('srcset')
    if (srcset && !srcset.trim().startsWith('data:')) {
      for (const candidate of srcset.split(',')) references.push({ value: candidate.trim().split(/\s+/)[0], anchor: false })
    }
  }
  return { ids, references }
}

function scalar(frontmatter, key) {
  const value = frontmatter.match(new RegExp(`^${key}:\\s*(.*?)\\s*$`, 'm'))?.[1]
  return value?.replace(/\s+#.*$/, '').replace(/^(['"])(.*)\1$/, '$2')
}

export async function checkDocs({
  sourceDir = process.cwd(),
  distDir = join(sourceDir, '.vitepress/dist'),
  tutorialIds = tutorials.map(page => page.id),
  tutorialMap = defaultTutorialMap
} = {}) {
  const errors = []
  let files
  try {
    files = new Set(await listFiles(distDir))
  } catch (error) {
    return { errors: [`Cannot read built site ${distDir}: ${error.message}. Run npm run docs:build first.`], pages: 0, references: 0, routes: 0 }
  }
  const htmlPages = new Map()
  for (const file of files) {
    if (file.endsWith('.html')) htmlPages.set(file, htmlData(await readFile(join(distDir, file), 'utf8')))
  }
  let references = 0
  function checkReference(from, value, anchor = true, label = from) {
    if (!value || /^(?:data|mailto|tel|javascript|blob):/i.test(value)) return
    let url
    try {
      url = new URL(value, `${origin}/${from}`)
    } catch {
      errors.push(`${label}: invalid URL ${value}`)
      return
    }
    if (!['http:', 'https:'].includes(url.protocol) || !internalHosts.has(url.hostname)) return
    references++
    let pathname, hash
    try {
      pathname = decodeURIComponent(url.pathname).replace(/^\//, '')
      hash = decodeURIComponent(url.hash.slice(1))
    } catch {
      errors.push(`${label}: invalid URL encoding ${value}`)
      return
    }
    const candidates =
      pathname.endsWith('/') || pathname === ''
        ? [`${pathname}index.html`]
        : [pathname, ...(!posix.extname(pathname) ? [`${pathname}.html`, `${pathname}/index.html`] : [])]
    const target = candidates.find(candidate => files.has(candidate))
    if (!target) {
      errors.push(`${label}: missing internal file ${value} (resolved ${candidates.join(' or ')})`)
      return
    }
    if (anchor && hash && htmlPages.has(target) && !htmlPages.get(target).ids.has(hash)) {
      errors.push(`${label}: missing anchor ${value} in ${target}`)
    }
  }
  for (const [file, page] of htmlPages) {
    for (const reference of page.references) checkReference(file, reference.value, reference.anchor)
  }
  for (const file of files) {
    if (!file.endsWith('.css')) continue
    const css = (await readFile(join(distDir, file), 'utf8')).replace(/\/\*[\s\S]*?\*\//g, '')
    for (const match of css.matchAll(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^\s)]*))\s*\)/gi)) {
      checkReference(file, match[1] ?? match[2] ?? match[3], false)
    }
  }
  for (const locale of tutorialLocales) {
    for (const id of tutorialIds) {
      const source = `${locale.prefix.slice(1)}${locale.prefix ? '/' : ''}${id}.md`
      let markdown
      try {
        markdown = await readFile(join(sourceDir, source), 'utf8')
      } catch {
        errors.push(`Missing tutorial translation: ${source}`)
      }
      if (markdown !== undefined) {
        const frontmatter = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1] ?? ''
        const date = scalar(frontmatter, 'lastVerified')
        const timestamp = date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? Date.parse(`${date}T00:00:00Z`) : NaN
        if (!Number.isFinite(timestamp) || new Date(timestamp).toISOString().slice(0, 10) !== date) {
          errors.push(`${source}: lastVerified must be a real YYYY-MM-DD date`)
        }
        if (scalar(frontmatter, 'verificationScope') !== 'docs') errors.push(`${source}: verificationScope must be docs`)
      }
      const built = source.replace(/\.md$/, '.html')
      if (!htmlPages.has(built)) errors.push(`Missing built tutorial: ${built}`)
    }
  }
  let toolIds = []
  try {
    const source = await readFile(join(sourceDir, 'SubData.ts'), 'utf8')
    const toolSection = source.split(/export const tools\b/)[1]?.split(/export const sources\b/)[0] ?? ''
    toolIds = [...toolSection.matchAll(/\bid\s*:\s*['"]([^'"]+)['"]/g)].map(match => match[1])
    if (!toolIds.length) errors.push('SubData.ts: no generator tool IDs found; update the checker if its data format changes')
  } catch (error) {
    errors.push(`Cannot read generator tools: ${error.message}`)
  }
  let routes = 0
  for (const id of toolIds) {
    if (!Object.hasOwn(tutorialMap, id)) {
      errors.push(`Generator tool ${id}: missing explicit tutorial mapping`)
      continue
    }
    for (const locale of tutorialLocales) {
      const route = `${locale.prefix}${tutorialMap[id]}`
      checkReference('index.html', route, true, `Generator tool ${id} (${locale.lang}) → ${route}`)
      routes++
    }
  }
  for (const id of Object.keys(tutorialMap)) {
    if (!toolIds.includes(id)) errors.push(`Tutorial mapping ${id}: no matching generator tool`)
  }
  return { errors: [...new Set(errors)], pages: htmlPages.size, references, routes }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const result = await checkDocs()
  if (result.errors.length) {
    console.error(`Documentation check failed (${result.errors.length} errors):\n${result.errors.map(error => `- ${error}`).join('\n')}`)
    process.exitCode = 1
  } else {
    console.log(
      `Documentation check passed: ${result.pages} built HTML pages, ${result.references} internal references, ${result.routes} localized generator routes.`
    )
  }
}
