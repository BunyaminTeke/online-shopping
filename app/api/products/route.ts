// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function GET() {
//     try {
//         const products = await prisma.product.findMany();
//         return NextResponse.json(products);
//     } catch (error) {
//         return NextResponse.json({ error: 'Ürünler getirilirken hata oluştu.' }, { status: 500 });
//     }
// }

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const products = await prisma.product.findMany();
        // console.log('Veriler:', products);
        return NextResponse.json(products);
    } catch (error) {
        console.error('GERÇEK HATA:', error);  // 🔥 BU ÇOK ÖNEMLİ
        return NextResponse.json({ error: 'Ürünler getirilirken hata oluştu.' }, { status: 500 });
    }
}
