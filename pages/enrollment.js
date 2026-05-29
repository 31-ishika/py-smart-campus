import { useMemo, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'
import Card from '../components/Card'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const initialCourses = [
  { id: 1, name: 'Web Development', credit: 3 },
  { id: 2, name: 'Database Systems', credit: 4 },
  { id: 3, name: 'Software Engineering', credit: 2 },
]

export default function Enrollment() {
  const [courses, setCourses] = useState(initialCourses)
  const [courseName, setCourseName] = useState('')
  const [courseCredit, setCourseCredit] = useState('')
  const [error, setError] = useState('')

  const chartData = useMemo(() => ({
    labels: courses.map(course => course.name),
    datasets: [
      {
        label: 'Credits',
        data: courses.map(course => course.credit),
        backgroundColor: ['#6366f1', '#ef4444', '#f59e0b', '#10b981', '#06b6d4'],
      },
    ],
  }), [courses])

  const handleAdd = () => {
    const parsedCredit = Number(courseCredit)
    if (!courseName.trim() || Number.isNaN(parsedCredit) || parsedCredit <= 0) {
      setError('Enter a valid course name and credit value.')
      return
    }
    if (courses.some(course => course.name.toLowerCase() === courseName.trim().toLowerCase())) {
      setError('This course is already enrolled.')
      return
    }

    setCourses([...courses, { id: courses.length + 1, name: courseName.trim(), credit: parsedCredit }])
    setCourseName('')
    setCourseCredit('')
    setError('')
  }

  const totalCredits = courses.reduce((sum, course) => sum + course.credit, 0)

  return (
    <div>
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Course Enrollment</h2>
          <p className="text-gray-300">Add courses with name and credit value only to track enrolled curriculum.</p>
        </div>
      </header>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_1fr] mb-6">
        <div className="rounded-xl border border-gray-700 bg-gray-800 p-5">
          <div className="grid gap-4">
            <label className="block text-sm">
              <span>Course Name</span>
              <input value={courseName} onChange={e => setCourseName(e.target.value)} type="text" placeholder="Course name" className="mt-2 w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-gray-100" />
            </label>
            <label className="block text-sm">
              <span>Course Credit</span>
              <input value={courseCredit} onChange={e => setCourseCredit(e.target.value)} type="number" min="1" placeholder="Credit hours" className="mt-2 w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-gray-100" />
            </label>
            <button onClick={handleAdd} className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold hover:bg-indigo-500 transition">Add Course</button>
            {error && <div className="text-sm text-rose-400">{error}</div>}
          </div>
        </div>

        <Card title="Enrollment Summary" className="h-full">
          <div className="space-y-4">
            <div className="rounded-lg bg-gray-950 p-4">
              <div className="text-sm text-gray-400">Total courses</div>
              <div className="text-3xl font-semibold">{courses.length}</div>
            </div>
            <div className="rounded-lg bg-gray-950 p-4">
              <div className="text-sm text-gray-400">Total credits</div>
              <div className="text-3xl font-semibold">{totalCredits}</div>
            </div>
          </div>
        </Card>
      </section>

      <Card title="Credit Distribution">
        <div className="min-h-[240px] h-[260px]">
          <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
        </div>
      </Card>

      <Card title="Enrolled Courses" className="mt-6">
        <div className="overflow-auto rounded-lg border border-gray-700 bg-gray-950">
          <table className="min-w-full text-sm">
            <thead className="text-left text-gray-300 border-b border-gray-700">
              <tr>
                <th className="p-3">Course</th>
                <th className="p-3">Credits</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course.id} className="border-b border-gray-800 hover:bg-gray-800">
                  <td className="p-3">{course.name}</td>
                  <td className="p-3">{course.credit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
