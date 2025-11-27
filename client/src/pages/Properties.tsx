import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getProperties } from "@/lib/api";

export default function Properties() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const typeFilter = searchParams.get("type") || "all";
  const searchQuery = searchParams.get("search") || "";

  const [activeFilter, setActiveFilter] = useState(typeFilter);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["/api/properties", activeFilter, localSearch],
    queryFn: () => getProperties({
      type: activeFilter !== "all" ? activeFilter : undefined,
      search: localSearch || undefined,
    }),
  });

  const filters = [
    { id: "all", label: "All Properties" },
    { id: "sale", label: "For Sale" },
    { id: "rent", label: "For Rent" },
    { id: "farm", label: "Farms" },
  ];

  return (
    <Layout>
      <div className="bg-muted/30 py-12 border-b border-border/50">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl font-display font-bold mb-4">
            {activeFilter === 'sale' ? 'Properties For Sale' : 
             activeFilter === 'rent' ? 'Properties For Rent' : 
             activeFilter === 'farm' ? 'Farm Listings' : 'All Properties'}
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Browse our curated list of premium properties in Rajnandgaon and surrounding areas.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <Button
                key={f.id}
                variant={activeFilter === f.id ? "default" : "outline"}
                onClick={() => setActiveFilter(f.id)}
                className="rounded-full"
              >
                {f.label}
              </Button>
            ))}
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search location..." 
              className="pl-9 rounded-full bg-background" 
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {properties.map((property: any) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed border-border">
            <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No properties found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
            <Button 
              variant="link" 
              onClick={() => { setActiveFilter("all"); setLocalSearch(""); }}
              className="mt-2"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
