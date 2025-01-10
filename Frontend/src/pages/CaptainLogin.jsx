import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { captainLogin } from "../apis";
import useCaptainAuthContext from "../context/captainAuthContext";

const CaptainLogin = () => {
  const { setIsAuth, setCaptain } = useCaptainAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("logging in...");
    setLoading(true);
    try {
      const { data } = await captainLogin({ email, password });

      if (data.status !== "success") {
        throw new Error(data.message);
      }

      setEmail("");
      setPassword("");
      setCaptain(data.data.captain);
      setIsAuth(true);
      localStorage.setItem("authToken", data.data.token);
      localStorage.setItem("captain", JSON.stringify(data.data.captain));

      setTimeout(() => {
        navigate("/captain-home");
      }, 200);

      toast.success("Logged in successfully!", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("Invalid email or password", { id: toastId });
    } finally {
      setLoading(false);
    }
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
            </div>
            <button
              disabled={loading}
              type="submit"
              className="w-full mt-4 bg-black  text-white py-2 text-xl font-semibold rounded-md"
            >
              Login
            </button>

            <p className="px-4 text-center mt-2">
              Join a fleet ?{" "}
              <Link
                to="/captain-signup"
                className="hover:underline hover:underline-offset-2 text-blue-600"
              >
                Register as a Captain
              </Link>
            </p>
          </form>

          <div className="flex items-center justify-center mt-10">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-2 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
        </div>
        <div className="mb-16">
          <Link
            to="/user-login"
            className="inline-block text-center w-full mt-4 bg-[#d5622d] text-white py-2 text-xl font-semibold rounded-md"
          >
            Sign In as User
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CaptainLogin;
