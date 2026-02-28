'use client'

import useSWR from 'swr'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000'

const fetcher = (url: string) => fetch(url).then((r) => r.json()).catch(() => null)

/**
 * Hook to fetch team members
 * Each team member has: name, position, expertise, email, WhatsApp, LinkedIn, and image
 */
export function useTeam() {
  const { data, error, isLoading, mutate } = useSWR(
    `${API_BASE}/api/v1/team`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000,
    }
  )

  return {
    team: data ?? [],
    isLoading,
    isError: !!error,
    mutate,
  }
}

export default useTeam
