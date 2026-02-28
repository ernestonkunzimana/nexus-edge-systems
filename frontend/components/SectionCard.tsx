/**
 * SectionCard Component
 * 
 * Reusable card for displaying dynamic content sections (services, devices, etc.)
 * Includes image support, loading states, and responsive layout.
 * 
 * Props:
 * - title: Main heading
 * - description: Detailed description/explanation
 * - image: URL to image (optional)
 * - details: Additional details to display (optional)
 * - isLoading: Show skeleton while loading
 */
import Image from 'next/image'

interface SectionCardProps {
  title: string
  description: string
  image?: string
  details?: Record<string, string | number>
  isLoading?: boolean
  badge?: string
}

export default function SectionCard({
  title,
  description,
  image,
  details,
  isLoading = false,
  badge
}: SectionCardProps) {
  if (isLoading) {
    return (
      <div className="bg-white/5 rounded-lg overflow-hidden animate-pulse">
        <div className="h-40 bg-white/10" />
        <div className="p-4 space-y-3">
          <div className="h-4 bg-white/10 rounded w-3/4" />
          <div className="h-3 bg-white/10 rounded w-full" />
          <div className="h-3 bg-white/10 rounded w-5/6" />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/5 rounded-lg overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-200 hover:bg-white/10">
      {image && (
        <div className="relative h-40 overflow-hidden bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            onError={(e) => {
              // Fallback if image fails to load
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>
      )}
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-white">{title}</h3>
          {badge && (
            <span className="text-xs bg-cyan-500/30 text-cyan-200 px-2 py-1 rounded">
              {badge}
            </span>
          )}
        </div>
        
        <p className="text-sm text-white/70 mb-3">{description}</p>
        
        {details && (
          <div className="space-y-1 text-xs text-white/60 border-t border-white/10 pt-3">
            {Object.entries(details).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span>{key}:</span>
                <span className="text-white/80 font-medium">{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
