import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const userAuthMiddleware = async (req, res, next) => {
  try {
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
