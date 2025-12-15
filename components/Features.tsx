'use client'

import { BarChart3, Search, TrendingUp, ExternalLink } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: Search,
      title: 'Instant Search',
      description: 'Search any CS2 skin and get real-time prices directly from the Steam Community Market.',
    },
    {
      icon: TrendingUp,
      title: 'Price Tracking',
      description: 'Monitor price changes over time. See which skins are rising or falling in value.',
    },
    {
      icon: BarChart3,
      title: 'Price History',
      description: 'View historical price charts to understand market trends before buying or selling.',
    },
    {
      icon: ExternalLink,
      title: 'Direct Links',
      description: 'Click through directly to Steam Market listings to make purchases instantly.',
    },
  ]

  return (
    <section className="py-24 border-t border-white/10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            How It <span className="text-white">Works</span>
          </h2>
          <p className="text-xl text-gray-400">
            Get accurate CS2 skin prices powered by Steam Market data.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div 
                key={index}
                className="glass-hover p-8 rounded-2xl group border border-white/5"
              >
                <div className="inline-flex p-4 bg-white/5 rounded-2xl mb-6 group-hover:scale-110 transition-transform border border-white/10">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black mb-4 group-hover:text-white transition-colors text-gray-200">
                  {feature.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
