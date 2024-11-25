import React, { useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Shipment } from '../../store/slices/shipmentSlice';
import 'leaflet/dist/leaflet.css';

interface ShipmentMapProps {
  shipment: Shipment;
}

const ShipmentMap: React.FC<ShipmentMapProps> = ({ shipment }) => {
  const originIcon = new Icon({
    iconUrl: '/markers/origin.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const destinationIcon = new Icon({
    iconUrl: '/markers/destination.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const generateRoute = useCallback(() => {
    if (!shipment.coordinates.origin || !shipment.coordinates.destination) {
      return [];
    }

    return [
      [shipment.coordinates.origin.lat, shipment.coordinates.origin.lng],
      [shipment.coordinates.destination.lat, shipment.coordinates.destination.lng]
    ];
  }, [shipment.coordinates]);

  const route = generateRoute();

  return (
    <div className="h-[600px] w-full rounded-lg overflow-hidden shadow-lg relative">
      <MapContainer
        center={[20, 78]} // Center on India
        zoom={4}
        style={{ height: '100%', width: '100%' }}
        className="z-10"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {shipment.coordinates.origin && (
          <Marker 
            position={[shipment.coordinates.origin.lat, shipment.coordinates.origin.lng]} 
            icon={originIcon}
          >
            <Popup>
              <div className="font-medium">Origin</div>
              <div>{shipment.origin}</div>
            </Popup>
          </Marker>
        )}

        {shipment.coordinates.destination && (
          <Marker 
            position={[shipment.coordinates.destination.lat, shipment.coordinates.destination.lng]} 
            icon={destinationIcon}
          >
            <Popup>
              <div className="font-medium">Destination</div>
              <div>{shipment.destination}</div>
            </Popup>
          </Marker>
        )}

        <Polyline
          positions={route}
          pathOptions={{
            color: '#6366f1',
            weight: 3,
            opacity: 0.6,
            dashArray: '10, 10'
          }}
        />
      </MapContainer>

      <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg z-[400]">
        <h4 className="font-bold mb-2">Tracking Status</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <span className="font-medium">Status:</span>
            <span className="text-green-600">Delivered</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-medium">Carrier:</span>
            <span>{shipment.carrier}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-green-600 rounded-full h-2 transition-all duration-500"
              style={{ width: '100%' }}
            />
          </div>
          <p className="text-xs text-gray-500 text-right">
            100% Complete
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShipmentMap;