import { Layout } from "@/components/Layout";
import founderImage from "@assets/abhivrat_singh_founder.jpg";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Side: Founder Image & Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <div className="sticky top-24">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-8 shadow-2xl">
                <img src={founderImage} alt="Abhivrat Singh" className="w-full h-full object-cover" />
              </div>
              
              <div className="bg-primary text-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-display font-bold mb-6">Get in Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-full">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm mb-1">Call Directly</p>
                      <p className="text-xl font-semibold">6261642203</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                     <div className="bg-white/20 p-3 rounded-full">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm mb-1">Email Us</p>
                      <p className="text-lg font-semibold break-all">businesswithabhivrat@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                     <div className="bg-white/20 p-3 rounded-full">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm mb-1">Office Location</p>
                      <p className="text-lg font-semibold">Rajnandgaon, Chhattisgarh</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Bio & Form */}
          <div className="flex flex-col justify-center">
            <div className="mb-12">
              <h1 className="text-5xl font-display font-bold mb-6">Let's Talk Real Estate</h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Hi, I'm <span className="font-bold text-foreground">Abhivrat Singh</span>.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With years of experience in the Rajnandgaon market, I specialize in connecting people with properties that match their dreams and investment goals. Whether you're looking for a plot to build your legacy home, a farm to reconnect with nature, or a commercial space to grow your business, I'm here to help navigate every step of the way.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border shadow-sm">
              <h3 className="text-2xl font-display font-bold mb-6">Send a Message</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <Input placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone</label>
                    <Input placeholder="Your phone number" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input placeholder="Your email address" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea placeholder="How can we help you?" className="min-h-[120px]" />
                </div>
                <Button size="lg" className="w-full bg-primary text-white hover:bg-primary/90">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
