import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { listProperties, Property } from "@/lib/properties";
import { Search, Bed, Bath, Star, Square, MapPin, Loader2, ArrowUpRight } from "lucide-react";

const categories = ["All", "Villas", "Apartments", "For Sale", "For Rent"];

export const MobileHome = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("All");
  const [q, setQ] = useState("");
  const { data: properties = [], isLoading } = useQuery<Property[]>({
    queryKey: ["properties"],
    queryFn: listProperties,
  });

  const filteredProperties = properties.filter((p) => {
    if (active === "All") return true;
    if (active === "Villas") return p.type?.toLowerCase() === "villa" || p.title.toLowerCase().includes("villa");
    if (active === "Apartments") return p.type?.toLowerCase() === "apartment" || p.title.toLowerCase().includes("apartment");
    if (active === "For Sale") return !p.forRent;
    if (active === "For Rent") return !!p.forRent;
    return true;
  });

  const featured = filteredProperties[0];
  const rest = filteredProperties.slice(1);

  const submit = () => navigate(q.trim() ? `/properties?q=${encodeURIComponent(q.trim())}` : "/properties");

  return (
    <div className="px-5 pb-32 pt-4">
      {/* Greeting */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-foreground text-base font-bold text-background shadow-soft">
            P
          </span>
          <div>
            <p className="text-xs text-muted-foreground">Premium Living</p>
            <p className="text-base font-bold text-foreground">PRONA360</p>
          </div>
        </div>
        <Link to="/contact" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground shadow-sm">
          Contact Us
        </Link>
      </header>

      {/* Search */}
      <div className="mt-5 flex items-center gap-2.5">
        <div className="flex flex-1 items-center gap-2.5 rounded-2xl bg-card px-4 py-3.5 shadow-soft border border-border/60">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Search properties, cities..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <button onClick={submit} className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-foreground text-background shadow-soft transition-transform active:scale-95" aria-label="Search">
          <Search className="h-5 w-5" />
        </button>
      </div>

      {/* Categories */}
      <div className="no-scrollbar -mx-5 mt-5 flex gap-2.5 overflow-x-auto px-5">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
              active === c ? "bg-primary text-primary-foreground shadow-soft" : "bg-card text-foreground/70 shadow-soft"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-7 w-7 animate-spin text-primary" />
        </div>
      ) : filteredProperties.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-sm text-muted-foreground">No properties found in this category.</p>
          <button onClick={() => setActive("All")} className="mt-3 text-sm font-semibold text-primary underline">
            Show all properties
          </button>
        </div>
      ) : (
        <>
          {/* Featured */}
          {featured && (
            <Link to={`/property/${featured.id}`} className="mt-6 block rounded-[1.75rem] border border-border/70 bg-card p-3 shadow-medium transition-transform active:scale-[0.99]">
              <div className="relative overflow-hidden rounded-[1.4rem]">
                <img src={featured.image} alt={featured.title} className="h-56 w-full object-cover" />
                <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background shadow-sm">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
                <span className="absolute left-3 top-3 rounded-full bg-background/95 border border-border/60 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur shadow-sm">
                  {featured.forRent ? "For Rent" : "For Sale"}
                </span>
                {featured.mediaType === "3d" && (
                  <span className="absolute bottom-3 left-3 rounded-full bg-foreground text-background px-2.5 py-0.5 text-[10px] font-bold backdrop-blur">
                    360° Tour
                  </span>
                )}
              </div>
              <div className="px-1.5 pb-1 pt-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{featured.title}</h3>
                    <div className="mt-1 flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-1 h-3.5 w-3.5 text-primary" />
                      {featured.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">{featured.forRent ? "/mo" : "Price"}</div>
                    <div className="text-lg font-bold text-foreground">
                      {featured.price.startsWith("€") ? featured.price : `€${featured.price}`}
                    </div>
                  </div>
                </div>
                <div className="mt-3.5 flex items-center gap-2">
                  <Stat icon={Bed} text={`${featured.beds} beds`} tone="terracotta" />
                  <Stat icon={Star} text={(featured.rating ?? 4.9).toFixed(1)} tone="amber" />
                  <Stat icon={Square} text={`${featured.area} m²`} tone="teal" />
                </div>
              </div>
            </Link>
          )}

          {/* Recommendation */}
          {rest.length > 0 && (
            <>
              <div className="mt-7 flex items-center justify-between">
                <h2 className="text-lg font-bold text-foreground">Recommended</h2>
                <Link to="/properties" className="text-sm font-semibold text-primary">View all</Link>
              </div>

              <div className="no-scrollbar -mx-5 mt-3 flex gap-4 overflow-x-auto px-5 pb-2">
                {rest.map((p) => (
                  <Link key={p.id} to={`/property/${p.id}`} className="w-64 shrink-0 rounded-[1.4rem] border border-border/70 bg-card p-2.5 shadow-soft transition-transform active:scale-[0.98]">
                    <div className="relative overflow-hidden rounded-[1.1rem]">
                      <img src={p.image} alt={p.title} className="h-32 w-full object-cover" />
                      <span className="absolute left-2.5 top-2.5 rounded-full bg-background/95 border border-border/60 px-2.5 py-0.5 text-[11px] font-semibold text-foreground backdrop-blur">
                        {p.forRent ? "For Rent" : "For Sale"}
                      </span>
                      {p.mediaType === "3d" && (
                        <span className="absolute bottom-2 left-2 rounded-full bg-foreground text-background px-2 py-0.5 text-[9px] font-bold backdrop-blur">
                          360°
                        </span>
                      )}
                    </div>
                    <div className="px-1 pt-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="line-clamp-1 text-sm font-bold text-foreground">{p.title}</h3>
                        <span className="shrink-0 text-sm font-bold text-foreground">
                          {p.price.startsWith("€") ? p.price : `€${p.price}`}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center text-xs text-muted-foreground">
                        <MapPin className="mr-1 h-3 w-3 text-primary" />
                        <span className="line-clamp-1">{p.location}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

const toneMap = {
  terracotta: { bg: "bg-primary/10", icon: "text-primary" },
  amber: { bg: "bg-amber-100", icon: "fill-amber-400 text-amber-400" },
  teal: { bg: "bg-accent/15", icon: "text-accent" },
} as const;

const Stat = ({ icon: Icon, text, tone = "terracotta" }: { icon: any; text: string; tone?: keyof typeof toneMap }) => (
  <span className={`flex items-center gap-1.5 rounded-full ${toneMap[tone].bg} px-3.5 py-2 text-xs font-semibold text-foreground/80`}>
    <Icon className={`h-3.5 w-3.5 ${toneMap[tone].icon}`} />
    {text}
  </span>
);
