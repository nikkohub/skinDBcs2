/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: [
      'steamcommunity-a.akamaihd.net',
      'community.cloudflare.steamstatic.com',
      'community.steamstatic.com',
      'cdn.csgofloat.com',
      'images.unsplash.com',
    ],
  },
}

module.exports = nextConfig
