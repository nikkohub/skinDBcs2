import { prisma } from './db'
import { fetchBuff163Market, parseBuffPrice, getBuffImageUrl } from './steam-api'

/**
 * Update all skins from Buff163 marketplace
 */
export async function updatePricesFromBuff163() {
  console.log('Fetching latest prices from Buff163...\n')
  
  try {
    const buff163Items = await fetchBuff163Market(1)
    
    if (buff163Items.length === 0) {
      console.log('No items fetched from Buff163')
      return
    }
    
    console.log(`Found ${buff163Items.length} items from Buff163\n`)
    
    for (const buffItem of buff163Items) {
      const priceUSD = parseBuffPrice(buffItem.sell_min_price)
      const imageUrl = getBuffImageUrl(buffItem.goods_info.icon_url)
      
      // Try to find existing skin by market hash name
      let skin = await prisma.skin.findFirst({
        where: {
          marketHashName: buffItem.market_hash_name
        }
      })
      
      if (skin) {
        // Update existing skin
        const priceChange = skin.price > 0 ? ((priceUSD - skin.price) / skin.price) * 100 : 0
        
        await prisma.skin.update({
          where: { id: skin.id },
          data: {
            price: priceUSD,
            priceChange: priceChange,
            imageUrl: imageUrl,
            volume: buffItem.sell_num,
            updatedAt: new Date()
          }
        })
        
        // Add price history
        await prisma.priceHistory.create({
          data: {
            skinId: skin.id,
            price: priceUSD,
            volume: buffItem.sell_num,
            timestamp: new Date()
          }
        })
        
        console.log(`✓ Updated: ${buffItem.market_hash_name} - $${priceUSD}`)
      } else {
        console.log(`- Skipped (not in DB): ${buffItem.market_hash_name}`)
      }
    }
    
    console.log('\n✅ Price update complete!')
  } catch (error) {
    console.error('Error updating prices:', error)
  }
}

// Run if executed directly
if (require.main === module) {
  updatePricesFromBuff163()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
}
