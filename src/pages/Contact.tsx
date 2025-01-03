import React from 'react';
import { Phone, Mail, Instagram, Facebook, Linkedin, ExternalLink } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">Contact Us</h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <img
                  src="/public/abhivrat-singh"
                  alt="Abhivrat Singh"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>

              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Abhivrat Singh</h2>
                <h3 className="text-lg text-blue-600 mb-4">Founder & CEO, LandNest</h3>
                
                <p className="text-gray-700 mb-6">
                  With over 5 years of experience in real estate and a strong family business 
                  background, Abhivrat Singh has established LandNest as a trusted name in 
                  Rajnandgaon's property market. His deep understanding of local real estate 
                  and commitment to customer satisfaction has helped numerous families find 
                  their perfect homes.
                </p>

                <div className="space-y-4">
                  <a
                    href="tel:+916261642203"
                    className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <Phone className="h-5 w-5 mr-3" />
                    +91 6261642203
                  </a>

                  <a
                    href="mailto:businesswithabhivrat@gmail.com"
                    className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <Mail className="h-5 w-5 mr-3" />
                    businesswithabhivrat@gmail.com
                  </a>
                </div>

                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Connect With Me</h4>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.instagram.com/abhivrat_singh/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-6 w-6" />
                    </a>
                    <a
                      href="https://www.facebook.com/abhivrat.singh.39"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-6 w-6" />
                    </a>
                    <a
                      href="https://in.linkedin.com/in/abhivrat-singh-681208279"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-6 w-6" />
                    </a>
                    <a
                      href="https://linktr.ee/abhivrat"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                      aria-label="Linktree"
                    >
                      <ExternalLink className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
