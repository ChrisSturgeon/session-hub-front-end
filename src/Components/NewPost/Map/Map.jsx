import './Map.css';
import { Marker, useMapEvent } from 'react-leaflet';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';

export default function Map({ location, handleCoordsChange }) {
  // Extracts coordinates of clicked location and updates form coordinates state
  const UpdateCoordsState = ({ handleCoordsChange }) => {
    const map = useMapEvent('click', (event) => {
      handleCoordsChange([event.latlng.lat, event.latlng.lng]);
    });
  };

  return (
    <div className="test-map">
      <MapContainer center={location.coords} zoom={6} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={location.coords}></Marker>
        <UpdateCoordsState handleCoordsChange={handleCoordsChange} />
      </MapContainer>
    </div>
  );
}
