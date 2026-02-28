/**
 * StatCard Component
 * 
 * Displays a single metric/stat in a card format.
 * Used to show dashboard overview metrics with explanation tooltips.
 * 
 * Props:
 * - label: The stat name/label
 * - value: The numeric or text value to display
 * - description: Explanation of what this stat represents
 * - icon: Optional React component to display as icon
 */
import { ReactNode } from 'react'

interface StatCardProps {
  label: string
  value: string | number
  description: string
  icon?: ReactNode
  variant?: 'default' | 'success' | 'warning'
}

export default function StatCard({
  label,
  value,
  description,
  icon,
  variant = 'default'
}: StatCardProps) {
  const bgColor = {
    default: 'bg-white/5 hover:bg-white/10',
    success: 'bg-green-500/10 hover:bg-green-500/15',
    warning: 'bg-yellow-500/10 hover:bg-yellow-500/15'
  }[variant]

  return (
    <div className={`${bgColor} backdrop-blur-sm p-4 rounded-lg border border-white/10 transition-all duration-200 group`}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-sm text-white/70">{label}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        {icon && <div className="text-white/50 group-hover:text-white/70 transition-colors">{icon}</div>}
      </div>
      <p className="text-xs text-white/60 leading-relaxed">{description}</p>
    </div>
  )
}
