import Link from 'next/link'
import { Twitter, Github, Youtube, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-black text-black">
                SF
              </div>
              <span className="text-xl font-black">SkinFlow</span>
            </div>
            <p className="text-gray-500 mb-6">
              Smart CS2 skin analytics and price tracking platform.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2.5 glass-hover rounded-xl">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2.5 glass-hover rounded-xl">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="p-2.5 glass-hover rounded-xl">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-bold mb-4">Features</h4>
            <ul className="space-y-3 text-gray-500">
              <li><Link href="/trending" className="hover:text-white transition-colors">Trending Skins</Link></li>
              <li><Link href="/database" className="hover:text-white transition-colors">Database</Link></li>
              <li><Link href="/analytics" className="hover:text-white transition-colors">Analytics</Link></li>
              <li><Link href="/predictions" className="hover:text-white transition-colors">Predictions</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-3 text-gray-500">
              <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/api" className="hover:text-white transition-colors">API</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/guides" className="hover:text-white transition-colors">Investment Guides</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2025 SkinFlow. All rights reserved. Not affiliated with Valve Corporation.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
