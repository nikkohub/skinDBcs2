import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const skins = await prisma.skin.findMany({
      where: {
        featured: true
      },
      orderBy: {
        priceChange: 'desc'
      },
      take: 4,
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
    console.error('Error fetching featured skins:', error)
    return NextResponse.json({ error: 'Failed to fetch skins' }, { status: 500 })
  }
}
