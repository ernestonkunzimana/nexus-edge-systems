"use client"
import useSWR from 'swr'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

/**
 * Hook to fetch team members
 * Each team member has: name, position, expertise, and WhatsApp contact
 */
export function useTeam() {
  const { data, error, isLoading } = useSWR(`${API_BASE}/api/v1/team`, fetcher, { 
    refreshInterval: 60000,
    revalidateOnFocus: false 
  })
  return {
    team: data ?? [],
    isLoading,
    isError: !!error,
  }
}

export default useTeam
