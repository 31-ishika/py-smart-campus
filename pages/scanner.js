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
  const [matches, setMatches] = useState([])

  const summary = useMemo(() => {
    const counts = directiveKeywords.reduce((acc, key) => ({ ...acc, [key]: 0 }), {})
    matches.forEach(match => { counts[match.keyword] = (counts[match.keyword] || 0) + 1 })
    return counts
  }, [matches])

  function handleScan() {
    setMatches(scanDirectives(sourceText))
  }

  return (
    <div>
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Directive Scanner</h2>
          <p className="text-gray-300">Find TODO, FIXME, NOTE and IMPORTANT markers inside text or code.</p>
        </div>
        <button onClick={handleScan} className="bg-indigo-600 px-4 py-2 rounded-md">Scan Text</button>
      </header>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr] mb-6">
        <Card title="Source Text" className="h-full">
          <textarea
            value={sourceText}
            onChange={e => setSourceText(e.target.value)}
            className="w-full min-h-[320px] resize-none rounded-lg border border-gray-700 bg-gray-950 p-3 text-sm text-gray-100"
          />
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
                <p className="text-sm text-gray-400">No directives scanned yet. Press Scan Text.</p>
              )}
            </div>
          </div>
        </Card>
      </div>

      <Card title="How it works">
        <p className="text-sm text-gray-300">Paste any source, notes, or directory text and scan for common directives. The scanner highlights markers for TODO, FIXME, NOTE and IMPORTANT so you can review tasks quickly.</p>
      </Card>
    </div>
  )
}
