'use client'

import { useServices } from '@/lib/api/useServices'
import { Briefcase, Server, Network, Shield, Clock, Users } from 'lucide-react'
import Image from 'next/image'

const serviceIcons: Record<string, any> = {
  'infrastructure': Server,
  'maintenance': Briefcase,
  'networking': Network,
  'security': Shield,
  'support': Clock,
  'consulting': Users,
}

export default function ServicesGrid() {
  const { services, isLoading, isError } = useServices()

  if (isLoading) {
    return (
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-64 bg-slate-700 rounded-xl mb-4"></div>
              <div className="h-6 bg-slate-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-slate-700 rounded w-full"></div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (isError) {
    return (
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <div className="p-6 rounded-lg bg-amber-500/10 border border-amber-500/30 max-w-md mx-auto">
            <p className="text-amber-400 font-semibold mb-2">Unable to Load Services</p>
            <p className="text-slate-400 text-sm">
              The services list is temporarily unavailable. Please try again later.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service: any, index: number) => {
          const IconComponent = serviceIcons[service.category?.toLowerCase()] || Briefcase

          return (
            <div
              key={service.id || index}
              className="group relative overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/30 transition-all duration-300 hover:border-blue-500/50 hover:bg-slate-800/60 hover:shadow-xl hover:shadow-blue-500/10"
            >
              {/* Image Container */}
              {service.image && (
                <div className="relative h-64 overflow-hidden bg-slate-900">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-3 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                    <IconComponent className="w-6 h-6 text-blue-400" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {service.name}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{service.description}</p>

                {service.features && service.features.length > 0 && (
                  <ul className="space-y-2 text-xs text-slate-500">
                    {service.features.slice(0, 3).map((feature: string, i: number) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-blue-400"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                <button className="mt-6 w-full py-2 px-4 rounded-lg border border-blue-500/30 text-blue-400 hover:bg-blue-500/10 transition-all duration-300 text-sm font-semibold">
                  Learn More
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {services.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-400 text-lg">No services available at the moment</p>
        </div>
      )}
    </section>
  )
}
