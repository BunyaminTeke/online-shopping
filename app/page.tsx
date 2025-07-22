/* eslint-disable react/no-unescaped-entities */
// pages/index.js
import React from 'react';
import Head from 'next/head';
import Categories from '@/components/Categories';
import Comments from '@/components/Comments';
import { PrismaClient } from '@prisma/client';
import FeaturedProducts from '@/components/FeaturedProducts';
import Link from 'next/link';

const prisma = new PrismaClient();

async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });
}

const HomePage = async () => {
  // Örnek ürün verileri


  // Kategoriler

  const categoriesRaw = await getCategories();

  const categories = categoriesRaw
    .map(cat => ({
      ...cat,
      id: typeof cat.id === 'number' ? String(cat.id) : cat.id
    }))
    .slice(0, 4);  // ilk 4 kategoriyi al


  const rawProducts = await prisma.product.findMany({ take: 4 })

  const featuredProducts = rawProducts.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    discount: p.discount,
    final_price: p.final_price,
    image_url: p.image_url === null ? undefined : p.image_url,
    rating: p.rating,
    num_reviews: p.num_reviews,
  }))



  // Müşteri yorumları

  return (
    <>
      <Head>
        <title>UluTek - En İyi Alışveriş Deneyimi</title>
        <meta name="description" content="Binlerce kaliteli ürünü uygun fiyatlarla bulabileceğiniz online alışveriş platformu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  En İyi Ürünler, <span className="text-amber-400">En Uygun Fiyatlarla</span>
                </h1>
                <p className="text-xl mb-8 max-w-xl">
                  Binlerce kaliteli ürünü uygun fiyatlarla bulabileceğiniz adres. Hemen alışverişe başlayın!
                </p>
                <div className="flex flex-wrap gap-4">

                  <Link href="/product">
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-lg text-lg transition">
                      Alışverişe Başla
                    </button>
                  </Link>
                  <Link href="/campaigns">
                    <button className="bg-transparent border-2 border-white hover:bg-white/10 font-bold py-3 px-8 rounded-lg text-lg transition">
                      Kampanyaları İncele
                    </button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96" />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
        </section>

        {/* Özellikler */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid text-amber-400 grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: '🚚', title: 'Hızlı Kargo', desc: 'Siparişleriniz 24 saatte kargoda' },
                { icon: '💳', title: 'Güvenli Ödeme', desc: '256 bit SSL ile güvenli alışveriş' },
                { icon: '🔄', title: 'Kolay İade', desc: '30 gün içinde ücretsiz iade' },
                { icon: '📞', title: '7/24 Destek', desc: 'Müşteri destek ekibimiz her zaman yanınızda' }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Kategoriler */}

        <Categories categories={categories} />

        {/* Öne Çıkan Ürünler */}

        <FeaturedProducts products={featuredProducts} />



        {/* Kampanya Bölümü */}
        <section className="py-16 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  Yaz İndirimleri Başladı!
                </h2>
                <p className="text-xl mb-8 max-w-xl">
                  Tüm ürünlerde geçerli %30'a varan indirimlerle yazı karşılayın.
                  Kampanya sınırlı süreyle geçerlidir.
                </p>
                <div className="mb-8">
                  <div className="flex items-center mb-2">
                    <div className="bg-white/20 rounded-lg p-3 mr-4">
                      <span className="text-3xl font-bold">05</span>
                      <span className="block text-sm">Gün</span>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 mr-4">
                      <span className="text-3xl font-bold">12</span>
                      <span className="block text-sm">Saat</span>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 mr-4">
                      <span className="text-3xl font-bold">45</span>
                      <span className="block text-sm">Dakika</span>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3">
                      <span className="text-3xl font-bold">18</span>
                      <span className="block text-sm">Saniye</span>
                    </div>
                  </div>
                </div>
                <button className="bg-white text-indigo-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-lg transition">
                  Hemen Alışveriş Yap
                </button>
              </div>
              <div className="flex justify-center">
                <div className="bg-white rounded-xl shadow-xl p-4">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-64 h-64" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <Comments />

        {/* Haber Bülteni */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-amber-300 mb-4">Kampanyalardan Haberdar Olun</h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Özel indirimler, yeni ürünler ve kampanyalardan haberdar olmak için bültenimize abone olun.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition">
                Abone Ol
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;