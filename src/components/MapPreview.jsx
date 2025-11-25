import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin } from 'lucide-react';

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const MapPreview = ({ lat, lng, label = 'Property Location' }) => {
  if (!lat || !lng) return <div className="text-sm text-gray-500">Map not available</div>;

  return (
    <div className="h-64 rounded-2xl overflow-hidden border border-gray-100">
      <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={false} className="h-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lng]} icon={markerIcon}>
          <Popup>
            <div className="flex items-center gap-2 text-sm">
              <MapPin size={16} /> {label}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapPreview;
