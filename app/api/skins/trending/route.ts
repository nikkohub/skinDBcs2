import { NextResponse } from 'next/server'

const STEAM_APP_ID = '730'

// Most wanted/trending CS2 skins according to community demand
const TRENDING_SKINS = [
  // Most iconic knives
  '★ Karambit | Doppler',
  '★ Butterfly Knife | Fade',
  '★ Karambit | Fade',
  '★ M9 Bayonet | Doppler',
  '★ Butterfly Knife | Marble Fade',
  '★ Karambit | Tiger Tooth',
  '★ Butterfly Knife | Gamma Doppler',
  // Most wanted rifle skins
  'AK-47 | Asiimov',
  'AK-47 | Fire Serpent',
  'AK-47 | Vulcan',
  'AK-47 | Neon Rider',
  'AK-47 | The Empress',
  'M4A4 | Howl',
  'M4A1-S | Printstream',
  'M4A1-S | Hot Rod',
  // Most wanted AWP skins
  'AWP | Dragon Lore',
  'AWP | Asiimov',
  'AWP | Gungnir',
  'AWP | Fade',
  'AWP | Lightning Strike',
  // Popular pistol skins
  'Desert Eagle | Blaze',
  'USP-S | Kill Confirmed',
  'Glock-18 | Fade',
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
  if (type.includes('★')) return 'Extraordinary'
  return 'Covert'
}

export async function GET() {
  try {
    const trendingSkins: any[] = []
    
    // Fetch each trending skin from Steam Market
    for (const skinQuery of TRENDING_SKINS) {
      const steamUrl = `https://steamcommunity.com/market/search/render/?appid=${STEAM_APP_ID}&query=${encodeURIComponent(skinQuery)}&count=1&norender=1`
      
      const steamResponse = await fetch(steamUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' },
        next: { revalidate: 300 }
      })
      
      if (steamResponse.ok) {
        const steamData = await steamResponse.json()
        if (steamData.success && steamData.results?.[0]) {
          const item: SteamMarketResult = steamData.results[0]
          const parsed = parseMarketHashName(item.hash_name)
          
          trendingSkins.push({
            id: encodeURIComponent(item.hash_name),
            name: parsed.name || item.hash_name,
            weapon: parsed.weapon,
            wear: parsed.wear,
            price: item.sell_price / 100,
            imageUrl: item.asset_description?.icon_url 
              ? `https://community.cloudflare.steamstatic.com/economy/image/${item.asset_description.icon_url}`
              : '',
            rarity: getRarity(item.asset_description?.type || ''),
            marketHashName: item.hash_name,
            volume: item.sell_listings,
            isTrending: true
          })
        }
      }
      
      // Stop at 12 skins
      if (trendingSkins.length >= 12) break
    }
    
    return NextResponse.json(trendingSkins)
  } catch (error) {
    console.error('Error fetching trending skins:', error)
    return NextResponse.json({ error: 'Failed to fetch skins' }, { status: 500 })
  }
}
