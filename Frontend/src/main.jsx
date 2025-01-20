import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { UserAuthConextProvider } from "./context/userAuthContext.jsx";
import { CaptainAuthConextProvider } from "./context/captainAuthContext.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>

  <Router>
    <SocketProvider>
      <CaptainAuthConextProvider>
        <UserAuthConextProvider>
          <App />
          <Toaster />
        </UserAuthConextProvider>
      </CaptainAuthConextProvider>
    </SocketProvider>
  </Router>
  // </StrictMode>
);
