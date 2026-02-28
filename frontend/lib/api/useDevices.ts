'use client'

import useSWR from 'swr'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000'

const fetcher = (url: string) => fetch(url).then((r) => r.json()).catch(() => null)

/**
 * Hook to fetch devices maintained by Nexus Edge Systems
 * Devices include: HP desktops/laptops, Epson printers, money counters, CCTV, UPS, generators, networking gear, etc.
 */
export function useDevices() {
  const { data, error, isLoading, mutate } = useSWR(
    `${API_BASE}/api/v1/devices`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000,
    }
  )

  return {
    devices: data ?? [],
    isLoading,
    isError: !!error,
    mutate,
  }
}

export default useDevices
