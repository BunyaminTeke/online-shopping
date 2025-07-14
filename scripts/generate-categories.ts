import { prisma } from '../lib/prisma'

async function main() {
  // Tüm ürünleri al (sadece gerekli alanları çekiyoruz)
  const allProducts = await prisma.product.findMany({
    select: {
      category: true
    }
  })

  // Benzersiz kategorileri ve ürün sayılarını çıkar
  const categoryMap = new Map<string, number>()

  for (const product of allProducts) {
    const category = product.category.trim()

    if (categoryMap.has(category)) {
      categoryMap.set(category, categoryMap.get(category)! + 1)
    } else {
      categoryMap.set(category, 1)
    }
  }

  // Category modeli verisi hazırlama
  const categoriesToCreate = Array.from(categoryMap.entries()).map(
    ([name, products]) => ({
      name,
      products,
      image: getCategoryImage(name),
    })
  )

  await prisma.category.createMany({
    data: categoriesToCreate
  })

  console.log('✅ Kategoriler başarıyla oluşturuldu!')
}

// Kategori adına göre görsel eşlemesi (manuel harita)
function getCategoryImage(categoryName: string): string {
  const map: Record<string, string> = {
    Elektronik: '/images/electronics.jpg',
    Giyim: '/images/clothing.jpg',
    'Ev & Yaşam': '/images/home.jpg',
    Spor: '/images/sports.jpg',
  }

  return map[categoryName] ?? '/images/default.jpg'
}

main()
  .catch((e) => {
    console.error('❌ Hata:', e)
  })
  .finally(() => prisma.$disconnect())
