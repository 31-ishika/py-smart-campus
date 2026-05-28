import { useMemo, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'
import Card from '../components/Card'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const initialStudents = [
  { id: 1, name: 'Alice Johnson', score: 88 },
  { id: 2, name: 'Bob Smith', score: 72 },
  { id: 3, name: 'Carmen Diaz', score: 95 },
  { id: 4, name: 'David Lee', score: 64 },
  { id: 5, name: 'Eva Green', score: 85 },
]

function getGrade(score) {
  if (score >= 90) return 'A'
  if (score >= 80) return 'B'
  if (score >= 70) return 'C'
  if (score >= 60) return 'D'
  return 'F'
}

function getRemark(score) {
  if (score >= 90) return 'Excellent'
  if (score >= 80) return 'Very Good'
  if (score >= 70) return 'Good'
  if (score >= 60) return 'Needs Improvement'
  return 'Fail'
}

export default function Enrollment() {
  const [students, setStudents] = useState(initialStudents)
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [score, setScore] = useState('')
  const [error, setError] = useState('')

  const chartData = useMemo(() => ({
    labels: students.map(student => student.name),
    datasets: [
      {
        label: 'Score',
        data: students.map(student => student.score),
        backgroundColor: ['#6366f1', '#ef4444', '#f59e0b', '#10b981', '#06b6d4'],
      },
    ],
  }), [students])

  const handleAdd = () => {
    const parsedId = Number(id)
    const parsedScore = Number(score)
    if (!parsedId || !name.trim() || parsedScore < 0 || parsedScore > 100) {
      setError('Enter valid ID, name and score between 0 and 100.')
      return
    }
    if (students.some(student => student.id === parsedId)) {
      setError('A student with this ID already exists.')
      return
    }

    setStudents([...students, { id: parsedId, name: name.trim(), score: parsedScore }])
    setId('')
    setName('')
    setScore('')
    setError('')
  }

  return (
    <div>
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Student Enrollment</h2>
          <p className="text-gray-300">Add ID, name and score; grade and remark are calculated automatically.</p>
        </div>
      </header>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_1fr] mb-6">
        <div className="rounded-xl border border-gray-700 bg-gray-800 p-5">
          <div className="grid gap-4">
            <label className="block text-sm">
              <span>ID</span>
              <input value={id} onChange={e => setId(e.target.value)} type="number" min="1" className="mt-2 w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-gray-100" />
            </label>
            <label className="block text-sm">
              <span>Name</span>
              <input value={name} onChange={e => setName(e.target.value)} type="text" className="mt-2 w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-gray-100" />
            </label>
            <label className="block text-sm">
              <span>Score</span>
              <input value={score} onChange={e => setScore(e.target.value)} type="number" min="0" max="100" className="mt-2 w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-gray-100" />
            </label>
            <button onClick={handleAdd} className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold">Add Student</button>
            {error && <div className="text-sm text-rose-400">{error}</div>}
          </div>
        </div>

        <Card title="Score Distribution" className="h-full">
          <div className="min-h-[320px]">
            <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </div>
          <p className="mt-4 text-sm text-gray-400">Visual representation of enrolled student scores.</p>
        </Card>
      </section>

      <Card title="Enrollment Records">
        <div className="overflow-auto rounded-lg border border-gray-700 bg-gray-950">
          <table className="min-w-full text-sm">
            <thead className="text-left text-gray-300 border-b border-gray-700">
              <tr>
                <th className="p-3">Student ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Score</th>
                <th className="p-3">Grade</th>
                <th className="p-3">Remark</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => {
                const grade = getGrade(student.score)
                const remark = getRemark(student.score)
                return (
                  <tr key={student.id} className="border-b border-gray-800 hover:bg-gray-800">
                    <td className="p-3">{student.id}</td>
                    <td className="p-3">{student.name}</td>
                    <td className="p-3">{student.score}</td>
                    <td className="p-3">{grade}</td>
                    <td className="p-3">{remark}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
