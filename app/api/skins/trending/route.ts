import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const skins = await prisma.skin.findMany({
      where: {
        trending: true
      },
      orderBy: {
        priceChange: 'desc'
      },
      take: 8,
      include: {
        predictions: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 1
        }
      }
    })
    
    return NextResponse.json(skins)
  } catch (error) {
    console.error('Error fetching trending skins:', error)
    return NextResponse.json({ error: 'Failed to fetch skins' }, { status: 500 })
  }
}
