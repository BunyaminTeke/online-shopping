import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const productId = searchParams.get('id')

    if (!productId) {
        return NextResponse.json({ error: 'Product ID is required' }, { status: 400 })
    }

    try {
        const recommended = await prisma.product.findMany({
            where: {
                id: {
                    gt: productId,
                },
            },
            orderBy: {
                id: 'asc',
            },
            take: 5,
        })

        return NextResponse.json(recommended)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
