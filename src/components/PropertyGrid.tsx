import { PropertyCard } from "./PropertyCard";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const properties = [
  {
    id: "1",
    image: property1,
    title: "Apartament Modern në Prishtinë",
    location: "Prishtinë, Kosovë",
    price: "€120,000",
    beds: 2,
    baths: 2,
    area: 85,
    mediaType: "3d" as const,
    forRent: false,
  },
  {
    id: "2",
    image: property2,
    title: "Penthouse me Pamje Panoramike",
    location: "Prishtinë, Kosovë",
    price: "€2,500/muaj",
    beds: 3,
    baths: 3,
    area: 150,
    mediaType: "video" as const,
    forRent: true,
  },
  {
    id: "3",
    image: property3,
    title: "Shtëpi me Oborr të Gjelbër",
    location: "Prishtinë, Kosovë",
    price: "€280,000",
    beds: 4,
    baths: 3,
    area: 220,
    mediaType: "photo" as const,
    forRent: false,
  },
  {
    id: "4",
    image: property1,
    title: "Apartament i Ri në Qendër",
    location: "Pejë, Kosovë",
    price: "€95,000",
    beds: 2,
    baths: 1,
    area: 70,
    mediaType: "3d" as const,
    forRent: false,
  },
  {
    id: "5",
    image: property2,
    title: "Studio Modern me Vizualizim 3D",
    location: "Prizren, Kosovë",
    price: "€800/muaj",
    beds: 1,
    baths: 1,
    area: 45,
    mediaType: "3d" as const,
    forRent: true,
  },
  {
    id: "6",
    image: property3,
    title: "Vilë Luksoze me Pishinë",
    location: "Prishtinë, Kosovë",
    price: "€450,000",
    beds: 5,
    baths: 4,
    area: 320,
    mediaType: "video" as const,
    forRent: false,
  },
];

export const PropertyGrid = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="mb-4">Prona të Veçanta</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Eksploro një koleksion të zgjedhur të pronave më të mira me vizualizim të avancuar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {properties.map((property, index) => (
            <div 
              key={property.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PropertyCard {...property} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
