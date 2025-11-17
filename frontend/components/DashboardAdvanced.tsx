"use client"
import * as React from 'react'
import { Activity } from 'lucide-react'
import LineWrapper from './charts/LineWrapper'
import { useMetrics } from '../lib/api/useMetrics'

type MetricPoint = {
  time: string
  value: number
}

const MOCK_DATA: MetricPoint[] = Array.from({ length: 12 }).map((_, i) => ({
  time: `${i}:00`,
  value: Math.round(20 + Math.random() * 80),
}))

export default function DashboardAdvanced() {
  const { metrics, isLoading } = useMetrics()
  const data = metrics.length ? metrics : MOCK_DATA

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
          <LineWrapper data={data} />
          <p className="mt-3 text-sm opacity-80">{loading ? 'Fetching live metrics…' : 'Showing recent metrics (mocked if backend unavailable).'}</p>
        </section>
      </main>
    </div>
  )
}
