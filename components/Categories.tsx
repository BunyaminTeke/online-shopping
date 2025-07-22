'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'

type Category = {
    id: string;
    name: string;
    products: number;
    image?: string;
};

function Categories({ categories }: { categories: Category[] }) {
    const router = useRouter();
    const [loadingCategory, setLoadingCategory] = useState<string | null>(null);

    const handleClick = (name: string) => {
        setLoadingCategory(name);
        router.push(`/categories/${encodeURIComponent(name.toLowerCase())}`);
    };

    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-3xl text-amber-300 font-bold">Popüler Kategoriler</h2>
                    <Link href="/categories" className="text-indigo-600 hover:text-indigo-800 font-semibold">
                        Tüm Kategoriler <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="bg-white rounded-xl shadow-md overflow-hidden group relative cursor-pointer"
                        >
                            {category.image ? (
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-48 object-cover"
                                />
                            ) : (
                                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
                            )}

                            <div className="p-4">
                                <h3 className="text-xl text-blue-300 font-bold group-hover:text-indigo-600 transition">
                                    {category.name}
                                </h3>
                                <p className="text-gray-500">{category.products} ürün</p>
                            </div>

                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button
                                    onClick={() => handleClick(category.name)}
                                    className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
                                >
                                    {loadingCategory === category.name ? (
                                        <>
                                            <svg
                                                className="animate-spin h-5 w-5 text-indigo-600"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                />
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                                                />
                                            </svg>
                                            Yükleniyor...
                                        </>
                                    ) : (
                                        'İncele'
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Categories;
