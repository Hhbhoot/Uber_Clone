import CaptainModel from "../Model/captain.model.js";
import { validationResult } from "express-validator";
import { RegisterCaptainService } from "../Services/captain.services.js";

export const RegisterCaptain = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }

    const { fullName, email, password, vehicle, gender } = req?.body;
    // console.log(req?.body);

    if (!fullName || !email || !password || !vehicle || !gender) {
      return res.status(400).json({
        status: "fail",
        error: "Please provide all required fields",
      });
    }

    const isExisting = await CaptainModel.findOne({ email });

    if (isExisting) {
      return res.status(400).json({
        status: "fail",
        message: "Email already exists",
      });
    }

    const images = req?.files
      ? req?.files?.images.map((file) => file.path.replace(/\\/g, "/"))
      : [];

    console.log(images);

    const hashPassword = await CaptainModel.hashPassword(password);

    const captain = await RegisterCaptainService({
      fullName,
      email,
      password: hashPassword,
      vehicle,
      gender,
    });

    if (!captain) {
      return res.status(400).json({
        status: "fail",
        error: "Failed to register captain",
      });
    }

    const token = captain.generateAuthToken();
    res.status(201).json({
      status: "success",
      message: "Captain registered successfully",
      data: {
        captain,
        token,
      },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const LoginCaptain = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        error: errors.array(),
      });
    }

    const { email, password } = req?.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        error: "Email and password are required",
      });
    }

    const captain = await CaptainModel.findOne({ email }).select("+password");

    if (!captain) {
      return res.status(400).json({
        status: "fail",
        error: "Invalid email or password",
      });
    }

    const isValidPassword = await captain.comparePassword(password);

    if (!isValidPassword) {
      return res.status(400).json({
        status: "fail",
        error: "Invalid email or password",
      });
    }
    const token = captain.generateAuthToken();

    return res.status(200).json({
      status: "success",
      message: "Logged in Successfully",
      data: {
        captain,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      error: error?.message || "Internal Server Error",
    });
  }
};