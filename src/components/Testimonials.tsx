import { Quote, ArrowRight } from "lucide-react";
import { useState } from "react";
import client from "@/assets/property-1.jpg";

const reviews = [
  {
    quote:
      "Working with this team was a true pleasure. They understood our requirements and helped us secure an extraordinary property that exceeded our expectations. Highly recommended!",
    name: "Sajbur Rahman",
    role: "Product Designer",
  },
  {
    quote:
      "The entire process was transparent and remarkably efficient. The 360° virtual tour enabled me to explore every detail and make a confident decision without wasting hours on commute.",
    name: "Arta Hoxha",
    role: "Business Owner",
  },
  {
    quote:
      "Found our dream family home within weeks. Their advisors were always available to assist, and every legal and logistical step was handled with supreme professionalism.",
    name: "Besim Krasniqi",
    role: "Senior Engineer",
  },
];

export const Testimonials = () => {
  const [i, setI] = useState(0);
  const r = reviews[i];

  return (
    <section className="py-16 lg:py-24">
      <div className="container-custom">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <h2 className="max-w-xs text-foreground">
            What our <span className="font-accent font-normal text-primary">clients say</span> about us
          </h2>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              {[0, 1, 2, 3].map((n) => (
                <span
                  key={n}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-primary/15 text-xs font-bold text-primary"
                >
                  {["A", "B", "D", "E"][n]}
                </span>
              ))}
            </div>
            <div className="text-sm">
              <div className="font-semibold text-foreground">Over 500+</div>
              <div className="text-muted-foreground">Satisfied Client Reviews</div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-5">
          {/* Photo */}
          <div className="overflow-hidden rounded-[1.75rem] shadow-soft lg:col-span-2">
            <img src={client} alt={r.name} className="h-72 w-full object-cover lg:h-full" />
          </div>

          {/* Quote card */}
          <div className="relative flex flex-col justify-between rounded-[1.75rem] bg-leaf p-8 text-white shadow-soft lg:col-span-3 lg:p-12">
            <Quote className="h-10 w-10 fill-white/20 text-white/20" />
            <p className="my-6 font-display text-xl font-medium leading-relaxed lg:text-2xl">
              "{r.quote}"
            </p>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-lg font-semibold">{r.name}</div>
                <div className="text-sm text-white/70">{r.role}</div>
              </div>
              <button
                onClick={() => setI((i + 1) % reviews.length)}
                aria-label="Next review"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white transition-all hover:bg-white/25 active:scale-95"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
