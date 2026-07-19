'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix leafet icon issue in Next.js
const iconDelayed = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const iconOnTime = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const iconAtRisk = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface ShipmentMapProps {
  shipments: any[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

function MapController({ selectedShipment }: { selectedShipment: any }) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedShipment) {
      map.flyTo(selectedShipment.currentLoc, 4, {
        duration: 1.5
      });
    }
  }, [selectedShipment, map]);
  
  return null;
}

export default function ShipmentMap({ shipments, selectedId, onSelect }: ShipmentMapProps) {
  const selectedShipment = shipments.find(s => s.id === selectedId);

  const getIcon = (status: string) => {
    if (status === 'delayed') return iconDelayed;
    if (status === 'at-risk') return iconAtRisk;
    return iconOnTime;
  };

  const getLineColor = (status: string) => {
    if (status === 'delayed') return '#ef4444'; // red
    if (status === 'at-risk') return '#eab308'; // yellow
    return '#10b981'; // green
  };

  return (
    <MapContainer 
      center={[35, -40]} 
      zoom={3} 
      className="w-full h-full rounded-xl bg-[#0A0F1E] z-0"
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
      />
      
      <MapController selectedShipment={selectedShipment} />

      {shipments.map((shipment) => (
        <React.Fragment key={shipment.id}>
          {/* Route Line */}
          <Polyline 
            positions={shipment.coordinates} 
            color={getLineColor(shipment.status)} 
            weight={3} 
            opacity={selectedId === shipment.id ? 1 : 0.3} 
            dashArray={selectedId === shipment.id ? undefined : "5, 10"}
          />
          
          {/* Current Location Marker */}
          <Marker 
            position={shipment.currentLoc} 
            icon={getIcon(shipment.status)}
            eventHandlers={{
              click: () => onSelect(shipment.id)
            }}
          >
            <Popup className="bg-[#0A0F1E] text-white rounded-lg border-white/10">
              <div className="font-semibold text-gray-900">{shipment.id}</div>
              <div className="text-xs text-gray-600">{shipment.origin} &rarr; {shipment.destination}</div>
              <div className="text-xs mt-1 font-medium capitalize text-gray-800">Status: {shipment.status}</div>
            </Popup>
          </Marker>
        </React.Fragment>
      ))}
    </MapContainer>
  );
}
