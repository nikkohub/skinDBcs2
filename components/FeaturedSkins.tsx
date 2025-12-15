'use client'

import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Skin {
  id: string
  name: string
  weapon: string
  wear: string
  price: number
  priceChange: number
  float: number
  imageUrl: string
  predictions: Array<{
    signal: string
    velocity: string
  }>
}

export default function FeaturedSkins() {
  const [skins, setSkins] = useState<Skin[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetch('/api/skins/featured')
      .then(res => res.json())
      .then(data => {
        setSkins(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching skins:', err)
        setLoading(false)
      })
  }, [])
  
  if (loading) {
    return (
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-400">Loading...</div>
        </div>
      </section>
    )
  }
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-3">
              Smart <span className="text-white">Investments</span>
            </h2>
            <p className="text-gray-400 text-lg">Skins with rapid price movements - Perfect timing to buy or sell</p>
          </div>
          <Link 
            href="/trending"
            className="hidden md:flex items-center gap-2 px-6 py-3 glass-hover rounded-xl font-semibold group"
          >
            View All
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Skins Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {skins.map((skin) => {
            const prediction = skin.predictions[0]
            return (
              <div 
                key={skin.id}
                className="glass-hover rounded-2xl overflow-hidden group cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] bg-dark-900 border border-white/5 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <span className={`px-3 py-1 backdrop-blur-sm rounded-full text-xs font-bold border ${
                      skin.priceChange > 0 
                        ? 'bg-brand-green/10 border-brand-green/30 text-brand-green' 
                        : 'bg-brand-red/10 border-brand-red/30 text-brand-red'
                    }`}>
                      {prediction?.signal || 'Hold'}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs font-semibold border border-white/10">
                      {prediction?.velocity || 'Stable'}
                    </span>
                  </div>
                  {/* Actual skin image */}
                  {skin.imageUrl ? (
                    <img 
                      src={skin.imageUrl} 
                      alt={`${skin.weapon} | ${skin.name}`}
                      className="absolute inset-0 w-full h-full object-contain p-4"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-10">
                      🎯
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-lg mb-1 group-hover:text-white transition-colors">
                        {skin.weapon} | {skin.name}
                      </h3>
                      <p className="text-sm text-gray-500">{skin.wear} • Float: {skin.float.toFixed(4)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-black text-white">
                        ${skin.price.toLocaleString()}
                      </div>
                    </div>
                    <div className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border ${
                      skin.priceChange > 0 
                        ? 'bg-brand-green/10 border-brand-green/30 text-brand-green' 
                        : 'bg-brand-red/10 border-brand-red/30 text-brand-red'
                    }`}>
                      {skin.priceChange > 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="text-sm font-bold">
                        {skin.priceChange > 0 ? '+' : ''}{skin.priceChange}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Mobile View All Button */}
        <Link 
          href="/trending"
          className="md:hidden flex items-center justify-center gap-2 w-full px-6 py-4 glass-hover rounded-xl font-semibold group"
        >
          View All Opportunities
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  )
}
