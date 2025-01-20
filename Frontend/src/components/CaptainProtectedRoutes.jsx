import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { captainTokenCheck } from "../apis";
import useCaptainAuthContext from "../context/CaptainAuthContext";

const CaptainProtectedRoutes = ({ children }) => {
  const { setCaptain } = useCaptainAuthContext();
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
        const { data } = await captainTokenCheck();

        if (data?.status === "success") {
          setCaptain(data?.data?.captain); // Update captain data in context
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
  }, [setCaptain]);

  if (isLoading) {
    // Show a loader or spinner while validating the token
    return <div>Loading...</div>;
  }

  if (!isValid) {
    return <Navigate to="/captain-login" replace />;
  }

  return children;
};

export default CaptainProtectedRoutes;
