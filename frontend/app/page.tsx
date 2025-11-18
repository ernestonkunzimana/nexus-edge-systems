import DashboardAdvanced from '../components/DashboardAdvanced'
import ProjectsWidget from '../components/ProjectsWidget'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-8">
          <div className="lg:col-span-2">
            <DashboardAdvanced />
          </div>
          <div className="lg:col-span-1">
            <ProjectsWidget />
          </div>
        </div>
      </div>
    </div>
  )
}
