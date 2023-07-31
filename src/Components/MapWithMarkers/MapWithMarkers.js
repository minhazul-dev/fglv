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
    const [foodInputNumberP, setFoodInputNumberP] = useState('')

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
            { id: 1, position: [23.8382, 90.2604], name: 'Agency for Integrated Development', hotline: '+8801303119674' },

            { id: 2, position: [23.9396, 90.2772], name: 'Association for Socio Economic and Human Upliftment (ASHU)', hotline: '+8801303119674' },

            { id: 3, position: [23.8342, 90.2607], name: 'Bangladesh Youth First Concerns (BYFC)', hotline: '+8801303119674' },

            { id: 4, position: [23.8730, 90.3113], name: 'Dipti Foundation', hotline: '+8801303119674' },

            { id: 5, position: [23.77786, 90.373188], name: 'ASHOKA : Innovators for the Public', hotline: '+8801303119674' },

            { id: 6, position: [23.75016846764646, 90.447779879007], name: 'Faith and Hope Welfare Association', hotline: '+8801303119674' },
            { id: 7, position: [23.7744, 90.3729], name: 'Organization_1', hotline: '+8801303119674' },
            { id: 8, position: [23.7465, 90.3745], name: 'Organization_2', hotline: '+8801303119674' },
            { id: 9, position: [23.7732, 90.3908], name: 'Organization_3', hotline: '+8801303119674' },
            { id: 10, position: [23.7579, 90.3904], name: 'Organization_4', hotline: '+8801303119674' },
            { id: 11, position: [23.7583, 90.3921], name: 'Organization_5', hotline: '+8801303119674' },
            { id: 12, position: [23.8752, 90.3111], name: 'Organization_6', hotline: '+8801303119674' },
            { id: 13, position: [23.8842, 90.3284], name: 'Organization_7', hotline: '+8801303119674' },
            { id: 14, position: [23.8788, 90.3367], name: 'Organization_8', hotline: '+8801303119674' },
            { id: 15, position: [23.8551, 90.3584], name: 'Organization_9', hotline: '+8801303119674' },
            // { id: 16, position: [23.7570, 90.3889], name: 'Organization_10', hotline: '+8801303119674' },
            // { id: 17, position: [23.8432, 90.2541], name: 'Organization11', hotline: '+8801303119674' },
            // { id: 18, position: [23.8387, 90.2698], name: 'Organization12', hotline: '+8801303119674' },
            // { id: 19, position: [23.8345, 90.2483], name: 'Organization13', hotline: '+8801303119674' },
            // { id: 20, position: [23.8399, 90.2416], name: 'Organization14', hotline: '+8801303119674' }



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


    const handleDonateNow = () => {
        if (selectedMarker && donateInputNumber.trim() !== '' && donateInputNumber.trim() !== '') {
            const donationData = {
                locationName: userLocationName,
                organizationName: selectedMarker.name,
                phoneNumber: donateInputNumber,
            };

            // Save food request data to MongoDB foodRequest collection
            axios.post('https://foodgenix01.onrender.com/liveFoodDonate', donationData)
                .then((response) => {
                    console.log('Food request data saved successfully:', response.data);
                    setShowSuccessModal(true);
                    setFoodInputNumber('');

                    // Send the SMS notification to the organization's hotline number
                    const smsNotification = {
                        phoneNumber: selectedMarker.hotline,
                        message: `Thank you for your donation to ${selectedMarker.name}. The Donation is available at ${userLocationName}.Donor Contact ${donateInputNumber}`,
                    };

                    axios.post('https://foodgenix01.onrender.com/sendSMSNotification', smsNotification)
                        .then((response) => {
                            console.log('SMS notification sent successfully:', response.data);
                        })
                        .catch((error) => {
                            console.error('Error sending SMS notification:', error);
                        });
                })
                .catch((error) => {
                    console.error('Error saving food request data:', error);
                    alert('Error sending food request data. Please try again later.');
                });
        } else {
            alert('Please enter a valid phone number.');
        }
    };


    const handleRequestFood = () => {
        if (selectedMarker && foodInputNumber.trim() !== '') {
            const foodRequestData = {
                locationName: userLocationName,
                organizationName: selectedMarker.name,
                phoneNumber: foodInputNumber,
                persons: foodInputNumberP,
            };

            // Save food request data to MongoDB foodRequest collection
            axios.post('https://foodgenix01.onrender.com/liveFoodRequest', foodRequestData)
                .then((response) => {
                    console.log('Food request data saved successfully:', response.data);
                    setShowSuccessModal(true);
                    setFoodInputNumber('');

                    // Send the SMS notification to the organization's hotline number
                    const smsNotification = {
                        phoneNumber: selectedMarker.hotline,
                        message: `A food request has been made for  ${foodInputNumberP} persons, to  ${selectedMarker.name}. The request is available at ${userLocationName}. Requester Contact: ${foodInputNumber}, `,
                    };

                    axios.post('https://foodgenix01.onrender.com/sendSMSNotification', smsNotification)
                        .then((response) => {
                            console.log('SMS notification sent successfully:', response.data);
                        })
                        .catch((error) => {
                            console.error('Error sending SMS notification:', error);
                        });
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
            <header className="site-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-12 d-flex flex-wrap">
                            <p className="d-flex me-4 mb-0">
                                <i className="bi-geo-alt me-2" />
                                20, 0150 Dhaka, Bangladesh
                            </p>
                            <p className="d-flex mb-0">
                                <i className="bi-envelope me-2" />
                                <a href="mailto:info@company.com">
                                    foodgenix6@gmail.com
                                </a>
                            </p>
                        </div>
                        <div className="col-lg-3 col-12 ms-auto d-lg-block d-none">
                            <ul className="social-icon">
                                <li className="social-icon-item">
                                    <a href="#" className="social-icon-link bi-twitter" />
                                </li>
                                <li className="social-icon-item">
                                    <a href="#" className="social-icon-link bi-facebook" />
                                </li>
                                <li className="social-icon-item">
                                    <a href="#" className="social-icon-link bi-instagram" />
                                </li>
                                <li className="social-icon-item">
                                    <a href="#" className="social-icon-link bi-youtube" />
                                </li>
                                <li className="social-icon-item">
                                    <a href="#" className="social-icon-link bi-whatsapp" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
            <nav className="navbar navbar-expand-lg bg-light shadow-lg">
                <div className="container">
                    <a className="navbar-brand" href="index.html">
                        <img src="images/logo.png" className="logo img-fluid" alt="" />
                        <span>
                            FoodGenix
                            <small>Leftover food management and donation</small>
                        </span>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link click-scroll" href="index.html#section_1">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link click-scroll" href="index.html#section_2">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link click-scroll" href="index.html#section_3">Causes</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link click-scroll" href="index.html#section_4">Volunteer</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link click-scroll dropdown-toggle" href="index.html#section_5" id="navbarLightDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">News</a>
                                <ul className="dropdown-menu dropdown-menu-light" aria-labelledby="navbarLightDropdownMenuLink">
                                    <li><a className="dropdown-item" href="news.html">News Listing</a></li>
                                    <li><a className="dropdown-item" href="news-detail.html">News Detail</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link click-scroll" href="index.html#section_6">Contact</a>
                            </li>
                            <li className="nav-item ms-3">
                                <a className="nav-link custom-btn custom-border-btn btn" href="donate.html">Donate</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
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
                    style={{ height: '545px', width: '1424px' }}

                >
                    <TileLayer
                        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=KeNVArqulWDriBkoWkEg"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {userLocation && (
                        <Marker position={userLocation.position} icon={L.icon({ iconUrl: currentLocationIcon, iconSize: [62, 62] })} />
                    )}

                    {userLocation && (
                        <Popup position={userLocation.position} autoClose={false} closeOnEscapeKey={false} closeOnClick={false}>
                            {userLocationName}
                        </Popup>
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
                                                <input
                                                    placeholder='Number of persons'
                                                    className='form-control mb-2'
                                                    type="number"
                                                    id="foodInput"
                                                    value={foodInputNumberP}
                                                    onChange={(e) => setFoodInputNumberP(e.target.value)}
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

