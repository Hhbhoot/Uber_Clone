import express from "express";
import { body } from "express-validator";
import { RegisterUser } from "../Controllers/user.controller.js";

const router = express.Router();

router
  .route("/register")
  .post(
    [
      body("fullName.firstName")
        .isLength({ min: 3 })
        .withMessage("First name shoud be minimum 3 characters long"),
      body("email").isEmail().withMessage("Invalid Email"),
      body("password")
        .isLength({ min: 3 })
        .withMessage("Password must be at least 8 characters long"),
    ],
    RegisterUser
  );
