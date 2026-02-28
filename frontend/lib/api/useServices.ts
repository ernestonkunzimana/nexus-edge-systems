'use client'

import useSWR from 'swr'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000'

const fetcher = (url: string) => fetch(url).then((r) => r.json()).catch(() => null)

/**
 * Hook to fetch services from the backend API
 * Services represent the IT solutions offered by Nexus Edge Systems
 * Example: CBS software, IoT solutions, hardware maintenance, consulting, etc.
 */
export function useServices() {
  const { data, error, isLoading, mutate } = useSWR(
    `${API_BASE}/api/v1/services`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000,
    }
  )

  return {
    services: data ?? [],
    isLoading,
    isError: !!error,
    mutate,
  }
}

export default useServices
