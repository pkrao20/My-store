'use client'
import { useTheme } from '@/context/themeContext';
import React from 'react';
import { RefreshCw, Home } from "lucide-react";
import { useRouter } from 'next/navigation';

const NoData = ({ onRefresh }: { onRefresh: () => void }) => {
    const { theme } = useTheme();
    const router = useRouter();

    return (
        <div className={`min-h-screen flex flex-col justify-center items-center pt-20 transition-colors duration-300
                ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <p className="mb-6 text-center max-w-sm">
                Sorry, we couldn&apos;t find the product you&apos;re looking for.
                You can refresh the page or go back to the homepage.
            </p>

            <div className="flex gap-4">
                <button
                    onClick={onRefresh}
                    className={`flex items-center gap-2 py-2 px-6 rounded-xl font-semibold shadow-md transition-all cursor-pointer
                        ${theme === "dark" ? "bg-indigo-500 hover:bg-indigo-600 text-white" : "bg-indigo-600 hover:bg-indigo-700 text-white"}`}
                >
                    <RefreshCw className="w-5 h-5" /> Refresh
                </button>

                <button
                    onClick={() => router.push('/')}
                    className={`flex items-center gap-2 py-2 px-6 rounded-xl font-semibold shadow-md transition-all cursor-pointer
                        ${theme === "dark" ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-900"}`}
                >
                    <Home className="w-5 h-5" /> Home
                </button>
            </div>
        </div>
    );
}

export default NoData;
