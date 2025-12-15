'use client'

import { ArrowRight, TrendingUp } from 'lucide-react'
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
            <span className="text-sm font-semibold">Real-Time Steam Market Prices</span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            CS2 Investment<br />
            <span className="text-white">Lookouts</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Track CS2 skin prices from Steam Market in real-time.
            Find the best investment opportunities.
          </p>

          {/* CTA Button */}
          <div className="flex items-center justify-center">
            <Link 
              href="/trending"
              className="group px-8 py-4 bg-white text-black rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-white/20 transition-all flex items-center gap-2"
            >
              View Trending
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
