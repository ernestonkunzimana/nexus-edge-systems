import ContactForm from '@/components/pages/ContactForm'
import PageHeader from '@/components/pages/PageHeader'

export const metadata = {
  title: 'Contact Us | Nexus Edge Systems',
  description: 'Get in touch with our team. Fill out the form or reach us directly via phone, email, or WhatsApp.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="Get In Touch"
        subtitle="We'd love to hear from you"
        description="Have questions about our services? Contact us today and let's discuss how we can help your business."
      />
      <ContactForm />
    </div>
  )
}
