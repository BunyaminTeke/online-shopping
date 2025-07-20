// // app/api/favorites/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';
// import jwt from 'jsonwebtoken';

// export async function GET(req: NextRequest) {
//   try {
//     const token = req.cookies.get('token')?.value;
//     const secret = process.env.JWT_SECRET;

//     if (!token || !secret) {
//       return NextResponse.json({ success: false, message: 'Yetkisiz erişim.' }, { status: 401 });
//     }

//     const decoded = jwt.verify(token, secret) as { userId: string };

//     // Kullanıcının favorilerindeki ürünleri detaylarıyla getir
//     const favorites = await prisma.favorite.findMany({
//       where: { userId: decoded.userId },
//       include: { product: true },
//     });

//     const favoriteProducts = favorites.map(fav => fav.product);

//     return NextResponse.json({ success: true, favorites: favoriteProducts });
//   } catch (error) {
//     console.error('Favori listeleme hatası:', error);
//     return NextResponse.json({ success: false, message: 'Sunucu hatası.' }, { status: 500 });
//   }
// }




// app/api/favorites/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    const secret = process.env.JWT_SECRET;

    if (!token || !secret) {
      return NextResponse.json({ success: false, message: 'Yetkisiz erişim.' }, { status: 401 });
    }

    const decoded = jwt.verify(token, secret) as { userId: string };

    const favorites = await prisma.favorite.findMany({
      where: { userId: decoded.userId },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            final_price: true,
            image_url: true,
            brand: true
          }
        }
      },
    });

    const favoriteProducts = favorites
      .map(fav => fav.product)
      .filter(Boolean); // null olanları filtrele

    return NextResponse.json({ success: true, favorites: favoriteProducts });
  } catch (error) {
    console.error('Favori listeleme hatası:', error);
    return NextResponse.json({ success: false, message: 'Sunucu hatası.' }, { status: 500 });
  }
}

