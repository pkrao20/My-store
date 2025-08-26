"use client"

import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
export type Filters = Record<string, string[]>;

const getFiltersFromSearchParams = (searchParams: ReadonlyURLSearchParams) => {
    const filtersFromUrl: Record<string, string[]> = {};
  
    searchParams.forEach((value, key) => {
       
        if (filtersFromUrl[key]) {
            filtersFromUrl[key].push(value);
        } else {
            filtersFromUrl[key] = [value];
        }
    });
    return filtersFromUrl
}



const shouldRedirectToFirstPage = (newFilters: [string, string[]][]): [string, string[]][] => {

   

    return newFilters;



}


const useFilters = () => {
    const searchParams = useSearchParams();
    const filters = useMemo<Record<string, string[] | null>>(() => getFiltersFromSearchParams(searchParams), [Array.from(searchParams).sort().toString(), searchParams]);
    const router = useRouter();
    const pathname = usePathname()


    const setFilters = useCallback((newFilters: [string, string[]][]) => {
        console.log('calledsetfilter', newFilters);
        const newSearchParams = new URLSearchParams(searchParams.toString());
        const updatedFilters = shouldRedirectToFirstPage(newFilters);
        updatedFilters.forEach(newFilter => {

            newSearchParams.delete(newFilter[0]);
            newFilter[1].forEach((value) => newSearchParams.append(newFilter[0], value));
        })

        newSearchParams.sort()
        const currentParams = new URLSearchParams(searchParams.toString())
        currentParams.sort()


        if (newSearchParams.toString() != currentParams.toString()) {
            router.replace(pathname + '?' + newSearchParams.toString());
        }

    }, [searchParams, pathname, router]);
    return { filters, setFilters };
}

export default useFilters;