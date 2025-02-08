import React from 'react';
import { Building2, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FeaturedProperties from '../components/FeaturedProperties';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div 
        className="relative bg-blue-600 h-[70vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Building2 className="h-20 w-20 text-white mb-8" />
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Find Your Nest, Invest & Rest
          </motion.h1>
          
          <motion.p 
            className="text-xl text-blue-100 mb-8 max-w-2xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Discover your perfect property in Rajnandgaon with LandNest
          </motion.p>
          
          <motion.div 
            className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-2"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
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
          </motion.div>
        </div>
      </motion.div>

      <FeaturedProperties />

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/for-sale"
              className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <Building2 className="h-12 w-12 text-blue-600 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Buy Property</h2>
              <p className="text-gray-600">
                Find your dream home from our exclusive collection of properties for sale in Rajnandgaon
              </p>
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/for-rent"
              className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <Search className="h-12 w-12 text-blue-600 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Rent Property</h2>
              <p className="text-gray-600">
                Explore rental properties that match your lifestyle and budget in prime locations
              </p>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}