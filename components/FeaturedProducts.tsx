'use client'

import React from 'react'
import Link from 'next/link'

type Product = {
    id: string
    name: string
    price: number
    final_price: number
    image_url?: string
    rating: number
    num_reviews: number
}

export default function FeaturedProducts({ products }: { products: Product[] }) {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-3xl text-amber-300 font-bold">Öne Çıkan Ürünler</h2>
                    <Link href="/product" className="text-indigo-600 hover:text-indigo-800 font-semibold">
                        Tüm Ürünler <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product) => {
                        const hasDiscount = product.final_price < product.price;
                        const discountPercent = hasDiscount
                            ? Math.round(((product.price - product.final_price) / product.price) * 100)
                            : 0;

                        return (
                            <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-shadow">
                                <Link href={`/product/${product.id}`} className="block">
                                    <div className="relative">
                                        {product.image_url ? (
                                            <img
                                                src={product.image_url}
                                                alt={product.name}
                                                className="w-full h-56 object-cover"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-56 flex items-center justify-center">
                                                <span className="text-gray-400">No Image</span>
                                            </div>
                                        )}
                                        {hasDiscount && (
                                            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-lg font-bold">
                                                %{discountPercent} İNDİRİM
                                            </div>
                                        )}
                                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex">
                                            <button
                                                className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 mx-1"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    e.stopPropagation()
                                                    // Add to favorites logic
                                                }}
                                            >
                                                ❤️
                                            </button>
                                            <button
                                                className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 mx-1"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    window.location.href = `/product/${product.id}`
                                                }}
                                            >
                                                🔍
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-lg mb-1 text-indigo-600">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center mb-3">
                                            {[...Array(5)].map((_, i) => (
                                                <span
                                                    key={i}
                                                    className={`text-xl ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                            <span className="text-gray-500 text-sm ml-2">
                                                ({product.num_reviews})
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                {hasDiscount ? (
                                                    <>
                                                        <span className="text-xl font-bold text-indigo-600">
                                                            {product.final_price.toFixed(2)} TL
                                                        </span>
                                                        <span className="line-through text-gray-500 ml-2">
                                                            {product.price.toFixed(2)} TL
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className="text-xl font-bold text-indigo-600">
                                                        {product.price.toFixed(2)} TL
                                                    </span>
                                                )}
                                            </div>
                                            <button
                                                className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 py-1 px-3 rounded-md text-sm font-medium transition"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    e.stopPropagation()
                                                }}
                                            >
                                                Sepete Ekle
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}