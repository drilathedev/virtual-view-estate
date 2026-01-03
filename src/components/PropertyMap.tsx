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

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(mapInstanceRef.current);
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    if (validProperties.length === 0) return;

    // Create custom icon
    const propertyIcon = L.divIcon({
      html: `<div class="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full border-2 border-white shadow-lg cursor-pointer hover:bg-blue-600 transition-colors">
        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.5 1.5H3.75A2.25 2.25 0 001.5 3.75v12.5A2.25 2.25 0 003.75 18.5h12.5a2.25 2.25 0 002.25-2.25V9.5M18.5 1.5v6h-6"/>
        </svg>
      </div>`,
      className: 'property-marker',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16]
    });

    // Add markers for each property
    const bounds = L.latLngBounds([]);

    validProperties.forEach(property => {
      const marker = L.marker(
        [property.latitude!, property.longitude!],
        { icon: propertyIcon }
      ).addTo(map);

      // Create popup content
      const popupContent = `
        <div class="p-0 w-64">
          <div class="bg-white rounded-lg overflow-hidden">
            ${
              property.image
                ? `<img src="${property.image}" alt="${property.title}" class="w-full h-40 object-cover" />`
                : ''
            }
            <div class="p-4">
              <h3 class="font-bold text-lg text-gray-800 mb-1">${property.title}</h3>
              <p class="text-sm text-gray-600 mb-2">📍 ${property.location}</p>
              <p class="text-blue-600 font-bold text-lg mb-3">${property.price}</p>

              ${
                property.beds || property.baths || property.area
                  ? `<div class="flex gap-3 mb-3 text-sm text-gray-700">
                      ${property.beds > 0 ? `<span>🛏️ ${property.beds} dhoma</span>` : ''}
                      ${property.baths > 0 ? `<span>🚿 ${property.baths} tualet</span>` : ''}
                      ${property.area > 0 ? `<span>📐 ${property.area} m²</span>` : ''}
                    </div>`
                  : ''
              }

              ${
                property.type
                  ? `<p class="text-xs bg-blue-100 text-blue-700 inline-block px-2 py-1 rounded mb-3">${property.type}</p>`
                  : ''
              }

              <button id="btn-${property.id}" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors">
                Shiko detajet
              </button>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 300 });

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
