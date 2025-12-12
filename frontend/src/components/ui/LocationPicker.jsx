import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useState } from 'react';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});
L.Marker.prototype.options.icon = DefaultIcon;

function MapClickHandler({ onLocationSelect }) {
    useMapEvents({
        click(e) {
            onLocationSelect(e.latlng); // Retorna { lat: ..., lng: ... }
        },
    });
    return null;
}

export default function LocationPicker({ onPositionChange, initialPosition }) {
    // Porto alegre como localização padrão
    const defaultCenter = [-30.0346, -51.2177];
    const [markerPos, setMarkerPos] = useState(initialPosition || null);

    const handleSelect = (latlng) => {
        setMarkerPos([latlng.lat, latlng.lng]);
        onPositionChange([latlng.lat, latlng.lng]); // Avisa o formulário pai
    };

    return (
        <div className="space-y-2">
            <p className="text-sm text-gray-600 font-medium">
                Clique no mapa para confirmar a localização exata:
            </p>
            <div className="h-[300px] w-full rounded-lg overflow-hidden border border-gray-300">
                <MapContainer 
                    center={initialPosition || defaultCenter} 
                    zoom={13} 
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; OpenStreetMap'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    
                    {/* Captura cliques */}
                    <MapClickHandler onLocationSelect={handleSelect} />

                    {markerPos && <Marker position={markerPos} />}
                </MapContainer>
            </div>
            {markerPos ? (
                <p className="text-xs text-green-600">Localização definida: {markerPos[0].toFixed(4)}, {markerPos[1].toFixed(4)}</p>
            ) : (
                <p className="text-xs text-red-500">* Obrigatório selecionar um ponto no mapa</p>
            )}
        </div>
    );
}