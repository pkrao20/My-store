'use client'
import { Product, sortOrder } from "@/constant/types";
import { useApi } from "./useApi";
import useFilters from "./useFilters";
import { useEffect, useState } from "react";

export const useAllProducts = () => {
    const { filters } = useFilters();
    const [allProducts, setAllProducts] = useState<Product[] | null>(null);
    const { data, loading, fetchData } = useApi<Product[]>({
        requestConfig: {
            path: 'https://fakestoreapi.com/products',
            method: 'GET'
        }
    });

    useEffect(() => {
        if (data) {
            let filteredProducts = [...data];

           // api doesn't support filtering
           
            const searchText = filters?.["searchText"]?.[0]?.toLowerCase() || "";
            if (searchText) {
                filteredProducts = filteredProducts.filter(product =>
                    product.title.toLowerCase().includes(searchText)
                );
            }

           
            const categoryFilter = filters?.["category"]?.[0];

            if (categoryFilter) {
                filteredProducts = filteredProducts.filter(product =>
                    product.category.toLowerCase() === categoryFilter.toLowerCase()
                );
            }

      
            const sort = filters?.["sortOrder"]?.[0];
            if (sort === sortOrder.ASC) {
                filteredProducts.sort((a, b) => a.price - b.price);
            } else if (sort === sortOrder.DESC) {
                filteredProducts.sort((a, b) => b.price - a.price);
            }

            setAllProducts(filteredProducts);
        }
    }, [data, filters]);

    return {
        fetchData,
        allProducts,
        loading
    };
};
