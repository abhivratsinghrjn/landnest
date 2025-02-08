import React from 'react';
import { Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Building2 className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About LandNest</h1>
        </motion.div>

        <motion.div 
          className="bg-white rounded-lg shadow-md p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="prose max-w-none">
            <motion.p 
              className="text-lg text-gray-700 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Welcome to LandNest, Rajnandgaon's premier real estate agency. With over 5 years of 
              experience rooted in our family's real estate business, we've established ourselves 
              as a trusted name in property dealings across Chhattisgarh.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Legacy</h2>
              <p className="text-gray-700 mb-6">
                Founded and single-handedly managed by Abhivrat Singh, LandNest combines traditional 
                values with modern real estate practices. Our deep understanding of the local market, 
                passed down through generations in the family business, gives us unique insights into 
                Rajnandgaon's property landscape.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Commitment</h2>
              <p className="text-gray-700 mb-6">
                At LandNest, we pride ourselves on providing exceptional customer support. We understand 
                that buying or renting a property is a significant decision, and our team is dedicated 
                to guiding you through every step of the process with transparency and professionalism.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose Us?</h2>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>5+ years of specialized experience in Rajnandgaon real estate</li>
                <li>Deep-rooted family business expertise</li>
                <li>Personalized customer service</li>
                <li>Extensive local market knowledge</li>
                <li>Transparent dealings and professional guidance</li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}