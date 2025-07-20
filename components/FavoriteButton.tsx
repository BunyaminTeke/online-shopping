'use client';

import React, { useState, useEffect } from 'react';

interface FavoriteButtonProps {
    productId: string;
}

export default function FavoriteButton({ productId }: FavoriteButtonProps) {
    const [isFavorited, setIsFavorited] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function checkFavorite() {
            try {
                const res = await fetch('/api/favorites');
                const data = await res.json();

                if (res.ok && data.favorites) {
                    // includes yerine some kullan
                    setIsFavorited(data.favorites.some((fav: any) => fav.id === productId));
                }
            } catch {
                // Sessiz geç
            }
        }

        checkFavorite();
    }, [productId]);


    async function toggleFavorite() {
        setLoading(true);
        setError(null);

        try {
            const url = isFavorited ? '/api/favorites/remove' : '/api/favorites/add';

            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId }),
            });

            const data = await res.json();

            if (res.ok) {
                setIsFavorited(!isFavorited);
            } else {
                setError(data.message || 'Bir hata oluştu');
            }
        } catch (err) {
            setError('Sunucu ile bağlantı kurulamadı.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <button
            onClick={toggleFavorite}
            disabled={loading}
            className={`p-3 rounded-full border border-gray-200 transition-colors
        ${isFavorited ? 'bg-red-100 text-red-600 border-red-300' : 'text-gray-500 hover:bg-gray-50 hover:text-red-500'}`}
            aria-label={isFavorited ? 'Favorilerden çıkar' : 'Favorilere ekle'}
            title={isFavorited ? 'Favorilerden çıkarıldı' : 'Favorilere eklendi'}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill={isFavorited ? 'red' : 'none'}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.682l-7.682-7.682a4.5 4.5 0 010-6.364z" />
            </svg>
            {loading && <span className="ml-2">Bekleyiniz...</span>}
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </button>
    );
}
