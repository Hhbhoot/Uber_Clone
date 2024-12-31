import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import SearchLocationSuggestion from "../components/SearchLocationSuggestion";

const Home = () => {
  const [pickup, setpickup] = useState("");
  const [destination, setdestination] = useState("");
  const [panelOpen, setpanelOpen] = useState(false);
  const panelRef = useRef(null);
  const closePanelRef = useRef(null);

  const handleChange = (e) => {
    if (e.target.name === "pickup") {
      setpickup(e.target.value);
    } else if (e.target.name === "destination") {
      setdestination(e.target.value);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
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

  return (
    <div className="h-screen w-full relative">
      <img
        src="/img/blackLogo.png"
        className="absolute w-32 h-20"
        alt="uberlogo"
      />

      <div className="w-full h-screen">
        <img
          src="/img/ubermap.png"
          alt=""
          className="w-full h-screen object-cover"
        />
      </div>
      <div className="flex flex-col justify-end absolute w-full h-screen bottom-0">
        <div className="p-6  w-full bg-white   relative">
          <div
            className="absolute right-6 top-6"
            ref={closePanelRef}
            onClick={() => setpanelOpen(!panelOpen)}
          >
            <MdOutlineKeyboardArrowDown className="text-2xl" />
          </div>
          <h4 className="text-xl font-semibold"> Find a Trip</h4>

          <form
            className="flex flex-col gap-y-3 mt-5 relative"
            onSubmit={submitHandler}
          >
            <div className=" absolute w-3 h-3 left-[10.5px] top-[16%] bg-black rounded-full"></div>
            <div className=" absolute w-3 h-3 left-[10.5px] top-[76%] bg-black rounded-full"></div>
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
          </form>
        </div>
        <div ref={panelRef} className="h-0 w-full bg-white">
          <SearchLocationSuggestion />
        </div>
      </div>
    </div>
  );
};

export default Home;
