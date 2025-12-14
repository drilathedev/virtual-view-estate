import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Home } from "lucide-react";

const categories = [
  { key: 'apartament', title: 'Apartament', description: 'Shfaq vetëm apartamentet', color: 'from-blue-500 to-blue-600' },
  { key: 'shtepi', title: 'Shtëpi', description: 'Shfaq vetëm shtëpitë', color: 'from-green-500 to-green-600' },
  { key: 'vile', title: 'Vilà / Vilë', description: 'Shfaq vetëm vilat', color: 'from-purple-500 to-purple-600' },
  { key: 'penthouse', title: 'Penthouse', description: 'Shfaq vetëm penthouset', color: 'from-orange-500 to-orange-600' },
];

export const CategorySelector = () => {
  const navigate = useNavigate();

  const onSelect = (key: string) => {
    // Navigate to properties page with `type` query param
    navigate(`/properties?type=${encodeURIComponent(key)}`);
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Card
              key={category.key}
              onClick={() => onSelect(category.key)}
              className="relative overflow-hidden group cursor-pointer hover-lift border-none shadow-soft hover:shadow-medium transition-all"
              style={{ animationDelay: `${index * 0.06}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              <div className="p-6 space-y-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Home className="h-7 w-7 text-white" />
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
