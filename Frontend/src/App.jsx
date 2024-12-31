import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  CaptainLogin,
  CaptainSignup,
  Home,
  Start,
  UserLogin,
  UserSignup,
} from "./pages";
import UserProtectedRoutes from "./components/UserProtectedRoutes";

function App() {
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
      </Routes>
    </>
  );
}

export default App;
