import React, { useState, useEffect } from 'react'

const PROJECTS = [
  { id: 'aetha', name: 'Aetha - Pan-African Cloud', completion: 23 },
  { id: 'aetherVision', name: 'Aether Vision - AI Drone System', completion: 42 },
  { id: 'skylink', name: 'Rwanda SkyLink', completion: 38 },
  { id: 'agrilink', name: 'AgriLink Rwanda', completion: 31 },
]

export default function Dashboard() {
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-r from-cyan-600 to-blue-600 p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Nexus Edge Systems</h1>
          <p className="text-sm opacity-90">Building Africa's Digital Future</p>
        </div>
      </header>

      <section className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/5 p-4 rounded">Active Projects: {PROJECTS.length}</div>
          <div className="bg-white/5 p-4 rounded">Avg Completion: {Math.round(PROJECTS.reduce((s, p) => s + p.completion, 0) / PROJECTS.length)}%</div>
          <div className="bg-white/5 p-4 rounded">Time: {new Date(now).toLocaleTimeString()}</div>
          <div className="bg-white/5 p-4 rounded">Environment: frontend</div>
        </div>

        <h2 className="text-xl font-semibold mb-3">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROJECTS.map((p) => (
            <div key={p.id} className="bg-white/5 p-4 rounded">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{p.name}</h3>
                <span className="text-sm opacity-80">{p.completion}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded overflow-hidden">
                <div className="h-2 bg-cyan-500" style={{ width: `${p.completion}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
