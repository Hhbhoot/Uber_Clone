import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { userLogin } from "../apis";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: "",
    password: "",
  });

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
      const { data } = await userLogin({ email, password });

      if (data?.status !== "success") {
        toast.error("Invalid email or password", { id: toastId });
      }

      toast.success("Logged in successfully!", { id: toastId });
    } catch (error) {}
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
            <div className="flex flex-col py-2">
              <label htmlFor="email" className="text-xl font-medium">
                What's Your Email
              </label>
              <input
                type="email"
                required
                name="email"
                value={email}
                placeholder="example@gmail.com"
                onChange={handleInputChange}
                className="w-full shadow-md mt-3 bg-[#eee] rounded-md px-4 py-2  focus:outline-none"
              />
            </div>
            <div className="flex flex-col py-2">
              <label htmlFor="password" className="text-xl font-medium">
                Enter Your Password
              </label>
              <input
                type="password"
                required
                name="password"
                value={password}
                placeholder="Password"
                onChange={handleInputChange}
                className="w-full shadow-md mt-3 bg-[#eee] rounded-md px-4 py-2 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-4 bg-black  text-white py-2 text-xl font-semibold rounded-md"
            >
              Login
            </button>
          </form>

          <div className="flex items-center justify-center mt-10">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-2 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
        </div>

        <div className="mb-16">
          <Link
            to="/captain-login"
            className="inline-block text-center w-full mt-4 bg-[#10b461] text-white py-2 text-xl font-semibold rounded-md"
          >
            Sign In as Captain
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
