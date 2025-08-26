import React from 'react'
import { Package } from 'lucide-react';
import { useTheme } from '@/context/themeContext';
const NoDataFound = () => {
    const {theme} = useTheme();
    return (
        <div className="col-span-full flex flex-col items-center justify-center py-20 h-[100%]">
            <div
                className={`p-8 rounded-full ${theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-500'
                    }`}
            >
                <Package className="w-16 h-16" />
            </div>
            <h2 className="text-2xl font-semibold mt-6 mb-2 text-center">
                No Products Found
            </h2>
            <p className="text-center text-gray-500 max-w-xs">
                We couldn’t find any products matching your filters or search. Try adjusting them to see more products.
            </p>
        </div>
    )
}

export default NoDataFound