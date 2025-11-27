import { Layout } from "@/components/Layout";
import founderImage from "@assets/generated_images/professional_portrait_of_a_male_founder.png";
import { motion } from "framer-motion";

export default function About() {
  return (
    <Layout>
      <div className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-foreground">Our Story</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            LandNest Properties was born from a simple belief: that finding a home or land is not just a transaction, but a milestone in life's journey.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-muted">
              <img src={founderImage} alt="Abhivrat Singh - Founder" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-xl max-w-xs border border-white/20">
              <h3 className="text-xl font-bold text-foreground">Abhivrat Singh</h3>
              <p className="text-primary font-medium">Founder & CEO</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-medium tracking-wider uppercase text-sm block mb-4">The Founder</span>
            <h2 className="text-4xl font-display font-bold mb-6 text-foreground">A Family Legacy</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Abhivrat Singh founded LandNest Properties with a vision to revolutionize the real estate market in Rajnandgaon. Created as a digital extension of the family business, LandNest bridges the gap between traditional trust and modern convenience.
              </p>
              <p>
                "Real estate is in our blood. For generations, my family has understood the value of land—not just as an asset, but as a foundation for dreams. LandNest is my way of bringing that legacy into the digital age, making it easier for everyone to find their perfect piece of earth."
              </p>
              <p>
                Whether you are looking for a sprawling farm, a cozy home, or a strategic commercial investment, Abhivrat and his team are dedicated to guiding you with honesty, integrity, and deep local expertise.
              </p>
            </div>
            
            <div className="mt-10 p-6 bg-primary/5 rounded-xl border border-primary/10">
               <p className="font-display font-medium text-primary italic">
                 "We don't just sell properties; we build relationships that last generations."
               </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
