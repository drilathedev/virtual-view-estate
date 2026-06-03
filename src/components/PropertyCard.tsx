import { Bed, Bath, Square, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

interface PropertyCardProps {
  id: string;
  image: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  area: number;
  mediaType: "photo" | "video" | "3d";
  forRent?: boolean;
}

export const PropertyCard = ({
  id,
  image,
  title,
  location,
  price,
  beds,
  baths,
  area,
  mediaType,
  forRent = false,
}: PropertyCardProps) => {
  return (
    <Link to={`/property/${id}`} className="group block">
      <article className="overflow-hidden rounded-[1.5rem] bg-card p-2.5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-medium">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.1rem] bg-muted">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-primary shadow-soft backdrop-blur">
            {forRent ? "Me Qira" : "Në Shitje"}
          </span>
          <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white opacity-0 shadow-soft transition-opacity duration-300 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        {/* Body */}
        <div className="px-2.5 pb-2 pt-4">
          {/* Specs */}
          <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
            {mediaType !== "land" && (
              <>
                <span className="flex items-center gap-1.5">
                  <Bed className="h-4 w-4 text-primary" />
                  {beds} Dhoma
                </span>
                <span className="flex items-center gap-1.5">
                  <Bath className="h-4 w-4 text-primary" />
                  {baths} Banjo
                </span>
              </>
            )}
            <span className="flex items-center gap-1.5">
              <Square className="h-4 w-4 text-primary" />
              {mediaType === "land" ? `${area} ha` : `${area} m²`}
            </span>
          </div>

          <h3 className="mt-2.5 line-clamp-1 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
            {title}
          </h3>

          <div className="mt-1.5 flex items-baseline gap-3">
            <span className="text-lg font-bold text-foreground">
              €{price}
              {forRent && <span className="text-sm font-normal text-muted-foreground">/muaj</span>}
            </span>
            <span className="truncate text-xs text-muted-foreground">{location}</span>
          </div>
        </div>
      </article>
    </Link>
  );
};
