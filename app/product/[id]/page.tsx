// // app/products/[id]/page.tsx
// import { prisma } from "@/lib/prisma";
// import { notFound } from "next/navigation";
// import Image from "next/image";

// interface Props {
//     params: { id: string };
// }

// export default async function ProductDetailPage({ params }: Props) {
//     const { id } = params;

//     const product = await prisma.product.findUnique({
//         where: { id },
//     });

//     if (!product) {
//         notFound();
//     }

//     const hasDiscount = product.discount > 0;

//     return (
//         <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
//             <div className="grid md:grid-cols-2 gap-6">
//                 {/* Görsel */}
//                 <div className="relative w-full h-80 md:h-auto rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
//                     {product.image_url ? (
//                         <img
//                             src={product.image_url}
//                             alt={product.name}
//                             className="w-full h-auto object-contain rounded-lg"
//                         />
//                     ) : (
//                         <div className="text-gray-400">Görsel yok</div>
//                     )}

//                 </div>

//                 {/* Ürün Bilgileri */}
//                 <div className="flex flex-col justify-between">
//                     <div>
//                         <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
//                         <p className="text-sm text-gray-500 mb-4">{product.brand}</p>

//                         <div className="mb-4">
//                             {hasDiscount ? (
//                                 <div className="flex items-baseline space-x-3">
//                                     <span className="text-2xl font-extrabold text-indigo-600">
//                                         {product.final_price.toFixed(2)} ₺
//                                     </span>
//                                     <span className="text-gray-400 line-through">
//                                         {product.price.toFixed(2)} ₺
//                                     </span>
//                                     <span className="text-green-600 font-semibold">
//                                         %{product.discount} indirim
//                                     </span>
//                                 </div>
//                             ) : (
//                                 <span className="text-2xl font-extrabold text-indigo-600">
//                                     {product.final_price.toFixed(2)} ₺
//                                 </span>
//                             )}
//                         </div>

//                         <p className="text-gray-700 whitespace-pre-line">{product.description || "Açıklama yok."}</p>
//                     </div>

//                     <div className="mt-6 space-y-1 text-gray-700">
//                         <p><strong>Stok:</strong> {product.stock}</p>
//                         <p><strong>Puan:</strong> {product.rating} ⭐ ({product.num_reviews} yorum)</p>
//                     </div>

//                     <button
//                         className="mt-8 bg-indigo-600 text-white rounded-full py-3 font-semibold hover:bg-indigo-700 transition"
//                         type="button"
//                     >
//                         Sepete Ekle
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// app/products/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Star, ShoppingBag, Heart } from "react-feather";
import React from "react";

interface Props {
    params: { id: string };
}

// Yarım yıldız SVG bileşeni
const StarHalf = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-amber-400"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.564-.955L10 0v15z" />
    </svg>
);

export default async function ProductDetailPage({ params }: Props) {
    const { id } = params;

    const product = await prisma.product.findUnique({
        where: { id },
    });

    if (!product) notFound();

    const hasDiscount = product.discount > 0;

    const renderRating = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={`full-${i}`} className="w-5 h-5 text-amber-400 fill-amber-400" />);
        }

        if (hasHalfStar) {
            stars.push(<StarHalf key="half" />);
        }

        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
        }

        return stars;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-16 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
                        {/* Image */}
                        <div className="relative">
                            <div className="bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center aspect-square">
                                {product.image_url ? (
                                    <img
                                        src={product.image_url}
                                        alt={product.name}
                                        className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                                    />
                                ) : (
                                    <div className="text-gray-400 text-lg">Görsel yok</div>
                                )}
                            </div>
                        </div>

                        {/* Info */}
                        <div className="flex flex-col">
                            <div className="mb-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
                                        <p className="text-indigo-600 font-medium mt-1">{product.brand}</p>
                                    </div>

                                    <button className="p-3 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-500 hover:text-red-500">
                                        <Heart className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center mt-4">
                                    <div className="flex">
                                        {renderRating(product.rating)}
                                    </div>
                                    <span className="ml-2 text-sm text-gray-500">({product.num_reviews} yorum)</span>
                                </div>
                            </div>

                            <div className="py-6 border-y border-gray-100">
                                {hasDiscount ? (
                                    <div className="flex flex-wrap items-baseline gap-3">
                                        <span className="text-3xl font-extrabold text-indigo-600">
                                            {product.final_price.toFixed(2)} ₺
                                        </span>
                                        <span className="text-lg text-gray-400 line-through">
                                            {product.price.toFixed(2)} ₺
                                        </span>
                                        <span className="px-2.5 py-0.5 bg-red-100 text-red-800 font-semibold rounded-full">
                                            %{product.discount} indirim
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-3xl font-extrabold text-indigo-600">
                                        {product.final_price.toFixed(2)} ₺
                                    </span>
                                )}
                            </div>

                            <div className="my-6">
                                <h3 className="font-semibold text-gray-800 mb-3">Açıklama</h3>
                                <p className="text-gray-700 whitespace-pre-line">
                                    {product.description || "Bu ürün için henüz bir açıklama yok."}
                                </p>
                            </div>

                            <div className="mt-auto pt-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <button
                                        className="flex items-center justify-center bg-indigo-600 text-white rounded-xl py-4 px-6 font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg"
                                        type="button"
                                    >
                                        <ShoppingBag className="w-5 h-5 mr-2" />
                                        Sepete Ekle
                                    </button>

                                    <button
                                        className="flex items-center justify-center border-2 border-indigo-600 text-indigo-600 rounded-xl py-4 px-6 font-semibold hover:bg-indigo-50 transition-all"
                                        type="button"
                                    >
                                        Hızlı Satın Al
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
