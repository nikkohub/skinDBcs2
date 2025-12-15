// Buff163 API Integration for CS2 Skin Prices
// Buff.163.com is a Chinese marketplace with accurate CS2 skin prices

const BUFF_API_BASE = 'https://buff.163.com/api/market/goods'
const BUFF_APP_ID = 730 // CS2/CS:GO

// Currency conversion rates (update these periodically or use a real-time API)
export const CURRENCY_RATES = {
  CNY: 1,      // Chinese Yuan (base)
  USD: 0.14,   // US Dollar
  EUR: 0.13,   // Euro
  GBP: 0.11,   // British Pound
  SEK: 1.48,   // Swedish Krona
}

export type Currency = keyof typeof CURRENCY_RATES

interface BuffItem {
  id: string
  name: string
  market_hash_name: string
  sell_min_price: string
  sell_reference_price: string
  goods_info: {
    icon_url: string
    steam_price_cny: string
  }
  sell_num: number
}

/**
 * Convert CNY price to another currency
 */
export function convertCurrency(amountCNY: number, toCurrency: Currency = 'USD'): number {
  const rate = CURRENCY_RATES[toCurrency]
  return Math.round(amountCNY * rate * 100) / 100
}

/**
 * Search for items on Buff163
 */
export async function searchBuff163(query: string): Promise<BuffItem[]> {
  try {
    const url = `${BUFF_API_BASE}?game=csgo&page_num=1&search=${encodeURIComponent(query)}`
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
      }
    })
    
    if (!response.ok) {
      throw new Error(`Buff163 API error: ${response.status}`)
    }
    
    const data = await response.json()
    return data.data?.items || []
  } catch (error) {
    console.error('Buff163 search error:', error)
    return []
  }
}

/**
 * Get item details from Buff163 by market hash name
 */
export async function getBuffItemByName(marketHashName: string, currency: Currency = 'USD'): Promise<any | null> {
  try {
    const items = await searchBuff163(marketHashName)
    const item = items.find(i => i.market_hash_name === marketHashName)
    
    if (!item) return null
    
    const priceInCNY = parseFloat(item.sell_min_price || '0')
    const price = convertCurrency(priceInCNY, currency)
    
    return {
      name: item.name,
      marketHashName: item.market_hash_name,
      price: price,
      priceInCNY: priceInCNY,
      volume: item.sell_num,
      imageUrl: item.goods_info?.icon_url ? `https://buff.163.com${item.goods_info.icon_url}` : '',
      steamPriceCNY: parseFloat(item.goods_info?.steam_price_cny || '0')
    }
  } catch (error) {
    console.error(`Error fetching Buff163 data for ${marketHashName}:`, error)
    return null
  }
}

/**
 * Fetch multiple items with rate limiting
 */
export async function fetchMultipleBuffPrices(
  marketHashNames: string[], 
  currency: Currency = 'USD'
): Promise<Map<string, any>> {
  const results = new Map()
  
  for (const name of marketHashNames) {
    // Rate limit: 1 second between requests
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const item = await getBuffItemByName(name, currency)
    if (item) {
      results.set(name, item)
      console.log(`✓ ${name}: ${currency === 'USD' ? '$' : ''}${item.price} ${currency}`)
    } else {
      console.log(`✗ ${name}: Not found on Buff163`)
    }
  }
  
  return results
}
