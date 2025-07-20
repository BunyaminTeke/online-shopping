'use client';

import { useCart } from '@/app/context/CartContext';
import { ShoppingBag } from 'lucide-react';

type Product = {
    id: string;
    name: string;
    price: number;
    image_url?: string;        // Burada image var
    discount?: number;
    description?: string;
};

interface AddToCartButtonProps {
    product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const { addToCart } = useCart();

    const handleClick = () => {

        // console.log("Sepete ekleniyor:", product.image_url);
        console.log("Sepete ekleniyor:", product.id);

        addToCart({
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image_url,
            discount: product.discount || 0,
            description: product.description || '',
        });
    };


    return (
        <button
            onClick={handleClick}
            className="flex items-center justify-center bg-indigo-600 text-white rounded-xl py-4 px-6 font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg w-[100%]"
            type="button"
        >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Sepete Ekle
        </button>

    );
}
