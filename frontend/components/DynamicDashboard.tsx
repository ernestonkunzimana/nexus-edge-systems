"use client"
import React from 'react'
import { AlertCircle, Zap, Users, Briefcase, Server } from 'lucide-react'
import StatCard from './StatCard'
import SectionCard from './SectionCard'
import { useServices } from '../lib/api/useServices'
import { useDevices } from '../lib/api/useDevices'
import { useTeam } from '../lib/api/useTeam'
import { useProjects } from '../lib/api/useProjects'

/**
 * DynamicDashboard Component
 * 
 * Main dashboard that fetches and displays all dynamic content from the backend:
 * - Services: IT solutions offered
 * - Devices: Equipment maintained
 * - Team: Staff members and their expertise
 * - Projects: Portfolio showcase
 * 
 * Each section explains what data is being displayed and why.
 * All data comes from API endpoints, not hardcoded.
 */
export default function DynamicDashboard() {
  const { services, isLoading: servicesLoading } = useServices()
  const { devices, isLoading: devicesLoading } = useDevices()
  const { team, isLoading: teamLoading } = useTeam()
  const { projects, isLoading: projectsLoading } = useProjects()

  // Calculate dashboard stats from live data
  const totalServices = services.length
  const totalDevices = devices.length
  const totalTeam = team.length
  const totalProjects = projects.length
  const totalMetrics = totalServices + totalDevices + totalTeam + totalProjects

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header with Dashboard Context */}
      <header className="bg-gradient-to-r from-cyan-600 to-blue-600 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-8 h-8" />
            <div>
              <h1 className="text-3xl font-bold">Nexus Edge Systems</h1>
              <p className="text-sm opacity-90">Dynamic Dashboard — All Content from Backend API</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Stats Section */}
        <section className="mb-12">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-white mb-2">Dashboard Overview</h2>
            <p className="text-white/60 text-sm">
              Real-time metrics calculated from backend data. Each stat shows live count of items fetched from API.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Services Offered"
              value={totalServices}
              description="IT solutions and services available in our catalog (fetched from /api/v1/services)"
              icon={<Zap className="w-5 h-5" />}
              variant="success"
            />
            <StatCard
              label="Devices Maintained"
              value={totalDevices}
              description="Total device types we support and maintain (from /api/v1/devices)"
              icon={<Server className="w-5 h-5" />}
              variant="success"
            />
            <StatCard
              label="Team Members"
              value={totalTeam}
              description="Expert staff members with specialized skills (from /api/v1/team)"
              icon={<Users className="w-5 h-5" />}
              variant="success"
            />
            <StatCard
              label="Portfolio Projects"
              value={totalProjects}
              description="Case studies and completed client projects (from /api/v1/projects)"
              icon={<Briefcase className="w-5 h-5" />}
              variant="success"
            />
          </div>
        </section>

        {/* Services Section */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Services Catalog</h2>
            <p className="text-white/60 text-sm max-w-2xl">
              <strong>What this shows:</strong> All IT services offered by Nexus Edge Systems. Data is fetched dynamically from the backend API (/api/v1/services). 
              Each service card displays: service name, description, and supporting image. If no services are available, the API endpoint may be down or empty.
            </p>
          </div>
          
          {servicesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => <SectionCard key={i} title="" description="" isLoading />)}
            </div>
          ) : services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service: any) => (
                <SectionCard
                  key={service.id || service.name}
                  title={service.name}
                  description={service.description}
                  image={service.image}
                  details={{
                    'Category': service.category || 'General',
                    'Status': 'Active'
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-lg p-8 text-center">
              <AlertCircle className="w-12 h-12 mx-auto text-white/40 mb-3" />
              <p className="text-white/60">No services available. Check if backend API is running on {process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000'}</p>
            </div>
          )}
        </section>

        {/* Devices Section */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Devices We Maintain</h2>
            <p className="text-white/60 text-sm max-w-2xl">
              <strong>What this shows:</strong> Complete inventory of devices we service and support. Includes computers, printers, money counters, 
              networking equipment, CCTV systems, and power solutions. Data comes from /api/v1/devices endpoint.
            </p>
          </div>
          
          {devicesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => <SectionCard key={i} title="" description="" isLoading />)}
            </div>
          ) : devices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {devices.map((device: any) => (
                <SectionCard
                  key={device.id || device.name}
                  title={device.name}
                  description={device.description}
                  image={device.image}
                  badge={device.brand}
                  details={{
                    'Type': device.type,
                    'Issues Fixed': device.issuesFixed || 'Various',
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-lg p-8 text-center">
              <AlertCircle className="w-12 h-12 mx-auto text-white/40 mb-3" />
              <p className="text-white/60">No devices found. Backend API may not be available.</p>
            </div>
          )}
        </section>

        {/* Team Section */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Our Team</h2>
            <p className="text-white/60 text-sm max-w-2xl">
              <strong>What this shows:</strong> Team members and their expertise areas. Each member has contact information available via WhatsApp.
              Data is fetched from /api/v1/team. Contact links are generated dynamically from WhatsApp numbers.
            </p>
          </div>
          
          {teamLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => <SectionCard key={i} title="" description="" isLoading />)}
            </div>
          ) : team.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member: any) => (
                <div key={member.id || member.name} className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all">
                  <h3 className="font-semibold text-white mb-1">{member.name}</h3>
                  <p className="text-sm text-cyan-400 mb-2">{member.position}</p>
                  <p className="text-sm text-white/70 mb-3">{member.expertise}</p>
                  {member.whatsapp && (
                    <a
                      href={`https://wa.me/${member.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs bg-green-500/20 text-green-300 px-3 py-1 rounded inline-block hover:bg-green-500/30 transition-colors"
                    >
                      Contact via WhatsApp
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-lg p-8 text-center">
              <AlertCircle className="w-12 h-12 mx-auto text-white/40 mb-3" />
              <p className="text-white/60">No team members found.</p>
            </div>
          )}
        </section>

        {/* Projects Section */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Portfolio Showcase</h2>
            <p className="text-white/60 text-sm max-w-2xl">
              <strong>What this shows:</strong> Completed projects and case studies demonstrating our capabilities.
              Data is pulled from /api/v1/projects. Each project shows client name, description, and completion status.
            </p>
          </div>
          
          {projectsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map(i => <SectionCard key={i} title="" description="" isLoading />)}
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project: any) => (
                <div key={project.id || project.name} className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all">
                  <h3 className="font-semibold text-white mb-2">{project.name}</h3>
                  <p className="text-sm text-white/70 mb-3">{project.description}</p>
                  {project.completion !== undefined && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-white/60 mb-1">
                        <span>Progress</span>
                        <span>{project.completion}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                          style={{ width: `${project.completion}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-lg p-8 text-center">
              <AlertCircle className="w-12 h-12 mx-auto text-white/40 mb-3" />
              <p className="text-white/60">No projects found.</p>
            </div>
          )}
        </section>

        {/* Footer Information */}
        <section className="bg-white/5 border border-white/10 rounded-lg p-6 text-center">
          <p className="text-white/60 text-sm mb-2">
            All data displayed above is fetched in real-time from backend API endpoints
          </p>
          <code className="text-xs text-cyan-400 bg-black/30 px-3 py-1 rounded inline-block">
            API Base: {process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000'}
          </code>
        </section>
      </main>
    </div>
  )
}
