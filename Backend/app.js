import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false, // disable CSP
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
