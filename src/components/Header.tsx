import { Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold gradient-text">
              PRONA360
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium hover:text-accent transition-colors">
              Ballina
            </Link>
            <Link to="/" className="text-sm font-medium hover:text-accent transition-colors">
              Prona
            </Link>
            <Link to="/" className="text-sm font-medium hover:text-accent transition-colors">
              Shërbime
            </Link>
            <Link to="/" className="text-sm font-medium hover:text-accent transition-colors">
              Kontakt
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="hero" size="sm">
              Listo Pronën
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
