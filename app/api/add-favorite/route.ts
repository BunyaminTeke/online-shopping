import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // prisma client dosyan
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
    try {
        const { userId, productId } = await req.json();

        // Kontrol: ID'ler eksikse
        if (!userId || !productId) {
            return NextResponse.json({ error: "Kullanıcı veya ürün ID'si eksik" }, { status: 400 });
        }

        // 1. Kullanıcı zaten bu ürünü favorilemiş mi kontrol et
        const existingFavorite = await prisma.favorite.findFirst({
            where: {
                userId: userId,
                productId: productId,
            },
        });

        if (existingFavorite) {
            return NextResponse.json({ message: "Bu ürün zaten favorilere eklenmiş" }, { status: 200 });
        }

        // 2. Favori olarak ekle
        const newFavorite = await prisma.favorite.create({
            data: {
                userId: userId,
                productId: productId,
            },
        });

        return NextResponse.json({ message: "Ürün favorilere eklendi", favorite: newFavorite });
    } catch (error) {
        console.error("Favori ekleme hatası:", error);
        return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
    }
}
