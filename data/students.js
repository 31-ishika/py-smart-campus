export const students = [
  { id:1, name: 'Alice Johnson', math: 88, science: 92, english: 81, history: 75 },
  { id:2, name: 'Bob Smith', math: 72, science: 68, english: 77, history: 70 },
  { id:3, name: 'Carmen Diaz', math: 95, science: 98, english: 92, history: 90 },
  { id:4, name: 'David Lee', math: 64, science: 70, english: 60, history: 65 },
  { id:5, name: 'Eva Green', math: 85, science: 80, english: 88, history: 82 },
]

export function withAverage(arr){
  return arr.map(s=> ({...s, average: Math.round((s.math + s.science + s.english + s.history)/4) }))
}
