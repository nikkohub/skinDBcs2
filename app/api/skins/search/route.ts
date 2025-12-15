import { NextResponse } from 'next/server'

const STEAM_APP_ID = '730'

interface SteamMarketResult {
  name: string
  hash_name: string
  sell_listings: number
  sell_price: number
  sell_price_text: string
  asset_description: {
    icon_url: string
    type: string
    market_hash_name: string
  }
}

// Parse Steam price string to number
function parsePrice(priceString: string): number {
  const cleaned = priceString.replace(/[^\d.,]/g, '')
  if (cleaned.includes(',') && cleaned.includes('.')) {
    if (cleaned.lastIndexOf(',') > cleaned.lastIndexOf('.')) {
      return parseFloat(cleaned.replace(/\./g, '').replace(',', '.')) || 0
    }
    return parseFloat(cleaned.replace(/,/g, '')) || 0
  }
  if (cleaned.includes(',')) {
    const parts = cleaned.split(',')
    if (parts.length === 2 && parts[1].length <= 2) {
      return parseFloat(cleaned.replace(',', '.')) || 0
    }
    return parseFloat(cleaned.replace(/,/g, '')) || 0
  }
  return parseFloat(cleaned) || 0
}

// Parse weapon and skin name from market hash name
function parseMarketHashName(hashName: string): { weapon: string; name: string; wear: string } {
  // Pattern: "Weapon | Skin Name (Wear)"
  const match = hashName.match(/^(.+?)\s*\|\s*(.+?)\s*\((.+?)\)$/)
  if (match) {
    return { weapon: match[1].trim(), name: match[2].trim(), wear: match[3].trim() }
  }
  // For items without | (like cases, stickers)
  const wearMatch = hashName.match(/^(.+?)\s*\((.+?)\)$/)
  if (wearMatch) {
    return { weapon: '', name: wearMatch[1].trim(), wear: wearMatch[2].trim() }
  }
  return { weapon: '', name: hashName, wear: '' }
}

// Get rarity from type string
function getRarity(type: string): string {
  if (type.includes('Covert')) return 'Covert'
  if (type.includes('Classified')) return 'Classified'
  if (type.includes('Restricted')) return 'Restricted'
  if (type.includes('Mil-Spec')) return 'Mil-Spec'
  if (type.includes('Industrial')) return 'Industrial'
  if (type.includes('Consumer')) return 'Consumer'
  if (type.includes('★')) return 'Knife'
  return 'Unknown'
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    
    if (!query || query.trim().length < 2) {
      return NextResponse.json([])
    }
    
    // Always search Steam Market directly for real data
    const steamUrl = `https://steamcommunity.com/market/search/render/?appid=${STEAM_APP_ID}&query=${encodeURIComponent(query)}&count=10&norender=1`
    
    const steamResponse = await fetch(steamUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
      },
      next: { revalidate: 60 } // Cache for 1 minute
    })
    
    if (!steamResponse.ok) {
      console.error('Steam API error:', steamResponse.status)
      return NextResponse.json([])
    }
    
    const steamData = await steamResponse.json()
    
    if (!steamData.success || !steamData.results) {
      return NextResponse.json([])
    }
    
    const steamResults = steamData.results.map((item: SteamMarketResult) => {
      const parsed = parseMarketHashName(item.hash_name)
      const price = item.sell_price / 100 // Steam returns price in cents
      
      return {
        id: encodeURIComponent(item.hash_name), // Use URL-safe market hash name as ID
        name: parsed.name,
        weapon: parsed.weapon,
        wear: parsed.wear,
        price: price,
        priceChange: 0,
        float: 0,
        imageUrl: item.asset_description?.icon_url 
          ? `https://community.cloudflare.steamstatic.com/economy/image/${item.asset_description.icon_url}`
          : '',
        rarity: getRarity(item.asset_description?.type || ''),
        collection: '',
        marketHashName: item.hash_name,
        volume: item.sell_listings,
        predictions: []
      }
    })
    
    return NextResponse.json(steamResults)
  } catch (error) {
    console.error('Error searching skins:', error)
    return NextResponse.json({ error: 'Failed to search skins' }, { status: 500 })
  }
}
