import { createContext, useContext, useState } from "react";
import { userLogut } from "../apis";
import { useSocket } from "./SocketContext";
import { useNavigate } from "react-router-dom";

export const UserAuthContext = createContext();

const useUserAuthConext = () => useContext(UserAuthContext);

export const UserAuthConextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const { socket } = useSocket();
  const navigate = useNavigate();

  const handleUserLogout = async () => {
    const token = localStorage.getItem("authToken");

    if (token) {
      const { data } = await userLogut();
      if (data?.status !== "success") {
        throw new Error(data?.message);
      }
      localStorage.removeItem("authToken");
      socket.disconnect();
      setIsAuth(false);
      setUser(null);

      navigate("/user-login");
    }
  };

  return (
    <UserAuthContext.Provider
      value={{ user, setUser, isAuth, setIsAuth, handleUserLogout }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export default useUserAuthConext;
