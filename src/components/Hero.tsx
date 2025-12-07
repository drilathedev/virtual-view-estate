import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import heroImage from "@/assets/hero-bg.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [forRent, setForRent] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (type) params.set("type", type);
    if (price) {
      // Map price select value to min/max
      if (price === "0-50k") { params.set("priceMin", "0"); params.set("priceMax", "50000"); }
      else if (price === "50k-100k") { params.set("priceMin", "50000"); params.set("priceMax", "100000"); }
      else if (price === "100k-200k") { params.set("priceMin", "100000"); params.set("priceMax", "200000"); }
      else if (price === "200k+") { params.set("priceMin", "200000"); }
    }
    if (forRent) params.set("forRent", forRent);
    navigate(`/properties?${params.toString()}`);
  };
  
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Luxury property" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center">
        <h1 className="text-white mb-5 max-w-4xl mx-auto font-light tracking-tight">
          Gjej shtëpinë tënde ideale <br />
          <span className="font-bold">me vizualizim 3D</span>
        </h1>
        
        <p className="text-white/80 text-base md:text-lg mb-10 max-w-xl mx-auto">
          Eksploro prona premium në Kosovë me tura virtuale
        </p>

        {/* Search Bar */}
        <div className="bg-white p-4 md:p-6 max-w-5xl mx-auto rounded-lg shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-3">
              <Input 
                placeholder="Lokacioni..." 
                className="h-12 border-gray-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
            </div>
            
            <div className="md:col-span-2">
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="h-12 border-gray-200">
                  <SelectValue placeholder="Lloji" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartament</SelectItem>
                  <SelectItem value="house">Shtëpi</SelectItem>
                  <SelectItem value="villa">Vilë</SelectItem>
                  <SelectItem value="penthouse">Penthouse</SelectItem>
                  <SelectItem value="land">Toka</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <Select value={price} onValueChange={setPrice}>
                <SelectTrigger className="h-12 border-gray-200">
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

            <div className="md:col-span-3">
              <Select value={forRent} onValueChange={setForRent}>
                <SelectTrigger className="h-12 border-gray-200">
                  <SelectValue placeholder="Statusi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sale">Në Shitje</SelectItem>
                  <SelectItem value="rent">Me Qira</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <Button 
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium" 
                onClick={handleSearch}
              >
                <Search className="h-4 w-4 mr-2" />
                Kërko
              </Button>
            </div>
          </div>
        </div>
        
        {/* Trust indicators */}
        <div className="flex items-center justify-center gap-6 mt-8 text-white/70 text-sm">
        
          <span>Tura 3D Virtuale</span>
          <span>•</span>
          <span>Verifikuar & i Sigurt</span>
        </div>
      </div>
    </section>
  );
};
