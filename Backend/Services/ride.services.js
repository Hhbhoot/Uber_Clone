import RidesModel from "../Model/rides.model.js";

export const createRideService = async ({
  user,
  pickup,
  destination,
  distance,
  duration,
  fare,
  vehicleType,
  otp,
}) => {
  if (
    !user ||
    !pickup ||
    !destination ||
    !distance ||
    !duration ||
    !fare ||
    !otp
  ) {
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
    otp,
  });
  return newRide;
};
