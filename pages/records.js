import Card from '../components/Card'
import { students, withAverage } from '../data/students'

function getGrade(score) {
  if (score >= 90) return 'A'
  if (score >= 80) return 'B'
  if (score >= 70) return 'C'
  if (score >= 60) return 'D'
  return 'F'
}

function getRemark(score) {
  if (score >= 90) return 'Outstanding'
  if (score >= 80) return 'Strong'
  if (score >= 70) return 'Steady'
  if (score >= 60) return 'Developing'
  return 'Needs Support'
}

export default function Records() {
  const data = withAverage(students)
  const topStudent = data.reduce((best, student) => (student.average > best.average ? student : best), data[0])
  const averageClass = Math.round(data.reduce((sum, student) => sum + student.average, 0) / data.length)

  return (
    <div>
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Student Records</h2>
          <p className="text-gray-300">View student IDs, names, subject scores, overall average, grade and remark.</p>
        </div>
      </header>

      <section className="grid gap-4 lg:grid-cols-3 mb-6">
        <Card title="Class Average">
          <div className="text-3xl font-semibold">{averageClass}%</div>
          <p className="text-sm text-gray-400">Average performance across all students.</p>
        </Card>
        <Card title="Top Performer">
          <div className="text-lg font-semibold">{topStudent.name}</div>
          <div className="text-sm text-gray-400">Average: {topStudent.average}%</div>
        </Card>
        <Card title="Student Count">
          <div className="text-3xl font-semibold">{data.length}</div>
          <p className="text-sm text-gray-400">Records available in the dashboard.</p>
        </Card>
      </section>

      <Card title="Full Records Table">
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
                <th className="p-3">Grade</th>
                <th className="p-3">Remark</th>
              </tr>
            </thead>
            <tbody>
              {data.map(student => {
                const grade = getGrade(student.average)
                const remark = getRemark(student.average)
                return (
                  <tr key={student.id} className="border-b border-gray-800 hover:bg-gray-800">
                    <td className="p-3">{student.id}</td>
                    <td className="p-3">{student.name}</td>
                    <td className="p-3">{student.math}</td>
                    <td className="p-3">{student.science}</td>
                    <td className="p-3">{student.english}</td>
                    <td className="p-3">{student.history}</td>
                    <td className="p-3">{student.average}</td>
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
