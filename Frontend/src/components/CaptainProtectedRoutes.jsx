import React from "react";
import { captainTokenCheck } from "../apis";
import { Navigate } from "react-router-dom";

const CaptainProtectedRoutes = () => {
  const validateToken = async () => {
    try {
      const { data } = await captainTokenCheck();

      if (data?.status !== "success") throw new Error(data?.message);

      return true;
    } catch (err) {
      console.log(err);
      return <Navigate to="/captain-login" replace={true} />;
    }
  };

  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/captain-login" replace={true} />;
  }

  if (token) {
    const checkToken = validateToken();
    if (checkToken) {
      return children;
    }
  }
};

export default CaptainProtectedRoutes;
