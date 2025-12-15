'use client'

import { TrendingUp, Users, Package, DollarSign } from 'lucide-react'

export default function Stats() {
  const stats = [
    {
      icon: TrendingUp,
      value: '+24.7%',
      label: 'Avg. Trending Change',
      change: 'Last 24h',
      positive: true,
    },
    {
      icon: Package,
      value: '1,247',
      label: 'Investment Signals',
      change: 'Today',
      positive: true,
    },
    {
      icon: DollarSign,
      value: '$8.2M',
      label: 'Price Movement',
      change: '+18.3%',
      positive: true,
    },
    {
      icon: Users,
      value: '12.4K',
      label: 'Active Trackers',
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
