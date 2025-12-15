import { NextResponse } from 'next/server'

const STEAM_APP_ID = '730'

// Popular CS2 weapon skins
const POPULAR_WEAPONS = [
  'AWP | Asiimov',
  'AK-47 | Redline',
  'M4A1-S | Hyper Beast',
  'AK-47 | Vulcan',
  'M4A4 | Neo-Noir',
  'USP-S | Kill Confirmed',
  'Desert Eagle | Blaze',
  'Glock-18 | Fade',
  'AK-47 | Neon Rider',
  'AWP | Lightning Strike',
  'M4A1-S | Golden Coil'
]

interface SteamMarketResult {
  hash_name: string
  sell_listings: number
  sell_price: number
  asset_description: {
    icon_url: string
    type: string
  }
}

function parseMarketHashName(hashName: string): { weapon: string; name: string; wear: string } {
  const match = hashName.match(/^(.+?)\s*\|\s*(.+?)\s*\((.+?)\)$/)
  if (match) return { weapon: match[1].trim(), name: match[2].trim(), wear: match[3].trim() }
  return { weapon: '', name: hashName, wear: '' }
}

function getRarity(type: string): string {
  if (type.includes('Covert')) return 'Covert'
  if (type.includes('Classified')) return 'Classified'
  if (type.includes('Restricted')) return 'Restricted'
  return 'Unknown'
}

export async function GET() {
  try {
    const allSkins: any[] = []
    
    for (const query of POPULAR_WEAPONS) {
      const steamUrl = `https://steamcommunity.com/market/search/render/?appid=${STEAM_APP_ID}&query=${encodeURIComponent(query)}&count=1&norender=1`
      
      const res = await fetch(steamUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' },
        next: { revalidate: 300 }
      })
      
      if (res.ok) {
        const data = await res.json()
        if (data.success && data.results?.[0]) {
          const item: SteamMarketResult = data.results[0]
          const parsed = parseMarketHashName(item.hash_name)
          
          allSkins.push({
            id: encodeURIComponent(item.hash_name),
            name: parsed.name,
            weapon: parsed.weapon,
            wear: parsed.wear,
            price: item.sell_price / 100,
            imageUrl: item.asset_description?.icon_url 
              ? `https://community.cloudflare.steamstatic.com/economy/image/${item.asset_description.icon_url}`
              : '',
            rarity: getRarity(item.asset_description?.type || ''),
            marketHashName: item.hash_name,
            volume: item.sell_listings
          })
        }
      }
    }
    
    return NextResponse.json(allSkins)
  } catch (error) {
    console.error('Error fetching featured skins:', error)
    return NextResponse.json({ error: 'Failed to fetch skins' }, { status: 500 })
  }
}
