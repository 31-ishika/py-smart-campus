import { useState } from 'react'
import Card from '../components/Card'

const initialStudents = [
  { id: 1, name: 'Alice Johnson', math: 88, science: 92, english: 81, history: 75 },
  { id: 2, name: 'Bob Smith', math: 72, science: 68, english: 77, history: 70 },
]

function getAverage(student) {
  return Math.round((student.math + student.science + student.english + student.history) / 4)
}

export default function Registration() {
  const [students, setStudents] = useState(initialStudents)
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [math, setMath] = useState('')
  const [science, setScience] = useState('')
  const [english, setEnglish] = useState('')
  const [history, setHistory] = useState('')
  const [message, setMessage] = useState('Enter student data to register a new record.')

  const handleRegister = () => {
    const parsedId = Number(id)
    const parsedMath = Number(math)
    const parsedScience = Number(science)
    const parsedEnglish = Number(english)
    const parsedHistory = Number(history)

    if (!parsedId || !name.trim() || [parsedMath, parsedScience, parsedEnglish, parsedHistory].some(score => score < 0 || score > 100 || Number.isNaN(score))) {
      setMessage('Enter valid ID, name, and all scores between 0 and 100.')
      return
    }
    if (students.some(student => student.id === parsedId)) {
      setMessage('This ID is already registered.')
      return
    }

    setStudents([...students, { id: parsedId, name: name.trim(), math: parsedMath, science: parsedScience, english: parsedEnglish, history: parsedHistory }])
    setMessage('Student registered successfully.')
    setId('')
    setName('')
    setMath('')
    setScience('')
    setEnglish('')
    setHistory('')
  }

  return (
    <div>
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Student Registration</h2>
          <p className="text-gray-300">Register new students with full subject scores and calculate their average.</p>
        </div>
      </header>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_1fr] mb-6">
        <Card title="Registration Form">
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
              <span>Math Score</span>
              <input value={math} onChange={e => setMath(e.target.value)} type="number" min="0" max="100" className="mt-2 w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-gray-100" />
            </label>
            <label className="block text-sm">
              <span>Science Score</span>
              <input value={science} onChange={e => setScience(e.target.value)} type="number" min="0" max="100" className="mt-2 w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-gray-100" />
            </label>
            <label className="block text-sm">
              <span>English Score</span>
              <input value={english} onChange={e => setEnglish(e.target.value)} type="number" min="0" max="100" className="mt-2 w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-gray-100" />
            </label>
            <label className="block text-sm">
              <span>History Score</span>
              <input value={history} onChange={e => setHistory(e.target.value)} type="number" min="0" max="100" className="mt-2 w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-gray-100" />
            </label>
            <button onClick={handleRegister} className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold">Register Student</button>
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
              <div className="text-sm text-gray-400">Latest student</div>
              <div className="text-lg font-semibold">{students[students.length - 1]?.name ?? 'None'}</div>
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
                <th className="p-3">Math</th>
                <th className="p-3">Science</th>
                <th className="p-3">English</th>
                <th className="p-3">History</th>
                <th className="p-3">Average</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id} className="border-b border-gray-800 hover:bg-gray-800">
                  <td className="p-3">{student.id}</td>
                  <td className="p-3">{student.name}</td>
                  <td className="p-3">{student.math}</td>
                  <td className="p-3">{student.science}</td>
                  <td className="p-3">{student.english}</td>
                  <td className="p-3">{student.history}</td>
                  <td className="p-3">{getAverage(student)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
