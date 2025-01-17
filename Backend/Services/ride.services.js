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

export const confirmRideService = async (rideId, captainId) => {
  if (!rideId || !captainId) {
    throw new Error("Missing required fields");
  }
  await RidesModel.findByIdAndUpdate(
    rideId,
    {
      status: "accepted",
      captain: captainId,
    },
    {
      new: true,
    }
  );

  const ride = await RidesModel.findById(rideId).populate("user captain");

  return ride;
};
