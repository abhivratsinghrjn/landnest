import { motion } from "framer-motion";
import { MapPin, Bed, Maximize, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Property } from "@/lib/mockData";
import { Button } from "@/components/ui/button";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-border/50 transition-all duration-300 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
            property.type === "sale" ? "bg-primary text-white" : 
            property.type === "rent" ? "bg-blue-600 text-white" : "bg-amber-600 text-white"
          }`}>
            {property.type === "sale" ? "For Sale" : property.type === "rent" ? "For Rent" : "Farm"}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 text-white">
          <p className="text-2xl font-display font-bold">
             {property.price >= 10000000 
                ? `₹${(property.price / 10000000).toFixed(2)} Cr`
                : property.price >= 100000
                ? `₹${(property.price / 100000).toFixed(2)} L`
                : `₹${property.price.toLocaleString()}${property.type === 'rent' ? '/mo' : ''}`
              }
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-display font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {property.title}
        </h3>
        
        <div className="flex items-center text-muted-foreground mb-4 text-sm">
          <MapPin className="h-4 w-4 mr-1 text-primary/70" />
          <span className="truncate">{property.location}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-y border-border/50">
          <div className="flex items-center gap-2">
            <Maximize className="h-4 w-4 text-primary/60" />
            <span className="text-sm font-medium">
              {property.category === 'farm' 
                ? `${(property.area / 4046.86).toFixed(1)} Acres` 
                : `${property.area} sq m`}
            </span>
          </div>
          {property.bedrooms && (
            <div className="flex items-center gap-2">
              <Bed className="h-4 w-4 text-primary/60" />
              <span className="text-sm font-medium">{property.bedrooms} Beds</span>
            </div>
          )}
        </div>

        <div className="mt-auto">
          <Link href={`/property/${property.id}`}>
            <Button className="w-full group-hover:bg-primary group-hover:text-white transition-all" variant="outline">
              View Details
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Map Preview (Mini) - Visual Only for Card */}
      <div className="h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.div>
  );
}
