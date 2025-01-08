import { createContext, useContext, useEffect, useState } from "react";
import { captainLogut, captainTokenCheck } from "../apis";
import { useNavigate } from "react-router-dom";

const CaptainAuthContext = createContext();

const useCaptainAuthContext = () => useContext(CaptainAuthContext);

export const CaptainAuthConextProvider = ({ children }) => {
  const [captain, setCaptain] = useState();
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  const handleCaptainLogout = async () => {
    const token = localStorage.getItem("authToken");

    if (token) {
      const { data } = await captainLogut();
      if (data?.status !== "success") {
        throw new Error(data?.message);
      }
      localStorage.removeItem("authToken");
      setIsAuth(false);
      setCaptain(null);

      navigate("/captain-login");
    }
  };

  return (
    <CaptainAuthContext.Provider
      value={{ captain, setCaptain, isAuth, setIsAuth, handleCaptainLogout }}
    >
      {children}
    </CaptainAuthContext.Provider>
  );
};

export default useCaptainAuthContext;
