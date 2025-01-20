import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { userTokenCheck } from "../apis";
import useUserAuthContext from "../context/UserAuthContext";

const UserProtectedRoutes = ({ children }) => {
  const { user, setUser, setIsAuth } = useUserAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setIsLoading(false);
        setIsValid(false);
        return;
      }

      try {
        const { data } = await userTokenCheck();
        if (data?.status === "success") {
          setUser(data?.data?.user);
          setIsAuth(true);
          setIsValid(true);
        } else {
          throw new Error(data?.message);
        }
      } catch (err) {
        console.log(err);
        setIsValid(false);
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, [setUser, setIsAuth]);

  if (isLoading) {
    // Show a loader or spinner while validating the token
    return <div>Loading...</div>;
  }

  if (!isValid) {
    return <Navigate to="/user-login" replace />;
  }

  return children;
};

export default UserProtectedRoutes;
