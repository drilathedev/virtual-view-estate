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
  const forRent = params.get('forRent')?.toLowerCase() || '';

  // Filter properties
  const filtered = properties.filter((p) => {
    let match = true;
    if (q && !p.title.toLowerCase().includes(q) && !p.location.toLowerCase().includes(q)) match = false;
    if (location && !p.location.toLowerCase().includes(location)) match = false;
    if (type && p.mediaType && p.mediaType.toLowerCase() !== type) match = false;
    if (priceMin && parseFloat(p.price.replace(/[^\d.]/g, '')) < priceMin) match = false;
    if (priceMax && parseFloat(p.price.replace(/[^\d.]/g, '')) > priceMax) match = false;
    if (forRent === 'rent' && !p.forRent) match = false;
    if (forRent === 'sale' && p.forRent) match = false;
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
    <section className="py-20 bg-gray-50">
      <div className="container-custom space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <h2 className="text-gray-900">Prona të veçantuara</h2>
          <p className="text-gray-600 text-base max-w-2xl mx-auto">
            Eksploro koleksionin tonë të kuratuar të pronave premium me vizualizim të avancuar
          </p>
        </div>

        {/* Properties Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <div className="text-gray-600">Po ngarkohen pronat…</div>
            </div>
          </div>
        ) : isError ? (
          <div className="py-12 text-center text-red-600">
            Failed to load properties. Please try again later.
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center text-gray-600">
            No properties found for your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center pt-4">
          <Link to="/properties">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 font-medium"
            >
              Shiko të gjitha pronat
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
