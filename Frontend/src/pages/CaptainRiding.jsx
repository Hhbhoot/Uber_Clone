import React, { useEffect, useRef, useState } from "react";
import Map from "./Map";
import { useLocation, useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useSocket } from "../context/SocketContext";
import { FaRegCreditCard, FaStop } from "react-icons/fa";
import useCaptainAuthContext from "../context/CaptainAuthContext";
import { endRide } from "../apis";
import toast from "react-hot-toast";

const CaptainRiding = () => {
  const navigate = useNavigate();
  const { captain } = useCaptainAuthContext();
  const { socket } = useSocket();
  const location = useLocation();
  const { rideDetails } = location.state || {};

  console.log(captain.socketId);

  console.log("rideDetails", rideDetails);

  const [finishRide, setFinishRide] = useState(false);
  const finishRideRef = useRef(null);

  useEffect(() => {
    if (!socket) return;

    socket.on("finish-ride", (data) => {
      console.log("finish-ride", data);
      setFinishRide(true);
    });
  }, [socket]);

  useGSAP(() => {
    if (finishRide) {
      gsap.to(finishRideRef.current, {
        duration: 1,
        transform: "translateX(0)",
      });
    } else {
      gsap.to(finishRideRef.current, {
        duration: 1,
        transform: "translateX(100%)",
      });
    }
  }, [finishRide]);

  const handleFinishRide = async () => {
    try {
      const { data } = await endRide({ rideId: rideDetails?.newRide?._id });
      if (data?.status !== "success") throw new Error(data?.message);
      toast.success("Ride Finished Successfully!");

      navigate("/captain-home");
    } catch (error) {
      console.log(error);
      toast.error("Failed to finish ride");
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <Map />

      <div
        className="absolute bottom-0 w-full bg-white translate-y-full"
        ref={finishRideRef}
      >
        <div className="flex flex-col justify-between items-center py-4  border-gray-200">
          <div className="text-lg font-bold text-start  ">Ride Finished!</div>
          <div className="flex flex-col items-center justify-between py-5 w-full p-5 rounded-t-2xl">
            <div className="flex items-center justify-normal gap-2 px-3 w-full">
              <div className="flex items-center justify-normal gap-2 w-full">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/8/86/Driver_Dave_Marshall_The_Friendly_Bus_Driver.jpg"
                  className="w-10 h-10 rounded-full"
                  alt=""
                />
                <h1 className="text-base font-bold">
                  {rideDetails?.user?.fullName.firstName}{" "}
                  {rideDetails?.user?.fullName.lastName}
                </h1>
              </div>
              <p className="text-xl font-semibold text-gray-500 text-nowrap">
                {Math.ceil(rideDetails?.newRide?.distance / 1000)} KM
              </p>
            </div>

            <div className="w-full border border-gray-300  rounded-xl h-0 mt-4"></div>

            <div className="flex items-center justify-normal gap-5 w-full px-3 p-2 align-middle  ">
              <span>
                <FaStop />
              </span>
              <div className="flex flex-col p-1 ">
                <p className="font-bold text-xl">562/11-A </p>
                <p className="text-base font-normal">
                  {rideDetails?.newRide?.destination}
                </p>
              </div>
            </div>

            <div className="w-full border border-gray-300  rounded-xl h-0 mt-2"></div>
            <div className="flex items-center justify-normal gap-5 w-full px-3 p-2 align-middle  ">
              <span>
                <FaRegCreditCard />
              </span>
              <div className="flex flex-col p-1 ">
                <p className="font-bold text-xl">
                  ₹{rideDetails?.newRide?.fare}
                </p>
                <p className="text-base font-normal ">Cash</p>
              </div>
            </div>

            <button
              className="bg-green-500 text-white p-3 text-base rounded-xl mt-5 w-full"
              onClick={handleFinishRide}
            >
              Finish Ride
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainRiding;
