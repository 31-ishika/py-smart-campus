import { withAverage, students } from '../data/students'
import ChartPie from '../components/ChartPie'
import Card from '../components/Card'
import { useMemo, useRef, useState } from 'react'
import Papa from 'papaparse'

export default function Analytics() {
  const [filterMinimum, setFilterMinimum] = useState(0)
  const data = useMemo(() => withAverage(students).filter(student => student.average >= filterMinimum), [filterMinimum])
  const tableRef = useRef(null)

  const classAverage = useMemo(() => {
    if (!data.length) return 0
    return Math.round(data.reduce((sum, student) => sum + student.average, 0) / data.length)
  }, [data])

  const topStudent = useMemo(() => {
    return data.slice().sort((a, b) => b.average - a.average)[0]
  }, [data])

  function exportAnalytics() {
    const csv = Papa.unparse(data.map(s => ({ Name: s.name, Math: s.math, Science: s.science, English: s.english, History: s.history, Average: s.average })))
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'analytics.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Performance Analytics</h2>
          <p className="text-gray-300">Interactive student performance charts and exportable analytics.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={exportAnalytics} className="bg-indigo-600 px-3 py-2 rounded-md">Download CSV</button>
        </div>
      </header>

      <section className="grid gap-4 lg:grid-cols-3 mb-6">
        <Card title="Class Average">
          <div className="text-3xl font-semibold">{classAverage}%</div>
          <p className="text-sm text-gray-400 mt-2">Average of students with minimum average {filterMinimum}%.</p>
        </Card>
        <Card title="Top Student">
          <div className="text-lg font-semibold">{topStudent?.name ?? '—'}</div>
          <div className="text-sm text-gray-400">Average: {topStudent?.average ?? '—'}%</div>
        </Card>
        <Card title="Filter Performance">
          <label className="text-sm text-gray-300">
            Minimum average: {filterMinimum}%
            <input
              type="range"
              min="0"
              max="100"
              value={filterMinimum}
              onChange={e => setFilterMinimum(Number(e.target.value))}
              className="mt-3 w-full"
            />
          </label>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <Card title="Student Scores">
            <div className="overflow-auto rounded-lg border border-gray-700 bg-gray-950">
              <table ref={tableRef} className="min-w-full text-sm">
                <thead className="text-left text-gray-300 border-b border-gray-700">
                  <tr>
                    <th className="p-2">Name</th>
                    <th className="p-2">Math</th>
                    <th className="p-2">Science</th>
                    <th className="p-2">English</th>
                    <th className="p-2">History</th>
                    <th className="p-2">Average</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(s => (
                    <tr key={s.id} className="border-b border-gray-800 hover:bg-gray-800">
                      <td className="p-2">{s.name}</td>
                      <td className="p-2">{s.math}</td>
                      <td className="p-2">{s.science}</td>
                      <td className="p-2">{s.english}</td>
                      <td className="p-2">{s.history}</td>
                      <td className="p-2">{s.average}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <Card title="Performance Overview">
          <ChartPie data={data} />
          <p className="mt-4 text-sm text-gray-400">Use the slider to filter the chart and table for students above the selected average.</p>
        </Card>
      </section>
    </div>
  )
}
