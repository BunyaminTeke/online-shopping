// prisma/seed-campaigns.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const discountedProducts = await prisma.product.findMany({
    where: {
      discount: {
        gt: 15,
      },
    },
  });

  const campaignsData = discountedProducts.map((product, index) => ({
    title: `Süper İndirim: ${product.name}`,
    imageUrl: product.image_url || "https://via.placeholder.com/400x300",
    productId: product.id,
  }));

  // Daha önceki kampanyaları temizle (isteğe bağlı)
  await prisma.campaign.deleteMany({});

  // Yeni kampanyaları ekle
  await prisma.campaign.createMany({
    data: campaignsData,
  });

  console.log(`${campaignsData.length} kampanya başarıyla oluşturuldu.`);
}

main()
  .catch((e) => {
    console.error("Hata:", e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
