"use client"
import * as React from 'react'
import axios from 'axios'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import { Activity } from 'lucide-react'

type MetricPoint = {
  time: string
  value: number
}

const MOCK_DATA: MetricPoint[] = Array.from({ length: 12 }).map((_, i) => ({
  time: `${i}:00`,
  value: Math.round(20 + Math.random() * 80),
}))

export default function DashboardAdvanced() {
  const [data, setData] = React.useState<MetricPoint[]>(MOCK_DATA)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    let mounted = true
    setLoading(true)

    // Try to fetch real metrics from the backend; fall back to mock data.
    axios
      .get('/api/v1/metrics')
      .then((res) => {
        if (!mounted) return
        const d = res.data && Array.isArray(res.data) ? res.data : MOCK_DATA
        setData(d)
      })
      .catch(() => {
        // keep mock data on error
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    const iv = setInterval(() => {
      // gently update mock values to keep chart lively
      setData((prev) => prev.map((p) => ({ ...p, value: Math.max(0, Math.min(100, p.value + (Math.random() - 0.5) * 10)) })))
    }, 5000)

    return () => {
      mounted = false
      clearInterval(iv)
    }
  }, [])

  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-r from-sky-600 to-indigo-600 p-6">
        <div className="container mx-auto flex items-center gap-4">
          <Activity className="w-8 h-8 text-white" />
          <div>
            <h1 className="text-2xl font-bold">Nexus Dashboard</h1>
            <p className="text-sm opacity-90">Realtime metrics & project overview</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white/5 p-4 rounded">Live Traffic: <strong>~{Math.round(data.reduce((s, d) => s + d.value, 0) / data.length)}</strong></div>
          <div className="bg-white/5 p-4 rounded">Error Rate: <strong>0.8%</strong></div>
          <div className="bg-white/5 p-4 rounded">Uptime: <strong>99.98%</strong></div>
        </section>

        <section className="bg-white/5 p-4 rounded">
          <h2 className="text-lg font-medium mb-3">Metric — Last 12 points</h2>
          <div style={{ width: '100%', height: 300 }} className="text-black/80">
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.06} />
                <XAxis dataKey="time" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip wrapperStyle={{ background: '#0b1220', borderRadius: 6 }} />
                <Line type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-3 text-sm opacity-80">{loading ? 'Fetching live metrics…' : 'Showing recent metrics (mocked if backend unavailable).'}</p>
        </section>
      </main>
    </div>
  )
}
