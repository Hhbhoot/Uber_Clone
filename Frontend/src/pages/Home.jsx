import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import SearchLocationSuggestion from "../components/SearchLocationSuggestion";
import { confirmRideBooking, getFareDetails, getSuggestions } from "../apis";
import toast from "react-hot-toast";
import ChooseVehiclePanel from "../components/ChooseVehiclePanel";
import VehicleDetailsPage from "../components/VehicleDetailsPage";
import LookingForDriver from "../components/LookingForDriver";
import { useSocket } from "../context/SocketContext";
import useUserAuthConext from "../context/userAuthContext";
import { FiLogOut } from "react-icons/fi";

const Home = () => {
  const { socket } = useSocket();
  const { user, handleUserLogout } = useUserAuthConext();

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      console.log("Connected to the server");
    });

    if (user && user._id) {
      socket.emit("join", {
        userId: user._id,
        userType: "user",
      });
    } else {
      console.error("User or user._id is not available");
    }

    socket.on("disconnect", () => {
      console.log("Disconnected from the server");
    });

    const sendLocation = (position) => {
      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      socket.emit("locationUpdate", {
        userId: user?._id,
        location,
      });
    };

    let watchId;
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
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

    // Cleanup the socket listeners
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [socket, user]);

  const [pickup, setpickup] = useState("");
  const [destination, setdestination] = useState("");
  const [currentField, setCurrentField] = useState("");
  const [isSelecting, setIsSelecting] = useState(false);

  const [panelOpen, setpanelOpen] = useState(false);
  const panelRef = useRef(null);
  const closePanelRef = useRef(null);

  const [vehiclePanelOpen, setvehiclePanelOpen] = useState(false);
  const vehiclePanelRef = useRef(null);

  const [suggestions, setsuggestions] = useState([]);

  const [vehicleDetailsOpen, setvehicleDetailsOpen] = useState(false);
  const vehicleDetailsRef = useRef(null);

  const [lookingForDriver, setLookingForDriver] = useState(false);
  const lookingForDriverRef = useRef(null);

  const [fare, setFare] = useState({});
  const [distance, setDistance] = useState("");

  const [vehicleType, setVehicleType] = useState("");

  const getTimeAndDistance = async () => {
    if (!pickup || !destination) {
      toast.error("Please enter pickup and destination");
    }

    if (pickup === destination) {
      toast.error("Pickup and destination cannot be the same");
    }

    const dataToSend = {
      pickup,
      destination,
    };

    try {
      const { data } = await getFareDetails(dataToSend);

      if (data?.status !== "success") {
        throw new Error(data?.message);
      }

      setFare(data?.data?.fares);
      setDistance(data?.data?.distance);
    } catch (err) {
      console.error(err);
    }
  };

  const getPlaceSuggestions = async (input) => {
    if (isSelecting) {
      return;
    }

    if (!input) {
      setsuggestions([]);
      return;
    }

    if (input.length < 3) {
      setsuggestions([]);
      return;
    }

    try {
      const { data } = await getSuggestions(input);
      setsuggestions(data?.data?.suggestions);
    } catch (err) {
      setsuggestions([]);
      console.error(err);
    }
  };

  useEffect(() => {
    getPlaceSuggestions(pickup);
  }, [pickup]);

  useEffect(() => {
    getPlaceSuggestions(destination);
  }, [destination]);

  const handleChange = (e) => {
    if (e.target.name === "pickup") {
      setCurrentField("pickup");
      setpickup(e.target.value);
    } else if (e.target.name === "destination") {
      setCurrentField("destination");
      setdestination(e.target.value);
    }
  };

  const handleSuggestionClick = (value, type) => {
    if (type === "pickup") {
      setpickup(value);
    } else if (type === "destination") {
      setdestination(value);
    }
    setsuggestions([]); // Clear suggestions after selection.
    setIsSelecting(true); // Prevent immediate re-fetch.

    // Allow fetching again after a short delay.
    setTimeout(() => setIsSelecting(false), 300);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!pickup || !destination) {
      toast.error("Please enter both pickup and destination.");
      return;
    }
    setpanelOpen(false);
    setvehiclePanelOpen(true);

    getTimeAndDistance();
  };

  const confirmRide = async () => {
    try {
      const { data } = await confirmRideBooking({
        pickup,
        destination,
        vehicleType,
      });

      if (data?.status !== "success") {
        toast.error(data?.message || "Failed to confirm ride.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          duration: 0.5,
          height: "70%",
        });

        gsap.to(closePanelRef.current, {
          duration: 0.5,
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          duration: 0.5,
          height: "0%",
        });
        gsap.to(closePanelRef.current, {
          duration: 0.5,
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanelOpen) {
        gsap.to(vehiclePanelRef.current, {
          duration: 0.5,
          height: "70%",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          duration: 0.5,
          height: "0%",
        });
      }
    },
    [vehiclePanelOpen]
  );

  useGSAP(
    function () {
      if (vehicleDetailsOpen) {
        gsap.to(vehicleDetailsRef.current, {
          duration: 0.5,
          height: "70%",
        });
      } else {
        gsap.to(vehicleDetailsRef.current, {
          duration: 0.5,
          height: "0%",
        });
      }
    },
    [vehicleDetailsOpen]
  );

  useGSAP(
    function () {
      if (lookingForDriver) {
        gsap.to(lookingForDriverRef.current, {
          duration: 0.5,
          height: "70%",
        });
      } else {
        gsap.to(lookingForDriverRef.current, {
          duration: 0.5,
          height: "0%",
        });
      }
    },
    [lookingForDriver]
  );

  return (
    <div className="h-screen w-full relative overflow-hidden ">
      <img
        src="/img/blackLogo.png"
        className="absolute w-32 h-20"
        alt="uberlogo"
      />

      <div
        className="absolute top-6 right-4 bg-white p-2 z-10  rounded-full cursor-pointer"
        onClick={handleUserLogout}
      >
        <FiLogOut className="text-md " />
      </div>

      <div className="">
        <img
          src="/img/ubermap.png"
          alt=""
          className="w-full h-screen object-cover"
        />
      </div>
      <div className="flex flex-col justify-end absolute w-full h-screen bottom-0">
        <div className="p-6  w-full bg-white    relative">
          <div
            className="absolute right-6 top-6"
            ref={closePanelRef}
            onClick={() => {
              setpanelOpen(!panelOpen);
              setsuggestions([]);
            }}
          >
            <MdOutlineKeyboardArrowDown className="text-2xl" />
          </div>
          <h4 className="text-xl font-semibold"> Find a Trip</h4>

          <form
            className="flex flex-col gap-y-3 mt-5 relative"
            onSubmit={submitHandler}
          >
            <div className=" absolute w-3 h-3 left-[10.5px] top-[12%] bg-black rounded-full"></div>
            <div className=" absolute w-3 h-3 left-[10.5px] top-[51%] bg-black rounded-full"></div>
            <div className="line absolute h-[70px] left-4 top-[16%]  border border-black"></div>
            <input
              type="text"
              className="w-full bg-[#eee] px-12 py-3 rounded-md"
              placeholder="Add a pickup location "
              name="pickup"
              value={pickup}
              onChange={handleChange}
              onClick={(e) => {
                setpanelOpen(true);
              }}
            />

            <input
              type="text"
              className="w-full bg-[#eee] px-12 py-3 rounded-md"
              placeholder="Add a destination location"
              name="destination"
              value={destination}
              onChange={handleChange}
              onClick={(e) => {
                setpanelOpen(true);
              }}
            />

            <button
              type="submit"
              className="bg-black text-white font-medium px-12 py-3 rounded-md"
            >
              Find a trip
            </button>
          </form>
        </div>
        <div ref={panelRef} className="h-0 w-full bg-white">
          <SearchLocationSuggestion
            suggestions={suggestions}
            currentField={currentField}
            handleSuggestionClick={handleSuggestionClick}
          />
        </div>
      </div>

      <div
        ref={vehiclePanelRef}
        className="fixed bottom-0 z-10 w-full   bg-[#fff] rounded-t-3xl "
      >
        <ChooseVehiclePanel
          setvehiclePanelOpen={setvehiclePanelOpen}
          setvehicleDetailsOpen={setvehicleDetailsOpen}
          fare={fare}
          distance={distance}
          setVehicleType={setVehicleType}
        />
      </div>

      <div
        ref={vehicleDetailsRef}
        className="fixed bottom-0 z-10 w-full   bg-[#fff] rounded-t-3xl "
      >
        <VehicleDetailsPage
          setvehicleDetailsOpen={setvehicleDetailsOpen}
          setLookingForDriver={setLookingForDriver}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          confirmRide={confirmRide}
        />
      </div>

      <div
        ref={lookingForDriverRef}
        className="fixed bottom-0 z-10 w-full   bg-[#fff] rounded-t-3xl "
      >
        <LookingForDriver
          vehicleType={vehicleType}
          pickup={pickup}
          destination={destination}
          fare={fare}
        />
      </div>
    </div>
  );
};

export default Home;
