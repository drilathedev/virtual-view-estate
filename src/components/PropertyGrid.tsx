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
        ) : properties.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">No properties available yet — check back soon.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {properties.map((property, index) => (
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
