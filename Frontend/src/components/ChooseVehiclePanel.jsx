import React from "react";
import { FaUser } from "react-icons/fa";

const ChooseVehiclePanel = (props) => {
  return (
    <div className="flex flex-col items-start gap-y-4 p-3">
      <h4 className="text-2xl text-start font-medium mt-3">Choose a Vehicle</h4>

      <div
        className="flex items-start justify-between mt-4 gap-x-3 w-full border border-gray-400 p-3 rounded-xl active:border-black"
        onClick={(e) => {
          props.setVehicleType("Car");
          props.setvehicleDetailsOpen(true);
          props.setvehiclePanelOpen(false);
        }}
      >
        <img src="/img/car.webp" className="w-16 mt-3" alt="car" />
        <div className="flex flex-col gap-y-[2px] text-sm w-[50%]">
          <p className="font-bold flex items-center gap-2">
            UberGo{" "}
            <span className="flex items-center gap-1">
              <FaUser text="sm" /> 4
            </span>
          </p>
          <p className="text-normal">2 Mins Away</p>
          <p className="text-nowrap">Affordable , Compact Rides</p>
        </div>
        <p className="text-nowrap font-medium">₹{props.fare.Car || 0}</p>
      </div>

      <div
        className="flex items-start justify-between mt-4 gap-x-3 w-full border border-gray-400 p-3 rounded-xl"
        onClick={(e) => {
          props.setVehicleType("Auto");
          props.setvehicleDetailsOpen(true);
          props.setvehiclePanelOpen(false);
        }}
      >
        <img src="/img/auto.webp" className="w-16 mt-3" alt="car" />
        <div className="flex flex-col gap-y-[2px] text-sm w-[50%]">
          <p className="font-bold flex items-center gap-2">
            UberGo{" "}
            <span className="flex items-center gap-1">
              <FaUser text="sm" /> 4
            </span>
          </p>
          <p className="text-normal">2 Mins Away</p>
          <p className="text-nowrap">Affordable , Compact Rides</p>
        </div>
        <p className="text-nowrap font-medium">₹{props.fare?.Auto || 0}</p>
      </div>

      <div
        className="flex items-start justify-between mt-4 gap-x-3 w-full border border-gray-400 p-3 rounded-xl"
        onClick={(e) => {
          props.setvehicleDetailsOpen(true);
          props.setvehiclePanelOpen(false);
          props.setVehicleType("Motorcycle");
        }}
      >
        <img src="/img/moto.webp" className="w-16 mt-3" alt="car" />
        <div className="flex flex-col gap-y-[2px] text-sm w-[50%]">
          <p className="font-bold flex items-center gap-2">
            UberGo{" "}
            <span className="flex items-center gap-1">
              <FaUser text="sm" /> 4
            </span>
          </p>
          <p className="text-normal">2 Mins Away</p>
          <p className="text-nowrap">Affordable , Compact Rides</p>
        </div>
        <p className="text-nowrap font-medium">₹{props.fare.Motorcycle || 0}</p>
      </div>
    </div>
  );
};

export default ChooseVehiclePanel;
