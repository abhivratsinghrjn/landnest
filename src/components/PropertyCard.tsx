import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, TreePine } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const isAgricultural = property.category === 'agricultural';
  const acres = isAgricultural ? property.size / 43560 : null;
  const dismils = isAgricultural ? (property.size / 43560) * 40 : null;

  return (
    <Link
      to={`/property/${property.id}`}
      className="block bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]"
    >
      <img
        src={property.imageUrl}
        alt={property.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
          <span className="text-blue-600 font-bold">
            ₹{property.price.toLocaleString()}
          </span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          {isAgricultural ? (
            <div className="flex items-center">
              <TreePine className="h-4 w-4 mr-1" />
              <span className="text-sm">
                {acres?.toFixed(2)} acres ({dismils?.toFixed(0)} dismil)
              </span>
            </div>
          ) : (
            <>
              <div className="flex items-center">
                <Bed className="h-4 w-4 mr-1" />
                <span className="text-sm">{property.bedrooms} Beds</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1" />
                <span className="text-sm">{property.bathrooms} Baths</span>
              </div>
              <div className="flex items-center">
                <Square className="h-4 w-4 mr-1" />
                <span className="text-sm">{property.size} sq.ft</span>
              </div>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}