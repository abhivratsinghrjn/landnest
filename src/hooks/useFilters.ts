import { useState, useCallback } from 'react';
import { Property } from '../types';

interface FilterState {
  priceRange: string;
  propertyType: string;
  propertyFeatures: string;
  landSize: string;
  searchQuery: string;
}

export function useFilters(initialProperties: Property[]) {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: '',
    propertyType: '',
    propertyFeatures: '',
    landSize: '',
    searchQuery: '',
  });

  const filterProperties = useCallback(() => {
    return initialProperties.filter(property => {
      // Search query filter
      if (filters.searchQuery && !property.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
          !property.location.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false;
      }

      // Price range filter
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number);
        if (max && (property.price < min || property.price > max)) return false;
        if (!max && property.price < min) return false;
      }

      // Property type filter
      if (filters.propertyType && property.category !== filters.propertyType) {
        return false;
      }

      // Property features (bedrooms) filter
      if (filters.propertyFeatures && property.bedrooms !== parseInt(filters.propertyFeatures)) {
        return false;
      }

      // Land size filter (for agricultural properties)
      if (filters.landSize && property.category === 'agricultural') {
        const [min, max] = filters.landSize.split('-').map(Number);
        const acres = property.size / 43560; // Convert sq ft to acres
        if (max && (acres < min || acres > max)) return false;
        if (!max && acres < min) return false;
      }

      return true;
    });
  }, [initialProperties, filters]);

  return {
    filters,
    setFilters,
    filterProperties,
  };
}