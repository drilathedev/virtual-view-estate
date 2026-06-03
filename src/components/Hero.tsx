import { Search, Sparkles, Box, Star, MapPin, ArrowUpRight, Bed, Bath } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import heroImage from "@/assets/hero-bg.jpg";
import floatImage from "@/assets/property-2.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (type) params.set("type", type);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden">
      {/* Soft organic background accents */}
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="container-custom relative grid grid-cols-1 items-center gap-10 py-12 lg:grid-cols-2 lg:gap-12 lg:py-20">
        {/* Left — copy + search */}
        <div className="order-2 lg:order-1">
          <span className="chip bg-primary/10 text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Platforma #1 me vizualizim 3D në Kosovë
          </span>

          <h1 className="mt-6 font-display font-semibold leading-[1.02] text-foreground">
            Gjej shtëpinë ku <span className="font-accent font-normal text-primary">natyra</span> takon komoditetin.
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            Eksploro prona premium me tura virtuale 360°, foto profesionale dhe modele 3D —
            gjithçka në një vend të vetëm.
          </p>

          {/* Search bar */}
          <div className="mt-8 rounded-2xl bg-card p-2 shadow-medium sm:flex sm:items-center sm:gap-2">
            <div className="flex flex-1 items-center gap-2 rounded-xl px-3 py-2">
              <MapPin className="h-5 w-5 shrink-0 text-primary" />
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Ku po kërkon? Prishtinë, Pejë..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <div className="hidden h-8 w-px bg-border sm:block" />
            <div className="px-1 py-2 sm:py-0">
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="h-10 w-full rounded-xl border-0 bg-transparent text-sm font-medium shadow-none focus:ring-0 sm:w-36">
                  <SelectValue placeholder="Lloji" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartament</SelectItem>
                  <SelectItem value="house">Shtëpi</SelectItem>
                  <SelectItem value="villa">Vilë</SelectItem>
                  <SelectItem value="penthouse">Penthouse</SelectItem>
                  <SelectItem value="land">Tokë</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleSearch}
              className="mt-2 h-12 w-full rounded-xl bg-primary px-6 font-semibold text-primary-foreground hover:bg-primary/90 sm:mt-0 sm:w-auto"
            >
              <Search className="mr-2 h-4 w-4" />
              Kërko
            </Button>
          </div>

          {/* Trust stats */}
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Stat value="500+" label="Prona të listuara" />
            <div className="h-9 w-px bg-border" />
            <Stat value="150+" label="Qytete & rajone" />
            <div className="h-9 w-px bg-border" />
            <div>
              <div className="flex items-center gap-1.5 font-display text-2xl font-semibold text-foreground">
                4.9 <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              </div>
              <div className="text-xs text-muted-foreground">Vlerësim mesatar</div>
            </div>
          </div>
        </div>

        {/* Right — image + floating cards */}
        <div className="order-1 lg:order-2">
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] rounded-tr-[5rem] shadow-hard">
              <img src={heroImage} alt="Pronë premium" className="h-[360px] w-full object-cover sm:h-[440px] lg:h-[540px]" />
            </div>

            {/* Floating rating badge */}
            <div className="absolute -left-3 top-8 flex items-center gap-3 rounded-2xl bg-card p-3 pr-5 shadow-hard sm:left-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Box className="h-5 w-5 text-primary" />
              </span>
              <div>
                <div className="text-sm font-bold text-foreground">Tura 3D</div>
                <div className="text-xs text-muted-foreground">në çdo listim</div>
              </div>
            </div>

            {/* Floating mini property card */}
            <div className="absolute -bottom-5 right-3 w-60 rounded-2xl bg-card p-2.5 shadow-hard sm:right-6">
              <div className="relative overflow-hidden rounded-xl">
                <img src={floatImage} alt="" className="h-24 w-full object-cover" />
                <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
                  Në Shitje
                </span>
              </div>
              <div className="px-1 pt-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">Vilë në Veternik</span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1"><Bed className="h-3 w-3 text-primary" /> 5</span>
                  <span className="flex items-center gap-1"><Bath className="h-3 w-3 text-primary" /> 3</span>
                  <span className="ml-auto font-bold text-foreground">€420,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Stat = ({ value, label }: { value: string; label: string }) => (
  <div>
    <div className="font-display text-2xl font-semibold text-foreground">{value}</div>
    <div className="text-xs text-muted-foreground">{label}</div>
  </div>
);
