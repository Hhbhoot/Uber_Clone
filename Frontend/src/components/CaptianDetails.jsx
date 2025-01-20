import React, { useEffect, useState } from "react";
import { IoSpeedometerOutline } from "react-icons/io5";
import { LuNotebookTabs } from "react-icons/lu";
import { TbClockHour3 } from "react-icons/tb";
import useCaptainAuthContext from "../context/CaptainAuthContext";
import { captainRideHistory } from "../apis";

const CaptianDetails = () => {
  const { captain } = useCaptainAuthContext();

  const [details, setDetails] = useState(null);

  const fetchDetails = async () => {
    try {
      const { data } = await captainRideHistory();

      if (data?.status !== "success") throw new Error(data?.message);

      setDetails(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-start mx-2 mt-2 py-2">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-normal gap-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/86/Driver_Dave_Marshall_The_Friendly_Bus_Driver.jpg"
              className="w-10 h-10 rounded-full"
              alt=""
            />
            <h4 className="text-base font-medium">
              {captain?.fullName?.firstName} {captain?.fullName?.lastName}
            </h4>
          </div>
          <div className="">
            <h4 className="text-[14px] font-medium">
              ₹{details?.totlaEarning}
            </h4>
            <p className="text-[12px]">Earned</p>
          </div>
        </div>
      </div>

      <div className=" flex items-center justify-between  mt-4 bg-[#eee] mx-2 p-4 rounded-xl ">
        <div className="flex flex-col gap-y-1 items-center justify-center">
          <TbClockHour3 className="text-2xl" />
          <p className="text-gray-800 font-medium text-base">
            {Math.ceil(details?.timeInHours)}
          </p>
          <p className="text-gray-800 text-sm">Hour's Online</p>
        </div>
        <div className="flex flex-col gap-y-1 items-center justify-center">
          <IoSpeedometerOutline className="text-2xl" />
          <p className="text-gray-800 font-medium text-base">
            {Math.ceil(details?.totalDistanceInKm)} KM
          </p>
          <p className="text-gray-800 text-sm">Total Distance</p>
        </div>
        <div className="flex flex-col gap-y-1 items-center justify-center">
          <LuNotebookTabs className="text-2xl" />
          <p className="text-gray-800 font-medium text-base">
            {details?.rides}
          </p>
          <p className="text-gray-800 text-sm">Total Ride</p>
        </div>
      </div>
    </div>
  );
};

export default CaptianDetails;
