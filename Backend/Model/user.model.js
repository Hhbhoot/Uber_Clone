import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      firstName: {
        type: String,
        required: [true, "FirstName is Required"],
        trim: true,
        minlength: [3, "First name shoud be minimum 3 characters long"],
      },
      lastName: {
        type: String,
        trim: true,
        minlength: [3, "Last name should be minimum 3 characters long"],
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },
    profile: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    socketId: {
      type: String, // for live tracking of user
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

userSchema.methods.comparePassword = async (password) => {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = () => {
  const token = jwt.sign(
    {
      id: this._id,
      email: this.email,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "24h",
    }
  );

  return token;
};

const User = mongoose.model("model", userSchema);

export default User;
