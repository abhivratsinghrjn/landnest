import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Home, MapPin, Phone, User, LogIn, PlusCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoImage from "@assets/generated_images/minimalist_real_estate_logo_icon.png";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { toast } = useToast();

  // Mock Auth State (toggle this to see logged in state)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu on route change
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const handleNavClick = (path: string) => {
    // Simulate buffering animation
    toast({
      description: "Loading...",
      duration: 500,
    });
    setTimeout(() => {
      setLocation(path);
    }, 300);
  };

  const navLinks = [
    { name: "For Sale", path: "/properties?type=sale" },
    { name: "For Rent", path: "/properties?type=rent" },
    { name: "Farms", path: "/properties?type=farm" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground overflow-x-hidden">
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick("/")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <img 
              src={logoImage} 
              alt="LandNest Logo" 
              className="h-10 w-10 object-contain transition-transform group-hover:scale-105" 
            />
            <span className={`font-display font-bold text-xl tracking-tight ${isScrolled ? "text-primary" : "text-primary"}`}>
              LandNest
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path)}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
              >
                {link.name}
              </button>
            ))}
            
            <div className="h-6 w-px bg-border mx-2" />

            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                 <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleNavClick("/add-property")}
                  className="gap-2 border-primary text-primary hover:bg-primary hover:text-white"
                >
                  <PlusCircle className="h-4 w-4" />
                  List Property
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleNavClick("/dashboard")}
                  className="gap-2"
                >
                  <User className="h-4 w-4" />
                  Profile
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleNavClick("/auth?mode=login")}
                  className="hover:bg-primary/10 hover:text-primary"
                >
                  Log In
                </Button>
                <Button 
                  size="sm"
                  onClick={() => handleNavClick("/auth?mode=signup")}
                  className="bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background pt-24 px-6 md:hidden flex flex-col gap-6"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path)}
                className="text-2xl font-display font-medium text-left border-b border-border pb-2"
              >
                {link.name}
              </button>
            ))}
            <div className="flex flex-col gap-4 mt-4">
              <Button onClick={() => handleNavClick("/auth?mode=login")} variant="outline" className="w-full py-6 text-lg">
                Log In
              </Button>
              <Button onClick={() => handleNavClick("/auth?mode=signup")} className="w-full py-6 text-lg bg-primary text-white">
                Sign Up
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-16 mt-20">
        <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <img src={logoImage} alt="Logo" className="h-10 w-10 brightness-0 invert opacity-90" />
              <span className="font-display font-bold text-2xl">LandNest</span>
            </div>
            <p className="text-primary-foreground/80 max-w-md text-lg leading-relaxed">
              Find Your Nest, Invest the Best. Your trusted partner in real estate across Rajnandgaon, Chhattisgarh.
              Building legacies, one property at a time.
            </p>
          </div>
          
          <div>
            <h3 className="font-display font-semibold text-xl mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><button onClick={() => handleNavClick("/properties?type=sale")} className="hover:text-white/70 transition-colors">Properties for Sale</button></li>
              <li><button onClick={() => handleNavClick("/properties?type=rent")} className="hover:text-white/70 transition-colors">Rental Properties</button></li>
              <li><button onClick={() => handleNavClick("/about")} className="hover:text-white/70 transition-colors">About Us</button></li>
              <li><button onClick={() => handleNavClick("/contact")} className="hover:text-white/70 transition-colors">Contact Us</button></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-xl mb-6">Connect With Us</h3>
            <div className="flex gap-4">
              <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C9.673 2.013 10.03 2 12.315 2zm-3.196 8.45a4.45 4.45 0 100 8.9 4.45 4.45 0 000-8.9zm0 1.524a2.926 2.926 0 110 5.852 2.926 2.926 0 010-5.852zM16.57 6.46a1.12 1.12 0 100 2.24 1.12 1.12 0 000-2.24z" clipRule="evenodd" /></svg>
              </a>
              <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </a>
              <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors">
                 <span className="sr-only">LinkedIn</span>
                 <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-16 pt-8 border-t border-white/10 text-center text-sm opacity-60">
          &copy; 2025 LandNest Properties. All rights reserved. Designed for the family business.
        </div>
      </footer>
    </div>
  );
}
