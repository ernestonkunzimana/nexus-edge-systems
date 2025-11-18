import '../globals.css'
import type { ReactNode } from 'react'
import Navigation from '@/components/Navigation'

export const metadata = {
  title: 'Nexus Edge Systems',
  description: 'Enterprise platform - Nexus Edge Systems',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  )
}
