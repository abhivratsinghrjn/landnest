import React from 'react';
import { Property } from '../types';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { MapPin } from 'lucide-react';

const GOOGLE_MAPS_API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key

interface PropertyMapProps {
  property: Property;
}

function MapComponent({ property }: PropertyMapProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();

  React.useEffect(() => {
    if (ref.current && !map) {
      const newMap = new window.google.maps.Map(ref.current, {
        center: { lat: property.coordinates.lat, lng: property.coordinates.lng },
        zoom: 15,
        mapTypeControl: false,
        streetViewControl: false,
      });
      setMap(newMap);
    }
  }, [ref, map]);

  React.useEffect(() => {
    if (map) {
      new google.maps.Marker({
        position: { 
          lat: property.coordinates.lat, 
          lng: property.coordinates.lng 
        },
        map,
        title: property.title,
      });
    }
  }, [map, property]);

  return <div ref={ref} className="w-full h-full rounded-lg" />;
}

function LoadingComponent() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
      <div className="text-gray-600">Loading map...</div>
    </div>
  );
}

function ErrorComponent() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
      <div className="text-red-600">Error loading map</div>
    </div>
  );
}

export default function PropertyMap({ property }: PropertyMapProps) {
  return (
    <Wrapper 
      apiKey={GOOGLE_MAPS_API_KEY} 
      render={LoadingComponent}
    >
      <div className="w-full h-full">
        <MapComponent property={property} />
      </div>
    </Wrapper>
  );
}