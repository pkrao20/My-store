"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Product } from "@/constant/types";

type CartItem = {
    id: Product["id"];
    title: Product["title"];
    price: Product["price"];
    image: Product["image"];
    quantity: number;
};

type CartContextType = {
    items: CartItem[];
    addToCart: (product: Product, qty?: number) => void;
    removeFromCart: (id: Product["id"]) => void;
    clearCart: () => void;
    count: number;
};

const CartContext = createContext<CartContextType | null>(null);
const LS_KEY = "cart:v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>(() => {
        if (typeof window === "undefined") return [];
        try {
            const raw = localStorage.getItem(LS_KEY);
                return raw ? (JSON.parse(raw) as CartItem[]) : [];
        } catch {
            return [];
        }
    });

    // write-through persistence
    useEffect(() => {
        try {
            localStorage.setItem(LS_KEY, JSON.stringify(items));
        } catch { }
    }, [items]);

    const addToCart = (product: Product, qty: number = 1) => {
        setItems(prev => {
            const idx = prev.findIndex(p => p.id === product.id);
            if (idx >= 0) {
                const next = [...prev];
                next[idx] = { ...next[idx], quantity: next[idx].quantity + qty };
                return next;
            }
            return [
                ...prev,
                {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    quantity: qty,
                },
            ];
        });
    };

    const removeFromCart = (id: Product["id"]) =>
        setItems(prev => prev.filter(p => p.id !== id));

    const clearCart = () => setItems([]);

    const count = useMemo(() => items.reduce((s, it) => s + it.quantity, 0), [items]);

    const value = useMemo(
        () => ({ items, addToCart, removeFromCart, clearCart, count }),
        [items, count]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
};
