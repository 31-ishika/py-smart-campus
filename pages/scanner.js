import { useMemo, useState } from 'react'
import Card from '../components/Card'

const directiveKeywords = ['TODO', 'FIXME', 'NOTE', 'IMPORTANT']

function scanDirectives(text) {
  const pattern = new RegExp(`\\b(${directiveKeywords.join('|')})\\b`, 'gi')
  const matches = []
  let match

  while ((match = pattern.exec(text))) {
    const lineStart = text.lastIndexOf('\n', match.index) + 1
    const lineEnd = text.indexOf('\n', match.index)
    const line = text.slice(lineStart, lineEnd === -1 ? text.length : lineEnd)
    matches.push({ keyword: match[1].toUpperCase(), index: match.index, line: line.trim() })
  }

  return matches
}

export default function Scanner() {
  const [sourceText, setSourceText] = useState(`// TODO: Add fee validation\n// FIXME: Search algorithm should handle no input\n// NOTE: Update UI for better feedback\nconst studentIds = [1,2,3,4]`)
  const [pathInput, setPathInput] = useState('')
  const [matches, setMatches] = useState([])
  const [status, setStatus] = useState('Ready to scan any text, path, or URL.')
  const [loading, setLoading] = useState(false)

  const summary = useMemo(() => {
    const counts = directiveKeywords.reduce((acc, key) => ({ ...acc, [key]: 0 }), {})
    matches.forEach(match => { counts[match.keyword] = (counts[match.keyword] || 0) + 1 })
    return counts
  }, [matches])

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
        setStatus('Loaded remote content. Press Scan Text.')
      } catch (error) {
        setStatus(`Failed to load URL: ${error.message}`)
      } finally {
        setLoading(false)
      }
    } else {
      setSourceText(value)
      setStatus('Loaded text/path content into scanner. Press Scan Text.')
    }
  }

  function handleScan() {
    const results = scanDirectives(sourceText)
    setMatches(results)
    setStatus(results.length ? `Found ${results.length} directive(s).` : 'No directives found in the current content.')
  }

  return (
    <div>
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Directive Scanner</h2>
          <p className="text-gray-300">Scan any pasted text, path string, or remote URL for TODO, FIXME, NOTE and IMPORTANT directives.</p>
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
              <span>Paste text, URL, or path</span>
              <input value={pathInput} onChange={e => setPathInput(e.target.value)} placeholder="https://example.com/file.js or C:\\path\\to\\file.txt or any text" className="mt-2 w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-gray-100" />
            </label>
            <textarea
              value={sourceText}
              onChange={e => setSourceText(e.target.value)}
              className="w-full min-h-[300px] resize-none rounded-lg border border-gray-700 bg-gray-950 p-3 text-sm text-gray-100"
            />
            <p className="text-sm text-gray-400">{status}</p>
          </div>
        </Card>

        <Card title="Scan Results" className="h-full">
          <div className="grid gap-3">
            <div className="grid grid-cols-2 gap-3">
              {directiveKeywords.map(key => (
                <div key={key} className="rounded-lg bg-gray-900 p-3">
                  <div className="text-xs uppercase text-gray-400">{key}</div>
                  <div className="text-2xl font-semibold text-indigo-300">{summary[key] ?? 0}</div>
                </div>
              ))}
            </div>

            <div className="rounded-lg bg-gray-950 p-3">
              <div className="font-semibold text-gray-200 mb-2">Found markers</div>
              {matches.length ? (
                <ul className="space-y-2 text-sm text-gray-300">
                  {matches.map((match, index) => (
                    <li key={`${match.index}-${index}`} className="rounded-md border border-gray-700 bg-gray-900 p-3">
                      <div className="font-medium text-gray-100">{match.keyword}</div>
                      <div className="text-xs text-gray-400">Line segment: {match.line}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400">No directives scanned yet. Use the buttons above to load and scan content.</p>
              )}
            </div>
          </div>
        </Card>
      </section>

      <Card title="How it works">
        <p className="text-sm text-gray-300">Paste any text, code snippet, file path string, or remote URL to scan for common developer directives. The scanner highlights TODO, FIXME, NOTE, and IMPORTANT markers instantly.</p>
      </Card>
    </div>
  )
}
