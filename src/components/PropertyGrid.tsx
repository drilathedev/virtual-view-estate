import { PropertyCard } from "./PropertyCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2, SearchX } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { listProperties, Property } from '@/lib/properties';

export const PropertyGrid = () => {
  const { data: properties = [], isLoading, isError } = useQuery<Property[]>({
    queryKey: ['properties'],
    queryFn: listProperties
  });

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

  const filtered = properties.filter((p) => {
    let match = true;
    if (q && !p.title.toLowerCase().includes(q) && !p.location.toLowerCase().includes(q)) match = false;
    if (location && !p.location.toLowerCase().includes(location)) match = false;
    if (type) {
      const propType = (p as any).type?.toLowerCase();
      if (propType) {
        if (propType !== type) match = false;
      } else {
        const inTitle = p.title?.toLowerCase().includes(type);
        const inDesc = (p as any).description?.toLowerCase().includes(type);
        const inFeatures = p.features?.some(f => f.toLowerCase().includes(type));
        if (!inTitle && !inDesc && !inFeatures) match = false;
      }
    }
    if (priceMin && parseFloat(p.price.replace(/[^\d.]/g, '')) < priceMin) match = false;
    if (priceMax && parseFloat(p.price.replace(/[^\d.]/g, '')) > priceMax) match = false;
    if (forRent === 'rent' && !p.forRent) match = false;
    if (forRent === 'sale' && p.forRent) match = false;
    if (areaMin !== undefined && p.area < areaMin) match = false;
    if (areaMax !== undefined && p.area > areaMax) match = false;
    if (feature && !(p.features?.some(f => f.toLowerCase().includes(feature)))) match = false;
    return match;
  });

  return (
    <section className="py-16 lg:py-24">
      <div className="container-custom space-y-10">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl space-y-3">
            <h2 className="text-foreground">Eksploro shtëpitë tona <span className="font-accent font-normal">premium</span></h2>
            <p className="text-sm text-muted-foreground">
              Çdo listim ofron tipare unike, cilësi të jashtëzakonshme dhe lokacione kryesore —
              duke siguruar një përvojë jetese ekskluzive.
            </p>
          </div>
          <Link to="/properties" className="shrink-0">
            <Button variant="outline" className="rounded-full border-2 border-foreground/15 h-11 font-medium hover:bg-secondary">
              Shiko të gjitha pronat
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : isError ? (
          <div className="py-16 text-center text-destructive">Ngarkimi i pronave dështoi.</div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
              <SearchX className="h-7 w-7 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">Nuk u gjetën prona për kërkimin tuaj.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
