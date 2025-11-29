import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import heroImage from "@/assets/hero-bg.jpg";

export const Hero = () => {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Luxury property" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-background/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center animate-fade-in">
        <h1 className="text-white mb-6 max-w-4xl mx-auto animate-slide-up">
          Eksploro Çdo Detaj. <br />
          Udhëto Virtualisht. <br />
          <span className="text-accent">Gjej Shtëpinë Tënde.</span>
        </h1>
        
        <p className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
          Platforma më moderne e pasurive të paluajtshme me vizualizim 3D dhe tura virtuale
        </p>

        {/* Search Bar */}
        <div 
          className="glass-card p-4 md:p-6 max-w-4xl mx-auto rounded-2xl shadow-2xl animate-scale-in"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-4">
              <Input 
                placeholder="Lokacioni..." 
                className="h-12 bg-white/90 border-white/20"
              />
            </div>
            
            <div className="md:col-span-3">
              <Select>
                <SelectTrigger className="h-12 bg-white/90 border-white/20">
                  <SelectValue placeholder="Lloji" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartament</SelectItem>
                  <SelectItem value="house">Shtëpi</SelectItem>
                  <SelectItem value="villa">Vilë</SelectItem>
                  <SelectItem value="penthouse">Penthouse</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-3">
              <Select>
                <SelectTrigger className="h-12 bg-white/90 border-white/20">
                  <SelectValue placeholder="Çmimi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-50k">€0 - €50,000</SelectItem>
                  <SelectItem value="50k-100k">€50,000 - €100,000</SelectItem>
                  <SelectItem value="100k-200k">€100,000 - €200,000</SelectItem>
                  <SelectItem value="200k+">€200,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <Button variant="hero" size="lg" className="w-full h-12">
                <Search className="h-5 w-5" />
                Kërko
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
