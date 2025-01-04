import express from "express";
import { body } from "express-validator";
import { userAuthMiddleware } from "../middleware/userAuth.js";
import { createRides } from "../Controllers/rides.controller.js";

const router = express.Router();

router
  .route("/create-ride")
  .post(
    userAuthMiddleware,
    [
      body("pickup").isLength({ min: 3 }).withMessage("Pickup is required"),
      body("destination")
        .isLength({ min: 3 })
        .withMessage("Destination is required"),
      body("vehicleType")
        .isIn(["Car", "Motorcycle", "Auto"])
        .withMessage("Invalid vehicle type"),
    ],
    createRides
  );

export default router;
