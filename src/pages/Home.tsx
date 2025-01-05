import React from 'react';
import { Building2, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import FeaturedProperties from '../components/FeaturedProperties';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-blue-600 h-[70vh]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
          <Building2 className="h-20 w-20 text-white mb-8" />
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Find Your Nest, Invest & Rest
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl">
            Discover your perfect property in Rajnandgaon with LandNest
          </p>
          
          <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Search by locality or project..."
                className="flex-1 px-4 py-2 focus:outline-none rounded-md"
              />
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors w-full sm:w-auto">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <FeaturedProperties />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <Link
            to="/for-sale"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <Building2 className="h-12 w-12 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Buy Property</h2>
            <p className="text-gray-600">
              Find your dream home from our exclusive collection of properties for sale in Rajnandgaon
            </p>
          </Link>
          
          <Link
            to="/for-rent"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <Search className="h-12 w-12 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Rent Property</h2>
            <p className="text-gray-600">
              Explore rental properties that match your lifestyle and budget in prime locations
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}