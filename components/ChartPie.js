import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)

export default function ChartPie({data}){
  const chartData = {
    labels: data.map(d=>d.name),
    datasets: [
      {
        label: 'Average',
        data: data.map(d=>d.average),
        backgroundColor: [
          '#6366f1', '#ef4444', '#f59e0b', '#10b981', '#06b6d4'
        ],
        hoverOffset: 8,
      }
    ]
  }
  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <Pie data={chartData} />
    </div>
  )
}
