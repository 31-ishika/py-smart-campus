import { withAverage, students } from '../data/students'
import ChartPie from '../components/ChartPie'
import Card from '../components/Card'
import { useRef } from 'react'
import Papa from 'papaparse'

export default function Analytics(){
  const data = withAverage(students)
  const tableRef = useRef(null)

  function exportAnalytics(){
    const csv = Papa.unparse(data.map(s=> ({Name: s.name, Math: s.math, Science: s.science, English: s.english, History: s.history, Average: s.average})))
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
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Performance Analytics</h2>
        <div className="flex gap-2">
          <button onClick={exportAnalytics} className="bg-indigo-600 px-3 py-2 rounded-md">Export Analytics</button>
          <button onClick={exportAnalytics} className="bg-gray-700 px-3 py-2 rounded-md">Download CSV</button>
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card title="Student Scores">
            <div className="overflow-auto">
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
                  {data.map(s=> (
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

        <div>
          <Card title="Overview">
            <ChartPie data={data} />
          </Card>
        </div>
      </section>
    </div>
  )
}
