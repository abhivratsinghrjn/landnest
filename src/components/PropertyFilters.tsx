import React from 'react';
import { Search } from 'lucide-react';

interface PropertyFiltersProps {
  type: 'sale' | 'rent' | 'agricultural';
  filters: any;
  onFilterChange: (key: string, value: string) => void;
  onSearch: () => void;
}

export default function PropertyFilters({ type, filters, onFilterChange, onSearch }: PropertyFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            type="text"
            placeholder="Search by location or title..."
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange('searchQuery', e.target.value)}
          />
        </div>

        {type !== 'agricultural' ? (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={filters.priceRange}
                onChange={(e) => onFilterChange('priceRange', e.target.value)}
              >
                <option value="">Any Price</option>
                <option value="0-3000000">Under ₹30 Lac</option>
                <option value="3000000-5000000">₹30 Lac - ₹50 Lac</option>
                <option value="5000000-10000000">₹50 Lac - ₹1 Cr</option>
                <option value="10000000">Above ₹1 Cr</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Type
              </label>
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={filters.propertyType}
                onChange={(e) => onFilterChange('propertyType', e.target.value)}
              >
                <option value="">All Types</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bedrooms
              </label>
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={filters.propertyFeatures}
                onChange={(e) => onFilterChange('propertyFeatures', e.target.value)}
              >
                <option value="">Any</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4+ BHK</option>
              </select>
            </div>
          </>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Land Size (Acres)
            </label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={filters.landSize}
              onChange={(e) => onFilterChange('landSize', e.target.value)}
            >
              <option value="">Any Size</option>
              <option value="0-1">Under 1 Acre</option>
              <option value="1-5">1-5 Acres</option>
              <option value="5-10">5-10 Acres</option>
              <option value="10-20">10-20 Acres</option>
              <option value="20">20+ Acres</option>
            </select>
          </div>
        )}

        <button
          onClick={onSearch}
          className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors mt-auto"
        >
          <Search className="h-4 w-4 mr-2" />
          Search
        </button>
      </div>
    </div>
  );
}