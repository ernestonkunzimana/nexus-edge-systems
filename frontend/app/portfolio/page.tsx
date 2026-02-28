import PortfolioGrid from '@/components/pages/PortfolioGrid'
import PageHeader from '@/components/pages/PageHeader'

export const metadata = {
  title: 'Portfolio | Nexus Edge Systems',
  description: 'Showcase of successful projects delivered for our clients across various industries.',
}

export default function PortfolioPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="Our Portfolio"
        subtitle="Successful projects delivered with excellence"
        description="Explore our portfolio of completed projects for SACCOs, financial institutions, healthcare providers, and enterprises."
      />
      <PortfolioGrid />
    </div>
  )
}
