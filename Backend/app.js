import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filepath = path.resolve(__dirname, "public", "uploads");
import path from "path";

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false, // disable CSP
  })
);

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import userRouter from "./Routes/user.routes.js";

app.use("/public/uploads", express.static(filepath));

app.get("/api", (req, res, next) => {
  res.send("Hello World!");
  next();
});

app.use("/api/v1/user", userRouter);

app.use("*", (req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
