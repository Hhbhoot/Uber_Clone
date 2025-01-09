import { Server } from "socket.io";
import jwt from "jsonwebtoken";

const InitializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.query.token;
    if (token) {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded) {
        next();
      }
    } else {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    console.log("a user connected with id " + socket.id);

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};

export default InitializeSocket;
