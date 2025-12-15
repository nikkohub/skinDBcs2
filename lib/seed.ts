import { prisma } from './db'

// Real market prices based on Buff.163 and Steam Market (December 2024)
const seedSkins = [
  {
    name: 'Printstream',
    weapon: 'M4A1-S',
    wear: 'Field-Tested',
    price: 62.50,
    priceChange: 5.2,
    float: 0.2145,
    imageUrl: '',
    rarity: 'Covert',
    collection: 'The 2021 Mirage Collection',
    marketHashName: 'M4A1-S | Printstream (Field-Tested)',
    volume: 1245,
    trending: true,
    featured: true,
  },
  {
    name: 'Fade',
    weapon: 'Glock-18',
    wear: 'Factory New',
    price: 620.00,
    priceChange: -2.3,
    float: 0.0089,
    imageUrl: '',
    rarity: 'Classified',
    collection: 'The Weapon Case Collection',
    marketHashName: 'Glock-18 | Fade (Factory New)',
    volume: 892,
    trending: true,
    featured: true,
  },
  {
    name: 'Ice Coaled',
    weapon: 'AK-47',
    wear: 'Minimal Wear',
    price: 42.00,
    priceChange: 8.5,
    float: 0.0945,
    imageUrl: '',
    rarity: 'Covert',
    collection: 'The Revolution Collection',
    marketHashName: 'AK-47 | Ice Coaled (Minimal Wear)',
    volume: 2341,
    trending: true,
    featured: true,
  },
  {
    name: 'The Traitor',
    weapon: 'USP-S',
    wear: 'Factory New',
    price: 95.00,
    priceChange: -4.2,
    float: 0.0234,
    imageUrl: '',
    rarity: 'Classified',
    collection: 'The Recoil Collection',
    marketHashName: 'USP-S | The Traitor (Factory New)',
    volume: 567,
    trending: true,
    featured: true,
  },
  {
    name: 'Fire Serpent',
    weapon: 'AK-47',
    wear: 'Factory New',
    price: 12500.00,
    priceChange: 3.2,
    float: 0.0012,
    imageUrl: '',
    rarity: 'Covert',
    collection: 'The Bravo Collection',
    marketHashName: 'AK-47 | Fire Serpent (Factory New)',
    volume: 45,
    trending: false,
    featured: true,
  },
  {
    name: 'Asiimov',
    weapon: 'AWP',
    wear: 'Field-Tested',
    price: 85.00,
    priceChange: 1.8,
    float: 0.2564,
    imageUrl: '',
    rarity: 'Covert',
    collection: 'The Phoenix Collection',
    marketHashName: 'AWP | Asiimov (Field-Tested)',
    volume: 4532,
    trending: true,
    featured: false,
  },
  {
    name: 'Doppler Phase 2',
    weapon: 'Karambit',
    wear: 'Factory New',
    price: 1850.00,
    priceChange: -1.5,
    float: 0.0089,
    imageUrl: '',
    rarity: 'Covert',
    collection: 'Chroma Case',
    marketHashName: 'Karambit | Doppler (Factory New)',
    volume: 234,
    trending: false,
    featured: false,
  },
  {
    name: 'Redline',
    weapon: 'AK-47',
    wear: 'Field-Tested',
    price: 18.50,
    priceChange: 2.4,
    float: 0.1845,
    imageUrl: '',
    rarity: 'Classified',
    collection: 'The Winter Offensive Collection',
    marketHashName: 'AK-47 | Redline (Field-Tested)',
    volume: 8934,
    trending: true,
    featured: false,
  },
]

export async function seedDatabase() {
  console.log('Seeding database...')
  
  // Clear existing data
  await prisma.prediction.deleteMany()
  await prisma.priceHistory.deleteMany()
  await prisma.skin.deleteMany()
  
  // Insert skins
  for (const skin of seedSkins) {
    const createdSkin = await prisma.skin.create({
      data: {
        ...skin,
        priceHistory: {
          create: generatePriceHistory(skin.price, 30),
        },
        predictions: {
          create: generatePredictions(skin),
        },
      },
    })
    console.log(`Created skin: ${createdSkin.weapon} | ${createdSkin.name}`)
  }
  
  console.log('Database seeded successfully!')
}

function generatePriceHistory(basePrice: number, days: number) {
  const history = []
  let currentPrice = basePrice * 0.9 // Start 10% lower
  
  for (let i = days - 1; i >= 0; i--) {
    const change = (Math.random() - 0.5) * (basePrice * 0.05) // 5% daily variance
    currentPrice = Math.max(basePrice * 0.5, currentPrice + change)
    
    history.push({
      price: Math.round(currentPrice * 100) / 100,
      volume: Math.floor(Math.random() * 1000) + 100,
      timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
    })
  }
  
  return history
}

function generatePredictions(skin: any) {
  const signals = ['Strong Buy', 'Buy', 'Hold', 'Sell', 'Buy Dip', 'Opportunity']
  const velocities = ['Rising Fast', 'Surging', 'Falling Fast', 'Steep Drop', 'Stable', 'Volatile']
  
  const prediction = {
    predictedPrice: skin.price * (1 + skin.priceChange / 100),
    confidence: 0.65 + Math.random() * 0.3,
    signal: skin.priceChange > 15 ? 'Strong Buy' : skin.priceChange > 0 ? 'Buy' : skin.priceChange < -15 ? 'Buy Dip' : 'Hold',
    velocity: skin.priceChange > 20 ? 'Surging' : skin.priceChange > 10 ? 'Rising Fast' : skin.priceChange < -20 ? 'Steep Drop' : skin.priceChange < -10 ? 'Falling Fast' : 'Stable',
    targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  }
  
  return prediction
}

// Run if executed directly
if (require.main === module) {
  seedDatabase()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
}
