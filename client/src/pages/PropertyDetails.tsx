import { useState } from "react";
import { useRoute, Link } from "wouter";
import { Layout } from "@/components/Layout";
import { Map } from "@/components/Map";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Bed, Maximize, Calendar, Share2, Heart, Phone, Mail, X, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getProperty } from "@/lib/api";

export default function PropertyDetails() {
  const [match, params] = useRoute("/property/:id");
  const id = params?.id;
  const [showAllImages, setShowAllImages] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { data: property, isLoading } = useQuery({
    queryKey: [`/api/properties/${id}`],
    queryFn: () => getProperty(parseInt(id!)),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!property) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center flex-col gap-4">
          <h1 className="text-2xl font-bold">Property not found</h1>
          <Link href="/properties">
            <Button>Browse Properties</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const images = property.images || [];
  const hasImages = images.length > 0;

  const handleCallAgent = () => {
    window.location.href = `tel:${property.contactPhone}`;
  };

  const handleSendEnquiry = () => {
    const subject = encodeURIComponent("Interested in your property");
    const body = encodeURIComponent(`Hi ${property.contactName},\n\nI am interested in your property: ${property.title}\nLocation: ${property.location}\nPrice: ₹${property.price.toLocaleString()}\n\nPlease contact me to discuss further.\n\nThank you!`);
    window.location.href = `mailto:${property.contactEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <Layout>
      {/* Hero Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-1 md:h-[60vh] w-full max-w-full overflow-hidden">
        <div 
          className="md:col-span-2 relative h-[50vh] md:h-full group overflow-hidden cursor-pointer"
          onClick={() => { setSelectedImageIndex(0); setShowAllImages(true); }}
        >
          <img 
            src={hasImages ? images[0].imageUrl : 'https://via.placeholder.com/800x600?text=No+Image'} 
            alt={property.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        </div>
        <div className="hidden md:grid grid-rows-2 gap-1">
          {hasImages && images[1] && (
            <div 
              className="overflow-hidden group cursor-pointer"
              onClick={() => { setSelectedImageIndex(1); setShowAllImages(true); }}
            >
              <img 
                src={images[1].imageUrl} 
                alt="Detail 1" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
            </div>
          )}
          {hasImages && images[2] && (
            <div 
              className="overflow-hidden group cursor-pointer"
              onClick={() => { setSelectedImageIndex(2); setShowAllImages(true); }}
            >
              <img 
                src={images[2].imageUrl} 
                alt="Detail 2" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
            </div>
          )}
        </div>
        <div 
          className="hidden md:block relative overflow-hidden group cursor-pointer"
          onClick={() => setShowAllImages(true)}
        >
          <img 
            src={hasImages && images[3] ? images[3].imageUrl : (hasImages ? images[0].imageUrl : 'https://via.placeholder.com/400x600?text=No+Image')} 
            alt="Detail 3" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
            <span className="text-white font-medium border border-white px-4 py-2 rounded-full">
              View All {images.length} Photos
            </span>
          </div>
        </div>
      </div>

      {/* Image Gallery Modal */}
      <Dialog open={showAllImages} onOpenChange={setShowAllImages}>
        <DialogContent className="max-w-4xl h-[90vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>Property Images ({images.length})</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {images.map((img: any, index: number) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img 
                    src={img.imageUrl} 
                    alt={`Property ${index + 1}`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

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

            <div className="flex gap-8 border-y border-border py-6 mb-8 flex-wrap">
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
                  <p className="font-semibold">{new Date(property.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-display font-semibold mb-4">Description</h2>
              <p className="text-muted-foreground leading-relaxed text-lg whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Contact Agent Buttons */}
            <div className="flex gap-3 md:gap-4 flex-wrap">
              <Button 
                size="lg" 
                className="flex-1 min-w-[140px] h-12 md:h-14 text-base md:text-lg gap-2"
                onClick={handleCallAgent}
              >
                <Phone className="h-4 w-4 md:h-5 md:w-5" />
                Call Agent
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="flex-1 min-w-[140px] h-12 md:h-14 text-base md:text-lg gap-2"
                onClick={handleSendEnquiry}
              >
                <Mail className="h-4 w-4 md:h-5 md:w-5" />
                Send Enquiry
              </Button>
              <Button size="lg" variant="outline" className="h-12 w-12 md:h-14 md:w-14 p-0 rounded-xl">
                <Heart className="h-5 w-5 md:h-6 md:w-6" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 w-12 md:h-14 md:w-14 p-0 rounded-xl">
                <Share2 className="h-5 w-5 md:h-6 md:w-6" />
              </Button>
            </div>
          </div>

          {/* Right Column: Map & Contact */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden h-[400px] flex flex-col">
                <div className="p-4 border-b border-border bg-muted/30">
                  <h3 className="font-display font-semibold text-lg">Location</h3>
                  <p className="text-sm text-muted-foreground">Exact property location</p>
                </div>
                <div className="flex-grow relative">
                  <Map 
                    coordinates={{ 
                      lat: parseFloat(property.coordinatesLat), 
                      lng: parseFloat(property.coordinatesLng) 
                    }} 
                    popupText={property.title}
                  />
                </div>
              </div>
              
              <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                <h3 className="font-semibold mb-4 text-lg">Contact Agent</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Phone className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <a href={`tel:${property.contactPhone}`} className="font-bold text-primary hover:underline">
                        {property.contactPhone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a href={`mailto:${property.contactEmail}`} className="font-medium text-primary hover:underline break-all">
                        {property.contactEmail}
                      </a>
                    </div>
                  </div>
                  <div className="pt-3 border-t">
                    <p className="text-sm text-muted-foreground mb-1">Listed by</p>
                    <p className="font-semibold">{property.contactName}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
