// Steam Market API Integration for CS2 skins
// Supports multiple currencies

const STEAM_APP_ID = '730' // CS2/CS:GO
const STEAM_API_BASE = 'https://steamcommunity.com/market'

// Steam Currency Codes
export enum SteamCurrency {
  USD = 1,    // US Dollar $
  GBP = 2,    // British Pound £
  EUR = 3,    // Euro €
  RUB = 5,    // Russian Ruble ₽
  BRL = 7,    // Brazilian Real R$
  JPY = 8,    // Japanese Yen ¥
  CNY = 23,   // Chinese Yuan ¥
  CAD = 20,   // Canadian Dollar C$
  AUD = 21,   // Australian Dollar A$
}

export const CURRENCY_SYMBOLS: Record<number, string> = {
  1: '$',
  2: '£',
  3: '€',
  5: '₽',
  7: 'R$',
  8: '¥',
  20: 'C$',
  21: 'A$',
  23: '¥',
}

interface SteamPriceData {
  success: boolean
  lowest_price?: string
  median_price?: string
  volume?: string
}

/**
 * Fetch current market price from Steam
 */
export async function fetchSteamPrice(
  marketHashName: string,
  currency: SteamCurrency = SteamCurrency.USD
): Promise<SteamPriceData | null> {
  try {
    const url = `${STEAM_API_BASE}/priceoverview/?appid=${STEAM_APP_ID}&currency=${currency}&market_hash_name=${encodeURIComponent(marketHashName)}`
    
    console.log(`Fetching: ${marketHashName}`)
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
      }
    })
    
    if (!response.ok) {
      console.error(`Steam API returned ${response.status} for ${marketHashName}`)
      return null
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error fetching price for ${marketHashName}:`, error)
    return null
  }
}

/**
 * Parse price string to number (removes currency symbols)
 */
export function parsePrice(priceString?: string): number {
  if (!priceString) return 0
  
  // Remove all non-numeric characters except dots and commas
  let cleaned = priceString.replace(/[^\d.,]/g, '')
  
  // Handle different decimal separators
  // If there's a comma as last separator, it's likely decimal
  if (cleaned.includes(',') && cleaned.includes('.')) {
    // Format like "1.234,56" (European)
    if (cleaned.lastIndexOf(',') > cleaned.lastIndexOf('.')) {
      cleaned = cleaned.replace(/\./g, '').replace(',', '.')
    } else {
      // Format like "1,234.56" (US)
      cleaned = cleaned.replace(/,/g, '')
    }
  } else if (cleaned.includes(',')) {
    // Only comma - could be thousands or decimal
    const parts = cleaned.split(',')
    if (parts.length === 2 && parts[1].length <= 2) {
      // Likely decimal: "12,34"
      cleaned = cleaned.replace(',', '.')
    } else {
      // Likely thousands: "1,234"
      cleaned = cleaned.replace(/,/g, '')
    }
  }
  
  const price = parseFloat(cleaned)
  return isNaN(price) ? 0 : price
}

/**
 * Fetch prices for multiple items with rate limiting
 */
export async function fetchMultiplePrices(
  items: Array<{ name: string, marketHashName: string }>,
  currency: SteamCurrency = SteamCurrency.USD,
  delayMs: number = 2000
): Promise<Map<string, { price: number, volume: number }>> {
  const results = new Map<string, { price: number, volume: number }>()
  
  console.log(`\nFetching prices for ${items.length} items in currency ${currency}...\n`)
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    
    const data = await fetchSteamPrice(item.marketHashName, currency)
    
    if (data?.success && data.lowest_price) {
      const price = parsePrice(data.lowest_price)
      const volume = parseInt(data.volume?.replace(/,/g, '') || '0')
      
      results.set(item.marketHashName, { price, volume })
      console.log(`✓ [${i + 1}/${items.length}] ${item.name}: ${CURRENCY_SYMBOLS[currency]}${price.toFixed(2)}`)
    } else {
      console.log(`✗ [${i + 1}/${items.length}] ${item.name}: Failed`)
    }
    
    // Rate limiting
    if (i < items.length - 1) {
      await new Promise(resolve => setTimeout(resolve, delayMs))
    }
  }
  
  console.log(`\n✓ Fetched ${results.size}/${items.length} prices successfully\n`)
  
  return results
}

/**
 * Get Steam CDN image URL
 */
export function getSteamImageUrl(iconUrl: string): string {
  if (iconUrl.startsWith('http')) return iconUrl
  return `https://community.steamstatic.com/economy/image/${iconUrl}`
}
