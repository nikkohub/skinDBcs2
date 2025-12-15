'use client'

import { BarChart3, Shield, Zap, Eye, TrendingUp, Lock } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: TrendingUp,
      title: 'Price Tracking',
      description: 'Real-time price monitoring with historical data. Track every price movement across thousands of skins.',
    },
    {
      icon: BarChart3,
      title: 'Smart Analytics',
      description: 'Advanced charts and insights. Identify patterns and trends before the market reacts.',
    },
    {
      icon: Eye,
      title: 'Investment Signals',
      description: 'Get alerts when skins show rapid price changes. Never miss a profitable opportunity.',
    },
    {
      icon: Zap,
      title: 'Live Updates',
      description: '24/7 real-time data updates. Always have the latest information at your fingertips.',
    },
    {
      icon: Shield,
      title: 'Accurate Data',
      description: 'Reliable price data from multiple sources. Make decisions based on verified information.',
    },
    {
      icon: Lock,
      title: 'Portfolio Tracking',
      description: 'Monitor your inventory value over time. See your profits and losses in real-time.',
    },
  ]

  return (
    <section className="py-24 border-t border-white/10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Powerful <span className="text-white">Features</span>
          </h2>
          <p className="text-xl text-gray-400">
            Everything you need to make smarter CS2 skin investment decisions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
