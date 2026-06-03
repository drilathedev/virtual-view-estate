import { Home, LayoutGrid, Heart, MapPin, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const tabs = [
  { to: "/", icon: Home, label: "Ballina" },
  { to: "/properties", icon: LayoutGrid, label: "Prona" },
  { to: "/properties-map", icon: MapPin, label: "Harta" },
  { to: "/contact", icon: User, label: "Profili" },
];

export const BottomNav = () => {
  const { pathname } = useLocation();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 lg:hidden">
      <div className="mx-auto mb-3 flex w-[calc(100%-2rem)] max-w-md items-center justify-between rounded-[1.75rem] border border-border/60 bg-card px-3 py-2.5 shadow-medium">
        {tabs.map((t) => {
          const active = pathname === t.to;
          return (
            <Link
              key={t.to}
              to={t.to}
              className="flex flex-1 flex-col items-center gap-1"
              aria-label={t.label}
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-all ${
                  active ? "bg-primary text-primary-foreground shadow-soft" : "text-foreground/50"
                }`}
              >
                <t.icon className="h-5 w-5" strokeWidth={active ? 2.4 : 2} />
              </span>
              <span className={`text-[10px] font-medium ${active ? "text-primary" : "text-foreground/40"}`}>
                {t.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
