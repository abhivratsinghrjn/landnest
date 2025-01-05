import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { MapPin, Bed, Bath, Square } from 'lucide-react';
import { properties } from '../data/properties';
import PropertyMap from '../components/PropertyMap';
import ContactOwner from '../components/ContactOwner';
import PropertyImageGallery from '../components/PropertyImageGallery';

export default function PropertyDetails() {
  const { id } = useParams();
  const property = properties.find(p => p.id === id);

  if (!property) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <PropertyImageGallery 
              images={property.images} 
              title={property.title} 
            />
            
            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-2xl font-bold text-gray-900">{property.title}</h1>
                <p className="text-2xl font-bold text-blue-600">
                  ₹{property.price.toLocaleString()}{property.type === 'rent' ? '/month' : ''}
                </p>
              </div>
              
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{property.location}</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex items-center">
                  <Bed className="h-5 w-5 mr-2 text-gray-600" />
                  <span>{property.bedrooms} Beds</span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 mr-2 text-gray-600" />
                  <span>{property.bathrooms} Baths</span>
                </div>
                <div className="flex items-center">
                  <Square className="h-5 w-5 mr-2 text-gray-600" />
                  <span>{property.size} sq.ft</span>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-gray-600">
                  This beautiful property offers modern living spaces with excellent amenities.
                  Located in a prime area of Rajnandgaon with easy access to schools, markets, and public transport.
                  The property features high-quality finishes and fixtures throughout.
                </p>
              </div>
            </div>
            
            <div className="mt-6">
              <ContactOwner />
            </div>
          </div>
          
          <div className="lg:sticky lg:top-8 h-[calc(100vh-4rem)]">
            <PropertyMap property={property} />
          </div>
        </div>
      </div>
    </div>
  );
}