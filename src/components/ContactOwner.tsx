import React from 'react';
import { Phone, Mail } from 'lucide-react';

export default function ContactOwner() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Contact Property Owner</h2>
      <div className="space-y-4">
        <h3 className="font-medium">Abhivrat Singh</h3>
        <a
          href="tel:+916261642203"
          className="flex items-center justify-center w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          <Phone className="h-4 w-4 mr-2" />
          Call Owner: +91 6261642203
        </a>
        <a
          href="mailto:businesswithabhivrat@gmail.com"
          className="flex items-center justify-center w-full bg-white text-blue-600 px-4 py-2 rounded-md border-2 border-blue-600 hover:bg-blue-50 transition-colors"
        >
          <Mail className="h-4 w-4 mr-2" />
          Email: businesswithabhivrat@gmail.com
        </a>
      </div>
    </div>
  );
}