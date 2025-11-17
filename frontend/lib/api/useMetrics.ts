"use client"
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function useMetrics() {
  const { data, error, isLoading } = useSWR('/api/v1/metrics', fetcher, { refreshInterval: 5000 })
  return {
    metrics: data ?? [],
    isLoading,
    isError: !!error,
  }
}
