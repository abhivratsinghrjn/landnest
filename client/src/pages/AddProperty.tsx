import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Map } from "@/components/Map";
import { Upload, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export default function AddProperty() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  
  // Mock coords for map picker
  const [coords, setCoords] = useState({ lat: 21.09762, lng: 81.02659 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Property Listed!",
      description: "Your property has been successfully added to LandNest.",
    });
    setTimeout(() => setLocation("/dashboard"), 1500);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-12 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold">List Your Property</h1>
          <p className="text-muted-foreground">Fill in the details to showcase your property to thousands of buyers.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="p-8 space-y-8">
            
            {/* Section 1: Basic Info */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold border-b pb-2">Basic Details</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label>Listing Type</Label>
                  <RadioGroup defaultValue="sale" className="flex gap-4">
                    <div className="flex items-center space-x-2 border p-3 rounded-lg flex-1 cursor-pointer hover:bg-muted/50">
                      <RadioGroupItem value="sale" id="sale" />
                      <Label htmlFor="sale" className="cursor-pointer">For Sale</Label>
                    </div>
                    <div className="flex items-center space-x-2 border p-3 rounded-lg flex-1 cursor-pointer hover:bg-muted/50">
                      <RadioGroupItem value="rent" id="rent" />
                      <Label htmlFor="rent" className="cursor-pointer">For Rent</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label>Property Category</Label>
                  <Select defaultValue="residential">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="farm">Farm / Agriculture</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Property Name / Title</Label>
                  <Input placeholder="e.g. Luxury Villa in Civil Lines" required />
                </div>
                <div className="space-y-2">
                   <Label>Price (₹)</Label>
                   <Input type="number" placeholder="e.g. 4500000" required />
                </div>
              </div>
            </div>

            {/* Section 2: Specs */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold border-b pb-2">Specifications</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Area (sq meters)</Label>
                  <Input type="number" placeholder="e.g. 200" required />
                </div>
                <div className="space-y-2">
                  <Label>Subtype</Label>
                  <Select defaultValue="house">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="house">House / Apartment</SelectItem>
                      <SelectItem value="plot">Plot / Land</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Bedrooms (if house)</Label>
                  <Input type="number" placeholder="e.g. 3" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Full Description</Label>
                <Textarea placeholder="Describe the property features, amenities, and highlights..." className="min-h-[120px]" />
              </div>
            </div>

            {/* Section 3: Media */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold border-b pb-2">Photos</h3>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:bg-muted/30 transition-colors cursor-pointer">
                <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                <p className="font-medium">Click to upload property images</p>
                <p className="text-sm text-muted-foreground mt-1">Minimum 3 images required</p>
              </div>
            </div>

            {/* Section 4: Location */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold border-b pb-2">Location Pin</h3>
              <p className="text-sm text-muted-foreground">Drag the map to pin the exact location of the property.</p>
              
              <div className="h-[300px] rounded-xl overflow-hidden border border-border relative">
                <Map coordinates={coords} interactive={true} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[1000] text-primary drop-shadow-lg">
                  <MapPin className="h-10 w-10 fill-current" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label>Latitude</Label>
                    <Input value={coords.lat} readOnly className="bg-muted" />
                 </div>
                 <div className="space-y-2">
                    <Label>Longitude</Label>
                    <Input value={coords.lng} readOnly className="bg-muted" />
                 </div>
              </div>
            </div>

          </div>
          
          <div className="bg-muted/30 p-6 border-t flex justify-end gap-4">
             <Button variant="outline" type="button" onClick={() => setLocation("/dashboard")}>Cancel</Button>
             <Button type="submit" className="bg-primary text-white min-w-[150px]">Publish Listing</Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
