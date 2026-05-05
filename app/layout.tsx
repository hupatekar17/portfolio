import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Harshavardhan Patekar — Software Developer',
  description: 'Backend & Full-Stack Developer | Python, Node.js, React | MSc AI (DCU)',
  openGraph: {
    title: 'Harshavardhan Patekar',
    description: 'Backend Software Developer building scalable systems',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="noise-bg">
      <body className="min-h-screen bg-bg text-text antialiased">
        <Navbar />
        <main>{children}</main>
        <footer className="border-t border-border mt-24 py-8 text-center text-muted font-mono text-xs">
          <span className="text-accent">$</span> harsha.exe —{' '}
          <span>built with Next.js + MongoDB</span>
        </footer>
      </body>
    </html>
  )
}
