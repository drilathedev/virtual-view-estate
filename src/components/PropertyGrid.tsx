import { PropertyCard } from "./PropertyCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
// TEMP: Hard-coded properties instead of Firestore fetch
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const staticProperties = [
  {
    id: "demo-1",
    image: property1,
    title: "Apartament Modern në Qendër",
    location: "Prishtinë, Kosovë",
    price: "€120,000",
    beds: 2,
    baths: 2,
    area: 85,
    mediaType: "3d" as const,
    forRent: false,
  },
  {
    id: "demo-2",
    image: property2,
    title: "Penthouse me Pamje",
    location: "Prishtinë, Kosovë",
    price: "€2,500/muaj",
    beds: 3,
    baths: 3,
    area: 150,
    mediaType: "video" as const,
    forRent: true,
  },
  {
    id: "demo-3",
    image: property3,
    title: "Shtëpi me Oborr",
    location: "Pejë, Kosovë",
    price: "€95,000",
    beds: 2,
    baths: 1,
    area: 70,
    mediaType: "photo" as const,
    forRent: false,
  },
  {
    id: "demo-4",
    image: property1,
    title: "Studio Komode",
    location: "Prizren, Kosovë",
    price: "€800/muaj",
    beds: 1,
    baths: 1,
    area: 45,
    mediaType: "3d" as const,
    forRent: true,
  },
  {
    id: "demo-5",
    image: property2,
    title: "Vilë Luksoze me Pishinë",
    location: "Prishtinë, Kosovë",
    price: "€450,000",
    beds: 5,
    baths: 4,
    area: 320,
    mediaType: "video" as const,
    forRent: false,
  }
];

export const PropertyGrid = () => {
  const properties = staticProperties;

  return (
    <section className="py-20 bg-background">
      <div className="container-custom space-y-12">
        {/* Header */}
        <div className="text-center animate-fade-in">
          <h2 className="mb-4">Featured Properties</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our curated collection of premium properties with advanced visualization
          </p>
        </div>

        {/* Properties Grid */}
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

        {/* View All Button */}
        <div className="text-center pt-8 animate-fade-in">
          <Link to="/">
            <Button variant="hero" size="lg" className="gap-2 group">
              View All Properties
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
