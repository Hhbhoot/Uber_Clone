import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full h-screen">
      <div className="bg-[url('/img/bg1.webp')] bg-cover bg-center w-full h-screen object-top">
        <div className="flex flex-col justify-between h-screen ">
          <div className="text-white flex-grow">
            <img src="/img/whiteLogo.png" className="w-44" alt="" />
          </div>
          <div className="bg-white flex flex-col py-10  items-center justify-center">
            <p className="text-3xl  font-bold">Get Started With Uber</p>{" "}
            <Link
              to={"/user-login"}
              className="bg-black mb-6  text-center  hover:bg-gray-700 text-white font-bold mt-4 text-xl py-2 px-8 rounded-md"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
