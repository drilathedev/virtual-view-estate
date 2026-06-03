import { MapPin, ArrowRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

export const BestValue = () => {
  return (
    <section className="py-12 lg:py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 items-center gap-8 rounded-[2rem] bg-secondary/60 p-6 lg:grid-cols-2 lg:p-10">
          {/* Map */}
          <div className="relative overflow-hidden rounded-[1.5rem] shadow-soft">
            <iframe
              title="Harta e Kosovës"
              className="h-64 w-full lg:h-80"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.openstreetmap.org/export/embed.html?bbox=20.0%2C42.0%2C21.8%2C43.0&layer=mapnik"
            />
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-full">
              <div className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white shadow-hard">
                <Home className="h-3.5 w-3.5" />
                Shtëpia e ëndrrave
              </div>
              <div className="mx-auto h-3 w-3 -translate-y-1 rotate-45 bg-primary" />
            </div>
          </div>

          {/* Text */}
          <div className="lg:pl-6">
            <h2 className="text-foreground">
              Zbulo prona me <span className="font-accent font-normal">vlerën</span> më të mirë
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Nga hapësirat minimaliste te zgjidhjet kompakte, edhe hapësirat e vogla frymëzojnë ide
              të mëdha — duke të dhënë saktësisht atë që ke nevojë.
            </p>
            <Link to="/properties-map">
              <span className="mt-7 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-transform hover:scale-105">
                <MapPin className="h-4 w-4" />
                Gjej pronat më të afërta
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
