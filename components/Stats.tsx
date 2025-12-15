'use client'

import { TrendingUp, Users, Package, DollarSign } from 'lucide-react'
import { useEffect, useState } from 'react'

interface StatsData {
  totalSkins: string
  totalVolume: string
  avgGains: string
  activeTraders: string
}

export default function Stats() {
  const [statsData, setStatsData] = useState<StatsData>({
    totalSkins: '0',
    totalVolume: '0',
    avgGains: '0%',
    activeTraders: '0'
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
      value: statsData.avgGains,
      label: 'Avg. Price Change',
      change: 'Last 30d',
      positive: true,
    },
    {
      icon: Package,
      value: statsData.totalSkins,
      label: 'Tracked Skins',
      change: 'Database',
      positive: true,
    },
    {
      icon: DollarSign,
      value: statsData.totalVolume,
      label: 'Price Data Points',
      change: 'Historical',
      positive: true,
    },
    {
      icon: Users,
      value: statsData.activeTraders,
      label: 'Active Traders',
      change: '+5.7%',
      positive: true,
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
                    {stat.change}
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
