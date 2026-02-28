'use client'

import { useDevices } from '@/lib/api/useDevices'
import { Cpu, AlertCircle, Zap } from 'lucide-react'
import Image from 'next/image'

export default function DevicesGrid() {
  const { devices, isLoading } = useDevices()

  if (isLoading) {
    return (
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-48 bg-slate-700 rounded-xl mb-3"></div>
              <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-slate-700 rounded w-full"></div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {devices.map((device: any, index: number) => (
          <div
            key={device.id || index}
            className="group relative overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/30 transition-all duration-300 hover:border-blue-500/50 hover:bg-slate-800/60 hover:shadow-lg hover:shadow-blue-500/10"
          >
            {/* Image Container */}
            {device.image && (
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <Image
                  src={device.image}
                  alt={device.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors flex-1">
                  {device.name}
                </h3>
                <Cpu className="w-5 h-5 text-blue-400 flex-shrink-0" />
              </div>

              <p className="text-slate-400 text-xs mb-3 line-clamp-2">{device.description}</p>

              {device.specifications && (
                <div className="space-y-2 text-xs text-slate-500 border-t border-slate-700/50 pt-3">
                  {Object.entries(device.specifications).slice(0, 2).map(([key, value]: [string, any]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-slate-600 capitalize">{key}:</span>
                      <span className="text-slate-400">{value}</span>
                    </div>
                  ))}
                </div>
              )}

              {device.commonIssues && device.commonIssues.length > 0 && (
                <div className="mt-3 space-y-1">
                  <p className="text-xs text-slate-500 font-semibold">Common Issues:</p>
                  <ul className="text-xs text-slate-400 space-y-1">
                    {device.commonIssues.slice(0, 2).map((issue: string, i: number) => (
                      <li key={i} className="flex items-center gap-2">
                        <AlertCircle className="w-3 h-3 text-orange-400" />
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Status badge */}
            {device.status && (
              <div className="absolute top-3 right-3">
                <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                  device.status === 'active'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  <Zap className="w-3 h-3" />
                  {device.status === 'active' ? 'Supported' : 'Available'}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {devices.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-400 text-lg">No devices available at the moment</p>
        </div>
      )}
    </section>
  )
}
