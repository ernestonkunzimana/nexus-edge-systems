import '../globals.css'

export const metadata = {
  title: 'Nexus Edge Systems',
  description: 'Enterprise platform - Nexus Edge Systems',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
