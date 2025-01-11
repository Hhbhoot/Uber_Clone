import { validationResult } from "express-validator";
import {
  getDistanceAndTimeService,
  getFareDetailsService,
} from "../Services/map.services.js";
import { createRideService } from "../Services/ride.services.js";
import RidesModel from "../Model/rides.model.js";
import { io } from "../server.js";

export const createRides = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "fail",
      errors: errors.array(),
    });
  }

  const { pickup, destination, vehicleType } = req?.body;
  if (!pickup || !destination || !vehicleType) {
    return res.status(400).json({
      status: "fail",
      message: "Pickup and Destination are required",
    });
  }

  const { distance, duration } = await getDistanceAndTimeService(
    pickup,
    destination
  );

  if (!distance || !duration) {
    return res.status(400).json({
      status: "fail",
      message: "Failed to get distance and duration",
    });
  }

  const calculateFare = await getFareDetailsService(
    distance.value,
    vehicleType
  );

  if (!calculateFare) {
    return res.status(400).json({
      status: "fail",
      message: "Failed to calculate fare",
    });
  }

  const otp = await RidesModel.generatOTP();

  const newRide = await createRideService({
    user: req?.user?._id,
    pickup,
    destination,
    distance: distance.value,
    duration: duration.value,
    fare: calculateFare,
    vehicleType,
    otp,
  });

  if (!newRide) {
    return res.status(400).json({
      status: "fail",
      message: "Failed to create ride",
    });
  }

  io.emit("newRide", newRide);

  return res.status(200).json({
    status: "success",
    message: "Ride created successfully",
    data: {
      newRide,
    },
  });
};

export const findAvailableDriver = async (req, res, next) => {};
