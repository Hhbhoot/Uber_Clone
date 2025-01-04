import { Server } from "socket.io";

const InitializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected with id " + socket.id);
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};

export default InitializeSocket;
