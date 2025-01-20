import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  CaptainHome,
  CaptainLogin,
  CaptainRiding,
  CaptainSignup,
  Home,
  Riding,
  Start,
  UserLogin,
  UserSignup,
} from "./pages";
import UserProtectedRoutes from "./components/UserProtectedRoutes";
import CaptainProtectedRoutes from "./components/CaptainProtectedRoutes";
import useUserAuthConext from "./context/UserAuthContext";
import useCaptainAuthContext from "./context/CaptainAuthContext";

function App() {
  const { setUser } = useUserAuthConext();
  const { setCaptain } = useCaptainAuthContext();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedCaptain = localStorage.getItem("captain");

    if (storedCaptain) {
      setCaptain(JSON.parse(storedCaptain));
      setUser(null); // Ensure only one is active
    } else if (storedUser) {
      setUser(JSON.parse(storedUser));
      setCaptain(null); // Ensure only one is active
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />

        <Route
          path="/home"
          element={
            <UserProtectedRoutes>
              <Home />
            </UserProtectedRoutes>
          }
        />
        <Route
          path="/riding"
          element={
            <UserProtectedRoutes>
              <Riding />
            </UserProtectedRoutes>
          }
        />
        <Route
          path="/captain-home"
          element={
            <CaptainProtectedRoutes>
              <CaptainHome />
            </CaptainProtectedRoutes>
          }
        />
        <Route
          path="/captain-riding"
          element={
            <CaptainProtectedRoutes>
              <CaptainRiding />
            </CaptainProtectedRoutes>
          }
        />
      </Routes>
    </>
  );
}

export default App;
