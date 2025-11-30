import { Search, Box, MapPin, Home } from "lucide-react";
import { Card } from "@/components/ui/card";

const categories = [
  {
    icon: Search,
    title: "Kërkim i Avancuar",
    description: "Filtro sipas çdo kriteri",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Box,
    title: "Vizualizimi 3D",
    description: "Shiko vetëm prona me 3D",
    color: "from-accent to-blue-500",
  },
  {
    icon: MapPin,
    title: "Qytetet e Kosovës",
    description: "Eksploro sipas qytetit",
    color: "from-primary to-primary/80",
  },
  {
    icon: Home,
    title: "Me Qira / Shitje",
    description: "Filtro sipas llojit",
    color: "from-slate-600 to-slate-700",
  },
];

export const CategorySelector = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container-custom">
        {/* Use 2 columns by default so the grid isn't single-column on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="relative overflow-hidden group cursor-pointer hover-lift border-none shadow-soft hover:shadow-medium transition-all"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              
              <div className="p-6 space-y-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <category.icon className="h-7 w-7 text-white" />
                </div>
                
                <div>
                  <h3 className="text-lg font-bold mb-1 group-hover:text-accent transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
