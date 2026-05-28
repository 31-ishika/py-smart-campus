import Sidebar from './Sidebar'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-900 text-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10 transition-all">
        {children}
      </main>
    </div>
  )
}
