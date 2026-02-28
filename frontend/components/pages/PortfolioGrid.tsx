'use client'

import { useProjects } from '@/lib/api/useProjects'
import { ExternalLink, TrendingUp, Calendar } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function PortfolioGrid() {
  const { projects, isLoading } = useProjects()
  const [selectedProject, setSelectedProject] = useState<any>(null)

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

  return (
    <>
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: any, index: number) => (
            <div
              key={project.id || index}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer relative overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/30 transition-all duration-300 hover:border-blue-500/50 hover:bg-slate-800/60 hover:shadow-xl hover:shadow-blue-500/10"
            >
              {/* Image Container */}
              {project.image && (
                <div className="relative h-64 overflow-hidden bg-slate-900">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              )}

              {/* Content Overlay */}
              <div className="p-6 relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-blue-400 text-sm mt-1">{project.category}</p>
                  </div>
                </div>

                <p className="text-slate-400 text-sm mb-4 line-clamp-2">{project.description}</p>

                {/* Client & Date */}
                <div className="space-y-2 text-xs text-slate-500 border-t border-slate-700/50 pt-3">
                  {project.client && (
                    <div className="flex items-center gap-2">
                      <span className="text-slate-600">Client:</span>
                      <span className="text-slate-400">{project.client}</span>
                    </div>
                  )}
                  {project.completionDate && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      <span className="text-slate-400">{new Date(project.completionDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                {/* Progress/Status */}
                {project.progress !== undefined && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-500">Progress</span>
                      <span className="text-xs text-blue-400 font-semibold">{project.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* View Details Button */}
                <button className="mt-6 w-full py-2 px-4 rounded-lg border border-blue-500/30 text-blue-400 hover:bg-blue-500/10 transition-all duration-300 text-sm font-semibold flex items-center justify-center gap-2 group/btn">
                  View Details
                  <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="absolute top-3 left-3 flex gap-2">
                  {project.tags.slice(0, 2).map((tag: string, i: number) => (
                    <span key={i} className="px-2 py-1 rounded text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">No projects available at the moment</p>
          </div>
        )}
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-slate-800 rounded-xl border border-slate-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedProject.image && (
              <div className="relative h-96 overflow-hidden">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="p-8">
              <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
              <p className="text-blue-400 text-lg mb-4">{selectedProject.category}</p>

              <p className="text-slate-400 text-lg leading-relaxed mb-6">{selectedProject.description}</p>

              {/* Project Details */}
              <div className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-lg bg-slate-700/30 border border-slate-700">
                {selectedProject.client && (
                  <div>
                    <p className="text-sm text-slate-500">Client</p>
                    <p className="text-white font-semibold">{selectedProject.client}</p>
                  </div>
                )}
                {selectedProject.completionDate && (
                  <div>
                    <p className="text-sm text-slate-500">Completion Date</p>
                    <p className="text-white font-semibold">{new Date(selectedProject.completionDate).toLocaleDateString()}</p>
                  </div>
                )}
                {selectedProject.budget && (
                  <div>
                    <p className="text-sm text-slate-500">Budget</p>
                    <p className="text-white font-semibold">{selectedProject.budget}</p>
                  </div>
                )}
                {selectedProject.progress !== undefined && (
                  <div>
                    <p className="text-sm text-slate-500">Progress</p>
                    <p className="text-white font-semibold">{selectedProject.progress}%</p>
                  </div>
                )}
              </div>

              {/* Deliverables */}
              {selectedProject.deliverables && selectedProject.deliverables.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-3">Deliverables</h3>
                  <ul className="space-y-2">
                    {selectedProject.deliverables.map((deliverable: string, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-slate-400">
                        <TrendingUp className="w-4 h-4 text-blue-400" />
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              {selectedProject.tags && selectedProject.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-3">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag: string, i: number) => (
                      <span key={i} className="px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="w-full py-3 px-4 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors font-semibold border border-blue-500/30"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
