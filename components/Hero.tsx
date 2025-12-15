'use client'

import { ArrowRight, TrendingUp, Zap, Shield } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8 animate-float">
            <TrendingUp className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold">Real-Time Analytics • Price Predictions • Smart Signals</span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            Smart CS2 Skin<br />
            <span className="text-white">Analytics</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Track prices, discover investment opportunities, and make smarter decisions.
            Advanced analytics powered by real-time market data.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link 
              href="/trending"
              className="group px-8 py-4 bg-white text-black rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-white/20 transition-all flex items-center gap-2"
            >
              View Opportunities
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/database"
              className="px-8 py-4 glass-hover rounded-xl font-bold text-lg border border-white/10"
            >
              Explore Database
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="glass p-6 rounded-2xl border border-white/5">
              <div className="text-3xl font-black text-white mb-2">1.2M+</div>
              <div className="text-sm text-gray-500">Tracked Skins</div>
            </div>
            <div className="glass p-6 rounded-2xl border border-white/5">
              <div className="text-3xl font-black text-white mb-2">24/7</div>
              <div className="text-sm text-gray-500">Live Updates</div>
            </div>
            <div className="glass p-6 rounded-2xl border border-white/5">
              <div className="text-3xl font-black text-white mb-2">89%</div>
              <div className="text-sm text-gray-500">Accuracy Rate</div>
            </div>
            <div className="glass p-6 rounded-2xl border border-white/5">
              <div className="text-3xl font-black text-white mb-2">Free</div>
              <div className="text-sm text-gray-500">No Fees</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
