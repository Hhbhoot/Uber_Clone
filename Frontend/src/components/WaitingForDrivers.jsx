import React from "react";
import { FaRegCreditCard, FaStop } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const WaitingForDrivers = (props) => {
  return (
    <div className="flex flex-col items-center w-full  p-3 mt-3">
      <h1 className="text-xl font-bold">Waiting For A Driver</h1>
      <div className="flex items-center justify-around  w-full my-4">
        <img
          src={`${
            props.vehicleType === "Car"
              ? " /img/car.webp"
              : props.vehicleType === "Motorcycle"
              ? " /img/moto.webp"
              : "/img/auto.webp"
          } `}
          className="w-24 mt-2"
          alt=""
        />

        <div className="flex flex-col items-center gap-y-1">
          <p className="font-bold text-base">
            {props.CaptainDetails?.fullName?.firstName}{" "}
            {props.CaptainDetails?.fullName?.lastName}
          </p>
          <p className="text-2xl  font-semibold">
            {props.CaptainDetails?.vehicle?.plate}
          </p>
          <p className="text-base font-semibold text-gray-500">
            {props.rideDetails?.otp}
          </p>
        </div>
      </div>
      <div className="w-full border border-gray-300  rounded-xl h-0 mt-2"></div>
      <div className="flex items-center justify-normal gap-5 w-full px-3 p-2 align-middle  ">
        <span>
          <FaLocationDot />
        </span>
        <div className="flex flex-col p-1 ">
          <p className="font-bold text-xl">562/11-A </p>
          <p className="text-base font-normal ">{props.pickup}</p>
        </div>
      </div>
      <div className="w-full border border-gray-300  rounded-xl h-0 mt-2"></div>

      <div className="flex items-center justify-normal gap-5 w-full px-3 p-2 align-middle  ">
        <span>
          <FaStop />
        </span>
        <div className="flex flex-col p-1 ">
          <p className="font-bold text-xl">562/11-A </p>
          <p className="text-base font-normal">{props.destination}</p>
        </div>
      </div>
      <div className="w-full border border-gray-300  rounded-xl h-0 mt-2"></div>

      <div className="flex items-center justify-normal gap-5 w-full px-3 p-2 align-middle  ">
        <span>
          <FaRegCreditCard />
        </span>
        <div className="flex flex-col p-1 ">
          <p className="font-bold text-xl">₹{props.fare[props.vehicleType]}</p>
          <p className="text-base font-normal ">Cash</p>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDrivers;
