/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import AddToCartButton from '@/components/AddToCartButton';

interface Product {
    id: string;
    name: string;
    brand: string;
    price: number;
    discount: number;
    final_price: number;
    category: string;
    stock: number;
    rating: number;
    num_reviews: number;
    image_url?: string;
    description?: string;

}

type ToastType = "success" | "error";

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // ⬇︎  localStorage ile kalıcı sepet
    const [cartItems, setCartItems] = useState<{ [key: string]: number }>({});

    // ⬇︎  mini toast
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [notificationType, setNotificationType] = useState<ToastType>("success");




    useEffect(() => {
        const storedCart = localStorage.getItem("cartItems");
        if (storedCart) {
            try {
                setCartItems(JSON.parse(storedCart));
            } catch (e) {
                console.error("Sepet verisi çözümlenemedi:", e);
            }
        }
    }, []);


    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);



    useEffect(() => {
        fetch("/api/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);


    const showToast = (message: string, type: ToastType = "success") => {
        setNotificationMessage(message);
        setNotificationType(type);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };




    const incrementCart = (productId: string) => {
        const product = products.find((p) => p.id === productId);
        if (!product) return;

        const currentQuantity = cartItems[productId] || 0;

        if (currentQuantity >= product.stock) {
            showToast(`En fazla ${product.stock} adet ekleyebilirsiniz.`, "error");
            return;
        }

        setCartItems((prev) => ({
            ...prev,
            [productId]: currentQuantity + 1,
        }));
    };

    const decrementCart = (productId: string) => {
        setCartItems((prev) => {
            const currentCount = prev[productId] || 0;
            if (currentCount <= 1) {
                const newState = { ...prev };
                delete newState[productId];
                return newState;
            }
            return {
                ...prev,
                [productId]: currentCount - 1,
            };
        });
    };




    const renderStars = (rating: number) =>
        Array(5)
            .fill(0)
            .map((_, i) => (
                <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
                        }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ));


    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-3">
                        Premium Ürün Kataloğu
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        En kaliteli ürünlerimizle ihtiyaçlarınızı karşılamak için
                        buradayız.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 flex flex-col animate-pulse"
                        >
                            <div className="h-60 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-5"></div>
                            <div className="h-6 bg-gray-200 rounded-full mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded-full w-3/4 mb-3"></div>
                            <div className="h-5 bg-gray-200 rounded-full w-1/2 mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded-full w-4/5 mt-auto mb-4"></div>
                            <div className="h-12 bg-gray-200 rounded-xl"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    /* 6.2) Ürün bulunamadı */
    if (products.length === 0) {
        return (
            <div className="max-w-4xl mx-auto p-4 min-h-[70vh] flex flex-col items-center justify-center pt-24">
                <div className="bg-gradient-to-br from-white to-gray-50 p-10 rounded-3xl shadow-xl border border-gray-200 text-center max-w-lg">
                    <div className="mx-auto mb-6">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 mx-auto flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">
                        Ürün Bulunamadı
                    </h2>
                    <p className="text-gray-600 text-lg mb-8">
                        Şu anda listelenecek ürün bulunmamaktadır. Lütfen daha sonra tekrar
                        kontrol edin.
                    </p>
                    <button
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium text-lg"
                        onClick={() => window.location.reload()}
                    >
                        Sayfayı Yenile
                    </button>
                </div>
            </div>
        );
    }

    /* 6.3) Normal görünüm */
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-12">
            {/* Navbar boşluğu için overlay */}
            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent z-10"></div>

            {/* Toast Bildirimi */}
            {showNotification && (
                <div className="fixed top-24 right-5 z-50 animate-fadeInOut">
                    <div
                        className={`flex items-center px-6 py-4 rounded-xl shadow-xl text-white ${notificationType === "success" ? "bg-green-500" : "bg-red-500"
                            }`}
                    >
                        {notificationType === "success" ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M18.364 5.636l-1.414-1.414L12 9.172 7.05 4.222 5.636 5.636 10.586 10.586 5.636 15.536l1.414 1.414L12 12.828l4.95 4.95 1.414-1.414-4.95-4.95z"
                                />
                            </svg>
                        )}
                        <span>{notificationMessage}</span>
                    </div>
                </div>
            )}

            {/* Sayfa başlığı */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-3">
                    Premium Ürün Kataloğu
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                    En kaliteli ürünlerimizle ihtiyaçlarınızı karşılamak için buradayız.
                    Favori ürünlerinizi keşfedin.
                </p>
            </div>

            {/* Ürün kartları */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col transform hover:-translate-y-1"
                    >
                        {/* Ürün resmi / indirim etiketi */}
                        <div className="relative">
                            {product.discount > 0 && (
                                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-md z-10">
                                    %{product.discount} İNDİRİM
                                </div>
                            )}

                            {product.image_url ? (
                                <div className="h-60 hover:cursor-pointer flex items-center justify-center p-5 bg-gradient-to-br from-gray-50 to-gray-100">
                                    <img
                                        onClick={() => (window.location.href = `/product/${product.id}`)}
                                        src={product.image_url}
                                        alt={product.name}
                                        className="max-h-full max-w-full object-contain transition-transform duration-500 hover:scale-110"
                                    />
                                </div>
                            ) : (
                                <div className="h-60 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-5">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-16 w-16 text-gray-300 mb-3"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <span className="text-gray-400 font-medium">Resim Yok</span>
                                </div>
                            )}
                        </div>

                        {/* Ürün bilgileri */}
                        <div className="p-5 flex flex-col flex-grow">
                            {/* Kategori rozeti */}
                            <div className="mb-2">
                                <span className="inline-block bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
                                    {product.category}
                                </span>
                            </div>

                            {/* Ürün adı */}
                            <h2 className="font-bold text-xl text-gray-800 mb-1 line-clamp-2 leading-tight min-h-[56px]">
                                {product.name}
                            </h2>

                            {/* Marka */}
                            <p className="text-sm text-amber-600 mb-3">{product.brand}</p>

                            {/* Yıldız + yorum sayısı */}
                            <div className="flex items-center mb-4">
                                <div className="flex mr-2">{renderStars(product.rating)}</div>
                                <span className="text-sm text-gray-500">
                                    ({product.num_reviews})
                                </span>
                            </div>

                            {/* Fiyat + stok etiketi + butonlar */}
                            <div className="mt-auto">
                                <div className="flex justify-between items-center mb-4">
                                    {/* Fiyat */}
                                    <div>
                                        <p className="text-2xl font-bold text-gray-800">
                                            ₺{product.final_price.toFixed(2)}
                                        </p>
                                        {product.discount > 0 && (
                                            <p className="text-sm text-gray-500 line-through">
                                                ₺{product.price.toFixed(2)}
                                            </p>
                                        )}
                                    </div>

                                    {/* Stok etiketi */}
                                    <div
                                        className={`text-xs font-medium px-3 py-1.5 rounded-full ${product.stock > 10
                                            ? "bg-green-100 text-green-800"
                                            : product.stock > 0
                                                ? "bg-yellow-100 text-yellow-800"
                                                : "bg-red-100 text-red-800"
                                            }`}
                                    >
                                        {product.stock > 10
                                            ? "Stokta"
                                            : product.stock > 0
                                                ? "Son Ürünler"
                                                : "Stok Yok"}
                                    </div>
                                </div>

                                {/* Sepet butonları */}
                                <div className="flex gap-2">
                                    {cartItems[product.id] ? (
                                        /* Adet arttır / azalt */
                                        <div className="flex w-full">
                                            <button
                                                onClick={() => decrementCart(product.id)}
                                                className="w-1/4 bg-red-50 text-red-600 hover:bg-red-100 font-medium py-3 rounded-lg transition-colors flex items-center justify-center"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M20 12H4"
                                                    />
                                                </svg>
                                            </button>
                                            <div className="w-2/4 flex items-center justify-center bg-gray-50 font-bold text-gray-800 rounded-lg">
                                                {cartItems[product.id]} Adet
                                            </div>
                                            <button
                                                onClick={() => incrementCart(product.id)}
                                                className="w-1/4 bg-green-50 text-green-600 hover:bg-green-100 font-medium py-3 rounded-lg transition-colors flex items-center justify-center"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    ) : (

                                        <AddToCartButton
                                            product={{
                                                id: product.id,
                                                name: product.name,
                                                price: product.price,
                                                image_url: product.image_url || '', // veya hiç yazmayabilirsin çünkü opsiyonel
                                                discount: product.discount,         // varsa ver, yoksa yazmasan da olur
                                                description: product.description,   // varsa ver, yoksa yazmasan da olur
                                                stock: product.stock,               // zorunlu alan eklendi
                                            }}
                                        />


                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>






            <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-indigo-700 transition-all">
                Sepete Git
            </button>
        </div>


    );
}
