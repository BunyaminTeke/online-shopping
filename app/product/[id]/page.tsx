/* eslint-disable @next/next/no-img-element */
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Star, ShoppingBag, Heart, ChevronRight, Shield, Truck, RefreshCw } from "react-feather";
import React from "react";
import Link from "next/link";
interface Props {
    params: { id: string };
}

const RatingDisplay = ({ rating, numReviews }: { rating: number; numReviews: number }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="flex items-center gap-1">
            {[...Array(fullStars)].map((_, i) => (
                <Star key={`full-${i}`} className="w-5 h-5 text-amber-400 fill-amber-400" />
            ))}
            {hasHalfStar && (
                <div className="relative w-5 h-5">
                    <Star className="absolute text-gray-300" />
                    <div className="absolute overflow-hidden w-1/2 h-full">
                        <Star className="text-amber-400 fill-amber-400" />
                    </div>
                </div>
            )}
            {[...Array(emptyStars)].map((_, i) => (
                <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
            ))}
            <span className="ml-2 text-sm text-gray-500">({numReviews} değerlendirme)</span>
        </div>
    );
};

const PriceSection = ({ price, discount, finalPrice }: { price: number; discount: number; finalPrice: number }) => {
    return (
        <div className="py-6 border-y border-gray-200">
            {discount > 0 ? (
                <div className="flex flex-wrap items-baseline gap-3">
                    <span className="text-3xl font-bold text-indigo-600">
                        {finalPrice.toFixed(2)} ₺
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                        {price.toFixed(2)} ₺
                    </span>
                    <span className="px-2.5 py-1 bg-red-100 text-red-800 text-sm font-semibold rounded-full">
                        %{discount} indirim
                    </span>
                </div>
            ) : (
                <span className="text-3xl font-bold text-indigo-600">
                    {finalPrice.toFixed(2)} ₺
                </span>
            )}
        </div>
    );
};

const ProductGallery = ({ imageUrl, name }: { imageUrl: string | null; name: string }) => {
    return (
        <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center aspect-square shadow-sm">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={name}
                        className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                    />
                ) : (
                    <div className="text-gray-400 text-center p-6">
                        <div className="w-16 h-16 mx-auto mb-2">
                            <ShoppingBag className="w-full h-full text-gray-300" />
                        </div>
                        <p className="text-sm">Görsel bulunamadı</p>
                    </div>
                )}
            </div>
            <div className="grid grid-cols-4 gap-3">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-gray-100 rounded-lg aspect-square border-2 border-gray-200 cursor-pointer"></div>
                ))}
            </div>
        </div>
    );
};

const ProductActions = () => {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button className="flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg py-3 px-6 font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Sepete Ekle
                </button>
                <button className="flex items-center justify-center border-2 border-indigo-600 text-indigo-600 rounded-lg py-3 px-6 font-semibold hover:bg-indigo-50 transition-all">
                    Hızlı Satın Al
                </button>
            </div>
            <button className="w-full flex items-center justify-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium py-2 transition">
                <Heart className="w-5 h-5" />
                Favorilere Ekle
            </button>
        </div>
    );
};

const ProductFeatures = ({ features }: { features: string[] }) => {
    return (
        <div className="space-y-3">
            <h3 className="font-semibold text-lg text-gray-900">Öne Çıkan Özellikler</h3>
            <ul className="space-y-2">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                            <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                        </div>
                        <span className="ml-2 text-gray-700">{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const ProductBenefits = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start gap-3">
                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                    <Truck className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="font-medium text-gray-900">Ücretsiz Kargo</h4>
                    <p className="text-sm text-gray-600">150 TL ve üzeri siparişlerde</p>
                </div>
            </div>
            <div className="flex items-start gap-3">
                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                    <Shield className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="font-medium text-gray-900">Güvenli Alışveriş</h4>
                    <p className="text-sm text-gray-600">256-bit SSL şifreleme</p>
                </div>
            </div>
            <div className="flex items-start gap-3">
                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                    <RefreshCw className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="font-medium text-gray-900">Kolay İade</h4>
                    <p className="text-sm text-gray-600">14 gün içinde iade imkanı</p>
                </div>
            </div>
        </div>
    );
};

export default async function ProductDetailPage({ params }: Props) {
    const product = await prisma.product.findUnique({
        where: { id: params.id },
    });

    if (!product) notFound();

    // Mock features - replace with actual product features
    const features = [
        "Yüksek performanslı işlemci",
        "Uzun pil ömrü",
        "Hafif ve taşınabilir tasarım",
        "Yüksek çözünürlüklü ekran"
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-16 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Breadcrumb */}
                <nav className="flex items-center text-sm text-gray-600 mb-6">
                    <Link href="/" className="hover:text-indigo-600">Ana Sayfa</Link>
                    <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                    <Link href="/categories" className="hover:text-indigo-600">Kategoriler</Link>
                    <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                    <span className="text-gray-900">{product.category}</span>
                </nav>

                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-8">
                        <ProductGallery imageUrl={product.image_url} name={product.name} />

                        <div className="space-y-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
                                    <p className="text-indigo-600 font-medium mt-1">{product.brand}</p>
                                </div>
                                <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-red-500 transition-colors">
                                    <Heart className="w-6 h-6" />
                                </button>
                            </div>

                            <RatingDisplay rating={product.rating} numReviews={product.num_reviews} />

                            <PriceSection
                                price={product.price}
                                discount={product.discount}
                                finalPrice={product.final_price}
                            />

                            <ProductFeatures features={features} />

                            <ProductActions />

                            <ProductBenefits />
                        </div>
                    </div>

                    {/* Product Description */}
                    <div className="p-6 md:p-8 border-t border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Ürün Açıklaması</h2>
                        <div className="prose max-w-none text-gray-700">
                            {product.description || "Bu ürün için henüz bir açıklama eklenmemiştir."}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}