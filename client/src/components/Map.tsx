import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default icon issue in React Leaflet
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
  coordinates: { lat: number; lng: number };
  zoom?: number;
  popupText?: string;
  interactive?: boolean;
}

function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export function Map({ coordinates, zoom = 13, popupText, interactive = true }: MapProps) {
  // MapTiler Key from requirements
  const MAPTILER_KEY = "CYUJDmOE8Pn0VA43IzX8"; 
  const mapUrl = `https://api.maptiler.com/maps/outdoor-v4/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`;

  return (
    <div className="h-full w-full rounded-xl overflow-hidden z-0 relative isolate">
      <MapContainer
        center={[coordinates.lat, coordinates.lng]}
        zoom={zoom}
        scrollWheelZoom={interactive}
        dragging={interactive}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
        attributionControl={false}
      >
        <ChangeView center={[coordinates.lat, coordinates.lng]} zoom={zoom} />
        <TileLayer
          url={mapUrl}
          attribution='&copy; <a href="https://www.maptiler.com/copyright/" target="_blank">MapTiler</a>'
        />
        <Marker position={[coordinates.lat, coordinates.lng]}>
          {popupText && <Popup>{popupText}</Popup>}
        </Marker>
      </MapContainer>
      
      <div className="absolute bottom-1 right-1 bg-white/80 px-2 py-1 text-[10px] text-black rounded z-[400] pointer-events-none">
        © MapTiler © OSM
      </div>
    </div>
  );
}
