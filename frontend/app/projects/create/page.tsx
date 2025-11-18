/**
 * Create Project Page
 */
'use client';

import ProjectForm from '@/components/ProjectForm';

export default function CreateProjectPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Create Project</h1>
          <p className="text-gray-400">Add a new project to get started</p>
        </div>

        <div className="bg-slate-700 border border-slate-600 rounded-lg p-8">
          <ProjectForm />
        </div>
      </div>
    </div>
  );
}
