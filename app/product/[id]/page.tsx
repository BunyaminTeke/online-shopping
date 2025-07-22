/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { FiStar, FiArrowRight } from "react-icons/fi";
import FavoriteButton from '@/components/FavoriteButton';
import AddToCartButton from "@/components/AddToCartButton";

const StarHalf = () => (
    <div className="relative w-5 h-5">
        <FiStar className="absolute text-gray-300 w-5 h-5" />
        <div className="absolute overflow-hidden w-1/2 h-full">
            <FiStar className="text-amber-400 w-5 h-5" />
        </div>
    </div>
);

const RatingStars = ({ rating, numReviews }: { rating: number; numReviews: number }) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
        stars.push(<FiStar key={`full-${i}`} className="w-5 h-5 text-amber-400 fill-amber-400" />);
    }

    if (hasHalfStar) {
        stars.push(<StarHalf key="half" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<FiStar key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
    }

    return (
        <div className="flex items-center mt-2">
            <div className="flex">{stars}</div>
            <span className="ml-2 text-sm text-gray-500">({numReviews} yorum)</span>
        </div>
    );
};

const PriceDisplay = ({ price, discount, finalPrice }: { price: number; discount: number; finalPrice: number }) => {
    const hasDiscount = discount > 0;

    return (
        <div className="py-6 border-y border-gray-100">
            {hasDiscount ? (
                <div className="flex flex-wrap items-baseline gap-3">
                    <span className="text-3xl font-extrabold text-indigo-600">
                        {finalPrice.toFixed(2)} ₺
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                        {price.toFixed(2)} ₺
                    </span>
                    <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 font-semibold rounded-full">
                        %{discount} indirim
                    </span>
                </div>
            ) : (
                <span className="text-3xl font-extrabold text-indigo-600">
                    {finalPrice.toFixed(2)} ₺
                </span>
            )}
        </div>
    );
};

interface ProductImageProps {
    imageUrl: string | null;
    name: string;
}

const ProductImage = ({ imageUrl, name }: ProductImageProps) => (
    <div className="relative bg-gray-50 rounded-xl overflow-hidden aspect-square flex items-center justify-center p-8 border border-gray-100">
        {imageUrl ? (
            <img
                src={imageUrl}
                alt={name}
                className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
            />
        ) : (
            <div className="text-gray-400 text-lg">Görsel yok</div>
        )}
    </div>
);

const ActionButtons = ({ product }: { product: any }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AddToCartButton product={product} />
        <button
            className="flex items-center justify-center border-2 border-indigo-600 text-indigo-600 rounded-xl py-4 px-6 font-semibold hover:bg-indigo-50 transition-all"
            type="button"
        >
            Hızlı Satın Al
            <FiArrowRight className="ml-2" />
        </button>
    </div>
);

export default async function ProductDetailPage(context: { params: { id?: string } }) {
    const id = context.params?.id;
    const product = await prisma.product.findUnique({
        where: { id: id },
    });

    if (!product) notFound();

    return (
        <>
            {/* Hero Bölümü */}
            <section className="relative bg-gradient-to-br from-indigo-900 to-purple-800 text-white py-24 md:py-32 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-200">
                                {product.name}
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-indigo-100 max-w-3xl mx-auto">
                            {product.brand} kalitesiyle sizlerle
                        </p>
                    </div>
                </div>
            </section>

            {/* Ürün Detay Bölümü */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8">
                            <ProductImage imageUrl={product.image_url} name={product.name} />

                            <div className="flex flex-col">
                                <div className="mb-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{product.name}</h2>
                                            <p className="text-indigo-600 font-medium mt-1">{product.brand}</p>
                                        </div>
                                        <FavoriteButton productId={product.id} />
                                    </div>

                                    <RatingStars rating={product.rating} numReviews={product.num_reviews} />
                                </div>

                                <PriceDisplay
                                    price={product.price}
                                    discount={product.discount}
                                    finalPrice={product.final_price}
                                />

                                <div className="my-6">
                                    <h3 className="text-xl font-semibold mb-4 text-gray-800 relative inline-block">
                                        <span className="relative z-10">Ürün Açıklaması</span>
                                        <span className="absolute bottom-0 left-0 w-full h-2 bg-amber-200 opacity-40 -z-0"></span>
                                    </h3>
                                    <p className="text-gray-600 whitespace-pre-line">
                                        {product.description || "Bu ürün için henüz bir açıklama yok."}
                                    </p>
                                </div>

                                <div className="mt-auto pt-6">
                                    <ActionButtons product={product} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}