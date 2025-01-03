import { Property } from '../types';

export const properties: Property[] = [
  // Residential Properties for Sale
  {
    id: '1',
    type: 'sale',
    category: 'residential',
    title: '3 BHK Modern Apartment',
    price: 4500000,
    location: 'Near Railway Station, Rajnandgaon',
    bedrooms: 3,
    bathrooms: 2,
    size: 1450,
    imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'
    ],
    coordinates: { lat: 21.0955, lng: 81.0322 }
  },
  {
    id: '2',
    type: 'sale',
    category: 'residential',
    title: 'Luxury Villa with Garden',
    price: 8900000,
    location: 'Civil Lines, Rajnandgaon',
    bedrooms: 4,
    bathrooms: 3,
    size: 2200,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c'
    ],
    coordinates: { lat: 21.0982, lng: 81.0289 }
  },
  {
    id: '3',
    type: 'sale',
    category: 'residential',
    title: 'Modern 4 BHK Bungalow',
    price: 12500000,
    location: 'Ganj Para, Rajnandgaon',
    bedrooms: 4,
    bathrooms: 4,
    size: 2800,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994'
    ],
    coordinates: { lat: 21.0931, lng: 81.0309 }
  },
  // ... add more sale properties

  // Rental Properties
  {
    id: '10',
    type: 'rent',
    category: 'residential',
    title: 'Furnished 2 BHK Apartment',
    price: 12000,
    location: 'Station Road, Rajnandgaon',
    bedrooms: 2,
    bathrooms: 2,
    size: 1100,
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9'
    ],
    coordinates: { lat: 21.0967, lng: 81.0341 }
  },
  {
    id: '11',
    type: 'rent',
    category: 'residential',
    title: 'Modern 3 BHK with Parking',
    price: 15000,
    location: 'Civil Lines, Rajnandgaon',
    bedrooms: 3,
    bathrooms: 2,
    size: 1400,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9'
    ],
    coordinates: { lat: 21.0982, lng: 81.0289 }
  },
  // ... add more rental properties

  // Agricultural Properties
  {
    id: '20',
    type: 'agricultural',
    category: 'agricultural',
    title: 'Prime Agricultural Land',
    price: 2500000,
    location: 'Dongargarh Road, Rajnandgaon',
    size: 43560, // 1 acre in sq ft
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef'
    ],
    coordinates: { lat: 21.1012, lng: 81.0256 }
  },
  {
    id: '21',
    type: 'agricultural',
    category: 'agricultural',
    title: 'Fertile Farm Land with Well',
    price: 3500000,
    location: 'Chhuikhadan Road, Rajnandgaon',
    size: 87120, // 2 acres in sq ft
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef'
    ],
    coordinates: { lat: 21.0891, lng: 81.0445 }
  }
];