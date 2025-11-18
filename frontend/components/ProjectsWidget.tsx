/**
 * Projects Widget
 * Displays a quick summary of recent projects on the dashboard
 */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ChevronRight } from 'lucide-react';

interface Project {
  id: number;
  name: string;
  description?: string;
  completion: number;
}

export default function ProjectsWidget() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';
        const response = await fetch(`${baseUrl}/api/v1/projects`);
        if (response.ok) {
          const data = await response.json();
          setProjects(data.slice(0, 5)); // Show top 5 projects
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="bg-slate-700 border border-slate-600 rounded-lg p-6 h-full flex flex-col">
      <h2 className="text-lg font-bold text-white mb-4">Recent Projects</h2>

      {loading ? (
        <div className="text-gray-400 text-sm">Loading...</div>
      ) : projects.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <p className="text-gray-400 text-sm mb-3">No projects yet</p>
          <Link href="/projects/create">
            <Button className="w-full">Create Project</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="flex-1 space-y-3 mb-4">
            {projects.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <div className="p-3 bg-slate-600/50 hover:bg-slate-600 rounded-lg transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors text-sm line-clamp-1">
                      {project.name}
                    </h3>
                    <span className="text-xs font-semibold text-blue-400 whitespace-nowrap">
                      {project.completion}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-500 rounded-full h-1">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-1 rounded-full transition-all"
                      style={{ width: `${project.completion}%` }}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <Link href="/projects" className="w-full">
            <Button variant="outline" className="w-full flex items-center justify-center gap-2">
              View All
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}
