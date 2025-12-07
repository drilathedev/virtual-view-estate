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
  photo: "bg-blue-600",
  video: "bg-purple-600",
  "3d": "bg-cyan-600",
  land: "bg-emerald-600",
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
    <Link to={`/property/${id}`} className="group block">
      <Card className="overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 rounded-lg bg-white">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Media Type Badge */}
          <div className={`absolute top-3 right-3 ${mediaColors[mediaType]} text-white px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 shadow`}>
            {MediaIcon ? <MediaIcon className="h-3.5 w-3.5" /> : null}
            <span className="uppercase">{mediaType}</span>
          </div>
          
          {/* Rent/Sale Badge */}
          {forRent && (
            <Badge className="absolute top-3 left-3 bg-emerald-600 text-white border-none px-2.5 py-1 text-xs font-medium">
              Me Qira
            </Badge>
          )}
        </div>
        
        {/* Content */}
        <div className="p-5 space-y-3 bg-white">
          <div className="space-y-1.5">
            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
              {title}
            </h3>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="line-clamp-1">{location}</span>
            </div>
          </div>
          
          {/* Features */}
          <div className="flex items-center justify-between text-sm text-gray-600 py-3 border-t border-gray-100">
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
          
          {/* Price */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                €{price}
              </div>
              {forRent && <span className="text-xs text-gray-500">/muaj</span>}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
