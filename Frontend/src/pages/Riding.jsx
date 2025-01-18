import React from "react";
import Map from "./Map";
import { useLocation } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegCreditCard, FaStop } from "react-icons/fa";

const Riding = () => {
  const location = useLocation();
  const { rideDetails } = location.state || {};

  console.log("rideDetails", rideDetails);

  return (
    <div className="flex flex-col items-center h-screen justify-between overflow-hidden">
      <Map />

      <div className="flex flex-col items-center justify-between py-5 w-full p-5 rounded-t-2xl">
        <div className="flex items-center justify-between w-full">
          <img
            src={`${
              rideDetails.vehicleType === "Car"
                ? " /img/car.webp"
                : rideDetails.vehicleType === "Motorcycle"
                ? " /img/moto.webp"
                : "/img/auto.webp"
            } `}
            alt=""
            className="w-32 h-24"
          />
          <div className="fle flex-col gap-y-1">
            <h1 className="text-base font-bold">
              {rideDetails.captain.fullName.firstName}{" "}
              {rideDetails.captain.fullName.lastName}
            </h1>
            <p className="text-xl font-semibold text-gray-500">
              {rideDetails.captain.vehicle.plate}
            </p>
          </div>
        </div>
        <div className="w-full border border-gray-300  rounded-xl h-0 mt-2"></div>

        <div className="flex items-center justify-normal gap-5 w-full px-3 p-2 align-middle  ">
          <span>
            <FaStop />
          </span>
          <div className="flex flex-col p-1 ">
            <p className="font-bold text-xl">562/11-A </p>
            <p className="text-base font-normal">{rideDetails.destination}</p>
          </div>
        </div>

        <div className="w-full border border-gray-300  rounded-xl h-0 mt-2"></div>
        <div className="flex items-center justify-normal gap-5 w-full px-3 p-2 align-middle  ">
          <span>
            <FaRegCreditCard />
          </span>
          <div className="flex flex-col p-1 ">
            <p className="font-bold text-xl">₹{rideDetails.fare}</p>
            <p className="text-base font-normal ">Cash</p>
          </div>
        </div>
        <button className="bg-green-500 text-white p-3 text-base rounded-xl mt-5 w-full">
          Make Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
