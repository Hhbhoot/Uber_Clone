import { createContext, useContext, useEffect, useState } from "react";
import { captainLogut, captainTokenCheck } from "../apis";
import { useNavigate } from "react-router-dom";
import { useSocket } from "./SocketContext";

const CaptainAuthContext = createContext();

const useCaptainAuthContext = () => useContext(CaptainAuthContext);

export const CaptainAuthConextProvider = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  const { socket } = useSocket();

  const handleCaptainLogout = async () => {
    if (token) {
      const { data } = await captainLogut();
      if (data?.status !== "success") {
        throw new Error(data?.message);
      }
      localStorage.removeItem("authToken");
      socket.disconnect();
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
