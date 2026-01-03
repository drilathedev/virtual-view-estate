/**
 * Utility functions for geographic coordinates and location handling
 */

export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Geocode a location name to coordinates
 * First tries predefined Kosovo locations, then uses Nominatim API
 */
export async function geocodeLocation(locationName: string): Promise<Coordinates | null> {
  if (!locationName || locationName.trim() === '') {
    return null;
  }

  const trimmed = locationName.trim();
  
  // First, check predefined locations
  const predefined = KOSOVO_LOCATIONS.find(
    loc => loc.name.toLowerCase().includes(trimmed.toLowerCase()) ||
           trimmed.toLowerCase().includes(loc.name.toLowerCase())
  );
  
  if (predefined) {
    return {
      latitude: predefined.latitude,
      longitude: predefined.longitude
    };
  }

  // Try Nominatim API (free, no key needed) - search in Kosovo
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(trimmed + ', Kosovo')}&format=json&limit=1`,
      {
        headers: {
          'User-Agent': 'Prona360-App'
        }
      }
    );
    
    if (!response.ok) {
      console.warn('Nominatim API error:', response.status);
      return null;
    }

    const results = await response.json();
    
    if (results && results.length > 0) {
      const result = results[0];
      const lat = parseFloat(result.lat);
      const lon = parseFloat(result.lon);
      
      if (isValidCoordinates(lat, lon)) {
        return { latitude: lat, longitude: lon };
      }
    }

    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
}

export interface KosovoLocation {
  name: string;
  latitude: number;
  longitude: number;
}

/**
 * Common locations in Kosovo with their coordinates
 * Useful as reference for adding properties
 */
export const KOSOVO_LOCATIONS: KosovoLocation[] = [
  { name: 'Prishtina (Center)', latitude: 42.6026, longitude: 21.1584 },
  { name: 'Prishtina (Airport)', latitude: 42.5722, longitude: 21.0372 },
  { name: 'Drena', latitude: 42.6400, longitude: 20.9500 },
  { name: 'Prizren', latitude: 42.2133, longitude: 20.7455 },
  { name: 'Peja', latitude: 42.6624, longitude: 20.2958 },
  { name: 'Gjakova', latitude: 42.4767, longitude: 20.4578 },
  { name: 'Mitrovica', latitude: 42.8859, longitude: 20.8652 },
  { name: 'Ferizaj', latitude: 42.3740, longitude: 21.2947 },
  { name: 'Vushtrri', latitude: 42.7461, longitude: 21.0644 },
  { name: 'Gjilan', latitude: 42.4628, longitude: 21.4700 },
  { name: 'Kçitek', latitude: 42.5206, longitude: 21.3622 },
  { name: 'Suva Reka', latitude: 42.3206, longitude: 20.9206 },
];

/**
 * Validates if coordinates are within valid ranges
 * @param latitude - Latitude value (-90 to 90)
 * @param longitude - Longitude value (-180 to 180)
 * @returns true if coordinates are valid
 */
export function isValidCoordinates(
  latitude: number | undefined,
  longitude: number | undefined
): boolean {
  if (latitude === undefined || longitude === undefined) {
    return false;
  }

  return (
    typeof latitude === 'number' &&
    typeof longitude === 'number' &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
}

/**
 * Calculates distance between two coordinates using Haversine formula
 * Returns distance in kilometers
 * @param lat1 - First latitude
 * @param lon1 - First longitude
 * @param lat2 - Second latitude
 * @param lon2 - Second longitude
 * @returns Distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(value: number): number {
  return (value * Math.PI) / 180;
}

/**
 * Finds the nearest Kosovo location to given coordinates
 * @param latitude - Target latitude
 * @param longitude - Target longitude
 * @returns The nearest location and distance
 */
export function findNearestLocation(
  latitude: number,
  longitude: number
): { location: KosovoLocation; distance: number } | null {
  if (!isValidCoordinates(latitude, longitude)) {
    return null;
  }

  let nearest = KOSOVO_LOCATIONS[0];
  let minDistance = calculateDistance(
    latitude,
    longitude,
    nearest.latitude,
    nearest.longitude
  );

  for (const location of KOSOVO_LOCATIONS) {
    const distance = calculateDistance(
      latitude,
      longitude,
      location.latitude,
      location.longitude
    );
    if (distance < minDistance) {
      minDistance = distance;
      nearest = location;
    }
  }

  return { location: nearest, distance: minDistance };
}

/**
 * Formats coordinates for display
 * @param latitude - Latitude value
 * @param longitude - Longitude value
 * @param precision - Number of decimal places (default: 4)
 * @returns Formatted coordinate string
 */
export function formatCoordinates(
  latitude: number | undefined,
  longitude: number | undefined,
  precision: number = 4
): string {
  if (!isValidCoordinates(latitude, longitude)) {
    return 'Invalid coordinates';
  }

  const lat = (latitude as number).toFixed(precision);
  const lon = (longitude as number).toFixed(precision);
  return `${lat}, ${lon}`;
}

/**
 * Parses coordinate string to numbers
 * Supports formats like "42.6026, 21.1584" or "42.6026 21.1584"
 * @param coordinateString - String containing coordinates
 * @returns Object with latitude and longitude, or null if invalid
 */
export function parseCoordinates(
  coordinateString: string
): Coordinates | null {
  const trimmed = coordinateString.trim();

  // Try comma-separated format
  let parts = trimmed.split(',');
  if (parts.length !== 2) {
    // Try space-separated format
    parts = trimmed.split(/\s+/);
  }

  if (parts.length !== 2) {
    return null;
  }

  const latitude = parseFloat(parts[0].trim());
  const longitude = parseFloat(parts[1].trim());

  if (isValidCoordinates(latitude, longitude)) {
    return { latitude, longitude };
  }

  return null;
}

/**
 * Generates a Google Maps URL for given coordinates
 * @param latitude - Latitude value
 * @param longitude - Longitude value
 * @returns Google Maps URL
 */
export function getGoogleMapsUrl(
  latitude: number | undefined,
  longitude: number | undefined
): string | null {
  if (!isValidCoordinates(latitude, longitude)) {
    return null;
  }

  return `https://maps.google.com/?q=${latitude},${longitude}`;
}

/**
 * Generates an OpenStreetMap URL for given coordinates
 * @param latitude - Latitude value
 * @param longitude - Longitude value
 * @param zoom - Zoom level (default: 15)
 * @returns OpenStreetMap URL
 */
export function getOpenStreetMapUrl(
  latitude: number | undefined,
  longitude: number | undefined,
  zoom: number = 15
): string | null {
  if (!isValidCoordinates(latitude, longitude)) {
    return null;
  }

  return `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}&zoom=${zoom}`;
}
