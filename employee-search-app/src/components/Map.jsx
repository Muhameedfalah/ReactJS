/* eslint-disable react/prop-types */
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
const Map = ({ position }) => {
  return (
    <MapContainer center={position} zoom={13} style={{ height: '300px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>Employee Location</Popup>
      </Marker>
    </MapContainer>
  )
}

export default Map