import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Coffee, CupSoda, Leaf, Sandwich, Cake, Star, Award, Home as HomeIcon, Zap, Wifi, Heart, MapPin, Phone, MessageSquare, Menu as MenuIcon, X } from "lucide-react";
import { SiInstagram, SiWhatsapp, SiFacebook } from "react-icons/si";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// Form Schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  message: z.string().min(10, "Message must be at least 10 characters.")
});

export default function Home() {
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", phone: "", message: "" }
  });

  const onSubmit = (values: z.infer<typeof contactFormSchema>) => {
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    form.reset();
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  // Section Refs for scroll spying if needed, here just using simple scroll
  
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background overflow-x-hidden">
      
      {/* 1. Sticky Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary cursor-pointer" onClick={() => scrollTo("hero")}>
            <Coffee className="w-8 h-8" />
            <span className="font-serif text-2xl font-bold tracking-tight">Pune Cafe</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo("about")} className="text-foreground hover:text-primary transition-colors font-medium">About</button>
            <button onClick={() => scrollTo("menu")} className="text-foreground hover:text-primary transition-colors font-medium">Menu</button>
            <button onClick={() => scrollTo("why-us")} className="text-foreground hover:text-primary transition-colors font-medium">Why Us</button>
            <button onClick={() => scrollTo("gallery")} className="text-foreground hover:text-primary transition-colors font-medium">Gallery</button>
            <button onClick={() => scrollTo("reviews")} className="text-foreground hover:text-primary transition-colors font-medium">Reviews</button>
            <button onClick={() => scrollTo("contact")} className="text-foreground hover:text-primary transition-colors font-medium">Contact</button>
            <Button onClick={() => scrollTo("contact")} className="bg-accent text-accent-foreground hover:bg-accent/90" data-testid="btn-book-table">
              Book a Table
            </Button>
          </div>

          {/* Mobile Nav Toggle */}
          <button className="md:hidden text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-background border-b border-border p-4 flex flex-col gap-4 shadow-lg">
            <button onClick={() => scrollTo("about")} className="text-left py-2 text-foreground font-medium">About</button>
            <button onClick={() => scrollTo("menu")} className="text-left py-2 text-foreground font-medium">Menu</button>
            <button onClick={() => scrollTo("why-us")} className="text-left py-2 text-foreground font-medium">Why Us</button>
            <button onClick={() => scrollTo("gallery")} className="text-left py-2 text-foreground font-medium">Gallery</button>
            <button onClick={() => scrollTo("reviews")} className="text-left py-2 text-foreground font-medium">Reviews</button>
            <button onClick={() => scrollTo("contact")} className="text-left py-2 text-foreground font-medium">Contact</button>
            <Button onClick={() => scrollTo("contact")} className="bg-accent text-accent-foreground w-full">Book a Table</Button>
          </div>
        )}
      </nav>

      {/* 2. Hero Section */}
      <section id="hero" className="relative pt-20 min-h-screen flex items-center justify-center overflow-hidden">
        {/* Abstract Background instead of image for safety if generation fails, but using the specified prompt conceptually via an image tag or background */}
        <div className="absolute inset-0 z-0 bg-[#4A2C17]/10" />
        <img 
          src={`${import.meta.env.BASE_URL}images/hero.png`}
          alt="Pune Cafe Interior" 
          className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />

        <div className="container relative z-10 px-4 md:px-6 text-center">
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="max-w-3xl mx-auto space-y-8"
          >
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-1 text-accent mb-6">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <span className="text-foreground ml-2 font-medium">4.8/5 Customer Reviews</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-bold font-serif text-primary tracking-tight">
              Pune Cafe
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-foreground/80 font-medium">
              Fresh Coffee, Delicious Food, Memorable Moments.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg" onClick={() => scrollTo("menu")}>
                View Menu
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 rounded-full border-2 border-primary text-primary hover:bg-primary/5" asChild>
                <a href="tel:+918770407122">Call Now</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. About Us Section */}
      <section id="about" className="py-24 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">About Us</h2>
              <div className="w-20 h-1 bg-accent rounded-full" />
              <p className="text-lg text-foreground/80 leading-relaxed">
                At Pune Cafe, every cup tells a story. We source the finest coffee beans, craft every beverage with expertise, and create a warm space where Pune comes to connect, relax, and savor life one sip at a time.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Our chefs blend traditional Indian flavors with modern cafe sensibilities to bring you a menu that feels both familiar and exciting.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply z-10" />
              <img 
                src={`${import.meta.env.BASE_URL}images/about.png`}
                alt="Barista pouring latte art" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1000&auto=format&fit=crop';
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Featured Menu Section */}
      <section id="menu" className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">Our Menu</h2>
            <div className="w-20 h-1 bg-accent rounded-full mx-auto" />
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">Discover our handcrafted beverages and artisanal bites.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Espresso and Coffee", icon: Coffee, desc: "Rich single-origin espressos, Americanos, and cold brews crafted to perfection.", img: "menu-1" },
              { title: "Cappuccino and Latte", icon: CupSoda, desc: "Velvety steamed milk meets our signature espresso blend.", img: "menu-2" },
              { title: "Tea and Refreshments", icon: Leaf, desc: "Darjeeling teas, masala chai, fresh lemonades, and seasonal coolers.", img: "menu-3" },
              { title: "Sandwiches and Snacks", icon: Sandwich, desc: "Grilled sandwiches, wraps, bruschetta, and loaded toast.", img: "menu-4" },
              { title: "Desserts and Bakery", icon: Cake, desc: "House-baked croissants, cakes, cookies, and fusion Indian sweets.", img: "menu-5" },
              { title: "Special Combos", icon: Star, desc: "Curated meal deals for breakfast, lunch, and evening snacks.", img: "menu-6" },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-card rounded-2xl overflow-hidden border border-border shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col"
              >
                <div className="h-48 bg-muted relative overflow-hidden">
                  <img 
                    src={`${import.meta.env.BASE_URL}images/${item.img}.png`}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <item.icon className="w-8 h-8 text-white mb-2" />
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold font-serif text-primary mb-2">{item.title}</h3>
                  <p className="text-foreground/70 leading-relaxed flex-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us Section */}
      <section id="why-us" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmZmZmYiLz48cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDAwMDAwIi8+PC9zdmc+')] opacity-5" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground">Why Choose Us</h2>
            <div className="w-20 h-1 bg-accent rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { title: "Fresh Ingredients", icon: Leaf },
              { title: "Expert Baristas", icon: Award },
              { title: "Cozy Ambience", icon: HomeIcon },
              { title: "Fast Service", icon: Zap },
              { title: "Free Wi-Fi", icon: Wifi },
              { title: "Customer Satisfaction", icon: Heart },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4 text-accent">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-lg">{feature.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Gallery Section */}
      <section id="gallery" className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">Our Gallery</h2>
            <div className="w-20 h-1 bg-accent rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative aspect-square md:aspect-[4/3] rounded-xl overflow-hidden cursor-pointer bg-muted"
              >
                <img 
                  src={`${import.meta.env.BASE_URL}images/gallery-${i}.png`}
                  alt={`Gallery Image ${i}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-50 group-hover:scale-100" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Reviews Section */}
      <section id="reviews" className="py-24 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">What Our Guests Say</h2>
            <div className="w-20 h-1 bg-accent rounded-full mx-auto" />
            <div className="flex items-center justify-center gap-1 text-accent mt-4">
              <Star className="w-6 h-6 fill-current" />
              <Star className="w-6 h-6 fill-current" />
              <Star className="w-6 h-6 fill-current" />
              <Star className="w-6 h-6 fill-current" />
              <Star className="w-6 h-6 fill-current" />
              <span className="text-foreground ml-2 font-bold text-lg">4.8/5 Based on Customer Reviews</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Rahul M.", text: "Best cafe in Pune! The cappuccino here is absolutely divine and the ambiance is perfect for work or catching up with friends." },
              { name: "Priya D.", text: "I come here every weekend. The masala chai and sandwiches are my go-to. Staff is incredibly warm and welcoming." },
              { name: "Amit S.", text: "Discovered this gem recently and I am hooked. The special combo deals are great value. Highly recommend Pune Cafe!" }
            ].map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="bg-background p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow relative"
              >
                <MessageSquare className="absolute top-6 right-6 w-8 h-8 text-muted-foreground/20" />
                <div className="flex gap-1 text-accent mb-4">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <p className="text-foreground/80 italic mb-6 leading-relaxed">"{review.text}"</p>
                <h4 className="font-bold text-primary font-serif">— {review.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Contact Section */}
      <section id="contact" className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">Get In Touch</h2>
            <div className="w-20 h-1 bg-accent rounded-full mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h3 className="text-3xl font-serif font-bold text-primary mb-6">Pune Cafe</h3>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Phone</h4>
                    <p className="text-foreground/70 mb-3">+91 87704 07122</p>
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" asChild className="border-primary text-primary hover:bg-primary/5">
                        <a href="tel:+918770407122">Call Now</a>
                      </Button>
                      <Button variant="outline" size="sm" asChild className="border-[#25D366] text-[#25D366] hover:bg-[#25D366]/5">
                        <a href="https://wa.me/918770407122" target="_blank" rel="noreferrer">
                          <SiWhatsapp className="w-4 h-4 mr-2" /> WhatsApp
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Location</h4>
                    <p className="text-foreground/70">Pune, Maharashtra, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Coffee className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Opening Hours</h4>
                    <p className="text-foreground/70">Mon - Sat: 8:00 AM - 10:00 PM</p>
                    <p className="text-foreground/70">Sun: 9:00 AM - 9:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="w-full h-48 bg-muted rounded-2xl border-2 border-accent flex flex-col items-center justify-center text-primary/60">
                <MapPin className="w-10 h-10 mb-2" />
                <span className="font-medium">Visit Us at Pune, Maharashtra, India</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-3xl border border-border shadow-xl"
            >
              <h3 className="text-2xl font-serif font-bold text-primary mb-6">Send a Message</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+91 XXXXX XXXXX" {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How can we help you?" 
                            className="min-h-[120px] bg-background" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg rounded-xl">
                    Send Message
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="bg-[#1A0E08] text-white py-12 border-t-4 border-accent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8 items-center md:items-start text-center md:text-left mb-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center md:justify-start gap-2 text-[#FDF6EC]">
                <Coffee className="w-8 h-8" />
                <span className="font-serif text-3xl font-bold tracking-tight">Pune Cafe</span>
              </div>
              <p className="text-white/70 max-w-sm mx-auto md:mx-0">
                Crafting memorable moments over fresh coffee and delicious food in the heart of Pune.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-lg text-accent mb-4">Contact Info</h4>
              <p className="text-white/80">+91 87704 07122</p>
              <p className="text-white/80">Pune, Maharashtra, India</p>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-lg text-accent mb-4">Follow Us</h4>
              <div className="flex items-center justify-center md:justify-start gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-[#1A0E08] transition-colors">
                  <SiInstagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-[#1A0E08] transition-colors">
                  <SiFacebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-[#1A0E08] transition-colors">
                  <SiWhatsapp className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50 text-center">
            <p>&copy; 2026 Pune Cafe. All rights reserved.</p>
            <p>Mon-Sat 8AM-10PM | Sun 9AM-9PM</p>
          </div>
        </div>
      </footer>
    </div>
  );
}