// Steam Market API Integration for CS2 Skins
// Using the public Steam Community Market API (no auth required)

const STEAM_API_BASE = 'https://steamcommunity.com/market'
const STEAM_APP_ID = '730' // CS2/CS:GO

interface SteamPriceOverview {
  success: boolean
  lowest_price?: string
  median_price?: string
  volume?: string
}

interface SteamSearchResult {
  success: boolean
  start: number
  pagesize: number
  total_count: number
  results: Array<{
    name: string
    hash_name: string
    sell_listings: number
    sell_price: number
    sell_price_text: string
    app_icon: string
    app_name: string
    asset_description: {
      appid: number
      icon_url: string
      icon_url_large?: string
      name: string
      type: string
      market_hash_name: string
      tradable: number
      marketable: number
    }
  }>
}

/**
 * Get Steam CDN image URL from icon hash
 */
export function getSteamImageUrl(iconUrl: string): string {
  if (!iconUrl) return ''
  if (iconUrl.startsWith('http')) return iconUrl
  return `https://community.cloudflare.steamstatic.com/economy/image/${iconUrl}`
}

/**
 * Get Buff163 image URL (backup)
 */
export function getBuffImageUrl(iconUrl: string): string {
  if (!iconUrl) return ''
  if (iconUrl.startsWith('http')) return iconUrl
  return `https://buff.163.com${iconUrl}`
}

/**
 * Parse price string from Steam (e.g., "$12.34" or "12,34€")
 */
export function parsePrice(priceString?: string): number {
  if (!priceString) return 0
  
  // Remove all non-numeric characters except dots and commas
  let cleaned = priceString.replace(/[^\d.,]/g, '')
  
  // Handle different decimal separators
  if (cleaned.includes(',') && cleaned.includes('.')) {
    // Format like "1.234,56" (European)
    if (cleaned.lastIndexOf(',') > cleaned.lastIndexOf('.')) {
      cleaned = cleaned.replace(/\./g, '').replace(',', '.')
    } else {
      // Format like "1,234.56" (US)
      cleaned = cleaned.replace(/,/g, '')
    }
  } else if (cleaned.includes(',')) {
    const parts = cleaned.split(',')
    if (parts.length === 2 && parts[1].length <= 2) {
      cleaned = cleaned.replace(',', '.')
    } else {
      cleaned = cleaned.replace(/,/g, '')
    }
  }
  
  return parseFloat(cleaned) || 0
}

/**
 * Fetch price overview from Steam Community Market
 */
export async function fetchSteamPriceOverview(
  marketHashName: string,
  currency: number = 1 // 1 = USD
): Promise<SteamPriceOverview | null> {
  try {
    const url = `${STEAM_API_BASE}/priceoverview/?appid=${STEAM_APP_ID}&currency=${currency}&market_hash_name=${encodeURIComponent(marketHashName)}`
    
    console.log(`Fetching Steam price: ${marketHashName}`)
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
      },
      next: { revalidate: 300 } // Cache for 5 minutes
    })
    
    if (!response.ok) {
      console.error(`Steam API returned ${response.status} for ${marketHashName}`)
      return null
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error fetching Steam price for ${marketHashName}:`, error)
    return null
  }
}

/**
 * Parse Buff163 price (CNY) and convert to USD
 */
export function parseBuffPrice(priceString?: string): number {
  if (!priceString) return 0
  
  const cleanPrice = priceString.replace(/[^0-9.]/g, '')
  const cnyPrice = parseFloat(cleanPrice)
  
  if (isNaN(cnyPrice)) return 0
  
  // Convert CNY to USD (approximate exchange rate)
  const CNY_TO_USD = 0.14
  return Math.round(cnyPrice * CNY_TO_USD * 100) / 100
}

/**
 * Fetch market listings count and price for a skin
 */
export async function fetchMarketListings(marketHashName: string): Promise<{
  price: number
  volume: number
  medianPrice: number
} | null> {
  const data = await fetchSteamPriceOverview(marketHashName)
  
  if (!data?.success) return null
  
  return {
    price: parsePrice(data.lowest_price),
    volume: parseInt(data.volume?.replace(/[^0-9]/g, '') || '0'),
    medianPrice: parsePrice(data.median_price)
  }
}

/**
 * Search Steam Market for items
 */
export async function searchSteamMarket(query: string, count: number = 10): Promise<SteamSearchResult | null> {
  try {
    const url = `${STEAM_API_BASE}/search/render/?appid=${STEAM_APP_ID}&query=${encodeURIComponent(query)}&count=${count}&norender=1`
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
      }
    })
    
    if (!response.ok) return null
    
    return await response.json()
  } catch (error) {
    console.error('Steam Market search error:', error)
    return null
  }
}

/**
 * Fetch multiple skin prices with rate limiting
 */
export async function fetchMultipleSteamPrices(
  marketHashNames: string[],
  delayMs: number = 3000 // Steam rate limits heavily, use 3 second delay
): Promise<Map<string, { price: number; volume: number; medianPrice: number }>> {
  const results = new Map()
  
  for (const name of marketHashNames) {
    const data = await fetchMarketListings(name)
    
    if (data) {
      results.set(name, data)
      console.log(`✓ ${name}: $${data.price} (${data.volume} sold)`)
    } else {
      console.log(`✗ ${name}: Failed to fetch`)
    }
    
    // Rate limit between requests
    if (marketHashNames.indexOf(name) < marketHashNames.length - 1) {
      await new Promise(resolve => setTimeout(resolve, delayMs))
    }
  }
  
  return results
}

/**
 * Get price history URL for a skin (Steam provides this as HTML/JSON)
 */
export function getPriceHistoryUrl(marketHashName: string): string {
  return `${STEAM_API_BASE}/listings/${STEAM_APP_ID}/${encodeURIComponent(marketHashName)}`
}

// Buff163 API Functions (if Steam is blocked/rate limited)

interface Buff163Item {
  id: number
  name: string
  market_hash_name: string
  sell_min_price: string
  sell_num: number
  goods_info: {
    icon_url: string
    steam_price_cny: string
  }
}

/**
 * Fetch skins from Buff163 marketplace
 * Note: May require session cookies for some endpoints
 */
export async function fetchBuff163Market(page: number = 1): Promise<Buff163Item[]> {
  try {
    const url = `https://buff.163.com/api/market/goods?game=csgo&page_num=${page}&page_size=80`
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
      }
    })
    
    if (!response.ok) {
      console.error('Buff163 API error:', response.status)
      return []
    }
    
    const data = await response.json()
    
    if (data.code === 'OK' && data.data?.items) {
      return data.data.items
    }
    
    return []
  } catch (error) {
    console.error('Error fetching Buff163 market:', error)
    return []
  }
}
