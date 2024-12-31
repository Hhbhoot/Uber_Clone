import { Navigate } from "react-router-dom";
import React from "react";
import { userTokenCheck } from "../apis";

const UserProtectedRoutes = ({ children }) => {
  const validateToken = async () => {
    try {
      const { data } = await userTokenCheck();

      if (data?.status !== "success") throw new Error(data?.message);

      return true;
    } catch (err) {
      console.log(err);
      return <Navigate to="/user-login" replace={true} />;
    }
  };

  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/user-login" replace={true} />;
  }

  if (token) {
    const checkToken = validateToken();
    if (checkToken) {
      return children;
    }
  }

  // return isAuth ? children : <Navigate to={<Login />} />;
};

export default UserProtectedRoutes;
