/* eslint-disable @next/next/no-img-element */

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Star, ShoppingBag, Heart } from "react-feather";

import FavoriteButton from '@/components/FavoriteButton';

import AddToCartButton from "@/components/AddToCartButton";

import * as React from "react";

interface Props {
    params: { id: string };
}

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

const RatingStars = ({ rating, numReviews }: { rating: number; numReviews: number }) => {
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

    return (
        <div className="flex items-center">
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
                    <span className="px-2.5 py-0.5 bg-red-100 text-red-800 font-semibold rounded-full">
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
    <div className="relative">
        <div className="bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center aspect-square">
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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-16 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
                        <ProductImage imageUrl={product.image_url} name={product.name} />

                        <div className="flex flex-col">
                            <div className="mb-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
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
                                <h3 className="font-semibold text-gray-800 mb-3">Açıklama</h3>
                                <p className="text-gray-700 whitespace-pre-line">
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
        </div>
    );
}