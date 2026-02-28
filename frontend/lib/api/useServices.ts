"use client"
import useSWR from 'swr'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

/**
 * Hook to fetch services from the backend API
 * Services represent the IT solutions offered by Nexus Edge Systems
 * Example: CBS software, IoT solutions, hardware maintenance, etc.
 */
export function useServices() {
  const { data, error, isLoading } = useSWR(`${API_BASE}/api/v1/services`, fetcher, { 
    refreshInterval: 30000,
    revalidateOnFocus: false 
  })
  return {
    services: data ?? [],
    isLoading,
    isError: !!error,
  }
}

/**
 * Default export for compatibility
 */
export default useServices

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
