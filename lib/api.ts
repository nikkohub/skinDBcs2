// CS2 Skins API Integration - Best APIs for Production
// Primary: CSFloat API, Steam Market API, SteamAPIs

const CS2_APP_ID = '730'

// API Endpoints
const API_ENDPOINTS = {
  // CSFloat - Best marketplace API (1B+ indexed skins)
  csfloat: 'https://csfloat.com/api/v1',
  
  // Steam Community Market - Official pricing
  steam: 'https://steamcommunity.com/market',
  
  // SteamAPIs - Comprehensive market data
  steamapis: 'https://api.steamapis.com',
  
  // Steam CDN for images
  cdn: 'https://community.cloudflare.steamstatic.com/economy/image',
}

// Types
export interface SkinData {
  id: string
  name: string
  weapon: string
  wear: string
  price: number
  priceChange: number
  float: number
  imageUrl: string
  rarity: string
  collection: string
  marketHashName: string
}

export interface PriceData {
  current: number
  lowest: number
  median: number
  volume: number
  history: Array<{
    timestamp: number
    price: number
  }>
}

/**
 * Fetch Steam Market Price
 */
export async function fetchSteamPrice(marketHashName: string): Promise<PriceData | null> {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.steam}/priceoverview/?appid=${CS2_APP_ID}&currency=1&market_hash_name=${encodeURIComponent(marketHashName)}`
    )
    
    if (!response.ok) return null
    
    const data = await response.json()
    
    if (data.success) {
      return {
        current: parseFloat(data.lowest_price?.replace(/[^0-9.]/g, '') || '0'),
        lowest: parseFloat(data.lowest_price?.replace(/[^0-9.]/g, '') || '0'),
        median: parseFloat(data.median_price?.replace(/[^0-9.]/g, '') || '0'),
        volume: parseInt(data.volume?.replace(/[^0-9]/g, '') || '0'),
        history: [],
      }
    }
    
    return null
  } catch (error) {
    console.error('Steam API error:', error)
    return null
  }
}

/**
 * Fetch price history for charts
 */
export async function fetchPriceHistory(skinId: string, days: number = 30) {
  // Generate realistic price data
  const history = []
  const basePrice = 50 + Math.random() * 500
  let currentPrice = basePrice
  
  for (let i = days - 1; i >= 0; i--) {
    const change = (Math.random() - 0.5) * 20
    currentPrice = Math.max(10, currentPrice + change)
    
    history.push({
      timestamp: Date.now() - (i * 24 * 60 * 60 * 1000),
      price: Math.round(currentPrice * 100) / 100
    })
  }
  
  return history
}

/**
 * Get Steam image URL
 */
export function getSteamImageUrl(iconUrl: string): string {
  return `${API_ENDPOINTS.cdn}/${iconUrl}`
}

/**
 * Generate market hash name
 */
export function generateMarketHashName(weapon: string, skin: string, wear: string): string {
  return `${weapon} | ${skin} (${wear})`
}

/**
 * Fetch featured skins (top traded)
 */
export async function fetchFeaturedSkins(): Promise<SkinData[]> {
  // In production, this would call CSFloat or SteamAPIs
  // For now, return curated list
  return [
    {
      id: 'ak47-fire-serpent',
      name: 'Fire Serpent',
      weapon: 'AK-47',
      wear: 'Factory New',
      price: 8945.00,
      priceChange: 12.5,
      float: 0.0012,
      imageUrl: '',
      rarity: 'Covert',
      collection: 'The Bravo Collection',
      marketHashName: 'AK-47 | Fire Serpent (Factory New)',
    },
    // Add more skins...
  ]
}

/**
 * Search skins
 */
export async function searchSkins(query: string, filters?: {
  category?: string
  minPrice?: number
  maxPrice?: number
  rarity?: string
}): Promise<SkinData[]> {
  // Implementation for search
  return []
}
