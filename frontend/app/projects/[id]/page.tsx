/**
 * Project Detail & Edit Page
 * Displays project details and allows editing
 */
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import ProjectForm from '@/components/ProjectForm';

interface Project {
  id: number;
  name: string;
  description?: string;
  completion: number;
  owner_id?: number;
  created_at?: string;
}

export default function ProjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = Number(params.id);

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';
        const response = await fetch(`${baseUrl}/api/v1/projects/${projectId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch project: ${response.statusText}`);
        }
        const data = await response.json();
        setProject(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error('Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';
      const response = await fetch(`${baseUrl}/api/v1/projects/${projectId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete project: ${response.statusText}`);
      }

      router.push('/projects');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error deleting project:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading project...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">Project not found</p>
            <Button onClick={() => router.push('/projects')}>
              Back to Projects
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white">{project.name}</h1>
              <p className="text-gray-400 mt-1">
                {project.created_at && `Created: ${new Date(project.created_at).toLocaleDateString()}`}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => router.push('/projects')}
            >
              Back
            </Button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
            {error}
          </div>
        )}

        {!editing ? (
          // View Mode
          <div className="space-y-6">
            <div className="bg-slate-700 border border-slate-600 rounded-lg p-8">
              {/* Description */}
              {project.description && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-white mb-2">Description</h2>
                  <p className="text-gray-300 whitespace-pre-wrap">{project.description}</p>
                </div>
              )}

              {/* Completion Progress */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold text-white">Progress</h2>
                  <span className="text-2xl font-bold text-blue-400">
                    {project.completion}%
                  </span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-4 rounded-full transition-all"
                    style={{ width: `${project.completion}%` }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-6 border-t border-slate-600">
                <Button onClick={() => setEditing(true)} className="flex-1">
                  Edit Project
                </Button>
                <Button
                  onClick={handleDelete}
                  variant="outline"
                  className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/10"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Edit Mode
          <div className="bg-slate-700 border border-slate-600 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Edit Project</h2>
            <ProjectForm
              projectId={projectId}
              initialData={project}
              onSuccess={() => {
                setEditing(false);
                window.location.reload();
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
