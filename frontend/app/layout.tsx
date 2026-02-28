import type { ReactNode } from 'react'
import type { Metadata, Viewport } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nexus Edge Systems | IT Solutions & Enterprise Services',
  description: 'Leading provider of enterprise IT solutions, hardware maintenance, networking, and digital transformation services for SACCOs, financial institutions, and healthcare.',
  keywords: [
    'IT solutions',
    'hardware maintenance',
    'networking',
    'enterprise services',
    'SACCO services',
    'financial systems',
    'CCTV security',
  ],
  authors: [{ name: 'Nexus Edge Systems LTD' }],
  creator: 'Nexus Edge Systems',
  publisher: 'Nexus Edge Systems',
  openGraph: {
    type: 'website',
    url: 'https://nexusedgesystems.com',
    title: 'Nexus Edge Systems | IT Solutions & Enterprise Services',
    description: 'Enterprise IT solutions, hardware maintenance, and digital transformation',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nexus Edge Systems',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#3b82f6',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <link rel="canonical" href="https://nexusedgesystems.com" />
      </head>
      <body className="bg-slate-950">
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
