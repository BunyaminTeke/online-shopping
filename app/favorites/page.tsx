// 'use client'; // Client Component olduğundan bunu ekledik
// import React, { useEffect, useState } from 'react';

// interface Product {
//     id: string;
//     name: string;
//     description?: string | null;
//     brand: string;
//     price: number;
//     discount: number;
//     final_price: number;
//     category: string;
//     stock: number;
//     rating: number;
//     num_reviews: number;
//     image_url?: string | null;
//     created_at: string;
//     features: string[];
// }

// export default function FavoritesPage() {
//     const [favorites, setFavorites] = useState<Product[]>([]);
//     const [error, setError] = useState<string | null>(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         async function getFavorites() {
//             try {
//                 const res = await fetch(`${window.location.origin}/api/favorites`, {
//                     credentials: 'include',
//                     cache: 'no-store'
//                 });

//                 if (!res.ok) throw new Error('Favoriler getirilemedi');

//                 const data = await res.json();

//                 console.log('Favoriler API cevabı:', data);

//                 if (!data.success) throw new Error(data.message || 'Hata oluştu');

//                 setFavorites(data.favorites);
//             } catch (err) {
//                 setError((err as Error).message);
//             } finally {
//                 setLoading(false);
//             }
//         }

//         getFavorites();
//     }, []);

//     if (loading) return <p>Yükleniyor...</p>;

//     if (error) return <p className="text-red-600">Favoriler yüklenirken hata oluştu: {error}</p>;

//     if (favorites.length === 0) {
//         return <p>Henüz favori ürün eklemediniz.</p>;
//     }

//     return (
//         <div className="max-w-6xl mx-auto p-6">
//             <h1 className="text-3xl font-bold mb-6">Favori Ürünleriniz</h1>
//             <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                 {favorites.map(product => (
//                     <li key={product.id} className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
//                         <img
//                             src={product.image_url || '/placeholder.png'}
//                             alt={product.name}
//                             className="w-full h-48 object-cover"
//                         />
//                         <div className="p-4">
//                             <h2 className="font-semibold text-lg">{product.name}</h2>
//                             <p className="text-indigo-600 font-semibold">{product.brand}</p>
//                             <p className="text-xl font-bold text-indigo-700">{product.final_price.toFixed(2)} ₺</p>
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }



'use client';
import React, { useEffect, useState } from 'react';

interface Product {
    id: string;
    name: string;
    description?: string | null;
    brand: string;
    price: number;
    discount: number;
    final_price: number;
    category: string;
    stock: number;
    rating: number;
    num_reviews: number;
    image_url?: string | null;
    created_at: string;
    features: string[];
}

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getFavorites() {
            try {
                const res = await fetch(`${window.location.origin}/api/favorites`, {
                    credentials: 'include',
                    cache: 'no-store'
                });

                if (!res.ok) throw new Error('Favoriler getirilemedi');

                const data = await res.json();

                if (!data.success) throw new Error(data.message || 'Hata oluştu');

                setFavorites(data.favorites);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        }

        getFavorites();
    }, []);

    const handleAddToCart = async (productId: string) => {
        try {
            const res = await fetch('/api/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ productId, quantity: 1 }),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                alert(data.message || 'Sepete eklenemedi');
            } else {
                alert('Ürün sepete eklendi!');
            }
        } catch (err) {
            console.error('Sepete ekleme hatası:', err);
            alert('Bir hata oluştu.');
        }
    };

    if (loading) return <p className="text-center mt-10">Yükleniyor...</p>;

    if (error) return <p className="text-red-600 text-center mt-10">Hata: {error}</p>;

    if (favorites.length === 0) {
        return <p className="text-center mt-10">Henüz favori ürün eklemediniz.</p>;
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8 text-center">Favori Ürünleriniz</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {favorites.map(product => (
                    <div
                        key={product.id}
                        className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col"
                    >
                        <img
                            src={product.image_url || '/placeholder.png'}
                            alt={product.name}
                            className="w-full h-56 object-cover rounded-t-2xl"
                        />
                        <div className="flex-1 p-4 flex flex-col justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                                <p className="text-gray-500">{product.brand}</p>
                                <p className="text-indigo-700 text-lg font-bold mt-2">
                                    {product.final_price.toFixed(2)} ₺
                                </p>
                            </div>
                            <button
                                onClick={() => handleAddToCart(product.id)}
                                className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                            >
                                Sepete Ekle
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
