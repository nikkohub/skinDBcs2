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

// Parse weapon and skin name from market hash name
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

// Get rarity from type string
function getRarity(type: string): string {
  if (type.includes('Covert')) return 'Covert'
  if (type.includes('Classified')) return 'Classified'
  if (type.includes('Restricted')) return 'Restricted'
  if (type.includes('Mil-Spec')) return 'Mil-Spec'
  if (type.includes('Industrial')) return 'Industrial'
  if (type.includes('Consumer')) return 'Consumer'
  if (type.includes('Extraordinary')) return 'Extraordinary'
  if (type.includes('★') || type.includes('Knife') || type.includes('Gloves')) return 'Extraordinary'
  return 'Unknown'
}

// Popular skin searches to get a good variety of skins with images
const SEARCH_QUERIES = [
  'Karambit',
  'Butterfly Knife', 
  'M9 Bayonet',
  'AWP Dragon',
  'AWP Asiimov',
  'AWP Fade',
  'AK-47 Fire',
  'AK-47 Vulcan',
  'AK-47 Asiimov',
  'M4A4 Howl',
  'M4A4 Asiimov',
  'M4A1-S',
  'Desert Eagle',
  'USP-S',
  'Glock Fade',
  'Sport Gloves',
  'Driver Gloves',
  'Specialist Gloves',
  'Flip Knife',
  'Bayonet Doppler',
  'Talon Knife',
  'AWP Lightning',
  'AWP Hyper',
  'AWP Medusa',
  'AK-47 Neon',
]

// Cache for fetched skins
let cachedSkins: any[] = []
let cacheTime: number = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

async function fetchSkinsFromSteam(): Promise<any[]> {
  const allSkins: any[] = []
  const seenHashes = new Set<string>()
  
  // Fetch skins from multiple search queries
  for (const query of SEARCH_QUERIES) {
    try {
      const steamUrl = `https://steamcommunity.com/market/search/render/?appid=${STEAM_APP_ID}&query=${encodeURIComponent(query)}&count=10&norender=1`
      
      const response = await fetch(steamUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'application/json',
        },
      })
      
      if (!response.ok) {
        console.log(`Steam API returned ${response.status} for query: ${query}`)
        continue
      }
      
      const data = await response.json()
      
      if (!data.success || !data.results) {
        continue
      }
      
      for (const item of data.results as SteamMarketResult[]) {
        // Skip duplicates
        if (seenHashes.has(item.hash_name)) continue
        seenHashes.add(item.hash_name)
        
        // Skip non-weapon items (cases, stickers, etc)
        if (!item.hash_name.includes('|') && !item.hash_name.includes('★')) continue
        
        const parsed = parseMarketHashName(item.hash_name)
        const price = item.sell_price / 100
        
        allSkins.push({
          id: encodeURIComponent(item.hash_name),
          name: parsed.name,
          weapon: parsed.weapon,
          wear: parsed.wear,
          price: price,
          imageUrl: item.asset_description?.icon_url 
            ? `https://community.cloudflare.steamstatic.com/economy/image/${item.asset_description.icon_url}`
            : '',
          rarity: getRarity(item.asset_description?.type || ''),
          marketHashName: item.hash_name,
          volume: item.sell_listings,
        })
      }
      
      // Small delay between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 200))
      
    } catch (error) {
      console.error(`Error fetching query "${query}":`, error)
    }
  }
  
  return allSkins
}

export async function GET() {
  try {
    const now = Date.now()
    
    // Return cached data if still valid
    if (cachedSkins.length > 0 && (now - cacheTime) < CACHE_DURATION) {
      console.log(`Returning ${cachedSkins.length} cached skins`)
      return NextResponse.json(cachedSkins)
    }
    
    // Fetch fresh data from Steam
    console.log('Fetching fresh skins from Steam API...')
    const skins = await fetchSkinsFromSteam()
    
    if (skins.length > 0) {
      // Sort by price descending
      skins.sort((a, b) => b.price - a.price)
      
      // Update cache
      cachedSkins = skins
      cacheTime = now
      
      console.log(`Fetched and cached ${skins.length} skins from Steam`)
      return NextResponse.json(skins)
    }
    
    // If fetch failed but we have old cache, return it
    if (cachedSkins.length > 0) {
      console.log('Steam API failed, returning stale cache')
      return NextResponse.json(cachedSkins)
    }
    
    // Return empty array if everything fails
    return NextResponse.json([])
    
  } catch (error) {
    console.error('Error in GET /api/skins/all:', error)
    
    // Return cache on error
    if (cachedSkins.length > 0) {
      return NextResponse.json(cachedSkins)
    }
    
    return NextResponse.json({ error: 'Failed to fetch skins' }, { status: 500 })
  }
}
