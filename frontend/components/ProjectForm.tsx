/**
 * Project Create/Edit Form
 * Shared component for creating and editing projects
 */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

interface ProjectFormProps {
  projectId?: number;
  initialData?: {
    name: string;
    description?: string;
    completion?: number;
  };
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function ProjectForm({ projectId, initialData, onSuccess, onCancel }: ProjectFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    completion: initialData?.completion || 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'completion' ? Math.min(100, Math.max(0, parseInt(value) || 0)) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';
      const url = projectId
        ? `${baseUrl}/api/v1/projects/${projectId}`
        : `${baseUrl}/api/v1/projects`;

      const method = projectId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${projectId ? 'update' : 'create'} project: ${response.statusText}`);
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/projects');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error submitting form:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
          {error}
        </div>
      )}

      {/* Name Field */}
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Project Name *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          placeholder="Enter project name"
        />
      </div>

      {/* Description Field */}
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
          placeholder="Enter project description"
        />
      </div>

      {/* Completion Field */}
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Completion: {formData.completion}%
        </label>
        <input
          type="range"
          name="completion"
          min="0"
          max="100"
          value={formData.completion}
          onChange={handleChange}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-6">
        <Button
          type="submit"
          disabled={loading}
          className="flex-1"
        >
          {loading ? 'Saving...' : projectId ? 'Update Project' : 'Create Project'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            if (onCancel) {
              onCancel()
            } else {
              router.back()
            }
          }}
          disabled={loading}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
