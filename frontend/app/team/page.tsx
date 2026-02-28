import TeamGrid from '@/components/pages/TeamGrid'
import PageHeader from '@/components/pages/PageHeader'

export const metadata = {
  title: 'Our Team | Nexus Edge Systems',
  description: 'Meet the expert team behind Nexus Edge Systems. Dedicated professionals with years of enterprise IT experience.',
}

export default function TeamPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="Our Expert Team"
        subtitle="Meet the professionals behind your success"
        description="Our team consists of certified IT professionals with expertise in infrastructure, networking, security, and consulting."
      />
      <TeamGrid />
    </div>
  )
}
