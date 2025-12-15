'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Search, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'

interface Skin {
  id: string
  name: string
  weapon: string
  wear: string
  price: number
  imageUrl: string
  rarity: string
  marketHashName: string
  volume: number
}

const SKINS_PER_PAGE = 20

export default function DatabasePage() {
  const [skins, setSkins] = useState<Skin[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'price' | 'name' | 'volume'>('price')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetch('/api/skins/all')
      .then(res => res.json())
      .then(data => {
        setSkins(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching skins:', err)
        setLoading(false)
      })
  }, [])

  // Reset to page 1 when search or sort changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, sortBy])

  const filteredSkins = skins
    .filter(skin => {
      if (!searchQuery) return true
      const query = searchQuery.toLowerCase()
      return (
        skin.name.toLowerCase().includes(query) ||
        skin.weapon.toLowerCase().includes(query) ||
        skin.marketHashName.toLowerCase().includes(query)
      )
    })
    .sort((a, b) => {
      if (sortBy === 'price') return b.price - a.price
      if (sortBy === 'name') return a.weapon.localeCompare(b.weapon)
      if (sortBy === 'volume') return b.volume - a.volume
      return 0
    })

  // Pagination calculations
  const totalPages = Math.ceil(filteredSkins.length / SKINS_PER_PAGE)
  const startIndex = (currentPage - 1) * SKINS_PER_PAGE
  const paginatedSkins = filteredSkins.slice(startIndex, startIndex + SKINS_PER_PAGE)

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const showPages = 5 // Show 5 page numbers at a time
    
    if (totalPages <= showPages + 2) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      // Always show first page
      pages.push(1)
      
      // Calculate start and end of middle section
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)
      
      // Adjust if at the beginning
      if (currentPage <= 3) {
        end = Math.min(showPages, totalPages - 1)
      }
      
      // Adjust if at the end
      if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - showPages + 1)
      }
      
      // Add ellipsis after first page if needed
      if (start > 2) pages.push('...')
      
      // Add middle pages
      for (let i = start; i <= end; i++) pages.push(i)
      
      // Add ellipsis before last page if needed
      if (end < totalPages - 1) pages.push('...')
      
      // Always show last page
      pages.push(totalPages)
    }
    
    return pages
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
          <p className="text-gray-400">Loading skins database...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black mb-2">
            Skin <span className="text-white">Database</span>
          </h1>
          <p className="text-gray-400">Browse all tracked CS2 skins</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter skins..."
              className="w-full pl-12 pr-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
            />
          </div>

          {/* Sort Options */}
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('price')}
              className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                sortBy === 'price' ? 'bg-white text-black' : 'glass-hover'
              }`}
            >
              Price
            </button>
            <button
              onClick={() => setSortBy('volume')}
              className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                sortBy === 'volume' ? 'bg-white text-black' : 'glass-hover'
              }`}
            >
              Listings
            </button>
            <button
              onClick={() => setSortBy('name')}
              className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                sortBy === 'name' ? 'bg-white text-black' : 'glass-hover'
              }`}
            >
              Name
            </button>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-gray-400 mb-6">
          {filteredSkins.length} skins found
          {filteredSkins.length > 0 && (
            <span className="text-gray-500"> • Showing {startIndex + 1}-{Math.min(startIndex + SKINS_PER_PAGE, filteredSkins.length)} of {filteredSkins.length}</span>
          )}
        </p>

        {/* Skins Table */}
        {paginatedSkins.length > 0 ? (
          <div className="glass rounded-2xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 text-left">
                    <th className="px-6 py-4 text-sm font-semibold text-gray-400">Skin</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-400">Wear</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-400">Price</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-400">Listings</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-400">Rarity</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-400"></th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedSkins.map((skin) => (
                    <tr key={skin.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-16 h-16 rounded-lg border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0 ${
                            skin.rarity === 'Covert' ? 'bg-gradient-to-br from-red-500/30 to-red-900/30' :
                            skin.rarity === 'Extraordinary' ? 'bg-gradient-to-br from-yellow-500/30 to-yellow-900/30' :
                            skin.rarity === 'Classified' ? 'bg-gradient-to-br from-purple-500/30 to-purple-900/30' :
                            skin.rarity === 'Restricted' ? 'bg-gradient-to-br from-blue-500/30 to-blue-900/30' :
                            'bg-gradient-to-br from-gray-500/30 to-gray-900/30'
                          }`}>
                            {skin.imageUrl ? (
                              <img 
                                src={skin.imageUrl}
                                alt={skin.marketHashName}
                                className="w-full h-full object-contain p-1"
                                loading="lazy"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.style.display = 'none'
                                }}
                              />
                            ) : (
                              <span className="text-xs text-white/50 text-center font-medium px-1">
                                {skin.weapon.includes('Knife') ? '🔪' : 
                                 skin.weapon.includes('Gloves') ? '🧤' :
                                 skin.weapon === 'AWP' ? '🎯' :
                                 skin.weapon === 'AK-47' ? '🔫' :
                                 skin.weapon === 'M4A4' || skin.weapon === 'M4A1-S' ? '🔫' :
                                 '🎮'}
                              </span>
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-white">{skin.weapon}</div>
                            <div className="text-sm text-gray-400">{skin.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400">{skin.wear}</td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-white">${skin.price.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-400">{skin.volume.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                          skin.rarity === 'Covert' ? 'bg-red-500/20 text-red-400' :
                          skin.rarity === 'Classified' ? 'bg-purple-500/20 text-purple-400' :
                          skin.rarity === 'Restricted' ? 'bg-blue-500/20 text-blue-400' :
                          skin.rarity === 'Mil-Spec' ? 'bg-sky-500/20 text-sky-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {skin.rarity}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={`https://steamcommunity.com/market/listings/730/${encodeURIComponent(skin.marketHashName)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 glass-hover rounded-lg text-sm font-medium flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Steam
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 glass rounded-2xl border border-white/10">
            <p className="text-gray-400 text-xl mb-2">No skins found</p>
            <p className="text-gray-500">Try a different search term</p>
          </div>
        )}
          
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg transition-colors ${
                currentPage === 1 
                  ? 'text-gray-600 cursor-not-allowed' 
                  : 'glass-hover text-white'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Page Numbers */}
            {getPageNumbers().map((page, index) => (
              typeof page === 'number' ? (
                <button
                  key={index}
                  onClick={() => setCurrentPage(page)}
                  className={`min-w-[40px] h-10 rounded-lg font-medium transition-colors ${
                    currentPage === page 
                      ? 'bg-white text-black' 
                      : 'glass-hover text-white'
                  }`}
                >
                  {page}
                </button>
              ) : (
                <span key={index} className="px-2 text-gray-500">...</span>
              )
            ))}
            
            {/* Next Button */}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg transition-colors ${
                currentPage === totalPages 
                  ? 'text-gray-600 cursor-not-allowed' 
                  : 'glass-hover text-white'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
