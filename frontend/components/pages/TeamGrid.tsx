'use client'

import { useTeam } from '@/lib/api/useTeam'
import { Mail, MessageCircle, Linkedin, Globe } from 'lucide-react'
import Image from 'next/image'

export default function TeamGrid() {
  const { team, isLoading, isError } = useTeam()

  if (isLoading) {
    return (
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-80 bg-slate-700 rounded-xl mb-4"></div>
              <div className="h-6 bg-slate-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-slate-700 rounded w-1/2"></div>
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
            <p className="text-amber-400 font-semibold mb-2">Unable to Load Team</p>
            <p className="text-slate-400 text-sm">
              The team list is temporarily unavailable. Please try again later.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {team.map((member: any, index: number) => (
          <div
            key={member.id || index}
            className="group relative overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/30 transition-all duration-300 hover:border-blue-500/50 hover:bg-slate-800/60 hover:shadow-xl hover:shadow-blue-500/10"
          >
            {/* Image Container */}
            {member.image && (
              <div className="relative h-80 overflow-hidden bg-slate-900">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
              </div>
            )}

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
              <p className="text-blue-400 font-semibold text-sm mb-3">{member.position}</p>

              {member.expertise && (
                <div className="mb-4">
                  <p className="text-xs text-slate-400 mb-2">Expertise:</p>
                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(member.expertise) ? member.expertise : [member.expertise])
                      .slice(0, 3)
                      .map((skill: string, i: number) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        >
                          {skill}
                        </span>
                      ))}
                  </div>
                </div>
              )}

              {/* Contact Links */}
              <div className="flex gap-3 pt-4 border-t border-slate-700/50">
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    aria-label="Email"
                    className="p-2 rounded-lg bg-slate-700/50 text-slate-300 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}

                {member.whatsapp && (
                  <a
                    href={`https://wa.me/${member.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="p-2 rounded-lg bg-slate-700/50 text-slate-300 hover:text-green-400 hover:bg-green-500/10 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                )}

                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="p-2 rounded-lg bg-slate-700/50 text-slate-300 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}

                {member.website && (
                  <a
                    href={member.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Website"
                    className="p-2 rounded-lg bg-slate-700/50 text-slate-300 hover:text-slate-100 hover:bg-slate-600/50 transition-all"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {team.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-400 text-lg">No team members available at the moment</p>
        </div>
      )}
    </section>
  )
}
