'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { Search, ShoppingCart, User, Menu, X, TrendingUp, TrendingDown } from 'lucide-react'

interface Skin {
  id: string
  name: string
  weapon: string
  wear: string
  price: number
  priceChange: number
  imageUrl: string
  predictions: Array<{
    signal: string
  }>
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Skin[]>([])
  const [showResults, setShowResults] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setSearchResults([])
      setShowResults(false)
      return
    }
    
    setIsSearching(true)
    const timer = setTimeout(() => {
      fetch(`/api/skins/search?q=${encodeURIComponent(searchQuery)}`)
        .then(res => res.json())
        .then(data => {
          setSearchResults(data)
          setShowResults(true)
          setIsSearching(false)
        })
        .catch(err => {
          console.error('Search error:', err)
          setIsSearching(false)
        })
    }, 300) // Debounce search
    
    return () => clearTimeout(timer)
  }, [searchQuery])

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
          <div className="hidden md:flex flex-1 max-w-2xl mx-8" ref={searchRef}>
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery && setShowResults(true)}
                placeholder="Search for skins, weapons, collections..."
                className="w-full pl-12 pr-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all"
              />
              
              {/* Search Results Dropdown */}
              {showResults && (
                <div className="absolute top-full mt-2 w-full bg-black rounded-2xl border border-white/10 max-h-[500px] overflow-y-auto shadow-2xl z-50">
                  {isSearching ? (
                    <div className="p-8 text-center text-gray-400">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                      <p className="mt-2">Searching...</p>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="p-2">
                      {searchResults.map((skin) => (
                        <Link
                          key={skin.id}
                          href={`/skin/${skin.id}`}
                          onClick={() => {
                            setShowResults(false)
                            setSearchQuery('')
                          }}
                          className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-xl transition-colors group"
                        >
                          {/* Skin Image */}
                          <div className="w-20 h-20 bg-dark-900 rounded-lg border border-white/5 flex items-center justify-center overflow-hidden flex-shrink-0">
                            {skin.imageUrl ? (
                              <img 
                                src={skin.imageUrl}
                                alt={`${skin.weapon} | ${skin.name}`}
                                className="w-full h-full object-contain p-2"
                                loading="lazy"
                              />
                            ) : (
                              <span className="text-2xl opacity-30">🎯</span>
                            )}
                          </div>
                          
                          {/* Skin Info */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-white group-hover:text-brand-primary transition-colors truncate">
                              {skin.weapon} | {skin.name}
                            </h4>
                            <p className="text-sm text-gray-400 truncate">
                              {skin.wear}
                            </p>
                            {skin.predictions[0] && (
                              <span className="inline-block mt-1 px-2 py-0.5 text-xs font-semibold bg-brand-green/10 text-brand-green border border-brand-green/30 rounded-full">
                                {skin.predictions[0].signal}
                              </span>
                            )}
                          </div>
                          
                          {/* Price */}
                          <div className="text-right flex-shrink-0">
                            <div className="font-bold text-white text-lg">
                              ${skin.price.toLocaleString()}
                            </div>
                            <div className={`flex items-center justify-end gap-1 text-sm font-semibold ${
                              skin.priceChange > 0 ? 'text-brand-green' : 'text-brand-red'
                            }`}>
                              {skin.priceChange > 0 ? (
                                <TrendingUp className="w-3 h-3" />
                              ) : (
                                <TrendingDown className="w-3 h-3" />
                              )}
                              {skin.priceChange > 0 ? '+' : ''}{skin.priceChange}%
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-gray-400">
                      <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p>No skins found for "{searchQuery}"</p>
                      <p className="text-sm mt-1">Try searching for weapon names, skin names, or collections</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/trending" className="text-gray-400 hover:text-white transition-colors font-medium">
              Trending
            </Link>
            <a 
              href="https://steamcommunity.com/market/search?appid=730" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors font-medium"
            >
              Steam Market ↗
            </a>
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
              {/* Mobile Search */}
              <div className="relative px-4">
                <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search skins..."
                  className="w-full pl-12 pr-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                />
                
                {/* Mobile Search Results */}
                {searchQuery && (
                  <div className="mt-2 bg-black rounded-2xl border border-white/10 max-h-[400px] overflow-y-auto">
                    {isSearching ? (
                      <div className="p-4 text-center text-gray-400 text-sm">
                        Searching...
                      </div>
                    ) : searchResults.length > 0 ? (
                      <div className="p-2">
                        {searchResults.map((skin) => (
                          <Link
                            key={skin.id}
                            href={`/skin/${skin.id}`}
                            onClick={() => {
                              setMobileMenuOpen(false)
                              setSearchQuery('')
                            }}
                            className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-xl transition-colors"
                          >
                            <div className="w-16 h-16 bg-dark-900 rounded-lg border border-white/5 flex items-center justify-center overflow-hidden flex-shrink-0">
                              {skin.imageUrl ? (
                                <img 
                                  src={skin.imageUrl}
                                  alt={`${skin.weapon} | ${skin.name}`}
                                  className="w-full h-full object-contain p-1"
                                  loading="lazy"
                                />
                              ) : (
                                <span className="text-xl opacity-30">🎯</span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-sm text-white truncate">
                                {skin.weapon} | {skin.name}
                              </h4>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400">{skin.wear}</span>
                                <span className="text-sm font-bold text-white">${skin.price.toLocaleString()}</span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-gray-400 text-sm">
                        No results found
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <Link href="/trending" className="px-4 py-3 glass-hover rounded-xl font-medium" onClick={() => setMobileMenuOpen(false)}>
                Trending
              </Link>
              <a 
                href="https://steamcommunity.com/market/search?appid=730" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 glass-hover rounded-xl font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Steam Market ↗
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
