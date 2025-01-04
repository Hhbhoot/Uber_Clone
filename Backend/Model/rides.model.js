import mongoose from "mongoose";

const ridesSchema = new mongoose.Schema(
  {
    captain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "captains",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    pickup: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },

    distance: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    fare: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "Accepted",
        "Completed",
        "Cancelled",
        "Rejected",
        "OnGoing",
      ],
      default: "Pending",
    },

    vehicleType: {
      type: String,
      enum: ["Auto", "Car", "Motorcycle"],
      required: true,
    },

    paymentId: {
      type: String,
    },
    orderId: {
      type: String,
    },
    signature: {
      type: String,
    },

    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending"],
      default: "Pending",
    },
  },

  {
    timestamps: true,
  }
);

const RidesModel = mongoose.model("rides", ridesSchema);

export default RidesModel;
