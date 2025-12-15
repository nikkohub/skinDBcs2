'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-white rounded-xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative w-12 h-12 bg-white rounded-xl flex items-center justify-center font-black text-xl text-black">
                SF
              </div>
            </div>
            <span className="text-2xl font-black tracking-tight hidden sm:block">
              Skin<span className="text-white">Flow</span>
            </span>
          </Link>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for skins, weapons, collections..."
                className="w-full pl-12 pr-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/trending" className="text-gray-400 hover:text-white transition-colors font-medium">
              Trending
            </Link>
            <Link href="/database" className="text-gray-400 hover:text-white transition-colors font-medium">
              Database
            </Link>
            <Link href="/analytics" className="text-gray-400 hover:text-white transition-colors font-medium">
              Analytics
            </Link>
            <Link href="/predictions" className="text-gray-400 hover:text-white transition-colors font-medium">
              Predictions
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2.5 glass-hover rounded-xl"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-white/10">
            <div className="flex flex-col gap-4">
              <Link href="/trending" className="px-4 py-3 glass-hover rounded-xl font-medium">
                Trending
              </Link>
              <Link href="/database" className="px-4 py-3 glass-hover rounded-xl font-medium">
                Database
              </Link>
              <Link href="/analytics" className="px-4 py-3 glass-hover rounded-xl font-medium">
                Analytics
              </Link>
              <Link href="/predictions" className="px-4 py-3 glass-hover rounded-xl font-medium">
                Predictions
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
