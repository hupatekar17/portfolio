'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: '~/home', short: 'home' },
  { href: '/projects', label: '~/projects', short: 'projects' },
  { href: '/blog', label: '~/blog', short: 'blog' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="w-full mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-mono text-sm sm:text-base font-medium">
          <span className="text-accent">❯</span>{' '}
          <span className="text-text hover:text-accent transition-colors">hp</span>
        </Link>

        <div className="flex items-center gap-0.5 sm:gap-1">
          {links.map(({ href, label, short }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`font-mono text-xs sm:text-sm px-2 sm:px-3 py-1.5 rounded transition-all ${
                  active
                    ? 'text-accent bg-accent/10'
                    : 'text-muted hover:text-text hover:bg-surface'
                }`}
              >
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">{short}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
