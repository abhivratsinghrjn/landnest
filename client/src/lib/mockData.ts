import { z } from "zod";
import houseImage from "@assets/generated_images/modern_luxury_home_exterior_with_garden.png";
import farmImage from "@assets/generated_images/green_farm_land_landscape.png";
import commercialImage from "@assets/generated_images/modern_commercial_office_building.png";

export type PropertyType = "sale" | "rent" | "farm";
export type PropertyCategory = "residential" | "commercial" | "farm";
export type PropertySubtype = "house" | "plot";

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  type: PropertyType;
  category: PropertyCategory;
  subtype?: PropertySubtype;
  location: string;
  coordinates: { lat: number; lng: number };
  area: number; // sq meters
  bedrooms?: number;
  images: string[];
  featured?: boolean;
  listedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: "user" | "admin";
}

export const mockProperties: Property[] = [
  {
    id: "1",
    title: "Luxury Modern Villa",
    description: "A stunning modern villa with panoramic views, featuring large glass windows, a private garden, and state-of-the-art amenities. Perfect for families looking for a peaceful yet luxurious lifestyle.",
    price: 45000000, // ₹4.5 Cr
    type: "sale",
    category: "residential",
    subtype: "house",
    location: "Rajnandgaon, Chhattisgarh",
    coordinates: { lat: 21.09762, lng: 81.02659 },
    area: 450,
    bedrooms: 4,
    images: [houseImage, farmImage, commercialImage],
    featured: true,
    listedAt: "2025-11-20",
  },
  {
    id: "2",
    title: "Green Acres Farm",
    description: "Expansive agricultural land suitable for organic farming or a farmhouse retreat. Rich soil and excellent water connectivity.",
    price: 12000000, // ₹1.2 Cr
    type: "farm",
    category: "farm",
    location: "Outskirts of Rajnandgaon",
    coordinates: { lat: 21.11, lng: 81.05 },
    area: 40468, // ~10 acres
    images: [farmImage, houseImage],
    featured: true,
    listedAt: "2025-11-22",
  },
  {
    id: "3",
    title: "Prime Commercial Space",
    description: "High-visibility commercial office space in the heart of the city. Ideal for corporate offices or retail outlets.",
    price: 85000, // Rent per month
    type: "rent",
    category: "commercial",
    location: "City Center, Rajnandgaon",
    coordinates: { lat: 21.09, lng: 81.03 },
    area: 200,
    images: [commercialImage, houseImage],
    featured: false,
    listedAt: "2025-11-25",
  },
  {
    id: "4",
    title: "Cozy Family Apartment",
    description: "Well-furnished 2BHK apartment near schools and parks. Ready to move in.",
    price: 15000, // Rent
    type: "rent",
    category: "residential",
    subtype: "house",
    location: "Civil Lines, Rajnandgaon",
    coordinates: { lat: 21.10, lng: 81.02 },
    area: 120,
    bedrooms: 2,
    images: [houseImage],
    featured: false,
    listedAt: "2025-11-26",
  },
  {
    id: "5",
    title: "Residential Plot",
    description: "Clear title residential plot in a developing gated community. Great investment opportunity.",
    price: 2500000, // ₹25L
    type: "sale",
    category: "residential",
    subtype: "plot",
    location: "Durg Road",
    coordinates: { lat: 21.12, lng: 81.04 },
    area: 150,
    images: [farmImage],
    featured: true,
    listedAt: "2025-11-27",
  }
];

export const mockUser: User = {
  id: "u1",
  name: "Demo User",
  email: "demo@example.com",
  phone: "9876543210",
  avatar: "https://github.com/shadcn.png",
  role: "user",
};
