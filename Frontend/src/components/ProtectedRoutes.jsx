import { Navigate } from "react-router-dom";
import React from "react";

const ProtectedRoutes = (isAuth, children) => {
  return isAuth ? children : <Navigate to={<Login />} />;
};

export default ProtectedRoutes;
