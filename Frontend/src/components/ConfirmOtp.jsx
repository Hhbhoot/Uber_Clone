import React from "react";
import { Link } from "react-router-dom";

const ConfirmOtp = (props) => {
  const rideDetails = props.rideDetails?.newRide;
  const userDetails = props?.rideDetails?.user;

  return (
    <div className="mx-1">
      <div className="text-xl font-bold p-4">
        <h1 className="text-start capitalize">Start Ride!</h1>
      </div>
      <div className="flex flex-col items-center w-full">
        <div className="flex items-center justify-between flex-wrap w-full bg-[#eee]  p-4">
          <div className="flex items-center justify-normal gap-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/86/Driver_Dave_Marshall_The_Friendly_Bus_Driver.jpg"
              alt="user-profile"
              className="w-12 h-12 rounded-full object-cover object-center"
            />
            <p className="text-gray-600 font-medium">
              {" "}
              {userDetails?.fullName?.firstName}{" "}
              {userDetails?.fullName?.lastName}
            </p>
          </div>
          <div className="flex flex-col gap-y-1 items-center">
            <p className="text-xs font-medium">₹{rideDetails?.fare}</p>
            <p className="text-xs font-medium">
              {" "}
              {Math.ceil(rideDetails?.distance / 1000)} KM
            </p>
          </div>
        </div>

        <div className="flex  flex-col items-start  p-4 border-b  w-full">
          <p className="text-gray-600 font-medium">Pickup</p>
          <p className="text-gray-600 font-normal"> {rideDetails?.pickup}</p>
        </div>
        <div className="flex  flex-col items-start  p-4 border-b  w-full">
          <p className="text-gray-600 font-medium">Destination</p>
          <p className="text-gray-600 font-normal">
            {" "}
            {rideDetails?.destination}
          </p>
        </div>

        <div className="mt-4 p-4 flex flex-col items-start w-full justify-center">
          <label htmlFor="otp">OTP</label>
          <input
            type="number"
            id="otp"
            name="otp"
            placeholder="Enter OTP"
            onChange={(e) => props.setOtp(e.target.value)}
            className="w-full mt-2 bg-[#eee]  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col items-center justify-around gap-4 w-full p-4">
          <Link
            to="/captain-riding"
            className="font-medium text-white text-center w-full bg-green-500 px-8 py-2 rounded-xl"
            onClick={() => props.handleConfirmOTP()}
          >
            Start
          </Link>
          <button
            className="font-medium text-white w-full bg-red-600 px-8 py-2 rounded-xl"
            onClick={() => {}}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOtp;
