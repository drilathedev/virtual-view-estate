# Quick Start: Interactive Property Map

## For End Users

### View the Map
1. Go to your Virtual View Estate website
2. Click **"Harta"** in the menu
3. Explore properties on the interactive map

### Use the Map
- **Zoom:** Scroll with mouse wheel or use +/- buttons
- **Pan:** Click and drag the map
- **View Property:** Click any marker to see details
- **Go to Details:** Click "Shiko detajet" button in the popup

---

## For Admins: Adding Property Coordinates

### Step 1: Find the Coordinates

**Option A: Google Maps**
1. Open google.com/maps
2. Search for the property location
3. Right-click on the map
4. Copy the coordinates (format: 42.6026, 21.1584)

**Option B: OpenStreetMap**
1. Visit openstreetmap.org
2. Search for the location
3. Click the location
4. Coordinates show in the left panel

### Step 2: Add to Property

In the Admin panel, when creating/editing a property:

**Gjerësia Gjeografike (Latitude):** First number
```
Prishtina: 42.6026
Drena: 42.6400
Prizren: 42.2133
```

**Gjatësia Gjeografike (Longitude):** Second number
```
Prishtina: 21.1584
Drena: 20.9500
Prizren: 20.7455
```

### Step 3: Save
Save the property. It will now appear on the map!

---

## Common Kosovo Coordinates

| City | Latitude | Longitude |
|------|----------|-----------|
| Prishtina | 42.6026 | 21.1584 |
| Drena | 42.6400 | 20.9500 |
| Prizren | 42.2133 | 20.7455 |
| Peja | 42.6624 | 20.2958 |
| Gjakova | 42.4767 | 20.4578 |
| Mitrovica | 42.8859 | 20.8652 |

---

## Tips

✅ **Always use decimal format** (42.6026, not 42°36'09.4")

❌ **Don't forget the minus sign** for longitude (West = negative)

✅ **Leave blank if you don't have coordinates**

❌ **Don't mix up** latitude (N/S) and longitude (E/W)

✅ **Double-check your numbers** - even small errors move the marker far away

---

## Troubleshooting

**Map not showing any properties?**
- Check that properties have both latitude AND longitude set
- Verify coordinates are realistic for Kosovo (between 42°-42.9° N, 20°-21.5° E)

**Marker in wrong location?**
- Double-check the coordinates you entered
- Swap latitude/longitude if they seem reversed

**Popup not showing?**
- Ensure property has an image URL
- Check your internet connection
- Try refreshing the page

---

## URLs

- **Map Page:** `yoursite.com/properties-map`
- **Admin Panel:** `yoursite.com/admin`
- **Find Coordinates:** google.com/maps or openstreetmap.org

---

**Questions?** Check the full guide: `MAP_FEATURE_GUIDE.md`
