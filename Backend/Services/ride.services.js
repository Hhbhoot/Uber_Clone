import RidesModel from "../Model/rides.model.js";

export const createRideService = async ({
  user,
  pickup,
  destination,
  distance,
  duration,
  fare,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !distance || !duration || !fare) {
    throw new Error("Missing required fields");
  }

  const newRide = await RidesModel.create({
    user,
    pickup,
    destination,
    distance,
    duration,
    fare,
    vehicleType,
  });
  return newRide;
};
