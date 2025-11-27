import { useRoute } from "wouter";
import { Layout } from "@/components/Layout";
import { Map } from "@/components/Map";
import { mockProperties } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bed, Maximize, Calendar, Share2, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function PropertyDetails() {
  const [match, params] = useRoute("/property/:id");
  const id = params?.id;
  const property = mockProperties.find((p) => p.id === id);

  if (!property) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <h1 className="text-2xl font-bold">Property not found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-1 md:h-[60vh] w-full">
        <div className="md:col-span-2 relative h-[40vh] md:h-full group overflow-hidden">
          <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
        <div className="hidden md:grid grid-rows-2 gap-1">
          <div className="overflow-hidden group">
             <img src={property.images[1] || property.images[0]} alt="Detail 1" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div className="overflow-hidden group">
             <img src={property.images[2] || property.images[0]} alt="Detail 2" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
        </div>
        <div className="hidden md:block relative overflow-hidden group">
          <img src={property.images[0]} alt="Detail 3" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm">
            <span className="text-white font-medium border border-white px-4 py-2 rounded-full">View All Photos</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column: Details */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant="secondary" className="uppercase tracking-wider font-bold rounded-md">
                    {property.type === 'sale' ? 'For Sale' : property.type === 'rent' ? 'For Rent' : 'Farm'}
                  </Badge>
                  <Badge variant="outline" className="capitalize">{property.category}</Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">{property.title}</h1>
                <div className="flex items-center text-muted-foreground text-lg">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  {property.location}
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">
                  {property.price >= 10000000 
                    ? `₹${(property.price / 10000000).toFixed(2)} Cr`
                    : property.price >= 100000
                    ? `₹${(property.price / 100000).toFixed(2)} L`
                    : `₹${property.price.toLocaleString()}`}
                </div>
                {property.type === 'rent' && <span className="text-muted-foreground">/ month</span>}
              </div>
            </div>

            <div className="flex gap-8 border-y border-border py-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                   <Maximize className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Area</p>
                  <p className="font-semibold">
                     {property.category === 'farm' 
                        ? `${(property.area / 4046.86).toFixed(1)} Acres` 
                        : `${property.area} sq m`}
                  </p>
                </div>
              </div>
              
              {property.bedrooms && (
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                     <Bed className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Bedrooms</p>
                    <p className="font-semibold">{property.bedrooms}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                   <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Listed</p>
                  <p className="font-semibold">{property.listedAt}</p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-display font-semibold mb-4">Description</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {property.description}
              </p>
            </div>

            <div className="flex gap-4">
              <Button size="lg" className="flex-1 h-14 text-lg">Contact Agent</Button>
              <Button size="lg" variant="outline" className="h-14 w-14 p-0 rounded-xl"><Heart className="h-6 w-6" /></Button>
              <Button size="lg" variant="outline" className="h-14 w-14 p-0 rounded-xl"><Share2 className="h-6 w-6" /></Button>
            </div>
          </div>

          {/* Right Column: Map */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden h-[500px] flex flex-col">
                <div className="p-4 border-b border-border bg-muted/30">
                  <h3 className="font-display font-semibold text-lg">Location</h3>
                  <p className="text-sm text-muted-foreground">Exact property location</p>
                </div>
                <div className="flex-grow relative">
                  <Map 
                    coordinates={property.coordinates} 
                    popupText={property.title}
                  />
                </div>
              </div>
              
              <div className="mt-6 bg-primary/5 rounded-xl p-6 border border-primary/10">
                <h3 className="font-semibold mb-2">Interested in this property?</h3>
                <p className="text-sm text-muted-foreground mb-4">Contact us today to schedule a viewing.</p>
                <p className="font-bold text-lg text-primary">6261642203</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
