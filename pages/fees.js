import { useMemo, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'
import Card from '../components/Card'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const rupeeFormatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })

function formatRupee(value) {
  return rupeeFormatter.format(value)
}

export default function Fees() {
  const [tuition, setTuition] = useState('')
  const [hostel, setHostel] = useState('')
  const [transport, setTransport] = useState('')
  const [includeHostel, setIncludeHostel] = useState(true)
  const [includeTransport, setIncludeTransport] = useState(false)

  const tuitionAmount = Number(tuition) || 0
  const hostelAmount = includeHostel ? Number(hostel) || 0 : 0
  const transportAmount = includeTransport ? Number(transport) || 0 : 0
  const totalFee = tuitionAmount + hostelAmount + transportAmount

  const feeData = useMemo(() => ({
    labels: ['Tuition', 'Hostel', 'Transport'],
    datasets: [
      {
        label: 'Fee Breakdown',
        data: [tuitionAmount, hostelAmount, transportAmount],
        backgroundColor: ['#6366f1', '#f59e0b', '#10b981'],
      },
    ],
  }), [tuitionAmount, hostelAmount, transportAmount])

  const invalid = tuitionAmount <= 0

  return (
    <div>
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Fee Handling</h2>
          <p className="text-gray-300">Tuition is mandatory; hostel and transport are optional. Results are displayed in rupees.</p>
        </div>
      </header>

      <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr] mb-6">
        <div className="space-y-4">
          <div className="rounded-xl border border-gray-700 bg-gray-800 p-5">
            <div className="mb-4 text-sm text-gray-300">Enter amounts in rupees below. Tuition is required for a valid calculation.</div>

            <label className="block space-y-2 text-sm">
              <span>Tuition Fee (₹)</span>
              <input
                value={tuition}
                onChange={e => setTuition(e.target.value)}
                type="number"
                min="0"
                placeholder="e.g. 45000"
                className="w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-gray-100"
              />
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input checked={includeHostel} onChange={e => setIncludeHostel(e.target.checked)} type="checkbox" className="h-4 w-4 rounded bg-gray-700 text-indigo-500" />
              <span>Add hostel fee</span>
            </label>
            <input
              disabled={!includeHostel}
              value={hostel}
              onChange={e => setHostel(e.target.value)}
              type="number"
              min="0"
              placeholder="Hostel fee (optional)"
              className="w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            />

            <label className="flex items-center gap-2 text-sm">
              <input checked={includeTransport} onChange={e => setIncludeTransport(e.target.checked)} type="checkbox" className="h-4 w-4 rounded bg-gray-700 text-indigo-500" />
              <span>Add transport fee</span>
            </label>
            <input
              disabled={!includeTransport}
              value={transport}
              onChange={e => setTransport(e.target.value)}
              type="number"
              min="0"
              placeholder="Transport fee (optional)"
              className="w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="rounded-xl border border-gray-700 bg-gray-800 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Calculation Output</h3>
                <p className="text-sm text-gray-400">Live totals update as you enter amounts.</p>
              </div>
            </div>

            <div className="grid gap-3">
              <div className="rounded-lg bg-gray-950 p-4">
                <div className="text-xs uppercase text-gray-400">Tuition</div>
                <div className="text-2xl font-semibold">{formatRupee(tuitionAmount)}</div>
              </div>
              <div className="rounded-lg bg-gray-950 p-4">
                <div className="text-xs uppercase text-gray-400">Hostel</div>
                <div className="text-2xl font-semibold">{formatRupee(hostelAmount)}</div>
              </div>
              <div className="rounded-lg bg-gray-950 p-4">
                <div className="text-xs uppercase text-gray-400">Transport</div>
                <div className="text-2xl font-semibold">{formatRupee(transportAmount)}</div>
              </div>
              <div className="rounded-lg bg-indigo-950 p-4">
                <div className="text-xs uppercase text-gray-400">Total Fee</div>
                <div className="text-3xl font-semibold">{invalid ? 'Enter tuition' : formatRupee(totalFee)}</div>
              </div>
            </div>
            {invalid && <p className="mt-3 text-sm text-rose-400">Tuition fee is required to calculate the total amount.</p>}
          </div>
        </div>

        <Card title="Fee Breakdown Chart" className="h-full">
          <div className="min-h-[320px]">
            <Bar data={feeData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </div>
          <p className="mt-4 text-sm text-gray-400">The chart shows how each fee category contributes to the total payable amount.</p>
        </Card>
      </section>
    </div>
  )
}
