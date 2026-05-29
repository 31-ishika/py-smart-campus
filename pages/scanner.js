import { useMemo, useState } from 'react'
import Card from '../components/Card'

function parseKeywords(keywordString) {
  return keywordString
    .split(',')
    .map(k => k.trim())
    .filter(Boolean)
}

function scanText(text, keywords) {
  if (!keywords.length) return []
  const pattern = new RegExp(`(${keywords.map(k => k.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')).join('|')})`, 'gi')
  return text
    .split(/\r?\n/)
    .map((line, index) => {
      const matches = line.match(pattern)
      if (!matches) return null
      return {
        lineNumber: index + 1,
        keywords: Array.from(new Set(matches.map(m => m.toUpperCase()))),
        line: line.trim(),
      }
    })
    .filter(Boolean)
}

export default function Scanner() {
  const [sourceText, setSourceText] = useState('')
  const [pathInput, setPathInput] = useState('')
  const [keywordInput, setKeywordInput] = useState('')
  const [matches, setMatches] = useState([])
  const [status, setStatus] = useState('Enter a URL or paste text to scan.')
  const [loading, setLoading] = useState(false)

  const keywords = useMemo(() => parseKeywords(keywordInput), [keywordInput])

  async function handleLoad() {
    const value = pathInput.trim()
    if (!value) {
      setStatus('Enter a URL or paste text/path content to load.')
      return
    }

    if (/^https?:\/\//i.test(value)) {
      setLoading(true)
      setStatus('Fetching remote source...')
      try {
        const response = await fetch(value)
        if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
        const text = await response.text()
        setSourceText(text)
        setStatus('Loaded remote content. Add keywords and press Scan.')
      } catch (error) {
        setStatus(`Failed to load URL: ${error.message}`)
      } finally {
        setLoading(false)
      }
    } else {
      setSourceText(value)
      setStatus('Loaded text/path content into scanner. Add keywords and press Scan.')
    }
  }

  function handleScan() {
    if (!sourceText.trim()) {
      setStatus('Load or paste content first.')
      setMatches([])
      return
    }

    if (!keywords.length) {
      setStatus('Enter search keywords to scan the loaded content.')
      setMatches([])
      return
    }

    const results = scanText(sourceText, keywords)
    setMatches(results)
    setStatus(results.length ? `Found ${results.length} matching line(s).` : 'No matches found for the entered keywords.')
  }

  const keywordSummary = useMemo(
    () => keywords.map(keyword => ({
      keyword,
      count: matches.reduce((sum, match) => sum + (match.keywords.includes(keyword.toUpperCase()) ? 1 : 0), 0),
    })),
    [keywords, matches]
  )

  return (
    <div>
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Directive Scanner</h2>
          <p className="text-gray-300">Load any URL or text and scan it for your own keywords. No preset TODO/FIXME list is required.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleLoad} disabled={loading} className="rounded-md bg-slate-700 px-4 py-2 text-sm font-semibold hover:bg-slate-600 transition disabled:opacity-50">Load Content</button>
          <button onClick={handleScan} className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold hover:bg-indigo-500 transition">Scan Text</button>
        </div>
      </header>

      <section className="grid gap-4 lg:grid-cols-[1.6fr_1fr] mb-6">
        <Card title="Source Content" className="h-full">
          <div className="space-y-4">
            <label className="block text-sm">
              <span>Paste text or enter a URL</span>
              <input
                value={pathInput}
                onChange={e => setPathInput(e.target.value)}
                placeholder="https://example.com/file.js or any text"
                className="mt-2 w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-gray-100"
              />
            </label>
            <label className="block text-sm">
              <span>Search keywords (comma separated)</span>
              <input
                value={keywordInput}
                onChange={e => setKeywordInput(e.target.value)}
                placeholder="e.g. TODO, FIXME, BUG, NOTE"
                className="mt-2 w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-gray-100"
              />
            </label>
            <textarea
              value={sourceText}
              onChange={e => setSourceText(e.target.value)}
              placeholder="Loaded content appears here..."
              className="w-full min-h-[300px] resize-none rounded-lg border border-gray-700 bg-gray-950 p-3 text-sm text-gray-100"
            />
            <p className="text-sm text-gray-400">{status}</p>
          </div>
        </Card>

        <Card title="Scan Results" className="h-full">
          <div className="grid gap-3">
            {keywords.length ? (
              <div className="grid grid-cols-2 gap-3">
                {keywordSummary.map(item => (
                  <div key={item.keyword} className="rounded-lg bg-gray-900 p-3">
                    <div className="text-xs uppercase text-gray-400">{item.keyword}</div>
                    <div className="text-2xl font-semibold text-indigo-300">{item.count}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg bg-gray-900 p-4 text-sm text-gray-300">Enter search keywords to see matching results.</div>
            )}

            <div className="rounded-lg bg-gray-950 p-3">
              <div className="font-semibold text-gray-200 mb-2">Matching lines</div>
              {matches.length ? (
                <ul className="space-y-2 text-sm text-gray-300">
                  {matches.map((match, index) => (
                    <li key={`${match.lineNumber}-${index}`} className="rounded-md border border-gray-700 bg-gray-900 p-3">
                      <div className="text-xs uppercase text-gray-400">Line {match.lineNumber}</div>
                      <div className="text-sm text-gray-100">{match.line}</div>
                      <div className="mt-2 text-xs text-gray-400">Keywords: {match.keywords.join(', ')}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400">No matches yet. Use the scan button after entering keywords.</p>
              )}
            </div>
          </div>
        </Card>
      </section>

      <Card title="How it works">
        <p className="text-sm text-gray-300">Load any URL or paste any content, then search for your own keywords. This scanner is flexible and not limited to preset directives.</p>
      </Card>
    </div>
  )
}
