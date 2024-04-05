import React, {useEffect, useState} from 'react';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const HealthMap = () => {
    const [currentPosition, setCurrentPosition] = useState([51.505, -0.09]);

    const [pharmacies, setPharmacies] = useState([]);


    navigator.geolocation.getCurrentPosition(function (position) {
        setCurrentPosition([position.coords.latitude, position.coords.longitude]);
    }, function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
    });

    return (
        <MapContainer center={currentPosition} zoom={10} style={{height: '100vh', width: '100%'}}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {pharmacies.map(pharmacy => (
                <Marker key={pharmacy.id} position={currentPosition}>
                    <Popup>{pharmacy.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default HealthMap;
