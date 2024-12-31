import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { UserAuthConextProvider } from "./context/userAuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserAuthConextProvider>
      <Router>
        <App />
        <Toaster />
      </Router>
    </UserAuthConextProvider>
  </StrictMode>
);
