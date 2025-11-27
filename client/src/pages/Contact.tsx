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
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
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
                      <a href="tel:6261642203" className="text-xl font-semibold hover:underline">6261642203</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                     <div className="bg-white/20 p-3 rounded-full">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm mb-1">Email Us</p>
                      <a href="mailto:businesswithabhivrat@gmail.com" className="text-lg font-semibold break-all hover:underline">businesswithabhivrat@gmail.com</a>
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

                  <div className="pt-4 border-t border-white/20">
                    <p className="text-white/60 text-sm mb-3">Follow Us</p>
                    <div className="flex gap-3">
                      <a 
                        href="https://www.instagram.com/abhivrat_singh/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C9.673 2.013 10.03 2 12.315 2zm-3.196 8.45a4.45 4.45 0 100 8.9 4.45 4.45 0 000-8.9zm0 1.524a2.926 2.926 0 110 5.852 2.926 2.926 0 010-5.852zM16.57 6.46a1.12 1.12 0 100 2.24 1.12 1.12 0 000-2.24z" clipRule="evenodd" /></svg>
                      </a>
                      <a 
                        href="https://www.facebook.com/people/LandNest-Properties/61571537133705/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                      </a>
                      <a 
                        href="https://www.linkedin.com/company/landnest-properties/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                      </a>
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
