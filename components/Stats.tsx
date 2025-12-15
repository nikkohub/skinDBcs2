'use client'

import { TrendingUp, Package, DollarSign, BarChart3 } from 'lucide-react'
import { useEffect, useState } from 'react'

interface StatsData {
  totalSkins: string
  priceDataPoints: string
  avgPriceChange: string
  totalVolume: string
}

export default function Stats() {
  const [statsData, setStatsData] = useState<StatsData>({
    totalSkins: '0',
    priceDataPoints: '0',
    avgPriceChange: '0%',
    totalVolume: '0'
  })
  
  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setStatsData(data))
      .catch(console.error)
  }, [])
  
  const stats = [
    {
      icon: TrendingUp,
      value: statsData.avgPriceChange,
      label: 'Avg. Price Change',
      sublabel: '30 day average',
    },
    {
      icon: Package,
      value: statsData.totalSkins,
      label: 'Tracked Skins',
      sublabel: 'In database',
    },
    {
      icon: BarChart3,
      value: statsData.priceDataPoints,
      label: 'Price Records',
      sublabel: 'Historical data',
    },
    {
      icon: DollarSign,
      value: statsData.totalVolume,
      label: 'Market Volume',
      sublabel: 'Total listings',
    },
  ]

  return (
    <section className="py-16 border-y border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div 
                key={index}
                className="glass-hover p-6 rounded-2xl group border border-white/5"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-white/5 rounded-xl group-hover:scale-110 transition-transform border border-white/10">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10">
                    {stat.sublabel}
                  </span>
                </div>
                <div className="text-3xl font-black mb-2 text-white">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
