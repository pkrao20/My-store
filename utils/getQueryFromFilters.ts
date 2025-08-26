const getQueryFromFilter = (filters: Record<string, string[] | null>) => {
  const filtered: Record<string, string | string[]> = {};
  for (const key in filters) {
    if (filters[key] !== null) {
      filtered[key] = filters[key] as string | string[];
    }
  }
  return filtered;
};

export default getQueryFromFilter;