import { useMemo, useState } from 'react'
import Card from '../components/Card'
import { students } from '../data/students'

function bubbleSort(items) {
  const arr = [...items]
  for (let i = 0; i < arr.length; i += 1) {
    for (let j = 0; j < arr.length - i - 1; j += 1) {
      if (arr[j].id > arr[j + 1].id) {
        const temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
  return arr
}

function selectionSort(items) {
  const arr = [...items]
  for (let i = 0; i < arr.length; i += 1) {
    let minIndex = i
    for (let j = i + 1; j < arr.length; j += 1) {
      if (arr[j].id < arr[minIndex].id) minIndex = j
    }
    if (minIndex !== i) {
      const temp = arr[i]
      arr[i] = arr[minIndex]
      arr[minIndex] = temp
    }
  }
  return arr
}

function linearSearch(items, id) {
  for (let i = 0; i < items.length; i += 1) {
    if (items[i].id === id) return { index: i, student: items[i] }
  }
  return null
}

function binarySearch(items, id) {
  const sorted = [...items].sort((a, b) => a.id - b.id)
  let low = 0
  let high = sorted.length - 1
  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    if (sorted[mid].id === id) return { index: mid, student: sorted[mid], sorted }
    if (sorted[mid].id < id) low = mid + 1
    else high = mid - 1
  }
  return { index: -1, student: null, sorted }
}

export default function Sorting() {
  const [searchId, setSearchId] = useState('')
  const [searchAlgorithm, setSearchAlgorithm] = useState('linear')
  const [sortAlgorithm, setSortAlgorithm] = useState('bubble')
  const [sortResult, setSortResult] = useState(students)
  const [searchResult, setSearchResult] = useState(null)
  const [searchMessage, setSearchMessage] = useState('Enter an ID and choose a search method.')

  const currentOrder = useMemo(() => sortResult.map(item => item.id).join(', '), [sortResult])

  function runSort() {
    const sorter = sortAlgorithm === 'bubble' ? bubbleSort : selectionSort
    const sorted = sorter(students)
    setSortResult(sorted)
  }

  function runSearch() {
    const id = Number(searchId)
    if (!id) {
      setSearchMessage('Please enter a valid student ID.')
      return
    }

    if (searchAlgorithm === 'binary') {
      const result = binarySearch(students, id)
      if (result.student) {
        setSearchResult(result.student)
        setSortResult(result.sorted)
        setSearchMessage(`Binary search found ID ${id} in sorted list.`)
      } else {
        setSearchResult(null)
        setSearchMessage(`Binary search did not find ID ${id}.`) }
    } else {
      const result = linearSearch(students, id)
      if (result) {
        setSearchResult(result.student)
        setSearchMessage(`Linear search found ID ${id} at position ${result.index + 1}.`)
      } else {
        setSearchResult(null)
        setSearchMessage(`Linear search did not find ID ${id}.`)
      }
    }
  }

  return (
    <div>
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Sorting & Search</h2>
          <p className="text-gray-300">Use bubble or selection sort and linear or binary search on student IDs.</p>
        </div>
      </header>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_1fr] mb-6">
        <Card title="Search by Student ID">
          <div className="space-y-4">
            <div className="grid gap-3">
              <label className="block text-sm">
                <span>ID</span>
                <input value={searchId} onChange={e => setSearchId(e.target.value)} type="number" min="1" className="mt-2 w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-gray-100" />
              </label>

              <div className="grid gap-2 sm:grid-cols-2">
                <label className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-950 px-3 py-2">
                  <input checked={searchAlgorithm === 'linear'} onChange={() => setSearchAlgorithm('linear')} type="radio" name="search" className="h-4 w-4" />
                  <span>Linear Search</span>
                </label>
                <label className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-950 px-3 py-2">
                  <input checked={searchAlgorithm === 'binary'} onChange={() => setSearchAlgorithm('binary')} type="radio" name="search" className="h-4 w-4" />
                  <span>Binary Search</span>
                </label>
              </div>

              <button onClick={runSearch} className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold">Run Search</button>
            </div>

            <div className="rounded-lg border border-gray-700 bg-gray-950 p-4 text-sm text-gray-100">
              <div className="font-semibold text-gray-200 mb-2">Search result</div>
              <p>{searchMessage}</p>
              {searchResult && (
                <div className="mt-3 space-y-1 text-gray-300">
                  <div>ID: {searchResult.id}</div>
                  <div>Name: {searchResult.name}</div>
                </div>
              )}
            </div>
          </div>
        </Card>

        <Card title="Sort IDs">
          <div className="space-y-4">
            <div className="grid gap-2">
              <label className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-950 px-3 py-2">
                <input checked={sortAlgorithm === 'bubble'} onChange={() => setSortAlgorithm('bubble')} type="radio" name="sort" className="h-4 w-4" />
                <span>Bubble Sort</span>
              </label>
              <label className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-950 px-3 py-2">
                <input checked={sortAlgorithm === 'selection'} onChange={() => setSortAlgorithm('selection')} type="radio" name="sort" className="h-4 w-4" />
                <span>Selection Sort</span>
              </label>
            </div>
            <button onClick={runSort} className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold">Run Sort</button>
            <div className="rounded-lg border border-gray-700 bg-gray-950 p-4 text-sm text-gray-100">
              <div className="font-semibold text-gray-200 mb-2">Sorted IDs</div>
              <div className="flex flex-wrap gap-2 text-sm text-gray-300">{sortResult.map(item => <span key={item.id} className="rounded-full bg-gray-900 px-3 py-1">{item.id}</span>)}</div>
            </div>
          </div>
        </Card>
      </section>

      <Card title="Current Student IDs">
        <div className="flex flex-wrap gap-2 text-sm text-gray-300">
          {students.map(student => (
            <div key={student.id} className="rounded-full bg-gray-800 px-3 py-1">{student.id} - {student.name}</div>
          ))}
        </div>
      </Card>
    </div>
  )
}
