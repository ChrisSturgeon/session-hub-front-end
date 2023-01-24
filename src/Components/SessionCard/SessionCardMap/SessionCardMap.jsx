import './SessionCardMap.css';
import { Marker } from 'react-leaflet';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';

export default function SessionCardMap({ coords }) {
  if (coords) {
    return (
      <div className="session-card-map">
        <MapContainer
          style={{ height: '100%', width: '100%', borderRadius: 'inherit' }}
          center={coords}
          zoom={12}
          zoomControl={false}
          doubleClickZoom={false}
          touchZoom={false}
          scrollWheelZoom={false}
          dragging={false}
        >
          <TileLayer
            // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'"
          />
          <Marker position={coords}></Marker>
        </MapContainer>
      </div>
    );
  }
}
