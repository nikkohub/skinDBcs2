'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, TrendingUp, TrendingDown, ExternalLink, DollarSign, Eye } from 'lucide-react'
import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface Skin {
  id: string
  name: string
  weapon: string
  wear: string
  price: number
  priceChange: number
  float: number
  imageUrl: string
  rarity: string
  collection: string
  marketHashName: string
  volume: number
  priceHistory: Array<{
    timestamp: string
    price: number
  }>
}

export default function SkinDetailPage() {
  const params = useParams()
  const [skin, setSkin] = useState<Skin | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetch(`/api/skins/${params.id}`)
        .then(res => res.json())
        .then(data => {
          setSkin(data)
          setLoading(false)
        })
        .catch(err => {
          console.error('Error fetching skin:', err)
          setLoading(false)
        })
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
          <p className="text-gray-400">Loading skin data...</p>
        </div>
      </div>
    )
  }

  if (!skin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Skin Not Found</h1>
          <p className="text-gray-400 mb-8">The skin you're looking for doesn't exist.</p>
          <Link href="/" className="px-6 py-3 bg-white text-black rounded-xl font-bold">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const chartData = skin.priceHistory?.map(h => ({
    date: new Date(h.timestamp).toLocaleDateString(),
    price: h.price
  })) || []

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Image */}
          <div>
            <div className="glass rounded-3xl p-8 border border-white/10">
              <div className="aspect-square bg-gradient-to-br from-dark-900 to-dark-800 rounded-2xl border border-white/5 flex items-center justify-center overflow-hidden relative">
                {skin.imageUrl ? (
                  <img 
                    src={skin.imageUrl}
                    alt={`${skin.weapon} | ${skin.name}`}
                    className="w-full h-full object-contain p-12 relative z-10"
                    loading="eager"
                  />
                ) : (
                  <span className="text-9xl opacity-10">🎯</span>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Title & Price */}
            <div>
              <div className="mb-4">
                <h1 className="text-4xl md:text-5xl font-black mb-2">
                  {skin.weapon} | <span className="text-white">{skin.name}</span>
                </h1>
                <p className="text-xl text-gray-400">{skin.wear}</p>
              </div>

              <div className="glass rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Current Price</p>
                    <p className="text-4xl font-black text-white">${skin.price.toLocaleString()}</p>
                  </div>
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${
                    skin.priceChange > 0 
                      ? 'bg-brand-green/10 border-brand-green/30 text-brand-green' 
                      : 'bg-brand-red/10 border-brand-red/30 text-brand-red'
                  }`}>
                    {skin.priceChange > 0 ? (
                      <TrendingUp className="w-5 h-5" />
                    ) : (
                      <TrendingDown className="w-5 h-5" />
                    )}
                    <span className="text-lg font-bold">
                      {skin.priceChange > 0 ? '+' : ''}{skin.priceChange}%
                    </span>
                  </div>
                </div>

                {/* Buy Button */}
                <a
                  href={`https://steamcommunity.com/market/listings/730/${encodeURIComponent(skin.marketHashName)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-white text-black rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                >
                  View on Steam Market
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-2xl p-5 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white/5 rounded-lg">
                    <DollarSign className="w-5 h-5 text-brand-green" />
                  </div>
                  <p className="text-sm text-gray-400">Float Value</p>
                </div>
                <p className="text-2xl font-bold text-white">{skin.float?.toFixed(4) || 'N/A'}</p>
              </div>

              <div className="glass rounded-2xl p-5 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white/5 rounded-lg">
                    <Eye className="w-5 h-5 text-brand-primary" />
                  </div>
                  <p className="text-sm text-gray-400">Listings</p>
                </div>
                <p className="text-2xl font-bold text-white">{skin.volume?.toLocaleString() || 'N/A'}</p>
              </div>

              <div className="glass rounded-2xl p-5 border border-white/10">
                <p className="text-sm text-gray-400 mb-2">Rarity</p>
                <p className="text-lg font-bold text-white">{skin.rarity}</p>
              </div>

              <div className="glass rounded-2xl p-5 border border-white/10">
                <p className="text-sm text-gray-400 mb-2">Collection</p>
                <p className="text-lg font-bold text-white truncate">{skin.collection}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Price History Chart */}
        {chartData.length > 0 && (
          <div className="glass rounded-3xl p-8 border border-white/10">
            <h2 className="text-3xl font-black mb-6">Price History (30 Days)</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis 
                    dataKey="date" 
                    stroke="#666"
                    tick={{ fill: '#999' }}
                  />
                  <YAxis 
                    stroke="#666"
                    tick={{ fill: '#999' }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      color: '#fff'
                    }}
                    formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#00ff88" 
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
