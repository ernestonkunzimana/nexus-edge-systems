"use client"
import useSWR from 'swr'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

/**
 * Hook to fetch portfolio projects
 * Projects showcase case studies and completed work
 */
export function useProjects() {
  const { data, error, isLoading } = useSWR(`${API_BASE}/api/v1/projects`, fetcher, { 
    refreshInterval: 30000,
    revalidateOnFocus: false 
  })
  return {
    projects: data ?? [],
    isLoading,
    isError: !!error,
  }
}

export default useProjects
