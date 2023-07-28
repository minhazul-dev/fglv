import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, Popup, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import currentLocationIcon from './marker.png';
import additionalMarkerIcon from './New folder/image_processing20210717-12803-16w2f3x.png';
import axios from 'axios';
import SuccessModal from './CustomModal'
import './map.css'
const MapWithMarkers = () => {


    const [userLocation, setUserLocation] = useState(null);
    const [additionalMarkers, setAdditionalMarkers] = useState([]);
    const [roadMark, setRoadMark] = useState(null);
    const [roadCoordinates, setRoadCoordinates] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [userLocationName, setUserLocationName] = useState('');
    const [donateInputNumber, setDonateInputNumber] = useState('');
    const [foodInputNumber, setFoodInputNumber] = useState('');
    const [showDonateInput, setShowDonateInput] = useState(false);
    const [showFoodInput, setShowFoodInput] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const mapRef = useRef();

    useEffect(() => {
        if (userLocation) {
            // Get the location name using reverse geocoding (Nominatim)
            const { position } = userLocation;
            const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position[0]}&lon=${position[1]}`;

            axios
                .get(apiUrl)
                .then((response) => {
                    const locationName = response.data.display_name;
                    setUserLocationName(locationName);
                })
                .catch((error) => {
                    console.error('Error fetching location name:', error);
                });
        }
    }, [userLocation]);

    const handleLocateMe = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ position: [latitude, longitude], name: 'You are here' });

                    // Animate the map to the user's location
                    if (mapRef.current) {
                        const map = mapRef.current;
                        map.flyTo([latitude, longitude], 13, {
                            duration: 2, // Animation duration in seconds
                        });
                    }
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        } else {
            console.error('Geolocation is not available in this browser.');
        }
    };

    // useEffect hook to simulate additional markers (you can replace this with your own data)
    useEffect(() => {
        // Simulating additional markers (replace this with your actual data)
        const markersData = [
            { id: 1, position: [23.8382, 90.2604], name: 'Agency for Integrated Development', hotline: '7743145' },

            { id: 2, position: [23.9396, 90.2772], name: 'Association for Socio Economic and Human Upliftment (ASHU)', hotline: '01857-623324' },

            { id: 3, position: [23.8342, 90.2607], name: 'Bangladesh Youth First Concerns (BYFC)', hotline: '7742036' },

            { id: 4, position: [23.8730, 90.3113], name: 'Dipti Foundation', hotline: '01713-042814' },

            { id: 5, position: [23.77786, 90.373188], name: 'ASHOKA : Innovators for the Public', hotline: '01713-042814' },

            { id: 6, position: [23.75016846764646, 90.447779879007], name: 'Faith and Hope Welfare Association', hotline: '01716633005' },
            { id: 7, position: [23.7744, 90.3729], name: 'Organization1', hotline: '01716633005' },
            { id: 8, position: [23.7465, 90.3745], name: 'Organization2', hotline: '01716633005' },
            { id: 9, position: [23.7732, 90.3908], name: 'Organization3', hotline: '01716633005' },
            { id: 10, position: [23.7579, 90.3904], name: 'Organization4', hotline: '01716633005' },


        ];
        setAdditionalMarkers(markersData);
    }, []);

    const handleMarkerClick = (marker) => {
        setSelectedMarker(marker);

        if (userLocation) {
            // Calculate the distance between the user location and the clicked marker
            const distance = calculateDistance(userLocation.position, marker.position);
            const distanceInKm = (distance / 1000).toFixed(2);

            // Calculate the midpoint between the current location and the clicked marker
            const midpoint = [
                (userLocation.position[0] + marker.position[0]) / 2,
                (userLocation.position[1] + marker.position[1]) / 2,
            ];
            setRoadCoordinates([userLocation.position, marker.position]);
            setRoadMark({ position: midpoint, distance: distanceInKm });
        }

    };


    const calculateDistance = (point1, point2) => {
        const lat1 = point1[0];
        const lon1 = point1[1];
        const lat2 = point2[0];
        const lon2 = point2[1];

        const R = 6371e3; // Earth's radius in meters
        const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
        const φ2 = (lat2 * Math.PI) / 180;
        const Δφ = ((lat2 - lat1) * Math.PI) / 180;
        const Δλ = ((lon2 - lon1) * Math.PI) / 180;

        const a =
            Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // Distance in meters
    };


    const AdjustMapView = () => {
        const map = useMap();
        if (roadMark) {
            // Fly to the midpoint of the current location and the clicked marker
            map.flyTo(roadMark.position, 14, {
                duration: 2,
            });
        }
        return null;
    };

    //req n donate food
    const handleDonateNow = () => {
        // Save donation data to MongoDB donate collection
        if (selectedMarker && donateInputNumber.trim() !== '') {
            const donationData = {
                locationName: userLocationName,
                organizationName: selectedMarker.name,
                phoneNumber: donateInputNumber,
            };
            // Here, you should send the donationData to your backend API endpoint to save it in the MongoDB donate collection
            axios.post('http://localhost:9000/liveFoodDonate', donationData)
                .then((response) => {
                    console.log('Donation data saved successfully:', response.data);
                    setShowSuccessModal(true);
                    setDonateInputNumber('');
                })
                .catch((error) => {
                    console.error('Error saving donation data:', error);
                    alert('Error sending donation data. Please try again later.');
                });
        } else {
            alert('Please enter a valid phone number.');
        }
    };

    const handleRequestFood = () => {
        // Save food request data to MongoDB request collection
        if (selectedMarker && foodInputNumber.trim() !== '') {
            const requestData = {
                locationName: userLocationName,
                organizationName: selectedMarker.name,
                phoneNumber: foodInputNumber,
            };
            // Here, you should send the requestData to your backend API endpoint to save it in the MongoDB request collection
            axios.post('http://localhost:9000/liveFoodRequest', requestData)
                .then((response) => {
                    console.log('Food request data saved successfully:', response.data);
                    setShowSuccessModal(true);
                    setFoodInputNumber('');
                })
                .catch((error) => {
                    console.error('Error saving food request data:', error);
                    alert('Error sending food request data. Please try again later.');
                });
        } else {
            alert('Please enter a valid phone number.');
        }
    };
    const handleButtonClick = (type) => {
        if (type === "donate") {
            setShowDonateInput(true); // Show the input field for donation
            setShowFoodInput(false); // Hide the input field for food request
        } else if (type === "food") {
            setShowDonateInput(false); // Hide the input field for donation
            setShowFoodInput(true); // Show the input field for food request
        }
    };

    return (

        < section >
            <div className="container">
                <button onClick={handleLocateMe} style={{ margin: '10px' }}>
                    Locate Me
                </button>
            </div>
            < div >

                <MapContainer
                    ref={mapRef}
                    center={userLocation ? userLocation.position : [23.8103, 90.4125]}
                    zoom={userLocation ? 13 : 10} // Adjust the zoom level when userLocation is available
                    style={{ height: '621px', width: '1424px' }}

                >
                    <TileLayer
                        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=KeNVArqulWDriBkoWkEg"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {userLocation && (
                        <Marker position={userLocation.position} icon={L.icon({ iconUrl: currentLocationIcon, iconSize: [62, 62] })}>
                            <Tooltip className='custom_tooltip ' permanent>{userLocationName}</Tooltip>
                            {/* <Tooltip permanent>{userLocation.name}</Tooltip> */}


                        </Marker>
                    )}
                    {roadCoordinates.length > 0 && <Polyline positions={roadCoordinates} color="blue" />}
                    {additionalMarkers.map((marker) => (
                        <Marker
                            key={marker.id}
                            position={marker.position}
                            icon={L.icon({ iconUrl: additionalMarkerIcon, iconSize: [62, 62] })}
                            eventHandlers={{
                                click: () => handleMarkerClick(marker),
                            }}
                        >
                            <Tooltip permanent>{marker.name}</Tooltip>

                        </Marker>
                    ))}
                    {roadMark && <Marker position={roadMark.position}>
                    </Marker>}
                    {roadMark && (
                        <Popup position={roadMark.position}>
                            <div>
                                {selectedMarker && (
                                    <div>
                                        <h3>{selectedMarker.name}</h3>
                                        <p>Hotline: {selectedMarker.hotline}</p>
                                        <button className="mb-2" onClick={() => handleButtonClick("donate")}>Donate</button>
                                        <button onClick={() => handleButtonClick("food")}>Request Food</button>
                                        {showDonateInput && (
                                            <div>
                                                <label className='lead lead text-success m-1 font-weight-bold font-italic' htmlFor="donateInput">Enter your phone number for donation:</label>
                                                <input className='form-control mb-2'
                                                    type="text"
                                                    id="donateInput"
                                                    value={donateInputNumber}
                                                    onChange={(e) => setDonateInputNumber(e.target.value)}
                                                />
                                                <button onClick={handleDonateNow}>Donate Now</button>
                                            </div>
                                        )}
                                        {showFoodInput && (
                                            <div>
                                                <label className=' font-italic font-weight-bold lead text-success m-1' htmlFor="foodInput">Enter your phone number for food request:</label>
                                                <input
                                                    className='form-control mb-2'
                                                    type="text"
                                                    id="foodInput"
                                                    value={foodInputNumber}
                                                    onChange={(e) => setFoodInputNumber(e.target.value)}
                                                />
                                                <button onClick={handleRequestFood}>Request Food</button>
                                            </div>

                                        )}
                                        <p className='text-info'>Distance from current location: {roadMark.distance} km</p>
                                    </div>
                                )}
                            </div>
                        </Popup>
                    )}
                    <AdjustMapView />
                </MapContainer>
                <SuccessModal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} />
            </div>
        </section >
    );
};

export default MapWithMarkers;


// import React, { useState, useEffect, useRef } from 'react';
// import { MapContainer, TileLayer, Marker, Tooltip, Popup, useMap, Polyline } from 'react-leaflet';
// import L from 'leaflet';
// import "leaflet/dist/leaflet.css";
// import currentLocationIcon from './marker.png';
// import additionalMarkerIcon from './New folder/image_processing20210717-12803-16w2f3x.png';
// import axios from 'axios';
// import SuccessModal from './CustomModal'
// const MapWithMarkers = () => {


//     const [userLocation, setUserLocation] = useState(null);
//     const [additionalMarkers, setAdditionalMarkers] = useState([]);
//     const [roadMark, setRoadMark] = useState(null);
//     const [roadCoordinates, setRoadCoordinates] = useState([]);
//     const [selectedMarker, setSelectedMarker] = useState(null);
//     const [userLocationName, setUserLocationName] = useState('');
//     const [donateInputNumber, setDonateInputNumber] = useState('');
//     const [foodInputNumber, setFoodInputNumber] = useState('');
//     const [showDonateInput, setShowDonateInput] = useState(false);
//     const [showFoodInput, setShowFoodInput] = useState(false);
//     const [showSuccessModal, setShowSuccessModal] = useState(false);
//     const mapRef = useRef();

//     useEffect(() => {
//         if (userLocation) {
//             // Get the location name using reverse geocoding (Nominatim)
//             const { position } = userLocation;
//             const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position[0]}&lon=${position[1]}`;

//             axios
//                 .get(apiUrl)
//                 .then((response) => {
//                     const locationName = response.data.display_name;
//                     setUserLocationName(locationName);
//                 })
//                 .catch((error) => {
//                     console.error('Error fetching location name:', error);
//                 });
//         }
//     }, [userLocation]);

//     const handleLocateMe = () => {
//         if ('geolocation' in navigator) {
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     const { latitude, longitude } = position.coords;
//                     setUserLocation({ position: [latitude, longitude], name: 'You are here' });

//                     // Animate the map to the user's location
//                     if (mapRef.current) {
//                         const map = mapRef.current;
//                         map.flyTo([latitude, longitude], 13, {
//                             duration: 2, // Animation duration in seconds
//                         });
//                     }
//                 },
//                 (error) => {
//                     console.error('Error getting user location:', error);
//                 }
//             );
//         } else {
//             console.error('Geolocation is not available in this browser.');
//         }
//     };

//     // useEffect hook to simulate additional markers (you can replace this with your own data)
//     useEffect(() => {
//         // Simulating additional markers (replace this with your actual data)
//         const markersData = [
//             { id: 1, position: [23.8382, 90.2604], name: 'Agency for Integrated Development', hotline: '7743145' },

//             { id: 2, position: [23.9396, 90.2772], name: 'Association for Socio Economic and Human Upliftment (ASHU)', hotline: '01857-623324' },

//             { id: 3, position: [23.8342, 90.2607], name: 'Bangladesh Youth First Concerns (BYFC)', hotline: '7742036' },

//             { id: 4, position: [23.8730, 90.3113], name: 'Dipti Foundation', hotline: '01713-042814' },

//             { id: 5, position: [23.77786, 90.373188], name: 'ASHOKA : Innovators for the Public', hotline: '01713-042814' },

//             { id: 6, position: [23.75016846764646, 90.447779879007], name: 'Faith and Hope Welfare Association', hotline: '01716633005' },
//             { id: 7, position: [23.7744, 90.3729], name: 'Organization1', hotline: '01716633005' },
//             { id: 8, position: [23.7465, 90.3745], name: 'Organization2', hotline: '01716633005' },
//             { id: 9, position: [23.7732, 90.3908], name: 'Organization3', hotline: '01716633005' },
//             { id: 10, position: [23.7579, 90.3904], name: 'Organization4', hotline: '01716633005' },


//         ];
//         setAdditionalMarkers(markersData);
//     }, []);

//     const handleMarkerClick = (marker) => {
//         setSelectedMarker(marker);

//         if (userLocation) {
//             // Calculate the distance between the user location and the clicked marker
//             const distance = calculateDistance(userLocation.position, marker.position);
//             const distanceInKm = (distance / 1000).toFixed(2);

//             // Calculate the midpoint between the current location and the clicked marker
//             const midpoint = [
//                 (userLocation.position[0] + marker.position[0]) / 2,
//                 (userLocation.position[1] + marker.position[1]) / 2,
//             ];
//             setRoadCoordinates([userLocation.position, marker.position]);
//             setRoadMark({ position: midpoint, distance: distanceInKm });
//         }

//     };


//     const calculateDistance = (point1, point2) => {
//         const lat1 = point1[0];
//         const lon1 = point1[1];
//         const lat2 = point2[0];
//         const lon2 = point2[1];

//         const R = 6371e3; // Earth's radius in meters
//         const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
//         const φ2 = (lat2 * Math.PI) / 180;
//         const Δφ = ((lat2 - lat1) * Math.PI) / 180;
//         const Δλ = ((lon2 - lon1) * Math.PI) / 180;

//         const a =
//             Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//             Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
//         const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//         return R * c; // Distance in meters
//     };


//     const AdjustMapView = () => {
//         const map = useMap();
//         if (roadMark) {
//             // Fly to the midpoint of the current location and the clicked marker
//             map.flyTo(roadMark.position, 14, {
//                 duration: 2,
//             });
//         }
//         return null;
//     };

//     //req n donate food
//     const handleDonateNow = () => {
//         // Save donation data to MongoDB donate collection
//         if (selectedMarker && donateInputNumber.trim() !== '') {
//             const donationData = {
//                 locationName: userLocationName,
//                 organizationName: selectedMarker.name,
//                 phoneNumber: donateInputNumber,
//             };
//             // Here, you should send the donationData to your backend API endpoint to save it in the MongoDB donate collection
//             axios.post('http://localhost:9000/liveFoodDonate', donationData)
//                 .then((response) => {
//                     console.log('Donation data saved successfully:', response.data);
//                     setShowSuccessModal(true);
//                     setDonateInputNumber('');
//                 })
//                 .catch((error) => {
//                     console.error('Error saving donation data:', error);
//                     alert('Error sending donation data. Please try again later.');
//                 });
//         } else {
//             alert('Please enter a valid phone number.');
//         }
//     };

//     const handleRequestFood = () => {
//         // Save food request data to MongoDB request collection
//         if (selectedMarker && foodInputNumber.trim() !== '') {
//             const requestData = {
//                 locationName: userLocationName,
//                 organizationName: selectedMarker.name,
//                 phoneNumber: foodInputNumber,
//             };
//             // Here, you should send the requestData to your backend API endpoint to save it in the MongoDB request collection
//             axios.post('http://localhost:9000/liveFoodRequest', requestData)
//                 .then((response) => {
//                     console.log('Food request data saved successfully:', response.data);
//                     setShowSuccessModal(true);
//                     setFoodInputNumber('');
//                 })
//                 .catch((error) => {
//                     console.error('Error saving food request data:', error);
//                     alert('Error sending food request data. Please try again later.');
//                 });
//         } else {
//             alert('Please enter a valid phone number.');
//         }
//     };
//     const handleButtonClick = (type) => {
//         if (type === "donate") {
//             setShowDonateInput(true); // Show the input field for donation
//             setShowFoodInput(false); // Hide the input field for food request
//         } else if (type === "food") {
//             setShowDonateInput(false); // Hide the input field for donation
//             setShowFoodInput(true); // Show the input field for food request
//         }
//     };

//     return (
//         <div>
//             <button onClick={handleLocateMe} style={{ margin: '10px' }}>
//                 Locate Me
//             </button>
//             <MapContainer
//                 ref={mapRef}
//                 center={userLocation ? userLocation.position : [23.8103, 90.4125]}
//                 zoom={userLocation ? 13 : 10} // Adjust the zoom level when userLocation is available
//                 style={{ height: '620px', width: '1360px' }}
//             >
//                 <TileLayer
//                     url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=KeNVArqulWDriBkoWkEg"
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 />
//                 {userLocation && (
//                     <Marker position={userLocation.position} icon={L.icon({ iconUrl: currentLocationIcon, iconSize: [62, 62] })}>
//                         <Tooltip className='custom_tooltip ' permanent>{userLocationName}</Tooltip>
//                         {/* <Tooltip permanent>{userLocation.name}</Tooltip> */}


//                     </Marker>
//                 )}
//                 {roadCoordinates.length > 0 && <Polyline positions={roadCoordinates} color="blue" />}
//                 {additionalMarkers.map((marker) => (
//                     <Marker
//                         key={marker.id}
//                         position={marker.position}
//                         icon={L.icon({ iconUrl: additionalMarkerIcon, iconSize: [62, 62] })}
//                         eventHandlers={{
//                             click: () => handleMarkerClick(marker),
//                         }}
//                     >
//                         <Tooltip permanent>{marker.name}</Tooltip>

//                     </Marker>
//                 ))}
//                 {roadMark && <Marker position={roadMark.position}>
//                 </Marker>}
//                 {roadMark && (
//                     <Popup position={roadMark.position}>
//                         <div>
//                             {selectedMarker && (
//                                 <div>
//                                     <h3>{selectedMarker.name}</h3>
//                                     <p>Hotline: {selectedMarker.hotline}</p>
//                                     <button onClick={() => handleButtonClick("donate")}>Donate</button>
//                                     <button onClick={() => handleButtonClick("food")}>Request Food</button>
//                                     {showDonateInput && (
//                                         <div>
//                                             <label className='lead' htmlFor="donateInput">Enter your phone number for donation:</label>
//                                             <input className='form-control'
//                                                 type="text"
//                                                 id="donateInput"
//                                                 value={donateInputNumber}
//                                                 onChange={(e) => setDonateInputNumber(e.target.value)}
//                                             />
//                                             <button onClick={handleDonateNow}>Donate Now</button>
//                                         </div>
//                                     )}
//                                     {showFoodInput && (
//                                         <div>
//                                             <label className='lead' htmlFor="foodInput">Enter your phone number for food request:</label>
//                                             <input
//                                                 className='form-control'
//                                                 type="text"
//                                                 id="foodInput"
//                                                 value={foodInputNumber}
//                                                 onChange={(e) => setFoodInputNumber(e.target.value)}
//                                             />
//                                             <button onClick={handleRequestFood}>Request Food</button>
//                                         </div>

//                                     )}
//                                     <p className='text-info'>Distance from current location: {roadMark.distance} km</p>
//                                 </div>
//                             )}
//                         </div>
//                     </Popup>
//                 )}
//                 <AdjustMapView />
//             </MapContainer>
//             <SuccessModal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} />
//         </div>
//     );
// };

// export default MapWithMarkers;