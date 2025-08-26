'use client';
import ProductCard from '@/components/Product/Product';
import { allProductsData } from '@/constant/dummydata';
import { Product } from '@/constant/types';
import { useTheme } from '@/context/themeContext';
import { useAllProducts } from '@/hooks/useAllProducts';
import { useApi } from '@/hooks/useApi';
import useFilters from '@/hooks/useFilters';
import getQueryFromFilter from '@/utils/getQueryFromFilters';
import { useEffect } from 'react';
import Loader from './Loader';
import NoDataFound from './NoDataFound';
// import { useTheme } from '@/context/ThemeContext';

const AllProducts = () => {
    const { theme } = useTheme();
    const { filters } = useFilters();
    const { loading, fetchData, allProducts } = useAllProducts();


    useEffect(() => {
        const validFilters = getQueryFromFilter(filters);
        fetchData({
            query: {
                ...validFilters
            }

        });
    }, [filters]);

    return (
        <div
            className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'text-gray-900'} min-h-screen `}
            style={theme === 'light' ? { background: 'linear-gradient(180deg, #EAF6FF 0%, #F5FBFF 100%)' } : {}}
        >

            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-24">
                {(loading || !allProducts) ? <Loader /> :
                    <>
                        {allProducts?.length == 0 ? <NoDataFound /> :
                            <>

                                {allProducts?.map((item) => (
                                    <ProductCard key={item.id} product={item} />
                                ))} </>}
                    </>}
            </div>

        </div>
    );
};

export default AllProducts;
