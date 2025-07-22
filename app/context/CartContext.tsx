
'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface CartItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    discount?: number;
    description?: string;
    category: string;

}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    updateQuantity: (productId: string, newQuantity: number) => void; // 🔧 EKLE
}


const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    // ✅ localStorage'dan yükle
    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    // ✅ localStorage'a yaz
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
        // console.log("🛒 Sepet güncellendi:", cart);
    }, [cart]);

    const addToCart = (item: CartItem) => {


        setCart((prevCart) => {
            const existingItem = prevCart.find(i => i.productId === item.productId);
            const updatedCart = existingItem
                ? prevCart.map(i =>
                    i.productId === item.productId
                        ? { ...i, quantity: i.quantity + item.quantity }
                        : i
                )
                : [...prevCart, item];

            return updatedCart;
        });
    };

    const removeFromCart = (productId: string) => {
        setCart((prevCart) => prevCart.filter(i => i.productId !== productId));
    };

    const updateQuantity = (productId: string, newQuantity: number) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.productId === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };


    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            clearCart,
            updateQuantity // 🔧 EKLE
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}

