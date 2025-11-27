import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { PropertyCard } from "@/components/PropertyCard";
import { mockProperties } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

export default function Properties() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const typeFilter = searchParams.get("type") || "all";
  const searchQuery = searchParams.get("search") || "";

  const [activeFilter, setActiveFilter] = useState(typeFilter);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const filteredProperties = useMemo(() => {
    return mockProperties.filter((p) => {
      const matchesType = activeFilter === "all" || p.type === activeFilter || (activeFilter === 'farm' && p.category === 'farm');
      const matchesSearch = p.location.toLowerCase().includes(localSearch.toLowerCase()) || 
                            p.title.toLowerCase().includes(localSearch.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [activeFilter, localSearch]);

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
        {filteredProperties.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
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
