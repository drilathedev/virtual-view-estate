import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import bg from "@/assets/property-2.jpg";

export const CTASection = () => {
  return (
    <section className="py-8 lg:py-12">
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-[2rem]">
          <img src={bg} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[#1d2a14]/72" />
          <div className="relative z-10 flex flex-col items-center px-6 py-16 text-center text-white lg:py-24">
            <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight lg:text-5xl">
              Gati ta kthesh pronën e ëndrrave në <span className="font-accent font-normal">realitet</span>?
            </h2>
            <p className="mt-4 max-w-md text-sm text-white/75">
              Eksploro një përzgjedhje të kuratuar pronash që përputhen me vizionin dhe buxhetin tënd.
            </p>
            <Link to="/contact">
              <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary transition-transform hover:scale-105">
                Fillo tani
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
