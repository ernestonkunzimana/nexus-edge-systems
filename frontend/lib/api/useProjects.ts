'use client'

import useSWR from 'swr'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000'

const fetcher = (url: string) => fetch(url).then((r) => r.json()).catch(() => null)

/**
 * Hook to fetch portfolio projects
 * Projects showcase case studies and completed work with deliverables
 */
export function useProjects() {
  const { data, error, isLoading, mutate } = useSWR(
    `${API_BASE}/api/v1/projects`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000,
    }
  )

  return {
    projects: data ?? [],
    isLoading,
    isError: !!error,
    mutate,
  }
}

export default useProjects
