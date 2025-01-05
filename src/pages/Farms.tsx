import React from 'react';
import PropertyFilters from '../components/PropertyFilters';
import PropertyCard from '../components/PropertyCard';
import { properties } from '../data/properties';
import { useFilters } from '../hooks/useFilters';

export default function Farms() {
  const farmProperties = properties.filter(p => p.category === 'agricultural');
  const { filters, setFilters, filterProperties } = useFilters(farmProperties);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredProperties = filterProperties();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Agricultural Land</h1>
        
        <PropertyFilters
          type="agricultural"
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={filterProperties}
        />
        
        <div className="mt-8 grid md:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
}