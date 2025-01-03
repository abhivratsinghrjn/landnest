export interface Property {
  id: string;
  type: 'sale' | 'rent' | 'agricultural';
  category: 'residential' | 'commercial' | 'agricultural';
  title: string;
  price: number;
  location: string;
  bedrooms?: number;
  bathrooms?: number;
  size: number;
  imageUrl: string;
  images: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}