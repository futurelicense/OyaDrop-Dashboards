import React, { useEffect, useState, Component } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap } from
'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// Fix for default marker icons in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});
// Custom icons
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="background-color: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.5);"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });
};
const pickupIcon = createCustomIcon('#10B981'); // Green
const dropoffIcon = createCustomIcon('#EF4444'); // Red
const stopIcon = createCustomIcon('#F59E0B'); // Yellow
interface LeafletMapProps {
  pickup?: string;
  dropoff?: string;
  stops?: string[];
}
// Component to auto-fit bounds
function MapUpdater({ positions }: {positions: L.LatLngExpression[];}) {
  const map = useMap();
  useEffect(() => {
    if (positions.length > 0) {
      const bounds = L.latLngBounds(positions);
      map.fitBounds(bounds, {
        padding: [50, 50],
        maxZoom: 15
      });
    }
  }, [map, positions]);
  return null;
}
export function LeafletMap({ pickup, dropoff, stops = [] }: LeafletMapProps) {
  // Mock coordinates for Lagos
  const defaultCenter: L.LatLngExpression = [6.5244, 3.3792];
  // Generate mock coordinates based on input presence
  const [positions, setPositions] = useState<L.LatLngExpression[]>([]);
  useEffect(() => {
    const newPositions: L.LatLngExpression[] = [];
    if (pickup) newPositions.push([6.4281, 3.4219]); // Victoria Island mock
    stops.forEach((stop, i) => {
      if (stop) newPositions.push([6.4474 + i * 0.01, 3.4833 + i * 0.01]); // Lekki mock
    });
    if (dropoff) newPositions.push([6.6018, 3.3515]); // Ikeja mock
    if (newPositions.length === 0) {
      newPositions.push(defaultCenter);
    }
    setPositions(newPositions);
  }, [pickup, dropoff, stops]);
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden relative z-0">
      <MapContainer
        center={defaultCenter}
        zoom={12}
        style={{
          height: '100%',
          width: '100%'
        }}
        zoomControl={false}>
        
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>' />
        

        {positions.length > 0 && <MapUpdater positions={positions} />}

        {positions.map((pos, index) => {
          let icon = stopIcon;
          if (index === 0 && pickup) icon = pickupIcon;
          if (index === positions.length - 1 && dropoff) icon = dropoffIcon;
          return <Marker key={index} position={pos} icon={icon} />;
        })}

        {positions.length > 1 &&
        <Polyline
          positions={positions}
          color="#00D9C0"
          weight={4}
          dashArray="10, 10"
          opacity={0.8} />

        }
      </MapContainer>

      {/* Overlay gradient to blend with dark theme */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(10,14,26,0.8)] z-[400]" />
    </div>);

}