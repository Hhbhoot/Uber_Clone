import React from "react";

const RideDetailsPopUp = (props) => {
  const rideDetails = props.rideDetails?.newRide;
  const userDetails = props?.rideDetails?.user;

  return (
    <div className="mx-1">
      <div className="text-xl font-bold p-4">
        <h1 className="text-start">New Ride Available !</h1>
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
        <div className="flex  flex-col items-start  p-4 border-bs  w-full">
          <p className="text-gray-600 font-medium">Destination</p>
          <p className="text-gray-600 font-normal">
            {" "}
            {rideDetails?.destination}
          </p>
        </div>
        <div className="flex items-center justify-around gap-4 w-full p-4">
          <button
            className="font-medium text-white w-full bg-green-500 px-8 py-2 rounded-xl"
            onClick={() => {
              props.setConfirmRidePanel(true);
              props.setOpenRideDetails(false);
            }}
          >
            Accept
          </button>
          <button
            className="font-medium text-white w-full bg-gray-800 px-8 py-2 rounded-xl"
            onClick={() => props.setOpenRideDetails(false)}
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default RideDetailsPopUp;
