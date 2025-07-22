//components/AddToCartButton.tsx
'use client';

import { useCart } from '@/app/context/CartContext';
import { ShoppingBag, Plus, Minus } from 'lucide-react';
import { useMemo } from 'react';

type Product = {
    id: string;
    name: string;
    price: number;
    image_url?: string;
    discount?: number;
    description?: string;
    stock: number; // stok burada zorunlu
    category?: string; // kategori opsiyonel olarak eklendi
};

interface AddToCartButtonProps {
    product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const { addToCart, removeFromCart, cart } = useCart();

    // Sepetteki ürün sayısını bul
    const cartItem = useMemo(() => {
        return cart.find(item => item.productId === product.id);
    }, [cart, product.id]);

    const quantity = cartItem?.quantity || 0;
    const stock = typeof product.stock === 'number' ? product.stock : 0;

    const handleAdd = () => {
        if (quantity < stock) {
            addToCart({
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.image_url,
                discount: product.discount || 0,
                description: product.description || '',
                category: product.category || '',

            });
        }
    };

    const handleRemove = () => {
        if (quantity > 0) {
            removeFromCart(product.id);
        }
    };

    const isMaxReached = quantity >= stock;

    return (
        <div className="flex items-center justify-between bg-indigo-600 text-white rounded-xl py-3 px-4 font-semibold shadow-md w-full">
            {quantity === 0 ? (
                <button
                    onClick={handleAdd}
                    className="flex items-center justify-center w-full hover:bg-indigo-700 transition-all"
                    type="button"
                >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Sepete Ekle
                </button>
            ) : (
                <div className="flex items-center justify-between w-full">
                    <button
                        onClick={handleRemove}
                        className="hover:text-red-300 transition"
                        type="button"
                    >
                        <Minus className="w-5 h-5" />
                    </button>

                    <span className="text-lg">{quantity}</span>

                    <button
                        onClick={handleAdd}
                        disabled={isMaxReached}
                        className={`hover:text-green-300 transition ${isMaxReached ? 'opacity-50 cursor-not-allowed' : ''}`}
                        type="button"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
}
