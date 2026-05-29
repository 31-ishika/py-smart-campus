export const students = [
  { id: 1, name: 'Alice Johnson', score: 88 },
  { id: 2, name: 'Bob Smith', score: 72 },
  { id: 3, name: 'Carmen Diaz', score: 95 },
  { id: 4, name: 'David Lee', score: 64 },
  { id: 5, name: 'Eva Green', score: 85 },
]

export function withAverage(arr) {
  return arr.map(s => ({ ...s, average: s.score }))
}
