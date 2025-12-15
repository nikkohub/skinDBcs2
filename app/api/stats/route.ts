import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const totalSkins = await prisma.skin.count()
    const totalPriceHistory = await prisma.priceHistory.count()
    
    const avgPriceChange = await prisma.skin.aggregate({
      _avg: {
        priceChange: true
      }
    })
    
    const totalVolume = await prisma.skin.aggregate({
      _sum: {
        volume: true
      }
    })
    
    return NextResponse.json({
      totalSkins: totalSkins.toLocaleString(),
      priceDataPoints: totalPriceHistory.toLocaleString(),
      avgPriceChange: `${(avgPriceChange._avg.priceChange || 0) > 0 ? '+' : ''}${(avgPriceChange._avg.priceChange || 0).toFixed(1)}%`,
      totalVolume: (totalVolume._sum.volume || 0).toLocaleString()
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
