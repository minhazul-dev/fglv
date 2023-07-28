
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { useRef, useState } from 'react';
import osm from "./osm"
import cities from "./cities.json"
const markerIcon = new L.Icon({
    iconUrl: require("./marker.png"),
    iconSize: [40, 40],
    iconAnchor: [17, 46], //[left/right, top/bottom]
    popupAnchor: [0, -46], //[left/right, top/bottom]
});
function MapAdmin() {
    const [center, setCenter] = useState({ lat: 23.7461, lng: 90.3742 });
    const ZOOM_LEVEL = 9;
    const mapRef = useRef();

    return (
        <>
            <div className="">
                <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
                    <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
                    {cities.map((city, idx) => (

                        <Marker
                            position={[city.lat, city.lng]}
                            icon={markerIcon}
                            key={idx}
                        >
                            <Popup>
                                <b>
                                    {city.area}, {city.admin},<b>Hotline: </b>{city.hotline}
                                </b>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </>

    );
}

export default MapAdmin;
// import React from 'react';
// import "leaflet/dist/leaflet.css";
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import L from "leaflet";
// import { useRef, useState } from 'react';
// import osm from "./osm"
// import cities from "./cities.json"
// const markerIcon = new L.Icon({
//     iconUrl: require("./marker.png"),
//     iconSize: [40, 40],
//     iconAnchor: [17, 46], //[left/right, top/bottom]
//     popupAnchor: [0, -46], //[left/right, top/bottom]
// });
// const MapAdmin = () => {
//     const [center, setCenter] = useState({ lat: 23.7461, lng: 90.3742 });
//     const ZOOM_LEVEL = 9;
//     const mapRef = useRef();
//     return (
//         <div>

//             <div className="">
//                 <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
//                     <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
//                     {cities.map((city, idx) => (

//                         <Marker
//                             position={[city.lat, city.lng]}
//                             icon={markerIcon}
//                             key={idx}
//                         >
//                             <Popup>
//                                 <b>
//                                     {city.area}, {city.admin},<b>Hotline: </b>{city.hotline}
//                                 </b>
//                             </Popup>
//                         </Marker>
//                     ))}
//                 </MapContainer>
//             </div>

//         </div >
//     );
// };

// export default MapAdmin;