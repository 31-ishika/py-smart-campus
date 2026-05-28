import Card from '../components/Card'
import Link from 'next/link'
import { students, withAverage } from '../data/students'

export default function Dashboard() {
  const data = withAverage(students)
  const total = data.length
  const avg = Math.round(data.reduce((s, n) => s + n.average, 0) / total)

  return (
    <div>
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <p className="text-gray-300">Welcome to EduFlow. Use the menu to access fees, enrollment, records, sorting, file handling, scanning and analytics.</p>
        </div>
        <div className="text-sm text-gray-300">System Status: <span className="text-green-400 font-medium">Online</span></div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card title="Students">
          <div className="text-3xl font-semibold">{total}</div>
        </Card>
        <Card title="Avg Performance">
          <div className="text-3xl font-semibold">{avg}%</div>
        </Card>
        <Card title="Latest Recorded">
          <div className="text-sm text-gray-300">{data[data.length - 1].name} ({data[data.length - 1].average}%)</div>
        </Card>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card title="Quick Access">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/fees" className="block rounded-xl bg-gray-700 px-4 py-5 text-center text-sm font-semibold hover:bg-gray-600">Fee Calculator</Link>
              <Link href="/file-handling" className="block rounded-xl bg-gray-700 px-4 py-5 text-center text-sm font-semibold hover:bg-gray-600">File Handling</Link>
              <Link href="/sorting" className="block rounded-xl bg-gray-700 px-4 py-5 text-center text-sm font-semibold hover:bg-gray-600">Sorting & Search</Link>
              <Link href="/analytics" className="block rounded-xl bg-gray-700 px-4 py-5 text-center text-sm font-semibold hover:bg-gray-600">Performance Analytics</Link>
            </div>
          </Card>
        </div>

        <div>
          <Card title="Highlights">
            <div className="space-y-3 text-sm text-gray-300">
              <div className="rounded-lg bg-gray-950 p-4">New features: interactive fee calc, enrollment, file handling, directive scanning.</div>
              <div className="rounded-lg bg-gray-950 p-4">Try searching student IDs and sorting with bubble/selection algorithms.</div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
