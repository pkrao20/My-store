'use client';
import React, { useCallback, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Star, Check } from "lucide-react";
import { Product } from '@/constant/types';
import { useTheme } from '@/context/themeContext';
import { useCart } from '@/context/cartContext';

const ProductCard = ({ product }: { product: Product }) => {
    const { id, title, price, description, category, image, rating } = product;
    const { theme } = useTheme();
    const { addToCart } = useCart();
    const [justAdded, setJustAdded] = useState(false);

    const handleAdd = useCallback(() => {
        addToCart(product, 1);
        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 3000);
    }, [addToCart, product]);

    return (
        <div
            className={`max-w-sm rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden 
                ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
        >
            {/* Product Image */}
            <Link href={`/products/${id}`}>
                <div className={`relative w-full h-60 flex items-center justify-center cursor-pointer 
                    ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <Image src={image} alt={title} fill className="object-contain p-4" />
                </div>
            </Link>

            {/* Product Details */}
            <div className="p-5">
                <Link href={`/products/${id}`}>
                    <p className={`text-xs uppercase tracking-wide mb-1 cursor-pointer 
                        ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {category}
                    </p>
                    <h2 className="text-lg font-semibold line-clamp-2 mb-2 cursor-pointer">{title}</h2>
                </Link>
                <p className={`text-sm line-clamp-2 mb-3 
                    ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.round(rating.rate)
                                ? "text-yellow-400 fill-yellow-400"
                                : theme === 'dark'
                                    ? "text-gray-500"
                                    : "text-gray-300"
                                }`}
                        />
                    ))}
                    <span className={`text-xs ml-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        ({rating.count})
                    </span>
                </div>

                {/* Price & Button */}
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-indigo-600">${price}</span>
                    <button
                        onClick={handleAdd}
                        className={`px-4 py-2 text-sm rounded-xl shadow-md transition flex items-center gap-2
                            ${theme === 'dark'
                                ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
                                : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
                    >
                        {justAdded ? <><Check className="w-4 h-4" /> Added</> : "Add to Cart"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
