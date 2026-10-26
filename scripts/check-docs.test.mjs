import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, writeFile, rm, unlink } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { checkDocs } from './check-docs.mjs'
import { tokenizeSearch } from '../.vitepress/search-tokenizer.mjs'

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'awavenue-docs-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  const sourceDir = join(root, 'source')
  const distDir = join(root, 'dist')
  async function put(path, text, source = false) {
    const target = join(source ? sourceDir : distDir, path)
    await mkdir(join(target, '..'), { recursive: true })
    await writeFile(target, text)
  }
  for (const prefix of ['', 'en/', 'zh_TW/']) {
    await put(`${prefix}Guide.md`, '---\nlastVerified: 2026-10-26\nverificationScope: docs\n---\n# Guide', true)
    await put(`${prefix}Guide.html`, '<h1 id="guide">Guide</h1><h2 id="yaml">YAML</h2><a href="./">Home</a><a href="Guide.html#yaml">Format</a>')
    await put(`${prefix}index.html`, '<a href="Guide.html#guide">Guide</a><img src="/assets/logo.svg"><script src="/assets/app.js"></script>')
  }
  await put('assets/logo.svg', '<svg/>')
  await put('assets/app.js', 'export {}')
  await put('assets/site.css', 'body{background:url("./logo.svg")}')
  await put('SubData.ts', "export const tools = [{ id: 'clash' }]\nexport const sources = []", true)
  const options = { sourceDir, distDir, tutorialIds: ['Guide'], tutorialMap: { clash: '/Guide.html#yaml' } }
  return { put, sourceDir, distDir, options }
}

test('accepts built localized pages, relative links, anchors and resources', async t => {
  const f = await fixture(t)
  const result = await checkDocs(f.options)
  assert.deepEqual(result.errors, [])
  assert.ok(result.pages >= 6)
  assert.equal(result.routes, 3)
})

test('rejects an actual broken internal page even though an index fallback exists', async t => {
  const f = await fixture(t)
  await f.put('broken.html', '<a href="/missing.html">Broken</a>')
  assert.match((await checkDocs(f.options)).errors.join('\n'), /missing\.html/)
})

test('rejects a missing anchor on an existing translated page', async t => {
  const f = await fixture(t)
  await f.put('broken.html', '<a href="/en/Guide.html#no-such-anchor">Broken</a>')
  assert.match((await checkDocs(f.options)).errors.join('\n'), /no-such-anchor/)
})

test('rejects missing translated source and missing translated output independently', async t => {
  const f = await fixture(t)
  await unlink(join(f.sourceDir, 'en/Guide.md'))
  await unlink(join(f.distDir, 'zh_TW/Guide.html'))
  const errors = (await checkDocs(f.options)).errors.join('\n')
  assert.match(errors, /en\/Guide\.md/)
  assert.match(errors, /zh_TW\/Guide\.html/)
})

test('rejects impossible verification dates and missing verification scope', async t => {
  const f = await fixture(t)
  await f.put('Guide.md', '---\nlastVerified: 2026-02-30\n---\n# Guide', true)
  const errors = (await checkDocs(f.options)).errors.join('\n')
  assert.match(errors, /lastVerified/)
  assert.match(errors, /verificationScope/)
})

test('rejects missing HTML and CSS assets, srcset candidates, and wrong filename case', async t => {
  const f = await fixture(t)
  await f.put('broken.html', '<img src="/assets/Logo.svg" srcset="/assets/logo.svg 1x, /assets/missing.svg 2x">')
  await f.put('assets/site.css', 'body{background:url(./missing.png)}')
  const errors = (await checkDocs(f.options)).errors.join('\n')
  assert.match(errors, /Logo\.svg/)
  assert.match(errors, /missing\.svg/)
  assert.match(errors, /missing\.png/)
})

test('checks dynamic generator routes against real output anchors in every language', async t => {
  const f = await fixture(t)
  await f.put('en/Guide.html', '<h1 id="guide">Guide</h1>')
  const errors = (await checkDocs(f.options)).errors.join('\n')
  assert.match(errors, /clash.*en\/Guide\.html#yaml/)
})

test('requires a mapping for every generator tool instead of silent fallback', async t => {
  const f = await fixture(t)
  await f.put('SubData.ts', "export const tools = [{ id: 'clash' }, { id: 'newTool' }]\nexport const sources = []", true)
  assert.match((await checkDocs(f.options)).errors.join('\n'), /newTool/)
})

test('ignores external/protocol links and script strings, resolves encoded anchors and same-site URLs', async t => {
  const f = await fixture(t)
  await f.put(
    'extra.html',
    '<h2 id="中文">Title</h2><a href="#%E4%B8%AD%E6%96%87">Anchor</a><a href="https://awavenue.top/en/Guide.html#yaml">Same site</a><a href="https://example.com/missing">External</a><a href="mailto:test@example.com">Mail</a><a href="surge:///install-config?url=test">App</a><script>const x = \'<a href="/fake.html">\'</script>'
  )
  assert.deepEqual((await checkDocs(f.options)).errors, [])
})

test('search tokenizes Chinese words and survives standalone browser serialization', () => {
  // VitePress serializes themeConfig functions with toString; no module closure can survive it.
  const browserTokenizer = Function(`return (${tokenizeSearch.toString()})`)()
  const text = 'Android 共存设置和网络测试；AdGuard Home 匯入設定'
  for (const tokenize of [tokenizeSearch, browserTokenizer]) {
    const terms = tokenize(text)
    assert.ok(terms.includes('共存'))
    assert.ok(terms.includes('设置'))
    assert.ok(terms.includes('設定'))
    assert.ok(terms.includes('AdGuard'))
    assert.ok(terms.includes('Home'))
  }
  assert.deepEqual(browserTokenizer(text), tokenizeSearch(text))
})
