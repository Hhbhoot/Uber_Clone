import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { captainSignup } from "../apis";
import useCaptainAuthContext from "../context/CaptainAuthContext";

const CaptainSignup = () => {
  const { setIsAuth, setCaptain } = useCaptainAuthContext();
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicle, setVehicle] = useState({
    plate: "",
    color: "",
    capacity: "",
    type: "",
  });

  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);

    setVehicle({
      ...vehicle,
      type: selectedOption.value,
    });
  };

  const options = [
    { value: "Car", label: "Car" },
    { value: "Auto", label: "Auto" },
    { value: "Motorcycle", label: "Motorcycle" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const captainData = {
      fullName: {
        firstName,
        lastName,
      },
      email,
      password,
      vehicle,
    };

    setLoading(true);
    const toastId = toast.loading("Captain signing up...");

    try {
      const { data } = await captainSignup(captainData);

      if (data?.status !== "success") {
        throw new Error(data?.message);
      }

      toast.success("Captain signed up successfully!", {
        id: toastId,
      });

      setEmail("");
      setPassword("");
      setVehicle({
        plate: "",
        color: "",
        capacity: "",
        type: "",
      });
      setFirstName("");
      setLastName("");

      setIsAuth(true);
      setCaptain(data?.data?.captain);
      localStorage.setItem("authToken", data?.data?.token);

      setTimeout(() => {
        navigate("/captain-home");
      }, 200);
    } catch (err) {
      console.error(err);
      toast.error("Error signing up captain!", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      borderColor: "none",
      boxShadow: "none",
      backgroundColor: "none",
      "&:hover": { borderColor: "darkblue" },
    }),
    option: (base, { isFocused }) => ({
      ...base,
      backgroundColor: isFocused ? "lightblue" : "#eeeeee",
      color: "black",
    }),
  };

  return (
    <div className="w-full h-screen px-4">
      <div className="flex flex-col justify-between h-screen">
        <div className="flex flex-col">
          <img
            src="/img/driverlogo.svg"
            className=" -ml-8 w-60 h-24"
            alt="uber-logo"
          />
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
            <div className="flex flex-col py-1">
              <label
                htmlFor="firstName"
                className="text-base md:text-xl font-medium"
              >
                What's Our Captain Name
              </label>
              <div className="flex gap-4">
                <input
                  type="firstName"
                  required
                  name="firstName"
                  value={firstName}
                  placeholder="First Name"
                  onChange={handleInputChange}
                  className="w-full shadow-md mt-2 bg-[#eee] rounded-md px-4 py-2  focus:outline-none"
                />
                <input
                  type="lastName"
                  required
                  name="lastName"
                  value={lastName}
                  placeholder="Last Name"
                  onChange={handleInputChange}
                  className="w-full shadow-md mt-2 bg-[#eee] rounded-md px-4 py-2  focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col py-1">
              <label
                htmlFor="email"
                className="text-base md:text-xl font-medium"
              >
                What's Our Captain Email
              </label>
              <input
                type="email"
                required
                name="email"
                value={email}
                placeholder="example@gmail.com"
                onChange={handleInputChange}
                className="w-full shadow-md mt-2 bg-[#eee] rounded-md px-4 py-2  focus:outline-none"
              />

              {/* {
                 <div className="text-red-500 h-4 py-1 px-2 text-sm">
                   {error?.email}
                 </div>
               } */}
            </div>
            <div className="flex flex-col py-1">
              <label
                htmlFor="password"
                className="text-base md:text-xl font-medium"
              >
                Enter Your Password
              </label>
              <input
                type="password"
                required
                name="password"
                value={password}
                placeholder="Password"
                onChange={handleInputChange}
                className="w-full shadow-md mt-2 bg-[#eee] rounded-md px-4 py-2 focus:outline-none"
              />
              {/* {
                 <div className="text-red-500 h-4 py-1 px-2 text-sm">
                   {error?.password}
                 </div>
               } */}
            </div>

            <div className="flex flex-col py-1">
              <label
                htmlFor="vehicleDetails"
                className="text-base md:text-xl font-medium"
              >
                Vehicle Info
              </label>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  name="plate"
                  placeholder="Plate No"
                  className="w-full shadow-md mt-2 bg-[#eee] rounded-md px-4 py-2 focus:outline-none"
                  required
                  onChange={(e) => {
                    setVehicle({
                      ...vehicle,
                      plate: e.target.value,
                    });
                  }}
                />
                <input
                  type="text"
                  name="color"
                  placeholder="Color"
                  className="w-full shadow-md mt-2 bg-[#eee] rounded-md px-4 py-2 focus:outline-none"
                  required
                  onChange={(e) => {
                    setVehicle({
                      ...vehicle,
                      color: e.target.value,
                    });
                  }}
                />
                <input
                  type="number"
                  name="capacity"
                  placeholder="capacity"
                  className="w-full shadow-md mt-2 bg-[#eee] rounded-md px-4 py-2 focus:outline-none"
                  required
                  onChange={(e) => {
                    setVehicle({
                      ...vehicle,
                      capacity: e.target.value,
                    });
                  }}
                />
                <Select
                  options={options}
                  className="w-full shadow-md mt-2 bg-[#eee] rounded-md px-4 py-2 focus:outline-none"
                  value={selectedOption}
                  onChange={handleChange}
                  placeholder="Type"
                  styles={customStyles}
                />
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full mt-4 bg-black  text-white py-2 text-xl font-semibold rounded-md"
            >
              Sign Up
            </button>

            <p className="px-4 text-center mt-2">
              Already have an Account ?{" "}
              <Link
                to="/captain-login"
                className="hover:underline hover:underline-offset-2 text-blue-600"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
        <div className="mb-10">
          <p className="text-xs text-center leading-tight">
            This site is protected by reCAPTCHA and the{" "}
            <span className="underline ">Google Privacy Policy</span> and{" "}
            <span className="underline">Terms of Service apply</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;
