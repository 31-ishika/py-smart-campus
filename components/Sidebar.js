import Link from 'next/link'
import { useState } from 'react'

const sections = [
  { href: '/', label: 'Dashboard' },
  { href: '/registration', label: 'Student Registration' },
  { href: '/enrollment', label: 'Course Enrollment' },
  { href: '/records', label: 'Student Records' },
  { href: '/sorting', label: 'Sorting & Search' },
  { href: '/fees', label: 'Fee Handling' },
  { href: '/analytics', label: 'Performance Analytics' },
  { href: '/settings', label: 'Settings' },
]

export default function Sidebar(){
  const [open, setOpen] = useState(true)
  return (
    <aside className={`bg-gray-800 ${open? 'w-64':'w-16'} transition-all duration-300 p-4 md:p-6`}> 
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-md">EF</div>
          <div className={`hidden md:block ${!open? 'hidden':''}`}>
            <h1 className="text-lg font-semibold">EduFlow</h1>
            <p className="text-sm text-gray-300">Smart Campus</p>
          </div>
        </div>
        <button onClick={()=>setOpen(!open)} className="ml-2 p-1 rounded-md bg-gray-700 hover:bg-gray-600">
          {open? '←':'→'}
        </button>
      </div>

      <nav className="flex flex-col gap-1">
        {sections.map(s=> (
          <Link key={s.href} href={s.href} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700 transition-colors">
            <span className="w-6 text-center text-indigo-400">•</span>
            <span className={`${!open? 'hidden md:block':''}`}>{s.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-6 border-t border-gray-700 pt-4">
        <Link href="/logout" className="block p-2 rounded-md hover:bg-gray-700">Logout</Link>
      </div>
    </aside>
  )
}
