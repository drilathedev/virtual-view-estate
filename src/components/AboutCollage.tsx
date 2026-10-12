import { Play, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import house1 from "@/assets/property-1.jpg";
import house2 from "@/assets/property-2.jpg";

const stats = [
  { value: "100%", label: "Satisfied Clients" },
  { value: "500+", label: "Properties Sold" },
  { value: "150+", label: "Cities & Regions" },
  { value: "2,000+", label: "Positive Reviews" },
];

export const AboutCollage = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-custom space-y-12">
        {/* Heading row */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <h2 className="max-w-md text-foreground">
            Your next home should feel inspiring and <span className="font-accent font-normal text-primary">timeless</span>.
          </h2>
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-soft">
              <Play className="h-5 w-5 fill-white" />
            </span>
            <p className="max-w-[240px] text-sm text-muted-foreground">
              Every listing features 3D walkthroughs, unique architectural value, and prime locations.
            </p>
          </div>
        </div>

        {/* Collage */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Large image */}
          <div className="lg:col-span-6 overflow-hidden rounded-[1.75rem] shadow-soft">
            <img src={house1} alt="Luxury Residence" className="h-72 w-full object-cover lg:h-full" />
          </div>

          {/* Sage card */}
          <div className="lg:col-span-3 flex flex-col justify-between rounded-[1.75rem] bg-secondary p-7 shadow-soft">
            <div>
              <h3 className="text-2xl font-semibold leading-tight text-foreground">
                Thoughtful design unlocks limitless potential.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                With smart architectural planning and modern finishes, discover spaces crafted for elegance, comfort, and enduring value.
              </p>
            </div>
            <Link to="/properties">
              <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-primary shadow-soft transition-transform hover:scale-105">
                Explore Details
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>

          {/* Pricing image card */}
          <div className="lg:col-span-3 relative overflow-hidden rounded-[1.75rem] shadow-soft">
            <img src={house2} alt="Contemporary Villa" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="relative z-10 flex h-full min-h-[288px] flex-col justify-end p-6 text-white">
              <p className="text-xs text-white/80">Starting from</p>
              <p className="text-2xl font-bold">€256K</p>
              <Link to="/properties">
                <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-primary shadow-soft transition-transform hover:scale-105">
                  View Properties
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Caption + arrows */}
        <div className="flex items-center justify-between border-b border-border pb-6">
          <p className="max-w-md text-sm text-muted-foreground">
            Whether designing a cozy sanctuary for relaxation or acquiring a prestigious modern estate.
          </p>
          <div className="flex gap-2">
            <Link to="/properties" className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/60 transition-colors hover:bg-secondary">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <Link to="/properties" className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/60 transition-colors hover:bg-secondary">
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-y-8 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className={`px-2 ${i > 0 ? "lg:border-l lg:border-border" : ""}`}>
              <div className="font-display text-4xl font-semibold text-foreground lg:text-5xl">{s.value}</div>
              <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
