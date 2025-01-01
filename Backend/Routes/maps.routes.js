import express from "express";
import { userAuthMiddleware } from "../middleware/userAuth.js";
import { body } from "express-validator";
import {
  getCoordinatesFromAddress,
  getTimeAndDistanceBetweenTwoPoints,
} from "../Controllers/map.controller.js";
const Router = express.Router();

Router.route("/get-latlong").post(
  userAuthMiddleware,
  [body("address").isLength({ min: 3 })],
  getCoordinatesFromAddress
);

Router.route("/get-time-and-distance").post(
  userAuthMiddleware,
  [
    body("pickup.lat")
      .isFloat({ min: -90, max: 90 })
      .withMessage("invalid pickup location"),
    body("pickup.long")
      .isFloat({ min: -180, max: 180 })
      .withMessage("invalid pickup location"),
    body("destination.lat")
      .isFloat({ min: -90, max: 90 })
      .withMessage("invalid destination location"),
    body("destination.long")
      .isFloat({ min: -180, max: 180 })
      .withMessage("invalid destination location"),
  ],
  getTimeAndDistanceBetweenTwoPoints
);

export default Router;
