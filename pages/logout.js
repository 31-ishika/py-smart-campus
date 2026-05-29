import Link from 'next/link'

export default function Logout() {
  return (
    <div>
      <header className="flex flex-col gap-3 mb-6">
        <h2 className="text-2xl font-bold">Logged Out</h2>
        <p className="text-gray-300">You have successfully signed out of the Smart Campus system.</p>
      </header>

      <div className="rounded-3xl border border-gray-700 bg-gradient-to-br from-slate-900 via-gray-950 to-indigo-950 p-8 shadow-lg shadow-black/20">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-indigo-600/20 text-3xl font-bold text-indigo-300">✓</div>
        <p className="text-gray-200 mb-4">Your session has ended. When you're ready, return to the dashboard or close the browser to keep your account secure.</p>
        <Link href="/">
          <a className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500">Return to Dashboard</a>
        </Link>
      </div>
    </div>
  )
}
