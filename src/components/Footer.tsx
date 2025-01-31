import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">About LandNest</h3>
            <p className="text-sm">
              Find Your Nest, Invest the Best. Your trusted partner in real estate across
              Rajnandgaon, Chhattisgarh.
            </p>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/for-sale" className="text-sm hover:text-blue-400">
                  Properties for Sale
                </Link>
              </li>
              <li>
                <Link to="/for-rent" className="text-sm hover:text-blue-400">
                  Rental Properties
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-blue-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-blue-400">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/abhivrat.singh.39"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/abhivrat_singh/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://in.linkedin.com/in/abhivrat-singh-681208279"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://linktr.ee/abhivrat"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} LandNest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}