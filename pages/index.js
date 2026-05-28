import Card from '../components/Card'
import Link from 'next/link'
import { students, withAverage } from '../data/students'

export default function Dashboard(){
  const data = withAverage(students)
  const total = data.length
  const avg = Math.round(data.reduce((s,n)=> s+n.average,0)/total)

  return (
    <div>
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div className="text-sm text-gray-300">System Status: <span className="text-green-400 font-medium">Online</span></div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card title="Students">
          <div className="text-3xl font-semibold">{total}</div>
        </Card>
        <Card title="Avg Performance">
          <div className="text-3xl font-semibold">{avg}%</div>
        </Card>
        <Card title="Recent Activity">
          <ul className="text-sm text-gray-300 space-y-2">
            <li>Imported 5 student records</li>
            <li>Generated monthly analytics</li>
            <li>Fee calculation run completed</li>
          </ul>
        </Card>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card title="Quick Access">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/fees" className="block p-3 bg-gray-700 rounded-md">Fee Calculator</Link>
              <div className="block p-3 bg-gray-700 rounded-md">File Handling</div>
              <Link href="/sorting" className="block p-3 bg-gray-700 rounded-md">Directory Scanner</Link>
              <Link href="/analytics" className="block p-3 bg-gray-700 rounded-md">Performance Analytics</Link>
            </div>
          </Card>
        </div>

        <div>
          <Card title="System Health">
            <div className="space-y-2 text-sm text-gray-300">
              <div>CPU: <span className="text-indigo-300">23%</span></div>
              <div>Memory: <span className="text-indigo-300">68%</span></div>
              <div>Disk: <span className="text-indigo-300">40%</span></div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
