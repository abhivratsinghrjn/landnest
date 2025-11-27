import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockProperties } from "@/lib/mockData";
import heroImage from "@assets/generated_images/modern_luxury_home_exterior_with_garden.png";

export default function Landing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation(`/properties?search=${encodeURIComponent(searchQuery)}`);
  };

  const featuredProperties = mockProperties.filter(p => p.featured).slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax-like effect */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Modern Home"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-background" />
        </div>

        <div className="container relative z-10 px-4 text-center text-white max-w-4xl mx-auto mt-16">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 leading-tight"
          >
            Find Your Nest, <br />
            <span className="text-primary-foreground/90">Invest the Best.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto font-light"
          >
            Your trusted partner in real estate across Rajnandgaon. 
            Whether buying, selling, or renting, we guide you home.
          </motion.p>

          {/* Search Panel */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-white/10 backdrop-blur-lg p-4 md:p-6 rounded-2xl border border-white/20 shadow-2xl max-w-3xl mx-auto"
          >
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 h-5 w-5" />
                <Input 
                  type="text" 
                  placeholder="Search by location, city, or landmark..." 
                  className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:ring-0 text-base rounded-xl"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button size="lg" className="h-12 px-8 bg-primary hover:bg-primary/90 text-white rounded-xl text-base font-medium shadow-lg">
                Search Properties
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <span className="text-primary font-medium tracking-wider uppercase text-sm">Featured Listings</span>
              <h2 className="text-4xl font-display font-bold mt-2 text-foreground">Latest from LandNest</h2>
            </div>
            <Button variant="outline" onClick={() => setLocation('/properties')} className="group">
              View All Properties
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Snippet */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 md:order-1">
             <div className="aspect-square rounded-2xl overflow-hidden bg-gray-200 relative z-10 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                <img src={heroImage} alt="About LandNest" className="w-full h-full object-cover" />
             </div>
             <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary/10 rounded-full blur-3xl z-0" />
             <div className="absolute -top-6 -right-6 w-64 h-64 bg-secondary rounded-full blur-3xl z-0" />
          </div>
          
          <div className="order-1 md:order-2">
            <span className="text-primary font-medium tracking-wider uppercase text-sm">Our Legacy</span>
            <h2 className="text-4xl font-display font-bold mt-2 mb-6 text-foreground">Built on Trust, Grounded in Tradition</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              LandNest Properties isn't just a real estate agency; it's a family legacy committed to helping you find your place in the world. Founded by Abhivrat Singh, we bring a personal touch to every transaction.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                "Expert local market knowledge",
                "Transparent and honest dealings",
                "Premium property portfolio",
                "Personalized investment advice"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground/80">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <Button size="lg" onClick={() => setLocation('/about')}>
              Read Our Story
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-16">What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "Abhivrat helped us find our dream farm land. The process was seamless and transparent.",
                author: "Rajesh Kumar",
                role: "Farm Owner"
              },
              {
                text: "LandNest found me the perfect commercial spot for my new showroom. Highly recommended!",
                author: "Priya Sharma",
                role: "Business Owner"
              },
              {
                text: "Professional, courteous, and deeply knowledgeable about the Rajnandgaon market.",
                author: "Amit Singh",
                role: "Home Buyer"
              }
            ].map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/15 transition-colors"
              >
                <div className="mb-6 text-yellow-400 text-xl">★★★★★</div>
                <p className="text-lg mb-6 leading-relaxed opacity-90">"{t.text}"</p>
                <div>
                  <div className="font-bold text-lg">{t.author}</div>
                  <div className="text-sm opacity-60">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
