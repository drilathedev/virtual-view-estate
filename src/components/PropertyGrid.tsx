import { PropertyCard } from "./PropertyCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2, SearchX, Search, SlidersHorizontal, RotateCcw } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { listProperties, Property } from '@/lib/properties';
import { useState } from 'react';

interface PropertyGridProps {
  showFilters?: boolean;
}

const CATEGORIES = [
  { id: '', label: 'All Categories' },
  { id: 'apartment', label: 'Apartments' },
  { id: 'house', label: 'Houses' },
  { id: 'villa', label: 'Villas' },
  { id: 'penthouse', label: 'Penthouses' },
  { id: 'land', label: 'Land' },
];

export const PropertyGrid = ({ showFilters = false }: PropertyGridProps) => {
  const { data: properties = [], isLoading, isError } = useQuery<Property[]>({
    queryKey: ['properties'],
    queryFn: listProperties
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'area-desc'>('featured');

  const q = searchParams.get('q')?.toLowerCase() || '';
  const location = searchParams.get('location')?.toLowerCase() || '';
  const type = searchParams.get('type')?.toLowerCase() || '';
  const priceMin = searchParams.get('priceMin') ? parseFloat(searchParams.get('priceMin')!) : undefined;
  const priceMax = searchParams.get('priceMax') ? parseFloat(searchParams.get('priceMax')!) : undefined;
  const areaMin = searchParams.get('areaMin') ? parseFloat(searchParams.get('areaMin')!) : undefined;
  const areaMax = searchParams.get('areaMax') ? parseFloat(searchParams.get('areaMax')!) : undefined;
  const feature = searchParams.get('feature')?.toLowerCase() || '';
  const forRent = searchParams.get('forRent')?.toLowerCase() || '';

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    setSearchParams(next, { replace: true });
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams(), { replace: true });
    setSortBy('featured');
  };

  const hasActiveFilters = Boolean(q || location || type || forRent || priceMin || priceMax || areaMin || areaMax || feature);

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

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-asc') {
      const pA = parseFloat(a.price.replace(/[^\d.]/g, '')) || 0;
      const pB = parseFloat(b.price.replace(/[^\d.]/g, '')) || 0;
      return pA - pB;
    }
    if (sortBy === 'price-desc') {
      const pA = parseFloat(a.price.replace(/[^\d.]/g, '')) || 0;
      const pB = parseFloat(b.price.replace(/[^\d.]/g, '')) || 0;
      return pB - pA;
    }
    if (sortBy === 'area-desc') {
      return (b.area || 0) - (a.area || 0);
    }
    return ((a as any).order || 999) - ((b as any).order || 999);
  });

  return (
    <section className="py-12 lg:py-20">
      <div className="container-custom space-y-8">
        {/* Header (Only on home / when showFilters is false) */}
        {!showFilters ? (
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl space-y-3">
              <h2 className="text-foreground">Explore our <span className="font-accent font-normal text-primary">premium</span> properties</h2>
              <p className="text-sm text-muted-foreground">
                Every listing offers unique features, exceptional quality, and prime locations —
                delivering an exclusive and comfortable living experience.
              </p>
            </div>
            <Link to="/properties" className="shrink-0">
              <Button variant="outline" className="rounded-full border-2 border-foreground/15 h-11 font-medium hover:bg-secondary">
                View All Properties
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        ) : (
          /* Interactive Luxury Filter Toolbar on /properties */
          <div className="space-y-6 rounded-3xl border border-border/70 bg-card p-6 shadow-soft">
            {/* Top row: search + status + sort */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-center">
              {/* Search Bar */}
              <div className="relative md:col-span-5">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={q || location}
                  onChange={(e) => updateParam('q', e.target.value)}
                  placeholder="Search by title, city or neighborhood..."
                  className="h-11 w-full rounded-2xl border border-border/80 bg-secondary/50 pl-10 pr-4 text-sm font-medium outline-none transition-all focus:border-primary focus:bg-background"
                />
              </div>

              {/* Status Segmented Control */}
              <div className="flex items-center rounded-2xl border border-border/80 bg-secondary/50 p-1 md:col-span-4">
                <button
                  type="button"
                  onClick={() => updateParam('forRent', '')}
                  className={`flex-1 rounded-xl py-2 text-xs font-semibold transition-all ${
                    !forRent ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => updateParam('forRent', 'sale')}
                  className={`flex-1 rounded-xl py-2 text-xs font-semibold transition-all ${
                    forRent === 'sale' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  For Sale
                </button>
                <button
                  type="button"
                  onClick={() => updateParam('forRent', 'rent')}
                  className={`flex-1 rounded-xl py-2 text-xs font-semibold transition-all ${
                    forRent === 'rent' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  For Rent
                </button>
              </div>

              {/* Sort Selection */}
              <div className="flex items-center gap-2 md:col-span-3">
                <SlidersHorizontal className="h-4 w-4 shrink-0 text-muted-foreground" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="h-11 w-full rounded-2xl border border-border/80 bg-secondary/50 px-3 text-xs font-semibold outline-none transition-all focus:border-primary focus:bg-background"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="area-desc">Area: Largest First</option>
                </select>
              </div>
            </div>

            {/* Bottom row: Category Pills + Results Count */}
            <div className="flex flex-col gap-4 border-t border-border/60 pt-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {CATEGORIES.map((cat) => {
                  const active = (type || '') === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => updateParam('type', cat.id)}
                      className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                        active
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'bg-secondary/70 text-foreground/70 hover:bg-secondary hover:text-foreground'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Counter & Reset */}
              <div className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground">
                <span>
                  Showing <strong className="text-foreground">{sorted.length}</strong> {sorted.length === 1 ? 'property' : 'properties'}
                </span>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm font-medium text-muted-foreground">Loading premium listings...</p>
          </div>
        ) : isError ? (
          <div className="rounded-3xl border border-destructive/20 bg-destructive/5 py-16 text-center text-destructive">
            Failed to load properties. Please try again.
          </div>
        ) : sorted.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
              <SearchX className="h-7 w-7 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-foreground">No properties match your criteria</h3>
              <p className="text-sm text-muted-foreground">Try adjusting your filters, searching another location, or resetting filters.</p>
            </div>
            {hasActiveFilters && (
              <Button onClick={clearAllFilters} variant="outline" className="rounded-full mt-2">
                <RotateCcw className="mr-2 h-4 w-4" />
                Clear All Filters
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
