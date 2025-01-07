import React from "react";
import { FaLocationDot, FaStop, FaRegCreditCard } from "react-icons/fa6";

const VehicleDetailsPage = (props) => {
  return (
    <div className="flex flex-col items-center w-full  p-3 mt-3">
      <img
        src={`${
          props.vehicleType === "Car"
            ? " /img/car.webp"
            : props.vehicleType === "Motorcycle"
            ? " /img/moto.webp"
            : "/img/auto.webp"
        } `}
        className="w-32"
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
          <p className="font-bold text-xl">₹ {props.fare[props.vehicleType]}</p>
          <p className="text-base font-normal ">Cash</p>
        </div>
        s
      </div>

      <button
        className="bg-black mt-2 w-full  text-center  hover:bg-gray-700 text-white font-bold  text-xl py-2 px-8 rounded-md"
        onClick={() => {
          props.setLookingForDriver(true);
          props.setvehicleDetailsOpen(false);
        }}
      >
        Confirm
      </button>
    </div>
  );
};

export default VehicleDetailsPage;
