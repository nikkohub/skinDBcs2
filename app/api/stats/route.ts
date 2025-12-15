import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const totalSkins = await prisma.skin.count()
    const totalVolume = await prisma.priceHistory.count()
    
    const avgPriceChange = await prisma.skin.aggregate({
      _avg: {
        priceChange: true
      }
    })
    
    return NextResponse.json({
      totalSkins: totalSkins.toLocaleString(),
      totalVolume: `${(totalVolume * 1.5 / 1000).toFixed(1)}K`,
      avgGains: `${avgPriceChange._avg.priceChange?.toFixed(1)}%`,
      activeTraders: '24.5K'
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
