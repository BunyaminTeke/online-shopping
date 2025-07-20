import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
    try {
        const token = req.cookies.get('token')?.value;
        const secret = process.env.JWT_SECRET;

        if (!token || !secret) {
            return NextResponse.json({ success: false, message: 'Yetkisiz erişim.' }, { status: 401 });
        }

        const decoded = jwt.verify(token, secret) as { userId: string };
        const { productId } = await req.json();

        if (!productId) {
            return NextResponse.json({ success: false, message: 'Ürün ID eksik.' }, { status: 400 });
        }

        // Aynı ürün daha önce favorilenmiş mi?
        const existing = await prisma.favorite.findFirst({
            where: {
                userId: decoded.userId,
                productId,
            },
        });

        if (existing) {
            return NextResponse.json({ success: false, message: 'Ürün zaten favorilerde.' }, { status: 400 });
        }

        // Favori ekle
        await prisma.favorite.create({
            data: {
                userId: decoded.userId,
                productId,
            },
        });

        return NextResponse.json({ success: true, message: 'Ürün favorilere eklendi.' });
    } catch (error) {
        console.error('Favori ekleme hatası:', error);
        return NextResponse.json({ success: false, message: 'Sunucu hatası.' }, { status: 500 });
    }
}
