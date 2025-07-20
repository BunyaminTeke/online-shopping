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

    // Favoriyi sil
    await prisma.favorite.deleteMany({
      where: {
        userId: decoded.userId,
        productId,
      },
    });

    return NextResponse.json({ success: true, message: 'Ürün favorilerden çıkarıldı.' });
  } catch (error) {
    console.error('Favori çıkarma hatası:', error);
    return NextResponse.json({ success: false, message: 'Sunucu hatası.' }, { status: 500 });
  }
}
