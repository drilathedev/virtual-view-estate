import { Home, Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-background pt-16">
      <div className="container-custom">
        {/* Editorial heading */}
        <div className="flex flex-col gap-8 border-b border-border pb-12 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight text-foreground lg:text-5xl">
            Discover <span className="font-accent font-normal text-primary">architectural</span> excellence
            <br className="hidden lg:block" /> with expert guidance
          </h2>
          <div className="text-sm text-muted-foreground lg:text-right">
            <p>Drenas, Kosovo</p>
            <p className="mt-1 font-medium text-foreground">+383 49 295 636</p>
          </div>
        </div>

        {/* Links row */}
        <div className="flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-[0.7rem] bg-primary">
              <Home className="h-[18px] w-[18px] text-primary-foreground" strokeWidth={2.4} />
            </span>
            <span className="font-display text-[1.35rem] font-semibold tracking-tight text-foreground">
              Prona<span className="text-primary">360</span>
            </span>
          </Link>

          <nav className="flex flex-wrap items-center gap-x-7 gap-y-3 text-sm font-medium text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-primary">Home</Link>
            <Link to="/properties" className="transition-colors hover:text-primary">Properties</Link>
            <Link to="/properties-map" className="transition-colors hover:text-primary">Map</Link>
            <Link to="/services" className="transition-colors hover:text-primary">Services</Link>
            <Link to="/contact" className="transition-colors hover:text-primary">Contact</Link>
          </nav>

          <div className="flex gap-3">
            <a href="https://www.facebook.com/share/1G9MhN9teb/?mibextid=wwXlfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground/70 transition-colors hover:bg-primary hover:text-white">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="https://instagram.com/prona360rks" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground/70 transition-colors hover:bg-primary hover:text-white">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-border py-6 text-sm text-muted-foreground md:flex-row">
          <p>© 2025 PRONA360. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/contact" className="transition-colors hover:text-primary">Terms &amp; Conditions</Link>
            <Link to="/contact" className="transition-colors hover:text-primary">Privacy Policy</Link>
            <Link to="/login" className="transition-colors hover:text-primary">Admin Sign In</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
