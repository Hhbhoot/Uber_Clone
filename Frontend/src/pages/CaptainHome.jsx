import React, { useEffect, useRef, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import useCaptainAuthContext from "../context/CaptainAuthContext";
import { TbClockHour3 } from "react-icons/tb";
import { IoSpeedometerOutline } from "react-icons/io5";
import { LuNotebookTabs } from "react-icons/lu";
import GoOnlineButton from "../components/GoOnlineButton";
import { confirmRide, startRide, updateDrivingStatus } from "../apis";
import CaptianDetails from "../components/CaptianDetails";
import RideDetailsPopUp from "../components/RideDetailsPopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useSocket } from "../context/SocketContext";
import ConfirmRidePopup from "../components/ConfirmRidePopup";
import { getUserLocation } from "../Utils/GetLocation";
import ConfirmOtp from "../components/ConfirmOtp";
import { useNavigate } from "react-router-dom";
import Map from "./Map";

const CaptainHome = () => {
  const navigate = useNavigate();
  const [rideDetails, setRideDetails] = useState(null);

  const { socket } = useSocket();
  const { setCaptain, captain, handleCaptainLogout } = useCaptainAuthContext();

  const [openRideDetails, setOpenRideDetails] = useState(false);
  const RideDetailsPanelRef = useRef(null);

  const [ConfirmRidePanel, setConfirmRidePanel] = useState(false);
  const ConfirmRidePanelRef = useRef(null);

  const [confirmOTP, setConfirmOTP] = useState(false);
  const confirmOTPRef = useRef(null);

  const [otp, setOtp] = useState("");

  const handleConfirmRide = async () => {
    try {
      const { data } = await confirmRide({ rideId: rideDetails?.newRide?._id });
      if (data?.status !== "success") throw new Error(data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirmOTP = async () => {
    try {
      const { data } = await startRide({
        rideId: rideDetails?.newRide?._id,
        otp,
      });
      if (data?.status !== "success") throw new Error(data?.message);

      setConfirmOTP(false);
      navigate("/captain-riding", {
        state: { rideDetails: rideDetails },
      });
    } catch (error) {
      console.log(error);
    }
  };

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
        duration: 1,
        zIndex: 1,
      });
    } else {
      gsap.to(RideDetailsPanelRef.current, {
        transform: "translateY(100%)",
        duration: 1,
        zIndex: -1,
      });
    }
  }, [openRideDetails]);

  useGSAP(() => {
    if (ConfirmRidePanel) {
      gsap.to(ConfirmRidePanelRef.current, {
        transform: "translateY(0)",
        duration: 1,
        zIndex: 20,
      });
    } else {
      gsap.to(ConfirmRidePanelRef.current, {
        transform: "translateY(100%)",
        duration: 1,
        zIndex: -20,
      });
    }
  }, [ConfirmRidePanel]);

  useGSAP(() => {
    if (confirmOTP) {
      gsap.to(confirmOTPRef.current, {
        transform: "translateY(0)",
        duration: 1,
        zIndex: 20,
      });
    } else {
      gsap.to(confirmOTPRef.current, {
        transform: "translateY(100%)",
        duration: 1,
        zIndex: -20,
      });
    }
  }, [confirmOTP]);

  useEffect(() => {
    if (!socket) return;

    setTimeout(() => {
      socket.emit("join", {
        captainId: captain._id,
        userType: "captain",
      });
    }, 5000);

    // Function to send location to the backend
    const sendLocation = (position) => {
      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      socket.emit("locationUpdate", {
        captainId: captain?._id,
        location,
      });
    };

    socket.on("new-ride", (data) => {
      console.log(data);
      setRideDetails(data);
      setOpenRideDetails(true);
    });

    // Watch user's location
    let watchId;
    if (navigator.geolocation) {
      watchId = navigator.geolocation.getCurrentPosition(
        (position) => {
          sendLocation(position);
        },
        (error) => {
          console.error("Error watching position:", error);
        },
        { enableHighAccuracy: true } // Use high accuracy for better results
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    const intervalId = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(sendLocation);
      }
    }, 5000);

    // Cleanup the socket listeners and geolocation watch
    return () => {
      clearInterval(intervalId);

      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [socket, captain]);

  return (
    <div className="h-screen w-full relative overflow-hidden ">
      <img
        src="/img/driverlogo.svg"
        className="absolute w-32 h-20 z-10 top-16"
        alt="uberlogo"
      />

      <div
        className="absolute top-16 right-4 z-10 bg-white p-2  rounded-full cursor-pointer"
        onClick={handleCaptainLogout}
      >
        <FiLogOut className="text-md " />
      </div>

      <div
        className="absolute  top-16 right-[40%] z-10"
        onClick={handleUpdateDriving}
      >
        <GoOnlineButton />
      </div>
      <div className="w-full h-full -z-0 ">
        <Map />
        {/* <img
          src="/img/ubermap.png"
          alt=""
          className="w-full h-full object-cover"
        /> */}
      </div>

      <div className="w-full absolute  bg-white p-2 z-0 bottom-0 rounded-t-4xl">
        <CaptianDetails />
      </div>

      <div
        ref={RideDetailsPanelRef}
        className="w-full bg-white rounded-t-4xl translate-y-full absolute bottom-0 "
      >
        <RideDetailsPopUp
          setOpenRideDetails={setOpenRideDetails}
          setConfirmRidePanel={setConfirmRidePanel}
          rideDetails={rideDetails}
        />
      </div>

      <div
        ref={ConfirmRidePanelRef}
        className="w-full bg-white rounded-t-4xl h-screen translate-y-full  absolute bottom-0 "
      >
        <ConfirmRidePopup
          rideDetails={rideDetails}
          setConfirmRidePanel={setConfirmRidePanel}
          handleConfirmRide={handleConfirmRide}
          setConfirmOTP={setConfirmOTP}
        />
      </div>

      <div
        ref={confirmOTPRef}
        className="w-full bg-white rounded-t-4xl h-screen translate-y-full  absolute bottom-0 "
      >
        <ConfirmOtp
          setOtp={setOtp}
          handleConfirmOTP={handleConfirmOTP}
          rideDetails={rideDetails}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
