import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
// -----------------------------------------------------------

export default function PointsMap({ pontos }) {
  const navigate = useNavigate();
  // Posição padrão (Porto Alegre) caso o usuário negue permissão
  const [position, setPosition] = useState([-30.0346, -51.2177]); 
  const [hasLocation, setHasLocation] = useState(false);

  useEffect(() => {
    // Pega a localização atual do GERADOR para centralizar o mapa nele -> a ser pensado melhor depois
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        setHasLocation(true);
      },
      (err) => console.log("Localização negada ou erro:", err)
    );
  }, []);

  return (
    <div className="h-[600px] w-full rounded-xl overflow-hidden shadow-sm border border-gray-200 z-0 relative">
      <MapContainer 
        center={position} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
        key={hasLocation ? 'user-loc' : 'default-loc'} 
      >
        {/* usando a api do OpenStreetMap (Gratuita) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Renderiza APENAS pontos que tenham coordenadas válidas */}
        {pontos.map((ponto) => (
           (ponto.latitude && ponto.longitude) && (
              <Marker key={ponto.id} position={[ponto.latitude, ponto.longitude]}>
                <Popup>
                  <div className="flex flex-col min-w-[200px]">
                    <h3 className="font-bold text-[#00684A] text-lg">{ponto.nome}</h3>
                    <span className="text-gray-600 text-sm mb-1">{ponto.endereco}</span>
                    <span className="text-gray-500 text-xs mb-2">{ponto.horarios}</span>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                        {ponto.materiais?.slice(0, 3).map((m, i) => (
                            <span key={i} className="text-[10px] bg-green-100 text-green-800 px-1 rounded">
                                {m.nome}
                            </span>
                        ))}
                    </div>

                    <button 
                        onClick={() => navigate(`/descartes/novo?pontoId=${ponto.id}`)}
                        className="bg-[#00684A] text-white text-sm py-1.5 rounded hover:bg-[#00523a] transition"
                    >
                        Registrar Descarte
                    </button>
                  </div>
                </Popup>
              </Marker>
           )
        ))}
        
        {/* Marcador azul para mostrar onde o usuário está */}
        {hasLocation && (
            <Marker position={position} opacity={0.6}>
                <Popup>Você está aqui</Popup>
            </Marker>
        )}

      </MapContainer>
    </div>
  );
}