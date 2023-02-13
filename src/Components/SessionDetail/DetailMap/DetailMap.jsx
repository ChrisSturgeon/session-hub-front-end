import './DetailMap.css';
import { Marker } from 'react-leaflet';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';

export default function DetailMap({ coords }) {
  const windowHeight = window.innerHeight;

  return (
    <div className="detail-map">
      <MapContainer
        style={{ height: '100%', width: '100%' }}
        center={coords}
        zoom={windowHeight > 800 ? 12 : 10}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <Marker position={coords}></Marker>
      </MapContainer>
    </div>
  );
}
