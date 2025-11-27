import { useState, useRef } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Map } from "@/components/Map";
import { Upload, MapPin, X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { createProperty } from "@/lib/api";
import { useAuth } from "@/hooks/use-auth";

export default function AddProperty() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [coords, setCoords] = useState({ lat: 21.09762, lng: 81.02659 });
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    type: "sale",
    category: "residential",
    subtype: "house",
    title: "",
    price: "",
    area: "",
    bedrooms: "",
    description: "",
    location: "Rajnandgaon, Chhattisgarh",
    contactName: user?.name || "",
    contactEmail: user?.email || "",
    contactPhone: user?.phone || "",
  });

  const createPropertyMutation = useMutation({
    mutationFn: async (data: any) => {
      return await createProperty(data.propertyData, data.images);
    },
    onSuccess: () => {
      toast({
        title: "Property Listed!",
        description: "Your property has been successfully added to LandNest.",
      });
      setTimeout(() => setLocation("/dashboard"), 1500);
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to list property",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    
    // Add new files to existing ones
    const newImages = [...images, ...files];
    setImages(newImages);
    
    // Create previews
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to list a property",
        variant: "destructive",
      });
      setLocation("/auth");
      return;
    }

    if (images.length < 1) {
      toast({
        title: "Images required",
        description: "Please upload at least 1 property image",
        variant: "destructive",
      });
      return;
    }

    const propertyData = {
      type: formData.type,
      category: formData.category,
      subtype: formData.subtype,
      title: formData.title,
      description: formData.description,
      price: parseInt(formData.price),
      area: parseInt(formData.area),
      bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
      location: formData.location,
      coordinatesLat: coords.lat.toString(),
      coordinatesLng: coords.lng.toString(),
      contactName: formData.contactName,
      contactEmail: formData.contactEmail,
      contactPhone: formData.contactPhone,
      status: "active",
      featured: false,
    };

    createPropertyMutation.mutate({ propertyData, images });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-4xl">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-display font-bold">List Your Property</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-2">Fill in the details to showcase your property to thousands of buyers.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl md:rounded-2xl overflow-hidden shadow-sm">
          <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
            
            {/* Section 1: Basic Info */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold border-b pb-2">Basic Details</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label>Listing Type</Label>
                  <RadioGroup value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})} className="flex gap-4">
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
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
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
                  <Input 
                    placeholder="e.g. Luxury Villa in Civil Lines" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required 
                  />
                </div>
                <div className="space-y-2">
                   <Label>Price (₹)</Label>
                   <Input 
                     type="number" 
                     placeholder="e.g. 4500000" 
                     value={formData.price}
                     onChange={(e) => setFormData({...formData, price: e.target.value})}
                     required 
                   />
                </div>
              </div>
            </div>

            {/* Section 2: Specs */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold border-b pb-2">Specifications</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Area (sq meters)</Label>
                  <Input 
                    type="number" 
                    placeholder="e.g. 200" 
                    value={formData.area}
                    onChange={(e) => setFormData({...formData, area: e.target.value})}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subtype</Label>
                  <Select value={formData.subtype} onValueChange={(value) => setFormData({...formData, subtype: value})}>
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
                  <Input 
                    type="number" 
                    placeholder="e.g. 3" 
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({...formData, bedrooms: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Full Description</Label>
                <Textarea 
                  placeholder="Describe the property features, amenities, and highlights..." 
                  className="min-h-[120px]" 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>
            </div>

            {/* Section: Contact Details */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold border-b pb-2">Contact Information</h3>
              <p className="text-sm text-muted-foreground">Provide contact details for interested buyers to reach you</p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Contact Name</Label>
                  <Input 
                    placeholder="Your name" 
                    value={formData.contactName}
                    onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Contact Email</Label>
                  <Input 
                    type="email"
                    placeholder="your@email.com" 
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Contact Phone</Label>
                  <Input 
                    type="tel"
                    placeholder="10-digit number" 
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                    required 
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Media */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold border-b pb-2">Photos</h3>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageSelect}
                className="hidden"
              />
              
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:bg-muted/30 transition-colors cursor-pointer"
              >
                <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                <p className="font-medium">Click to upload property images</p>
                <p className="text-sm text-muted-foreground mt-1">At least 1 image required (max 10)</p>
              </div>

              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={preview} 
                        alt={`Preview ${index + 1}`} 
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
             <Button variant="outline" type="button" onClick={() => setLocation("/dashboard")} disabled={createPropertyMutation.isPending}>
               Cancel
             </Button>
             <Button type="submit" className="bg-primary text-white min-w-[150px]" disabled={createPropertyMutation.isPending}>
               {createPropertyMutation.isPending ? (
                 <>
                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                   Publishing...
                 </>
               ) : (
                 "Publish Listing"
               )}
             </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
