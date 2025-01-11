import { useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const Socket_Server_Url = import.meta.env.VITE_SOCKET_SERVER_URL;

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const navigate = useNavigate();

  const socket = io(Socket_Server_Url, {
    transports: ["websocket"],
    autoConnect: true,
    reconnection: true,
    query: {
      token: localStorage.getItem("authToken"),
    },
  });

  return (
    <SocketContext.Provider value={{ socket, navigate }}>
      {children}
    </SocketContext.Provider>
  );
};
