import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Map = () => {
  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  // Initial state for map center and marker position
  const [location, setLocation] = useState({
    lat: 21.1615744, // Default latitude
    lng: 72.8399872, // Default longitude
  });

  useEffect(() => {
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error("Error getting location:", error);
          },
          { enableHighAccuracy: true }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    // Fetch the user's location initially
    updateLocation();

    // Update location every 5 seconds
    const interval = setInterval(updateLocation, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
      <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={10}>
        {/* Marker to show the user's current location */}
        <Marker position={location} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
