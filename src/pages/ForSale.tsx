import React from 'react';
import PropertyFilters from '../components/PropertyFilters';
import PropertyCard from '../components/PropertyCard';
import { properties } from '../data/properties';

export default function ForSale() {
  const saleProperties = properties.filter(p => p.type === 'sale');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Properties for Sale</h1>
        
        <PropertyFilters />
        
        <div className="mt-8 grid md:grid-cols-3 gap-8">
          {saleProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
}