import { useState } from 'react'
import Card from '../components/Card'

const initialStudents = [
  { id: 1, name: 'Alice Johnson', score: 88 },
  { id: 2, name: 'Bob Smith', score: 72 },
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

export default function Registration() {
  const [students, setStudents] = useState(initialStudents)
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [score, setScore] = useState('')
  const [message, setMessage] = useState('Enter student ID, name, and score to register a record.')

  const handleRegister = () => {
    const parsedId = Number(id)
    const parsedScore = Number(score)

    if (!parsedId || !name.trim() || Number.isNaN(parsedScore) || parsedScore < 0 || parsedScore > 100) {
      setMessage('Enter a valid ID, name, and score between 0 and 100.')
      return
    }
    if (students.some(student => student.id === parsedId)) {
      setMessage('This ID is already registered.')
      return
    }

    setStudents([...students, { id: parsedId, name: name.trim(), score: parsedScore }])
    setMessage('Student registered successfully.')
    setId('')
    setName('')
    setScore('')
  }

  return (
    <div>
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Student Registration</h2>
          <p className="text-gray-300">Add student ID, name and a single score value for simpler registration.</p>
        </div>
      </header>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_1fr] mb-6">
        <Card title="Registration Form">
          <div className="grid gap-4">
            <label className="block text-sm">
              <span>ID</span>
              <input value={id} onChange={e => setId(e.target.value)} type="number" min="1" placeholder="Student ID" className="mt-2 w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-gray-100" />
            </label>
            <label className="block text-sm">
              <span>Name</span>
              <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Student name" className="mt-2 w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-gray-100" />
            </label>
            <label className="block text-sm">
              <span>Score</span>
              <input value={score} onChange={e => setScore(e.target.value)} type="number" min="0" max="100" placeholder="Overall score" className="mt-2 w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-gray-100" />
            </label>
            <button onClick={handleRegister} className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold hover:bg-indigo-500 transition">Register Student</button>
            <p className="text-sm text-gray-300">{message}</p>
          </div>
        </Card>

        <Card title="Quick Summary" className="h-full">
          <div className="space-y-4">
            <div className="rounded-lg bg-gray-950 p-4">
              <div className="text-sm text-gray-400">Total registered</div>
              <div className="text-3xl font-semibold">{students.length}</div>
            </div>
            <div className="rounded-lg bg-gray-950 p-4">
              <div className="text-sm text-gray-400">Highest score</div>
              <div className="text-lg font-semibold">{Math.max(...students.map(student => student.score))}%</div>
            </div>
          </div>
        </Card>
      </section>

      <Card title="Registered Students">
        <div className="overflow-auto rounded-lg border border-gray-700 bg-gray-950">
          <table className="min-w-full text-sm">
            <thead className="text-left text-gray-300 border-b border-gray-700">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Score</th>
                <th className="p-3">Grade</th>
                <th className="p-3">Remark</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id} className="border-b border-gray-800 hover:bg-gray-800">
                  <td className="p-3">{student.id}</td>
                  <td className="p-3">{student.name}</td>
                  <td className="p-3">{student.score}</td>
                  <td className="p-3">{getGrade(student.score)}</td>
                  <td className="p-3">{getRemark(student.score)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
