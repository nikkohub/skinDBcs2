/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: [
      'steamcommunity-a.akamaihd.net',
      'community.cloudflare.steamstatic.com',
      'cdn.csgofloat.com',
    ],
  },
}

module.exports = nextConfig
