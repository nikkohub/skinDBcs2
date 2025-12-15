import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-black text-black">
                SF
              </div>
              <span className="text-xl font-black">SkinFlow</span>
            </div>
            <p className="text-gray-500 mb-6">
              CS2 skin price checker powered by Steam Market data.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-gray-500">
              <li><Link href="/trending" className="hover:text-white transition-colors">Trending Skins</Link></li>
              <li><Link href="/database" className="hover:text-white transition-colors">All Skins</Link></li>
            </ul>
          </div>

          {/* External */}
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-3 text-gray-500">
              <li>
                <a 
                  href="https://steamcommunity.com/market/search?appid=730" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-2"
                >
                  Steam Market <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://csfloat.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-2"
                >
                  CSFloat <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://buff.163.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-2"
                >
                  Buff163 <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-gray-500">
            © 2025 SkinFlow. Not affiliated with Valve Corporation. Prices from Steam Community Market.
          </p>
        </div>
      </div>
    </footer>
  )
}
