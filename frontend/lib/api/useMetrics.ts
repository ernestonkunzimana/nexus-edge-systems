"use client"
import useSWR from 'swr'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function useMetrics() {
  const { data, error, isLoading } = useSWR(`${API_BASE}/api/v1/metrics`, fetcher, { refreshInterval: 5000 })
  return {
    metrics: data ?? [],
    isLoading,
    isError: !!error,
  }
}
