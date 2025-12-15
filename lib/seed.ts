import { prisma } from './db'

const seedSkins = [
  {
    name: 'Printstream',
    weapon: 'M4A1-S',
    wear: 'Field-Tested',
    price: 142.80,
    priceChange: 24.7,
    float: 0.2145,
    imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alDL_Yh3hu5Mx2gv3--Y3nj1H680s-MTqmJoOSe1I3ZQ3X_gLtl-7u1pC8v5iYmCFh7yYmsHrUzha1h05SLrs4eG7OwA/360fx360f',
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
    price: 485.20,
    priceChange: -18.3,
    float: 0.0089,
    imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0Ob3djFN79eJmYGZnvnxDLjQhH9U5Pp9i_vG8d-s2FDl_ERrYW3xLYCRIFI3NQvW-lC4xO_p0J-1vp2dyCN9-n51gQdY3Vg/360fx360f',
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
    price: 78.50,
    priceChange: 31.2,
    float: 0.0945,
    imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhoyszJemkV08y5nY6fqPP7IYTdn2xZ_Isn2L3F9Nqg3QDnqkJuMmv0ddCVdFQ6ZQ3V_AS9ybjmgsK16ZrPnyM1siVz7SqMnxCx1RkSOcpGH5ov/360fx360f',
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
    price: 156.40,
    priceChange: -22.8,
    float: 0.0234,
    imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09Svq5aKhf73MrbeqWdQ-sJ0teXA54vwxg3jrRBla2qhLdOQegU9Zg7T_VnqwLvqh8Xp6pXLnSZh7nUi4WGdwUJJIL-4Tg/360fx360f',
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
    price: 8945.00,
    priceChange: 12.5,
    float: 0.0012,
    imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5lpKKqPrxN7LEmyVQ7MEpiLuSrYmnjQPtrUtuYTv6cdKSdg84Y1vT-gDql-jmgJG86Z2fmiY3v3V34yzelxLk1BwYcKUx0nXNOXlZ/360fx360f',
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
    price: 89.50,
    priceChange: 5.2,
    float: 0.2564,
    imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJD_9W7m5a0mvLwOq7c2G5S7YEljLyVo4rz2wPh8xJpYT_3JdCVJwRvZw3W-AXsxL3n0J7p6sjMnSRr7yEqsGGdwUI_UjUpSw/360fx360f',
    rarity: 'Covert',
    collection: 'The Phoenix Collection',
    marketHashName: 'AWP | Asiimov (Field-Tested)',
    volume: 4532,
    trending: true,
    featured: false,
  },
  {
    name: 'Doppler',
    weapon: 'Karambit',
    wear: 'Factory New',
    price: 1245.00,
    priceChange: -8.7,
    float: 0.0089,
    imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20jfL2IbrummJW4NE_jrGWrN6t0VLg_UI5azz0JYLEWQ84ZFyG_wS3kO_m1J65vZvLmyBh6CYg5HvfnxG3h05SLrs42u3ZpqE/360fx360f',
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
    price: 24.50,
    priceChange: 15.8,
    float: 0.1845,
    imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5lpKKqPv9NLPF2GpSu8Aj3L2Y89ii2lDgr0BkZD_1ItfDcQM9ZAyGrwO8366x0paZUbGQqg/360fx360f',
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
