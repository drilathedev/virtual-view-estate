import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Property } from '@/lib/properties';
import { useNavigate } from 'react-router-dom';
import { geocodeLocation } from '@/lib/geocoding';

interface PropertyMapProps {
  properties: Property[];
}

interface PropertyWithCoords extends Property {
  latitude: number;
  longitude: number;
}

export function PropertyMap({ properties }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const navigate = useNavigate();
  const [validProperties, setValidProperties] = useState<PropertyWithCoords[]>([]);
  const [isGeocoding, setIsGeocoding] = useState(false);

  // Geocode locations and filter properties with coordinates
  useEffect(() => {
    const geocodeProperties = async () => {
      setIsGeocoding(true);
      try {
        const propertiesWithCoords: PropertyWithCoords[] = [];

        for (const property of properties) {
          // Skip if already has coordinates
          if (property.latitude && property.longitude) {
            propertiesWithCoords.push(property as PropertyWithCoords);
            continue;
          }

          // Try to geocode the location
          if (property.location) {
            const coords = await geocodeLocation(property.location);
            if (coords) {
              propertiesWithCoords.push({
                ...property,
                latitude: coords.latitude,
                longitude: coords.longitude
              } as PropertyWithCoords);
            }
          }
        }

        setValidProperties(propertiesWithCoords);
      } catch (error) {
        console.error('Error geocoding properties:', error);
        // Fallback: use properties that already have coordinates
        const withCoords = properties.filter(
          p => p.latitude && p.longitude
        ) as PropertyWithCoords[];
        setValidProperties(withCoords);
      } finally {
        setIsGeocoding(false);
      }
    };

    geocodeProperties();
  }, [properties]);

  // Initialize and update map
  useEffect(() => {
    if (!mapRef.current) return;

    const defaultCenter: [number, number] = [42.6026, 21.1584]; // Prishtina

    // Create map if it doesn't exist
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView(defaultCenter, 7);

      // Clean, modern basemap (CartoDB Voyager)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(mapInstanceRef.current);
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    if (validProperties.length === 0) return;

    // Compact price label, e.g. "€185K", "€2.5K", "€850"
    const formatPriceShort = (price: string) => {
      const n = parseFloat(String(price).replace(/[^\d.]/g, ''));
      if (!isFinite(n) || n <= 0) return String(price);
      if (n >= 1000) {
        const k = n / 1000;
        return '€' + (k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)) + 'K';
      }
      return '€' + Math.round(n);
    };

    // Add markers for each property
    const bounds = L.latLngBounds([]);

    validProperties.forEach(property => {
      // Price-tag pin (Airbnb/Zillow style)
      const priceIcon = L.divIcon({
        html: `<div class="pp-wrap">
            <div class="pp-pill">${formatPriceShort(property.price)}</div>
            <div class="pp-tip"></div>
          </div>`,
        className: 'price-pin',
        iconSize: [64, 38],
        iconAnchor: [32, 38],
        popupAnchor: [0, -40]
      });

      const marker = L.marker(
        [property.latitude!, property.longitude!],
        { icon: priceIcon }
      ).addTo(map);

      // Create popup content
      const popupContent = `
        <div class="w-64 bg-white">
          <div class="relative">
            ${property.image ? `<img src="${property.image}" alt="${property.title}" class="w-full h-36 object-cover" />` : ''}
            <span class="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-[#d7622d]">${property.forRent ? 'Me Qira' : 'Në Shitje'}</span>
          </div>
          <div class="p-3.5">
            <h3 class="font-bold text-[15px] text-gray-900 leading-snug mb-1">${property.title}</h3>
            <p class="text-xs text-gray-500 mb-2.5">${property.location}</p>
            <div class="flex items-center gap-3 text-xs text-gray-600 mb-3">
              ${property.beds > 0 ? `<span>🛏 ${property.beds}</span>` : ''}
              ${property.baths > 0 ? `<span>🛁 ${property.baths}</span>` : ''}
              ${property.area > 0 ? `<span>📐 ${property.area} m²</span>` : ''}
            </div>
            <div class="flex items-center justify-between">
              <span class="font-extrabold text-lg text-[#d7622d]">${property.price.startsWith('€') ? property.price : '€' + property.price}</span>
              <button id="btn-${property.id}" class="rounded-full bg-[#0f1614] hover:bg-[#1a8a8a] text-white text-xs font-semibold py-2 px-4 transition-colors">
                Detajet
              </button>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 280, closeButton: true });

      // Add click handler for the button
      marker.on('popupopen', () => {
        const button = document.getElementById(`btn-${property.id}`);
        if (button) {
          button.addEventListener('click', () => {
            navigate(`/property/${property.id}`);
          });
        }
      });

      markersRef.current.push(marker);
      bounds.extend([property.latitude!, property.longitude!]);
    });

    // Fit map to bounds
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [validProperties, navigate]);

  return (
    <div className="w-full h-full">
      {isGeocoding && (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <p className="text-gray-600 text-lg mb-2">Po ngarkohen lokacionet...</p>
            <p className="text-gray-500 text-sm">Duke kërkuar koordinata për pronësitë</p>
          </div>
        </div>
      )}
      {!isGeocoding && validProperties.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <p className="text-gray-600 text-lg mb-2">Nuk ka pronësi për të shfaqur në hartë</p>
            <p className="text-gray-500 text-sm">Nuk u arrit të gjeodaten lokacionet e pronësive</p>
          </div>
        </div>
      ) : !isGeocoding ? (
        <div
          ref={mapRef}
          className="w-full h-full rounded-lg"
          style={{ minHeight: '100%' }}
        />
      ) : null}
    </div>
  );
}
