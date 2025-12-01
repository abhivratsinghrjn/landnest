import { useState, useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Search, Filter, Loader2, X, SlidersHorizontal, IndianRupee } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getProperties } from "@/lib/api";

export default function Properties() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const typeFilter = searchParams.get("type") || "all";
  const searchQuery = searchParams.get("search") || "";

  const [activeFilter, setActiveFilter] = useState(typeFilter);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  
  // Dynamic price ranges based on property type
  const getPriceConfig = () => {
    if (activeFilter === "rent") {
      return {
        min: 1000,
        max: 80000,
        step: 1000,
        default: [1000, 80000],
        label: "Monthly Rent"
      };
    } else if (activeFilter === "farm" || activeFilter === "sale") {
      return {
        min: 100000, // 1 Lakh
        max: 10000000, // 1 Crore
        step: 100000,
        default: [100000, 10000000],
        label: "Property Price"
      };
    } else {
      // "all" - use wider range
      return {
        min: 1000,
        max: 10000000,
        step: 10000,
        default: [1000, 10000000],
        label: "Price Range"
      };
    }
  };

  const priceConfig = getPriceConfig();
  const [priceRange, setPriceRange] = useState(priceConfig.default);

  // Reset price range when filter changes
  useEffect(() => {
    const config = getPriceConfig();
    setPriceRange(config.default);
  }, [activeFilter]);

  const { data: allProperties = [], isLoading } = useQuery({
    queryKey: ["/api/properties"],
    queryFn: () => getProperties(),
  });

  // Enhanced client-side filtering
  const filteredProperties = useMemo(() => {
    return allProperties.filter((property: any) => {
      // Type filter
      const matchesType = activeFilter === "all" || 
                         property.type === activeFilter || 
                         (activeFilter === 'farm' && property.category === 'farm');
      
      // Search filter
      const matchesSearch = !localSearch || 
                           property.location?.toLowerCase().includes(localSearch.toLowerCase()) || 
                           property.title?.toLowerCase().includes(localSearch.toLowerCase()) ||
                           property.description?.toLowerCase().includes(localSearch.toLowerCase());
      
      // Price filter - smart filtering based on property type
      let matchesPrice = true;
      if (activeFilter === "rent" && property.type === "rent") {
        matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
      } else if ((activeFilter === "sale" || activeFilter === "farm") && (property.type === "sale" || property.category === "farm")) {
        matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
      } else if (activeFilter === "all") {
        matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
      }
      
      return matchesType && matchesSearch && matchesPrice;
    });
  }, [allProperties, activeFilter, localSearch, priceRange]);

  const filters = [
    { id: "all", label: "All Properties" },
    { id: "sale", label: "For Sale" },
    { id: "rent", label: "For Rent" },
    { id: "farm", label: "Farms" },
  ];

  const formatPrice = (price: number, isRent: boolean = false) => {
    if (isRent || activeFilter === "rent") {
      // Format for rent (thousands)
      if (price >= 1000) {
        return `₹${(price / 1000).toFixed(0)}K`;
      }
      return `₹${price}`;
    } else {
      // Format for sale/farm (lakhs and crores)
      if (price >= 10000000) {
        return `₹${(price / 10000000).toFixed(1)} Cr`;
      }
      if (price >= 100000) {
        return `₹${(price / 100000).toFixed(1)} L`;
      }
      if (price >= 1000) {
        return `₹${(price / 1000).toFixed(0)}K`;
      }
      return `₹${price}`;
    }
  };

  const clearAllFilters = () => {
    setActiveFilter("all");
    setLocalSearch("");
    const config = getPriceConfig();
    setPriceRange(config.default);
  };

  const hasActiveFilters = 
    activeFilter !== "all" || 
    localSearch !== "" || 
    priceRange[0] !== priceConfig.default[0] || 
    priceRange[1] !== priceConfig.default[1];

  const isRentFilter = activeFilter === "rent";

  return (
    <Layout>
      {/* Header */}
      <div className="bg-muted/30 py-8 md:py-12 border-b border-border/50">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2 md:mb-4">
            {activeFilter === 'sale' ? 'Properties For Sale' : 
             activeFilter === 'rent' ? 'Properties For Rent' : 
             activeFilter === 'farm' ? 'Farm Listings' : 'All Properties'}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
            Browse our curated list of premium properties in Rajnandgaon and surrounding areas.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Filters Section */}
        <div className="space-y-4 md:space-y-6 mb-8 md:mb-10">
          {/* Type Filters & Search - Desktop */}
          <div className="hidden md:flex flex-wrap items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <Button
                  key={f.id}
                  variant={activeFilter === f.id ? "default" : "outline"}
                  onClick={() => setActiveFilter(f.id)}
                  className="rounded-full"
                  size="sm"
                >
                  {f.label}
                </Button>
              ))}
            </div>

            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search by location or title..." 
                className="pl-9 rounded-full bg-background" 
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
              />
              {localSearch && (
                <button
                  onClick={() => setLocalSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Mobile Filters */}
          <div className="md:hidden space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search properties..." 
                className="pl-9 rounded-full" 
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {filters.map((f) => (
                <Button
                  key={f.id}
                  variant={activeFilter === f.id ? "default" : "outline"}
                  onClick={() => setActiveFilter(f.id)}
                  className="rounded-full whitespace-nowrap flex-shrink-0"
                  size="sm"
                >
                  {f.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Price Filter - Desktop */}
          <div className="hidden md:block bg-card p-6 rounded-xl border border-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <IndianRupee className="h-5 w-5 text-primary" />
                <Label className="text-base font-semibold">{priceConfig.label}</Label>
              </div>
              <div className="text-sm font-medium text-primary">
                {formatPrice(priceRange[0], isRentFilter)} - {formatPrice(priceRange[1], isRentFilter)}
                {isRentFilter && <span className="text-xs text-muted-foreground ml-1">/month</span>}
              </div>
            </div>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              min={priceConfig.min}
              max={priceConfig.max}
              step={priceConfig.step}
              className="mb-3"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatPrice(priceConfig.min, isRentFilter)}</span>
              <span>{formatPrice(priceConfig.max, isRentFilter)}+</span>
            </div>
            {isRentFilter && (
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Monthly rent range
              </p>
            )}
          </div>

          {/* Price Filter - Mobile Sheet */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full gap-2 justify-between">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    <span className="text-sm">Price Filter</span>
                  </div>
                  <span className="text-xs font-medium text-primary">
                    {formatPrice(priceRange[0], isRentFilter)} - {formatPrice(priceRange[1], isRentFilter)}
                  </span>
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[350px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <IndianRupee className="h-5 w-5" />
                    {priceConfig.label}
                  </SheetTitle>
                  <SheetDescription>
                    {isRentFilter ? "Filter properties by monthly rent" : "Filter properties by your budget"}
                  </SheetDescription>
                </SheetHeader>
                <div className="py-6">
                  <div className="text-center mb-6">
                    <div className="text-2xl font-bold text-primary">
                      {formatPrice(priceRange[0], isRentFilter)} - {formatPrice(priceRange[1], isRentFilter)}
                    </div>
                    {isRentFilter && (
                      <div className="text-sm text-muted-foreground">per month</div>
                    )}
                  </div>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={priceConfig.min}
                    max={priceConfig.max}
                    step={priceConfig.step}
                    className="mb-3"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{formatPrice(priceConfig.min, isRentFilter)}</span>
                    <span>{formatPrice(priceConfig.max, isRentFilter)}+</span>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {activeFilter !== "all" && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setActiveFilter("all")}
                  className="h-7 gap-1 text-xs"
                >
                  {filters.find(f => f.id === activeFilter)?.label}
                  <X className="h-3 w-3" />
                </Button>
              )}
              {localSearch && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setLocalSearch("")}
                  className="h-7 gap-1 text-xs"
                >
                  Search: "{localSearch.substring(0, 20)}"
                  <X className="h-3 w-3" />
                </Button>
              )}
              {(priceRange[0] !== priceConfig.default[0] || priceRange[1] !== priceConfig.default[1]) && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setPriceRange(priceConfig.default)}
                  className="h-7 gap-1 text-xs"
                >
                  Price: {formatPrice(priceRange[0], isRentFilter)} - {formatPrice(priceRange[1], isRentFilter)}
                  <X className="h-3 w-3" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="h-7 text-xs text-primary hover:text-primary/80"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {isLoading ? "Loading..." : (
              <>
                Showing <span className="font-semibold text-foreground">{filteredProperties.length}</span> {filteredProperties.length === 1 ? 'property' : 'properties'}
                {activeFilter !== "all" && ` in ${filters.find(f => f.id === activeFilter)?.label}`}
              </>
            )}
          </p>
          {!isLoading && filteredProperties.length > 0 && (
            <p className="text-xs text-muted-foreground hidden sm:block">
              {isRentFilter ? "Monthly rent" : "Total price"}
            </p>
          )}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProperties.map((property: any) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed border-border">
            <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No properties found</h3>
            <p className="text-muted-foreground mb-4">
              {hasActiveFilters 
                ? "Try adjusting your filters to see more results." 
                : "No properties available at the moment."}
            </p>
            {hasActiveFilters && (
              <Button onClick={clearAllFilters} variant="outline">
                Clear all filters
              </Button>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
