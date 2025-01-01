import axios from "axios";
const apiKey = process.env.GOOGLE_API_KEY;

export async function getLatLongFromAddress(address) {
  try {
    // Construct the Google Maps Geocoding API URL
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`;

    // Make the API request
    const response = await axios.get(url);

    // Check if the response contains results
    if (response.data.status === "OK" && response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      return {
        latitude: location.lat,
        longitude: location.lng,
      };
    } else {
      throw new Error("No results found for the given address.");
    }
  } catch (error) {
    // Handle any errors that occur during the API request
    throw new Error(`Failed to retrieve location: ${error.message}`);
  }
}

export async function getDistanceAndTimeService(pickup, destination) {
  const baseUrl = "https://maps.googleapis.com/maps/api/distancematrix/json";
  const params = {
    origins: `${pickup.lat},${pickup.long}`,
    destinations: `${destination.lat},${destination.long}`,
    key: apiKey,
  };

  try {
    const response = await axios.get(baseUrl, { params });
    const data = response.data;

    if (data.status === "OK") {
      const element = data.rows[0].elements[0];
      if (element.status === "OK") {
        return {
          distance: element.distance.text, // e.g., "15 km"
          duration: element.duration.text, // e.g., "20 mins"
        };
      } else {
        throw new Error(`Error with element status: ${element.status}`);
      }
    } else {
      throw new Error(`Error with API status: ${data.status}`);
    }
  } catch (error) {
    console.error("Error fetching distance and time:", error.message);
    throw error;
  }
}
