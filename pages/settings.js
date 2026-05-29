import Card from '../components/Card'

export default function Settings() {
  return (
    <div>
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Settings</h2>
          <p className="text-gray-300">Manage app preferences, account details, and system options.</p>
        </div>
      </header>

      <section className="grid gap-4 lg:grid-cols-3 mb-6">
        <Card title="Profile">
          <div className="space-y-3 text-sm text-gray-300">
            <div className="rounded-lg bg-gray-950 p-4">
              <div className="text-gray-400">User</div>
              <div className="text-lg font-semibold">Campus Admin</div>
            </div>
            <div className="rounded-lg bg-gray-950 p-4">
              <div className="text-gray-400">Subscription</div>
              <div className="text-lg font-semibold">Pro Access</div>
            </div>
          </div>
        </Card>

        <Card title="Preferences">
          <div className="space-y-4 text-sm text-gray-300">
            <div className="rounded-lg bg-gray-950 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-gray-400">Theme</div>
                  <div className="font-semibold">Dark mode</div>
                </div>
                <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">Enabled</span>
              </div>
            </div>
            <div className="rounded-lg bg-gray-950 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-gray-400">Notifications</div>
                  <div className="font-semibold">Daily summaries</div>
                </div>
                <span className="rounded-full bg-slate-700 px-3 py-1 text-xs font-semibold text-gray-200">On</span>
              </div>
            </div>
          </div>
        </Card>

        <Card title="System">
          <div className="space-y-4 text-sm text-gray-300">
            <div className="rounded-lg bg-gray-950 p-4">
              <div className="text-gray-400">Version</div>
              <div className="text-lg font-semibold">1.0.0</div>
            </div>
            <div className="rounded-lg bg-gray-950 p-4">
              <div className="text-gray-400">Status</div>
              <div className="text-lg font-semibold text-emerald-400">Operational</div>
            </div>
          </div>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card title="Security Settings">
          <div className="space-y-3 text-sm text-gray-300">
            <div className="rounded-lg bg-gray-950 p-4">
              <div className="text-gray-400">Password</div>
              <div className="font-semibold">••••••••</div>
            </div>
            <div className="rounded-lg bg-gray-950 p-4">
              <div className="text-gray-400">Two-factor authentication</div>
              <div className="font-semibold text-green-400">Enabled</div>
            </div>
          </div>
        </Card>

        <Card title="Support">
          <div className="space-y-3 text-sm text-gray-300">
            <p className="rounded-lg bg-gray-950 p-4">Need help? Visit the GitHub repo for updates or contact support through the dashboard.</p>
            <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold hover:bg-indigo-500 transition">Open support</button>
          </div>
        </Card>
      </section>
    </div>
  )
}
