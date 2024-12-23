import jwt from "jsonwebtoken";
import User from "../Model/user.model.js";

export const userAuthMiddleware = async (req, res, next) => {
  try {
    let token;

    if (req.header["Authorization"]?.incudes("Bearer")) {
      token = req.header["Authorization"].replace("Bearer ", "");
    } else {
      token = req?.header["Authorization"];
    }

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findOne({
      _id: decoded.id,
      email: decoded.email,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // if user is found, add user to req object
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
