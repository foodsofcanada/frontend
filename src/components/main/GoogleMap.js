import React, { useEffect, useRef, createRef } from 'react';


const mapStyles = {
    width: "100vw", 
	height: "100vh",
};

function GoogleMap(props) {
    const googleMapRef = createRef();
    const googleMap = useRef(null);
    const marker = useRef(null);

    const createGoogleMap = () =>
        new window.google.maps.Map(googleMapRef.current, {
			center: { 
				lat: 59.8478, lng: -101.8939 
			},
			zoom: 4,
			zoomControl: true,
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			rotateControl: false,
			fullscreenControl: true,
			
        });

    const createMarker = () =>
        new window.google.maps.Marker({
            position: {
				lat: 59.8478, 
				lng: -101.8939
			},
            map: googleMap.current
        });

    useEffect(() => {
        const googleMapScript = document.createElement('script');
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&libraries=places`
        window.document.body.appendChild(googleMapScript);

        googleMapScript.addEventListener('load', () => {
            googleMap.current = createGoogleMap();
            marker.current = createMarker()
        })
    }, []);

    return (
        <div
            id="google-map"
            ref={googleMapRef}
            style={mapStyles}
        />
    )

}

export default GoogleMap