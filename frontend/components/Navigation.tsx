/**
 * Navigation Component
 * Top navigation bar with links to main sections
 */
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, Folder, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname?.startsWith(path);

  const navLinks = [
    { href: '/', label: 'Dashboard', icon: BarChart3 },
    { href: '/projects', label: 'Projects', icon: Folder },
  ];

  return (
    <nav className="bg-slate-800 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
            <BarChart3 className="w-6 h-6 text-blue-400" />
            NES
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-1">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive(href)
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'text-gray-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors block ${
                  isActive(href)
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'text-gray-300 hover:text-white hover:bg-slate-700'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
