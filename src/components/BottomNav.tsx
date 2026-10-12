import { Home, LayoutGrid, Heart, MapPin, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const tabs = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/properties", icon: LayoutGrid, label: "Properties" },
  { to: "/properties-map", icon: MapPin, label: "Map" },
  { to: "/contact", icon: User, label: "Contact" },
];

export const BottomNav = () => {
  const { pathname } = useLocation();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 lg:hidden">
      <div className="mx-auto mb-3 flex w-[calc(100%-2rem)] max-w-md items-center justify-between rounded-[1.75rem] border border-border/70 bg-card/95 px-3 py-2 shadow-hard backdrop-blur-lg">
        {tabs.map((t) => {
          const active = pathname === t.to;
          return (
            <Link
              key={t.to}
              to={t.to}
              className="flex flex-1 flex-col items-center gap-1 py-0.5"
              aria-label={t.label}
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-2xl transition-all ${
                  active ? "bg-primary text-primary-foreground shadow-soft" : "text-foreground/60 hover:text-foreground"
                }`}
              >
                <t.icon className="h-5 w-5" strokeWidth={active ? 2.4 : 2} />
              </span>
              <span className={`text-[11px] font-semibold tracking-tight ${active ? "text-primary" : "text-foreground/50"}`}>
                {t.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
