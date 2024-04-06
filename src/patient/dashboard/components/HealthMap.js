import React, {useEffect, useRef} from 'react';

function locationSearch(mapRef, currentLocation) {
    const map = new window.google.maps.Map(mapRef.current, {
        center: currentLocation,
        zoom: 15
    });

    const service = new window.google.maps.places.PlacesService(map);
    const request = {
        location: currentLocation,
        radius: '3000',
        type: ['pharmacy']
    };

    service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {

            results.forEach(place => {
                const marker = new window.google.maps.Marker({
                    position: place.geometry.location,
                    map: map,
                    title: place.name,
                    icon: {
                        url: place.icon,
                        scaledSize: new window.google.maps.Size(40, 40),
                    },
                });

                const infoWindow = new window.google.maps.InfoWindow({
                    content: `
                        <div style="font-family: Arial, sans-serif;">
                            <h5 style="color: #4A90E2; margin-bottom: 5px;">${place.name}</h5>
                            <p style="font-size: 15px; margin-bottom: 10px;">Status: <span style="${place.business_status === 'OPERATIONAL' ? 'color: green;' : 'color: red;'}">${place.business_status}</span></p>
                        </div>`,
                });

                marker.addListener('click', () => {
                    infoWindow.open(map, marker);
                });
            });
            new window.google.maps.Marker({
                position: currentLocation,
                map: map,
                title: 'Your location',
            });
        }
    });
}

const HealthMap = () => {
    const mapRef = useRef(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            if (window.google) {
                const currentLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                locationSearch(mapRef, currentLocation);
            }
        }, (error) => {
            if (window.google) {
                const currentLocation = {
                    lat: 50.935745,
                    lng: -1.399218,
                };

                locationSearch(mapRef, currentLocation);
            }
        });
    }, []);

    return <div ref={mapRef} style={{height: '700px', width: '100%'}}/>;
};

export default HealthMap;
