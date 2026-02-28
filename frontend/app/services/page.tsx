import ServicesGrid from '@/components/pages/ServicesGrid'
import PageHeader from '@/components/pages/PageHeader'

export const metadata = {
  title: 'Our Services | Nexus Edge Systems',
  description: 'Comprehensive IT solutions including infrastructure, maintenance, networking, and consulting services.',
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="Our Services"
        subtitle="Comprehensive IT solutions tailored for your business needs"
        description="From infrastructure setup to 24/7 maintenance and consulting, we deliver enterprise-grade services."
      />
      <ServicesGrid />
    </div>
  )
}
