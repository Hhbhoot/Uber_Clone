// socket.js
import { io } from "socket.io-client";

let socket;
const Socket_Server_Url = import.meta.env.VITE_SOCKET_SERVER_URL;
export const getSocket = () => {
  if (!socket) {
    socket = io(Socket_Server_Url, {
      transports: ["websocket"],
      autoConnect: true,
      reconnection: true,
      timeout: 20000,

      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,

      query: {
        token: localStorage.getItem("authToken"),
      },
    });

    socket.on("connect_error", (error) => {
      console.error("Connection Error:", error);
    });
  }

  return socket;
};
