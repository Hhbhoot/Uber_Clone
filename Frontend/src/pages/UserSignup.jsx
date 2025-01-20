import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { userSignup } from "../apis";
import useUserAuthConext from "../context/UserAuthContext";

const UserSignup = () => {
  const navigate = useNavigate();
  const { setUser, setIsAuth } = useUserAuthConext();
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

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

    const userData = {
      fullName: {
        firstName,
        lastName,
      },
      email,
      password,
    };

    const toastId = toast.loading("Signing up...");
    setLoading(true);

    try {
      const { data } = await userSignup(userData);

      if (data?.status !== "success") {
        throw new Error(data?.message);
      }

      toast.success("User signed up successfully...", {
        id: toastId,
      });

      setIsAuth(true);
      setUser(data?.data?.user);
      localStorage.setItem("authToken", data?.data?.token);

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/home");
      }, 200);
    } catch (err) {
      console.error(err);
      toast.error("Failed to sign up...", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen px-4">
      <div className="flex flex-col justify-between h-screen">
        <div className="flex flex-col">
          <img
            src="/img/blackLogo.png"
            className=" -ml-8 w-44 h-24"
            alt="uber-logo"
          />
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
            <div className="flex flex-col py-1">
              <label
                htmlFor="firstName"
                className="text-base md:text-xl font-medium"
              >
                What's Your Name
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
                What's Your Email
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
                to="/user-login"
                className="hover:underline hover:underline-offset-2 text-blue-600"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
        <div className="mb-20">
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

export default UserSignup;
