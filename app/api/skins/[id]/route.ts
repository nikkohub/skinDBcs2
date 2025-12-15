import { NextResponse } from 'next/server'

const STEAM_APP_ID = '730'

function parseMarketHashName(hashName: string): { weapon: string; name: string; wear: string } {
  const match = hashName.match(/^(.+?)\s*\|\s*(.+?)\s*\((.+?)\)$/)
  if (match) {
    return { weapon: match[1].trim(), name: match[2].trim(), wear: match[3].trim() }
  }
  const wearMatch = hashName.match(/^(.+?)\s*\((.+?)\)$/)
  if (wearMatch) {
    return { weapon: '', name: wearMatch[1].trim(), wear: wearMatch[2].trim() }
  }
  return { weapon: '', name: hashName, wear: '' }
}

function getRarity(type: string): string {
  if (type.includes('Covert')) return 'Covert'
  if (type.includes('Classified')) return 'Classified'
  if (type.includes('Restricted')) return 'Restricted'
  if (type.includes('Mil-Spec')) return 'Mil-Spec'
  if (type.includes('★')) return 'Extraordinary'
  return 'Unknown'
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Decode the market hash name from the URL
    const marketHashName = decodeURIComponent(params.id)
    
    // Fetch price and listing data from Steam Market
    const priceUrl = `https://steamcommunity.com/market/priceoverview/?appid=${STEAM_APP_ID}&currency=1&market_hash_name=${encodeURIComponent(marketHashName)}`
    
    const priceResponse = await fetch(priceUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
      },
      next: { revalidate: 60 }
    })
    
    // Also search to get the image
    const searchUrl = `https://steamcommunity.com/market/search/render/?appid=${STEAM_APP_ID}&query=${encodeURIComponent(marketHashName)}&count=1&norender=1`
    
    const searchResponse = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
      },
      next: { revalidate: 60 }
    })
    
    let price = 0
    let volume = 0
    let imageUrl = ''
    let rarity = 'Unknown'
    
    if (priceResponse.ok) {
      const priceData = await priceResponse.json()
      if (priceData.success) {
        // Parse price like "$1,234.56" to number
        const priceStr = priceData.lowest_price || priceData.median_price || '$0'
        price = parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0
        volume = parseInt(priceData.volume?.replace(/,/g, '') || '0') || 0
      }
    }
    
    if (searchResponse.ok) {
      const searchData = await searchResponse.json()
      if (searchData.success && searchData.results?.[0]) {
        const item = searchData.results[0]
        imageUrl = item.asset_description?.icon_url 
          ? `https://community.cloudflare.steamstatic.com/economy/image/${item.asset_description.icon_url}`
          : ''
        rarity = getRarity(item.asset_description?.type || '')
        if (!volume && item.sell_listings) {
          volume = item.sell_listings
        }
      }
    }
    
    const parsed = parseMarketHashName(marketHashName)
    
    const skin = {
      id: params.id,
      name: parsed.name,
      weapon: parsed.weapon,
      wear: parsed.wear,
      price: price,
      priceChange: 0,
      float: 0,
      imageUrl: imageUrl,
      rarity: rarity,
      collection: '',
      marketHashName: marketHashName,
      volume: volume,
      priceHistory: [] // Steam doesn't provide historical data via this API
    }
    
    return NextResponse.json(skin)
  } catch (error) {
    console.error('Error fetching skin:', error)
    return NextResponse.json({ error: 'Failed to fetch skin' }, { status: 500 })
  }
}
