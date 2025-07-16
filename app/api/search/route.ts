import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query || query.trim() === "") {
    return NextResponse.json([]);
  }

  const results = await prisma.product.findMany({
    where: {
      name: {
        startsWith: query,
        mode: "insensitive", // Büyük/küçük harf duyarsız
      },
    },
    take: 5, // İlk 5 sonuç
  });

  return NextResponse.json(results);
}
