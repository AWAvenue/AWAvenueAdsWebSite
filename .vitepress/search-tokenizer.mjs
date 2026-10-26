export function tokenizeSearch(text) {
  // Keep the function self-contained: VitePress serializes it into browser site data.
  // Cache the segmenter on the function itself, once per build/browser runtime.
  tokenizeSearch.segmenter ??= new Intl.Segmenter('zh', { granularity: 'word' })
  return Array.from(tokenizeSearch.segmenter.segment(text))
    .filter(segment => segment.isWordLike)
    .map(segment => segment.segment)
}
