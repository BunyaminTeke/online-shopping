// app/api/categories/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Kategori verisi alınamadı:", error);
    return NextResponse.json({ error: "Hata oluştu" }, { status: 500 });
  }
}
