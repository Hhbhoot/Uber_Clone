import User from "../Model/user.model.js";
import { validationResult } from "express-validator";
import { registerUser, UpdateUser } from "../Services/user.services.js";

export const RegisterUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, gender } = req?.body;

    console.log(req?.body);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "fail",
        message: "Email already in use",
      });
    }

    const hashedPassword = await User.hashPassword(password);

    const user = await registerUser({
      firstName: fullName.firstName,
      lastName: fullName?.lastName,
      email,
      password: hashedPassword,
      gender,
    });
    const token = await user.generateToken();

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: {
        user,
        token,
      },
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }

    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }

    const token = user.generateToken();

    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      data: {
        user,
        token,
      },
    });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "fail", errors: errors.array() });
    }

    const id = req?.user?._id;

    if (req?.file) {
      const { filename } = req.file;
      req.profile = filename.replace(/\\/g, "/");
    }

    const updatedUser = await UpdateUser(id, { ...req?.body });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }

    res.status(200).json({
      status: "success",
      data: {
        updatedUser,
      },
    });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};
