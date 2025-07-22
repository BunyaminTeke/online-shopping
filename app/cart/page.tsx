'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/app/context/CartContext';
import Image from 'next/image';
import { FiTrash2, FiShoppingBag, FiArrowLeft, FiPlus, FiMinus } from 'react-icons/fi';

export default function CartPage() {
    const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
    type Recommendation = {
        id: string | number;
        name: string;
        price: number;
        image_url?: string;
    };
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

    const totalPrice = cart.reduce((sum, item) => {
        const discountedPrice = item.discount
            ? item.price * (1 - item.discount / 100)
            : item.price;
        return sum + discountedPrice * item.quantity;
    }, 0);

    const handleQuantityChange = (productId: string | number, newQuantity: number) => {
        if (newQuantity >= 1) {
            updateQuantity(String(productId), newQuantity);
        }
    };

    useEffect(() => {
        const fetchRecommendations = async () => {
            if (cart.length === 0) {
                setRecommendations([]);
                return;
            }

            const productId = cart[0].productId;

            try {
                const res = await fetch(`/api/recommendations?id=${productId}`);
                const data = await res.json();

                if (Array.isArray(data)) {
                    setRecommendations(data);
                } else {
                    setRecommendations([]);
                }
            } catch (error) {
                console.error('Önerilen ürünler çekilemedi:', error);
                setRecommendations([]);
            }
        };

        fetchRecommendations();
    }, [cart]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Başlık */}
                <div className="flex flex-col items-center mb-10 pt-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3 flex items-center">
                        <FiShoppingBag className="mr-3 text-indigo-600" />
                        Sepetim
                    </h1>
                    <p className="text-gray-600">{cart.length} farklı ürün</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {cart.length === 0 ? (
                        <div className="py-20 text-center">
                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 mx-auto flex items-center justify-center">
                                <FiShoppingBag className="text-gray-400 text-4xl" />
                            </div>
                            <h3 className="mt-6 text-2xl font-medium text-gray-900">Sepetiniz boş</h3>
                            <p className="mt-3 text-gray-500 max-w-md mx-auto">
                                Alışverişe başlamak için ürünleri sepete ekleyin.
                            </p>
                            <button
                                onClick={() => window.location.href = '/product'}
                                className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg transition-colors flex items-center mx-auto"
                            >
                                <FiArrowLeft className="mr-2" />
                                Alışverişe Devam Et
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Sepetteki ürünler */}
                            <div className="divide-y divide-gray-100">
                                {cart.map((item, index) => {
                                    const discountedPrice = item.discount
                                        ? item.price * (1 - item.discount / 100)
                                        : item.price;

                                    return (
                                        <div
                                            key={`${item.productId}-${index}`}
                                            className="flex flex-col md:flex-row items-start p-6 transition-all hover:bg-gray-50"
                                        >
                                            <div className="flex-shrink-0 w-full md:w-32 h-32 bg-gray-200 rounded-xl overflow-hidden mb-4 md:mb-0">
                                                {item.image && (
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        width={128}
                                                        height={128}
                                                        className="w-full h-full object-cover"
                                                    />
                                                )}
                                            </div>

                                            <div className="ml-0 md:ml-6 flex-grow w-full">
                                                <div className="flex flex-col md:flex-row md:justify-between">
                                                    <div className="flex-grow">
                                                        <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
                                                        {item.description && (
                                                            <p className="text-sm text-gray-500 mt-2">{item.description}</p>
                                                        )}
                                                    </div>
                                                    <div className="mt-4 md:mt-0 text-right">
                                                        <p className="font-bold text-xl text-indigo-700">
                                                            {(discountedPrice * item.quantity).toFixed(2)}₺
                                                        </p>
                                                        {item.discount && (
                                                            <p className="text-sm text-gray-500 line-through">
                                                                {(item.price * item.quantity).toFixed(2)}₺
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between">
                                                    <div className="flex items-center">
                                                        <span className="text-sm text-gray-600 mr-3">Adet:</span>
                                                        <div className="flex items-center border border-gray-200 rounded-lg">
                                                            <button
                                                                className="px-3 py-2 text-gray-500 hover:bg-gray-100 transition-colors"
                                                                onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                                                            >
                                                                <FiMinus />
                                                            </button>
                                                            <span className="px-4 text-gray-900 py-2 font-medium">{item.quantity}</span>
                                                            <button
                                                                className="px-3 py-2 text-gray-500 hover:bg-gray-100 transition-colors"
                                                                onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                                                            >
                                                                <FiPlus />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={() => removeFromCart(item.productId)}
                                                        className="mt-4 sm:mt-0 flex items-center text-red-600 hover:text-red-800 transition-colors font-medium"
                                                    >
                                                        <FiTrash2 className="mr-2" />
                                                        Ürünü Kaldır
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Toplam tutar ve işlemler */}
                            <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-t border-gray-100">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div className="mb-6 md:mb-0">
                                        <p className="text-lg font-semibold text-gray-900">Toplam Sepet Tutarı</p>
                                        <p className="text-4xl font-bold text-indigo-700 mt-2">{totalPrice.toFixed(2)}₺</p>
                                        <p className="text-sm text-gray-600 mt-3">Kargo ücreti ödeme adımında hesaplanır</p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <button
                                            onClick={clearCart}
                                            className="flex items-center justify-center px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <FiTrash2 className="mr-2" />
                                            Sepeti Temizle
                                        </button>
                                        <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg">
                                            Ödemeye Geç ({totalPrice.toFixed(2)}₺)
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Önerilen ürünler */}
                {cart.length > 0 && (
                    <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="font-bold text-xl text-gray-900 mb-5">Diğer Kullanıcılar Bu Ürünlerle Birlikte Aldı!</h3>
                        <div className="flex overflow-x-auto pb-4 -mx-1 scrollbar-hide">
                            {recommendations.length > 0 ? (
                                recommendations.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex-shrink-0 w-56 mx-3 bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow"
                                    >
                                        <div className="bg-gray-200 rounded-xl w-full h-40 mb-3 overflow-hidden">
                                            {item.image_url && (
                                                <Image
                                                    src={item.image_url}
                                                    alt={item.name}
                                                    width={200}
                                                    height={160}
                                                    className="w-full h-full object-cover"
                                                />
                                            )}
                                        </div>
                                        <p className="text-base font-semibold text-gray-900 truncate">{item.name}</p>
                                        <div className="flex items-center mt-2">
                                            <p className="text-lg font-bold text-indigo-700">{item.price}₺</p>
                                        </div>
                                        <button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors">
                                            Sepete Ekle
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p>Önerilen ürün bulunamadı.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
