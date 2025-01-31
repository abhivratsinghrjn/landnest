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
  {
    id: '4',
    type: 'sale',
    category: 'residential',
    title: 'Premium 3 BHK Villa',
    price: 7500000,
    location: 'Housing Board Colony, Rajnandgaon',
    bedrooms: 3,
    bathrooms: 3,
    size: 1800,
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994'
    ],
    coordinates: { lat: 21.0967, lng: 81.0341 }
  },
  {
    id: '5',
    type: 'sale',
    category: 'residential',
    title: 'Spacious 4 BHK Duplex',
    price: 9800000,
    location: 'Gokul Nagar, Rajnandgaon',
    bedrooms: 4,
    bathrooms: 4,
    size: 2400,
    imageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b',
    images: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c'
    ],
    coordinates: { lat: 21.0982, lng: 81.0289 }
  },

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
  {
    id: '12',
    type: 'rent',
    category: 'residential',
    title: 'Spacious 2 BHK Near Market',
    price: 10000,
    location: 'Gandhi Chowk, Rajnandgaon',
    bedrooms: 2,
    bathrooms: 2,
    size: 1000,
    imageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b',
    images: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c'
    ],
    coordinates: { lat: 21.0945, lng: 81.0334 }
  },
  {
    id: '13',
    type: 'rent',
    category: 'residential',
    title: 'Family 3 BHK Apartment',
    price: 14000,
    location: 'Housing Board, Rajnandgaon',
    bedrooms: 3,
    bathrooms: 2,
    size: 1350,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9'
    ],
    coordinates: { lat: 21.0972, lng: 81.0356 }
  },
  {
    id: '14',
    type: 'rent',
    category: 'residential',
    title: 'Premium 4 BHK Villa',
    price: 25000,
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

  // Agricultural Properties
  {
    id: 'farm-1',
    type: 'agricultural',
    category: 'agricultural',
    title: 'Premium Agricultural Land with Well',
    price: 4500000,
    location: 'Dongargarh Road, Rajnandgaon',
    size: 87120, // 2 acres in sq ft
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef',
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399',
      'https://images.unsplash.com/photo-1500076656116-558758c991c1'
    ],
    coordinates: { lat: 21.1012, lng: 81.0256 },
    description: 'Fertile agricultural land with private well, perfect for farming. 2 acres (80 dismil) with road connectivity.'
  },
  {
    id: 'farm-2',
    type: 'agricultural',
    category: 'agricultural',
    title: 'Organic Farm Land',
    price: 2800000,
    location: 'Chhuikhadan Road, Rajnandgaon',
    size: 43560, // 1 acre in sq ft
    imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399',
    images: [
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef',
      'https://images.unsplash.com/photo-1500076656116-558758c991c1'
    ],
    coordinates: { lat: 21.0891, lng: 81.0445 },
    description: '1 acre (40 dismil) of certified organic farmland. Ideal for organic farming with natural water source.'
  },
  {
    id: 'farm-3',
    type: 'agricultural',
    category: 'agricultural',
    title: 'Large Agricultural Plot',
    price: 12500000,
    location: 'Mohla Road, Rajnandgaon',
    size: 217800, // 5 acres in sq ft
    imageUrl: 'https://images.unsplash.com/photo-1500076656116-558758c991c1',
    images: [
      'https://images.unsplash.com/photo-1500076656116-558758c991c1',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef',
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399'
    ],
    coordinates: { lat: 21.0955, lng: 81.0322 },
    description: 'Expansive 5 acres (200 dismil) agricultural land with irrigation facilities and excellent soil quality.'
  },
  {
    id: 'farm-4',
    type: 'agricultural',
    category: 'agricultural',
    title: 'Riverside Farm Land',
    price: 7500000,
    location: 'Ambagarh Road, Rajnandgaon',
    size: 130680, // 3 acres in sq ft
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef',
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399',
      'https://images.unsplash.com/photo-1500076656116-558758c991c1'
    ],
    coordinates: { lat: 21.0982, lng: 81.0289 },
    description: '3 acres (120 dismil) of prime agricultural land with river access. Perfect for multiple crop cultivation.'
  },
  {
    id: 'farm-5',
    type: 'agricultural',
    category: 'agricultural',
    title: 'Highway Touch Farm Plot',
    price: 9800000,
    location: 'National Highway 6, Rajnandgaon',
    size: 174240, // 4 acres in sq ft
    imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399',
    images: [
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef',
      'https://images.unsplash.com/photo-1500076656116-558758c991c1'
    ],
    coordinates: { lat: 21.0931, lng: 81.0309 },
    description: '4 acres (160 dismil) of agricultural land with highway connectivity. Suitable for commercial farming.'
  }
];