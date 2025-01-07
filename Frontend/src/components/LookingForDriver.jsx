import React from "react";
import { FaLocationDot, FaStop, FaRegCreditCard } from "react-icons/fa6";
import "../assets/css/loader.css";

const LookingForDriver = (props) => {
  return (
    <div className="flex flex-col items-center w-full  p-3 mt-3">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-xl font-bold">Looking For A Driver</h1>
        <div className="loader text-sm my-1"></div>
      </div>

      <img
        src={`${
          props.vehicleType === "Car"
            ? " /img/car.webp"
            : props.vehicleType === "Motorcycle"
            ? " /img/moto.webp"
            : "/img/auto.webp"
        } `}
        className="w-32 mt-2"
        alt=""
      />
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

export default LookingForDriver;
