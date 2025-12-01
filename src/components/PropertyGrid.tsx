import { PropertyCard } from "./PropertyCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { listProperties, Property } from '@/lib/properties';

export const PropertyGrid = () => {
  const { data: properties = [], isLoading, isError } = useQuery<Property[]>({
    queryKey: ['properties'],
    queryFn: listProperties
  });

  // Get query params from URL
  const params = new URLSearchParams(window.location.search);
  const q = params.get('q')?.toLowerCase() || '';
  const location = params.get('location')?.toLowerCase() || '';
  const type = params.get('type')?.toLowerCase() || '';
  const priceMin = params.get('priceMin') ? parseFloat(params.get('priceMin')!) : undefined;
  const priceMax = params.get('priceMax') ? parseFloat(params.get('priceMax')!) : undefined;
  const areaMin = params.get('areaMin') ? parseFloat(params.get('areaMin')!) : undefined;
  const areaMax = params.get('areaMax') ? parseFloat(params.get('areaMax')!) : undefined;
  const feature = params.get('feature')?.toLowerCase() || '';

  // Filter properties
  const filtered = properties.filter((p) => {
    let match = true;
    if (q && !p.title.toLowerCase().includes(q) && !p.location.toLowerCase().includes(q)) match = false;
    if (location && !p.location.toLowerCase().includes(location)) match = false;
    if (type && p.mediaType && p.mediaType.toLowerCase() !== type) match = false;
    if (priceMin && parseFloat(p.price.replace(/[^\d.]/g, '')) < priceMin) match = false;
    if (priceMax && parseFloat(p.price.replace(/[^\d.]/g, '')) > priceMax) match = false;
    // Area filter: handle 'Toka' (land) in ha, others in m²
    if (areaMin !== undefined) {
      if (p.mediaType === 'land') {
        if (p.area < areaMin) match = false;
      } else {
        if (p.area < areaMin) match = false;
      }
    }
    if (areaMax !== undefined) {
      if (p.mediaType === 'land') {
        if (p.area > areaMax) match = false;
      } else {
        if (p.area > areaMax) match = false;
      }
    }
    // If features are stored as array, add feature filter here
    if (feature && !(p.features?.some(f => f.toLowerCase().includes(feature)))) match = false;
    return match;
  });

  return (
    <section className="py-20 bg-background">
      <div className="container-custom space-y-12">
        {/* Header */}
        <div className="text-center animate-fade-in">
          <h2 className="mb-4">Prona të veçantuara</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our curated collection of premium properties with advanced visualization
          </p>
        </div>

        {/* Properties Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-10 w-10 animate-spin text-accent" />
              <div className="text-muted-foreground">Po ngarkohen pronat…</div>
            </div>
          </div>
        ) : isError ? (
          <div className="py-12 text-center text-destructive">Failed to load properties. Please try again later.</div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">No properties found for your search.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filtered.map((property, index) => (
              <div
                key={property.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <PropertyCard {...property} />
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center pt-8 animate-fade-in">
          <Link to="/properties">
            <Button variant="hero" size="lg" className="gap-2 group">
              Shiko të gjitha pronat
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
