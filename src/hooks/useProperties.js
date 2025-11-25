import { useEffect, useMemo, useState } from 'react';
import { seedProperties } from '../data/properties';
import { fetchProperties } from '../api/propertyApi';

const defaultFilters = {
  type: 'all',
  rent: 'all',
  location: 'all',
  minPrice: '',
  maxPrice: '',
  bedrooms: 'any',
  sort: 'newest'
};

export const useProperties = () => {
  const [filters, setFilters] = useState(defaultFilters);
  const [properties, setProperties] = useState(seedProperties);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchProperties();
      setProperties(data);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    let result = [...properties];

    if (filters.type !== 'all') result = result.filter((p) => p.type === filters.type);
    if (filters.location !== 'all') result = result.filter((p) => p.location === filters.location);
    if (filters.rent !== 'all') result = result.filter((p) => (filters.rent === 'rent' ? p.rent : !p.rent));
    if (filters.bedrooms !== 'any') result = result.filter((p) => p.bedrooms >= Number(filters.bedrooms));
    if (filters.minPrice) result = result.filter((p) => p.price >= Number(filters.minPrice));
    if (filters.maxPrice) result = result.filter((p) => p.price <= Number(filters.maxPrice));

    switch (filters.sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        result.sort((a, b) => (a.id < b.id ? 1 : -1));
    }

    return result;
  }, [filters, properties]);

  return {
    filters,
    setFilters,
    properties: filtered,
    rawProperties: properties,
    loading,
    resetFilters: () => setFilters(defaultFilters)
  };
};
