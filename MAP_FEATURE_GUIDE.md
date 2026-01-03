# Interactive Property Map Feature

## Overview

The Virtual View Estate application now includes an interactive map that displays all properties at their exact geographic locations. Users can explore properties visually and access detailed information through marker popups.

## Features

### 1. **Interactive Map Display**
- Uses OpenStreetMap for base map tiles
- Displays all properties as colored markers
- Properties are centered automatically on the map based on their coordinates
- Fully responsive design that works on desktop and mobile

### 2. **Marker Clustering**
- Properties in close proximity are automatically grouped into clusters
- Clicking on a cluster zooms in to show individual properties
- Improves performance when displaying many properties

### 3. **Property Information Popups**
- Click any marker to see a popup with property details:
  - Property image
  - Title and location
  - Price
  - Number of bedrooms, bathrooms, and area
  - Property type (apartment, house, villa, etc.)
  - "View Details" button to navigate to full property page

### 4. **Map Controls**
- Zoom in/out with mouse wheel or buttons
- Pan the map by dragging
- Automatic bounds fitting to show all properties

## Accessing the Map

### For Users
1. Navigate to the main website
2. Click **"Harta"** in the navigation menu
3. The interactive map will load showing all listed properties

### URL
The map is accessible at: `/properties-map`

## Admin Panel: Adding Properties with Coordinates

### Setting Geographic Coordinates

When creating or editing a property in the Admin panel, you'll find two new fields:

#### **Gjerësia Gjeografike (Latitude)**
- The north-south position on Earth
- Example values:
  - **Prishtina:** 42.6026
  - **Drena:** 42.6400
  - **Prizren:** 42.2133

#### **Gjatësia Gjeografike (Longitude)**
- The east-west position on Earth
- Example values:
  - **Prishtina:** 21.1584
  - **Drena:** 20.9500
  - **Prizren:** 20.7455

### How to Find Coordinates

You can find coordinates for any location using:

1. **Google Maps**
   - Open Google Maps
   - Right-click on the location
   - Coordinates appear at the top of the context menu
   - Click to copy

2. **OpenStreetMap**
   - Visit openstreetmap.org
   - Search for the location
   - Coordinates appear in the sidebar

3. **Coordinates.io**
   - Visit coordinates.io
   - Search for the location
   - Copy the latitude/longitude

### Example Kosovo Locations

| Location | Latitude | Longitude |
|----------|----------|-----------|
| Prishtina (Center) | 42.6026 | 21.1584 |
| Drena | 42.6400 | 20.9500 |
| Prizren | 42.2133 | 20.7455 |
| Peja | 42.6624 | 20.2958 |
| Gjakova | 42.4767 | 20.4578 |
| Mitrovica | 42.8859 | 20.8652 |
| Ferizaj | 42.3740 | 21.2947 |

## Technical Implementation

### New Components

#### **PropertyMap Component** (`src/components/PropertyMap.tsx`)
- Main map display component
- Handles marker rendering and clustering
- Manages popup interactions
- Automatically fits bounds to show all properties

### Modified Files

1. **Property Interface** (`src/lib/properties.ts`)
   - Added `latitude?: number` field
   - Added `longitude?: number` field

2. **Properties Page** (`src/pages/PropertiesMap.tsx`)
   - New dedicated page for map view
   - Handles property loading and error states

3. **App Router** (`src/App.tsx`)
   - Added new route: `/properties-map`

4. **Header Navigation** (`src/components/Header.tsx`)
   - Added "Harta" (Map) link to main and mobile navigation

5. **Admin Panel** (`src/pages/Admin.tsx`)
   - Added latitude/longitude input fields
   - Help text with example coordinates
   - Fields are optional (for backward compatibility)

### Dependencies Added

```json
{
  "leaflet": "^1.9.4",
  "react-leaflet": "^4.2.3",
  "leaflet-markercluster": "^1.5.1",
  "react-helmet": "^6.1.0"
}
```

## Display Behavior

### Properties Without Coordinates
- Properties without latitude/longitude coordinates are **not** displayed on the map
- A message appears: "Nuk ka pronësi për të shfaqur në hartë" (No properties to display on map)
- Properties can still be viewed in the regular properties list

### Map Initialization
- Default center: Prishtina (42.6026, 21.1584)
- Initial zoom level: 7 (shows entire Kosovo)
- Map automatically adjusts to show all properties with coordinates

## Styling

### Marker Design
- **Color:** Blue with white icon
- **Hover effect:** Changes to darker blue
- **Size:** 32x32 pixels
- **Icon:** House/property symbol

### Popup Styling
- Clean white background with rounded corners
- Image preview of property
- All key information displayed
- "Shiko detajet" (View Details) button for full property page

## Browser Support

The map works on:
- Chrome/Edge (latest versions)
- Firefox (latest versions)
- Safari (latest versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Notes

- Marker clustering automatically engages when many properties are close together
- Map performs well with 50+ properties
- Initial load depends on:
  - Number of properties with coordinates
  - Network speed for map tiles and property data

## Future Enhancements

Potential features for future updates:
- Search/filter properties on the map
- Custom marker icons by property type
- Distance/radius search
- Property comparison from map view
- Heatmap visualization of property density
- Street View integration
- Favorites/bookmarked properties on map

## Troubleshooting

### Map Not Loading
1. Check browser console for errors (F12)
2. Verify internet connection
3. Clear browser cache and reload
4. Try a different browser

### Markers Not Showing
1. Verify properties have latitude/longitude coordinates
2. Check coordinates are valid (lat: -90 to 90, lon: -180 to 180)
3. Ensure coordinates are in decimal format (not DMS)

### Popups Not Displaying
1. Ensure property images have valid URLs
2. Check browser has JavaScript enabled
3. Clear browser cache

## Support

For issues or feature requests regarding the map functionality, contact the development team.
