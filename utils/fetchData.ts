import { IUseAPIProps, RequestParams } from "@/hooks/useApi";


function toQueryString(
  query: Record<string, string[] | string> | undefined
): string {
  return (
    (query &&
      Object.keys(query)
        .map((key) => {
          const valueArr = query[key];
          if (Array.isArray(valueArr)) {
            return `${valueArr
              .map(
                (val) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
              )
              .join("&")}`;
          } else {
            return `${encodeURIComponent(key)}=${encodeURIComponent(valueArr)}`;
          }
        })
        .join("&")) ||
    ""
  );
}

const fetchData = async <T>({
  requestConfig,
  query,
  body,
}: IUseAPIProps & RequestParams): Promise<T | null> => {
  const { path, method } = requestConfig;
  let fullUrl = `${path}`;

  if (query) {
    fullUrl = `${fullUrl}?${toQueryString(query)}`;
  }

  const contentTypeHeader: any =
    body instanceof FormData
      ? {}
      : { "Content-Type": requestConfig.contentType || "application/json" };
  
  try {
    const response = await fetch(fullUrl, {
      method,
      headers: {
        ...contentTypeHeader,
      
      },
      body: body instanceof FormData ? body : JSON.stringify(body), // Include body if present
      // credentials: "include",
    });
   
    const fetchedData = await response.json();
    return fetchedData;
    //   setData(fetchedData);
  } catch (error: any) {
    throw error;
  }
};

export default fetchData;
