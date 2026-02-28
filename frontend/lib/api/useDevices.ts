"use client"
import useSWR from 'swr'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

/**
 * Hook to fetch devices maintained by Nexus Edge Systems
 * Devices include: HP desktops/laptops, Epson printers, money counters, CCTV, UPS, generators, etc.
 */
export function useDevices() {
  const { data, error, isLoading } = useSWR(`${API_BASE}/api/v1/devices`, fetcher, { 
    refreshInterval: 30000,
    revalidateOnFocus: false 
  })
  return {
    devices: data ?? [],
    isLoading,
    isError: !!error,
  }
}

export default useDevices
