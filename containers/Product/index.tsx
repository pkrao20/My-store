'use client'
import { Product } from "@/constant/types";
import { useApi } from "@/hooks/useApi";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { useCart } from "@/context/cartContext";
import { useTheme } from "@/context/themeContext";
import Loader from "./Loader";

const ProductDetailPage = () => {
    const { id } = useParams();
    const { data, loading, fetchData } = useApi<Product>({
        requestConfig: {
            path: `https://fakestoreapi.com/products/${id}`,
            method: "GET",
        },
    });
    const { addToCart } = useCart();
    const { theme } = useTheme();

    useEffect(() => {
        fetchData({});
    }, []);

    if (loading && !data)
        return (
            <Loader />
        );
    if (!data) {
        return null;
    }
    return (
        <div className={`min-h-screen pt-20 pb-10 transition-colors duration-300 ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}>
            <div className={`max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 rounded-2xl shadow-lg transition-colors duration-300 
                ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>

                {/* Product Image */}
                <div className="flex justify-center items-center py-10">
                    <Image
                        src={data.image}
                        alt={data.title}
                        width={500}
                        height={500}
                        className={`rounded-xl object-contain shadow-lg p-6 transition-colors duration-300 
                            ${theme === "dark" ? "bg-gray-700" : "bg-gray-50"}`}
                    />
                </div>

                {/* Product Details */}
                <div className="flex flex-col justify-center space-y-6 py-10">
                    {/* Category */}
                    <p className={`uppercase text-sm font-medium tracking-wide ${theme === "dark" ? "text-indigo-400" : "text-indigo-600"}`}>
                        {data.category}
                    </p>

                    {/* Title */}
                    <h1 className={`text-3xl md:text-4xl font-bold leading-snug transition-colors duration-300 
                        ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        {data.title}
                    </h1>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-5 h-5 ${i < Math.round(data.rating?.rate)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : theme === "dark"
                                        ? "text-gray-500"
                                        : "text-gray-300"
                                    }`}
                            />
                        ))}
                        <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                            ({data.rating?.count} reviews)
                        </span>
                    </div>

                    {/* Price */}
                    <p className={`text-4xl font-semibold ${theme === "dark" ? "text-indigo-400" : "text-indigo-600"}`}>
                        ₹{data.price}
                    </p>

                    {/* Description */}
                    <p className={`text-lg leading-relaxed transition-colors duration-300 
                        ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                        {data.description}
                    </p>

                    {/* Add to Cart Button */}
                    <button
                        onClick={() => addToCart(data, 1)}
                        className={`py-3 px-6 rounded-xl font-semibold shadow-md transition-all w-full sm:w-auto
                            ${theme === "dark"
                                ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                                : "bg-indigo-600 hover:bg-indigo-700 text-white"}`}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
