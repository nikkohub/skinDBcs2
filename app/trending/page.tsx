'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Flame } from 'lucide-react'

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
  isTrending?: boolean
}

export default function TrendingPage() {
  const [skins, setSkins] = useState<Skin[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<'default' | 'price' | 'volume'>('default')

  useEffect(() => {
    fetch('/api/skins/trending')
      .then(res => res.json())
      .then(data => {
        setSkins(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching trending skins:', err)
        setLoading(false)
      })
  }, [])

  const sortedSkins = [...skins].sort((a, b) => {
    if (sortBy === 'price') return b.price - a.price
    if (sortBy === 'volume') return b.volume - a.volume
    return 0 // default order from API
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-gray-400">Loading trending skins...</p>
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
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-2 flex items-center gap-3">
              <Flame className="w-10 h-10 text-orange-500" />
              Trending <span className="text-orange-500">Skins</span>
            </h1>
            <p className="text-gray-400">Most wanted CS2 skins & knives by the community</p>
          </div>

          {/* Sort Options */}
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('default')}
              className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                sortBy === 'default' ? 'bg-white text-black' : 'glass-hover'
              }`}
            >
              Trending
            </button>
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
          </div>
        </div>

        {/* Skins Grid */}
        {sortedSkins.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedSkins.map((skin) => (
              <div
                key={skin.id}
                className="glass rounded-2xl overflow-hidden group border border-white/5 hover:border-orange-500/30 transition-colors"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] bg-dark-900 border-b border-white/5 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                  {skin.imageUrl ? (
                    <img 
                      src={skin.imageUrl}
                      alt={`${skin.weapon} | ${skin.name}`}
                      className="absolute inset-0 w-full h-full object-contain p-4"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-10">
                      🎯
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 backdrop-blur-sm rounded-full text-xs font-bold border bg-orange-500/20 border-orange-500/50 text-orange-400 flex items-center gap-1">
                      <Flame className="w-3 h-3" /> Trending
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 backdrop-blur-sm rounded text-xs font-medium ${
                      skin.rarity === 'Covert' ? 'bg-red-500/20 text-red-400' :
                      skin.rarity === 'Classified' ? 'bg-purple-500/20 text-purple-400' :
                      skin.rarity === 'Extraordinary' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {skin.rarity}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="mb-3">
                    <h3 className="font-bold text-lg mb-1 text-white">
                      {skin.weapon}
                    </h3>
                    <p className="text-sm text-gray-400">{skin.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{skin.wear}</p>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-gray-500">From</p>
                      <div className="text-2xl font-black text-white">
                        ${skin.price.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Listings</p>
                      <p className="font-bold text-gray-300">{skin.volume.toLocaleString()}</p>
                    </div>
                  </div>

                  <a
                    href={`https://steamcommunity.com/market/listings/730/${encodeURIComponent(skin.marketHashName)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 glass-hover rounded-xl font-medium text-sm flex items-center justify-center gap-2"
                  >
                    View on Steam
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">No trending skins found</p>
          </div>
        )}
      </div>
    </div>
  )
}
