import { useContext, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSocket } from "./socket";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const navigate = useNavigate();

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = getSocket();
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, navigate }}>
      {children}
    </SocketContext.Provider>
  );
};
