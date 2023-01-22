import './Map.css';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import { useMap } from 'react-leaflet/hooks';
import { Marker } from 'react-leaflet';
import { Popup } from 'react-leaflet';
import { useMapEvents } from 'react-leaflet';
import { useState } from 'react';

export default function Map() {
  const [markerPos, setMarkerPos] = useState([
    50.80230046386317, -0.49528598785400396,
  ]);

  const LocationFinderDummy = () => {
    const map = useMapEvents({
      click(e) {
        // console.log(e.latlng);
        setMarkerPos((prev) => [e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

  return (
    <div className="test-map">
      <MapContainer center={markerPos} zoom={14} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={markerPos}>
          {/* <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup> */}
        </Marker>
        <LocationFinderDummy />
      </MapContainer>
    </div>
  );
}
