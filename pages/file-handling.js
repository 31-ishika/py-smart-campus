import { useMemo, useRef, useState } from 'react'
import Papa from 'papaparse'
import Card from '../components/Card'

const sampleCsv = `id,name,score
1,Alice Johnson,88
2,Bob Smith,72
3,Carmen Diaz,95
4,David Lee,64
5,Eva Green,85`

function downloadFile(filename, content, type = 'text/plain') {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export default function FileHandling() {
  const [fileContent, setFileContent] = useState(sampleCsv)
  const [parsedRows, setParsedRows] = useState([])
  const [message, setMessage] = useState('Paste CSV data and click Read File or upload a CSV file.')
  const fileInputRef = useRef(null)

  const summary = useMemo(() => {
    if (!parsedRows.length) return null
    const numericRows = parsedRows.filter(row => row.score !== undefined && row.score !== null && row.score !== '')
    const count = numericRows.length
    const average = count > 0 ? Math.round(numericRows.reduce((sum, row) => sum + Number(row.score), 0) / count) : 0
    return { count, average }
  }, [parsedRows])

  function handleReadFile() {
    if (!fileContent.trim()) {
      setMessage('Enter CSV text before reading.')
      return
    }

    const results = Papa.parse(fileContent, { header: true, skipEmptyLines: true })
    if (results.errors.length) {
      setMessage(`Could not parse CSV: ${results.errors[0].message}`)
      return
    }

    setParsedRows(results.data)
    setMessage(`Read ${results.data.length} records from file.`)
  }

  function handleCsvUpload(event) {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ({ target }) => {
      const text = target.result
      setFileContent(text)
      const results = Papa.parse(text, { header: true, skipEmptyLines: true })
      setParsedRows(results.data)
      setMessage(`Uploaded ${results.data.length} records from ${file.name}`)
    }
    reader.readAsText(file)
  }

  return (
    <div>
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">File Handling</h2>
          <p className="text-gray-300">Write, read and process file data in the browser.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => downloadFile('student-data.csv', sampleCsv, 'text/csv')} className="bg-indigo-600 px-4 py-2 rounded-md">Download Sample CSV</button>
          <button onClick={() => downloadFile('student-data.txt', fileContent, 'text/plain')} className="bg-gray-700 px-4 py-2 rounded-md">Save Text File</button>
        </div>
      </header>

      <section className="grid gap-4 lg:grid-cols-[1.5fr_1fr] mb-6">
        <Card title="File Editor & Reader" className="h-full">
          <textarea
            value={fileContent}
            onChange={e => setFileContent(e.target.value)}
            className="w-full min-h-[260px] resize-none rounded-lg border border-gray-700 bg-gray-950 p-3 text-sm text-gray-100"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <button onClick={handleReadFile} className="bg-indigo-600 px-4 py-2 rounded-md">Read File</button>
            <button onClick={() => fileInputRef.current?.click()} className="bg-gray-700 px-4 py-2 rounded-md">Upload CSV</button>
            <input ref={fileInputRef} type="file" accept=".csv,text/csv" onChange={handleCsvUpload} className="hidden" />
          </div>
          <p className="mt-3 text-sm text-gray-300">{message}</p>
        </Card>

        <Card title="Processed Output" className="h-full">
          {!parsedRows.length ? (
            <p className="text-sm text-gray-400">No file parsed yet.</p>
          ) : (
            <div className="space-y-4">
              <div className="rounded-lg bg-gray-900 p-3">
                <div className="text-sm text-gray-300">Rows read</div>
                <div className="text-3xl font-semibold">{summary?.count ?? 0}</div>
              </div>

              <div className="rounded-lg bg-gray-900 p-3">
                <div className="text-sm text-gray-300">Average score</div>
                <div className="text-3xl font-semibold">{summary?.average ?? 0}</div>
              </div>

              <div className="overflow-auto rounded-lg border border-gray-700 bg-gray-950 p-3 text-sm">
                <div className="font-semibold text-gray-200 mb-2">Preview</div>
                <pre className="whitespace-pre-wrap break-words text-gray-300">{JSON.stringify(parsedRows.slice(0, 8), null, 2)}</pre>
              </div>
            </div>
          )}
        </Card>
      </section>

      <Card title="Processing Rules">
        <ul className="list-disc space-y-2 pl-5 text-gray-300 text-sm">
          <li>Upload or paste CSV data to read rows and compute aggregate metrics.</li>
          <li>Files are processed in browser memory for quick preview and export.</li>
          <li>Use the sample CSV to test write/read operations instantly.</li>
        </ul>
      </Card>
    </div>
  )
}
