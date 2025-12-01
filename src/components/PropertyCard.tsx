import { MapPin, Bed, Bath, Square, Video, Camera, Box } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

const mediaIcons = {
  photo: Camera,
  video: Video,
  "3d": Box,
  land: Box,
};

const mediaColors = {
  photo: "bg-blue-500",
  video: "bg-purple-500",
  "3d": "bg-accent",
  land: "bg-green-700",
};

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
  forRent = false 
}: PropertyCardProps) => {
  const MediaIcon = mediaIcons[mediaType];
  return (
      <Link to={`/property/${id}`}>
        <Card className="overflow-hidden group cursor-pointer hover-lift border-none shadow-soft hover:shadow-hard transition-all">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {/* Media Type Badge */}
            <div className={`absolute top-4 right-4 ${mediaColors[mediaType]} text-white px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg`}>
              {MediaIcon ? <MediaIcon className="h-4 w-4" /> : null}
              <span className="text-xs font-semibold uppercase">{mediaType}</span>
            </div>
            {/* Rent/Sale Badge */}
            {forRent && (
              <Badge className="absolute top-4 left-4 bg-green-500 text-white border-none">
                Me Qira
              </Badge>
            )}
          </div>
          <div className="p-5 space-y-4">
            <div>
              <h3 className="font-bold text-xl mb-2 group-hover:text-accent transition-colors line-clamp-1">
                {title}
              </h3>
              <div className="flex items-center text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                {location}
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{beds}</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{baths}</span>
              </div>
              <div className="flex items-center gap-1">
                <Square className="h-4 w-4" />
                <span>{mediaType === 'land' ? `${area} ha` : `${area} m²`}</span>
              </div>
            </div>
            <div className="pt-4 border-t">
              <div className="text-2xl font-bold text-primary">€ {price}</div>
            </div>
          </div>
        </Card>
      </Link>
  );
};
