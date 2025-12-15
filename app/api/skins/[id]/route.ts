import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const skin = await prisma.skin.findUnique({
      where: {
        id: params.id
      },
      include: {
        priceHistory: {
          orderBy: {
            timestamp: 'asc'
          },
          take: 30
        },
        predictions: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 1
        }
      }
    })
    
    if (!skin) {
      return NextResponse.json({ error: 'Skin not found' }, { status: 404 })
    }
    
    return NextResponse.json(skin)
  } catch (error) {
    console.error('Error fetching skin:', error)
    return NextResponse.json({ error: 'Failed to fetch skin' }, { status: 500 })
  }
}
