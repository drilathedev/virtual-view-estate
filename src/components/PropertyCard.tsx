import { Bed, Bath, Square, ArrowUpRight, Box, Video } from "lucide-react";
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
  mediaType: "photo" | "video" | "3d" | "land" | string;
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
    <Link to={`/property/${id}`} className="group block focus:outline-none">
      <article className="overflow-hidden rounded-[1.6rem] border border-border/70 bg-card p-3 shadow-soft transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-medium">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.2rem] bg-muted/60">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Top Badges */}
          <div className="absolute left-3 top-3 flex items-center gap-1.5">
            <span className="rounded-full bg-background/95 border border-border/60 px-3 py-1 text-[11px] font-bold tracking-wide uppercase text-foreground shadow-sm backdrop-blur-md">
              {forRent ? "For Rent" : "For Sale"}
            </span>

            {mediaType === "3d" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-foreground text-background px-2.5 py-1 text-[11px] font-semibold shadow-sm backdrop-blur-md">
                <Box className="h-3 w-3" />
                360° Tour
              </span>
            )}
            {mediaType === "video" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-foreground/85 text-background px-2.5 py-1 text-[11px] font-semibold shadow-sm backdrop-blur-md">
                <Video className="h-3 w-3" />
                Video
              </span>
            )}
          </div>

          {/* Hover Floating Action Button */}
          <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background shadow-medium opacity-0 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-105">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>

        {/* Content Details */}
        <div className="px-2 pt-4 pb-2">
          {/* Architectural Specs */}
          <div className="flex items-center gap-3.5 text-xs font-medium text-muted-foreground">
            {mediaType !== "land" && (
              <>
                <span className="inline-flex items-center gap-1.5">
                  <Bed className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{beds} <span className="hidden sm:inline">Beds</span></span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Bath className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{baths} <span className="hidden sm:inline">Baths</span></span>
                </span>
              </>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Square className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{mediaType === "land" ? `${area} ha` : `${area} m²`}</span>
            </span>
          </div>

          {/* Title */}
          <h3 className="mt-2.5 line-clamp-1 text-[1.1rem] font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
            {title}
          </h3>

          {/* Price & Location */}
          <div className="mt-2 flex items-baseline justify-between gap-3 border-t border-border/50 pt-2.5">
            <span className="font-display text-[1.15rem] font-bold text-foreground">
              {price.startsWith("€") ? price : `€${price}`}
              {forRent && <span className="text-xs font-normal text-muted-foreground">/mo</span>}
            </span>
            <span className="truncate text-xs font-medium text-muted-foreground">
              {location}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};
