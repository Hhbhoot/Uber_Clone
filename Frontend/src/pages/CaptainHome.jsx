import React, { useRef, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import useCaptainAuthContext from "../context/captainAuthContext";
import { TbClockHour3 } from "react-icons/tb";
import { IoSpeedometerOutline } from "react-icons/io5";
import { LuNotebookTabs } from "react-icons/lu";
import GoOnlineButton from "../components/GoOnlineButton";
import { updateDrivingStatus } from "../apis";
import CaptianDetails from "../components/CaptianDetails";
import RideDetailsPopUp from "../components/RideDetailsPopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CaptainHome = () => {
  const { setCaptain, captain, handleCaptainLogout } = useCaptainAuthContext();

  const [openRideDetails, setOpenRideDetails] = useState(true);
  const RideDetailsPanelRef = useRef(null);

  const handleUpdateDriving = async () => {
    try {
      const { data } = await updateDrivingStatus();

      if (data?.status !== "success") throw new Error(data?.message);

      setCaptain(data?.data?.captain);
    } catch (error) {
      console.error(error);
    }
  };

  useGSAP(() => {
    if (openRideDetails) {
      gsap.to(RideDetailsPanelRef.current, {
        transform: "translateY(0)",
        // duration: 1,
      });
    } else {
      gsap.to(RideDetailsPanelRef.current, {
        transform: "translateY(100%)",
        duration: 1,
      });
    }
  }, [openRideDetails]);

  return (
    <div className="h-screen w-full relative overflow-hidden ">
      <img
        src="/img/driverlogo.svg"
        className="absolute w-32 h-20"
        alt="uberlogo"
      />

      <div
        className="absolute top-6 right-4 bg-white p-2  rounded-full cursor-pointer"
        onClick={handleCaptainLogout}
      >
        <FiLogOut className="text-md " />
      </div>

      <div className="absolute top-6 right-[40%]" onClick={handleUpdateDriving}>
        <GoOnlineButton />
      </div>
      <div className="w-full h-[65%]">
        <img
          src="/img/ubermap.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full h-[35%] bg-white p-2 rounded-t-4xl">
        <CaptianDetails />
      </div>

      <div
        ref={RideDetailsPanelRef}
        className="w-full bg-white rounded-t-4xl translate-y-full absolute bottom-0 "
      >
        <RideDetailsPopUp setOpenRideDetails={setOpenRideDetails} />
      </div>
    </div>
  );
};

export default CaptainHome;
