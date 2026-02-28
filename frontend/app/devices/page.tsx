import DevicesGrid from '@/components/pages/DevicesGrid'
import PageHeader from '@/components/pages/PageHeader'

export const metadata = {
  title: 'Devices We Maintain | Nexus Edge Systems',
  description: 'Professional maintenance and support for HP computers, printers, networking equipment, CCTV systems, and more.',
}

export default function DevicesPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="Devices We Maintain"
        subtitle="Professional support for enterprise equipment"
        description="We maintain and support a wide range of devices including computers, printers, networking gear, security systems, and power solutions."
      />
      <DevicesGrid />
    </div>
  )
}
