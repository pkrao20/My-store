// generic custom hook for doing any API call in any component
"use client";
import fetchData from "@/utils/fetchData";
import { useCallback, useState } from "react";
// import fetchData from "@/utils/fetchData";
export type RequestConfig = {
  path: string;
  method?: string;
  contentType?: string;
}
export interface IUseAPIProps {
  requestConfig: RequestConfig;

}
export interface RequestParams {
  query?: Record<string, string[] | string>;
  body?: any
}


export function useApi<ResponseType>(apiProps: IUseAPIProps) {
  const [data, setData] = useState<ResponseType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const fetchDataCallback = useCallback(async ({query, body}: RequestParams) => {
      try {
        setLoading(true);
        const fetchedData = await fetchData<ResponseType>({...apiProps, query, body});
        setData(fetchedData);
        setError(null);
        return fetchedData
      } catch (error: any) {
        setError(
          error instanceof Error ? error : new Error("An error occurred")
        );
      } finally {
        setLoading(false);
      }
    },
    [apiProps]
  );
  return { data, loading, error, fetchData:fetchDataCallback };
}