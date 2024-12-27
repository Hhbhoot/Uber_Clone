import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  CaptainLogin,
  CaptainSignup,
  Home,
  UserLogin,
  UserSignup,
} from "./pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
      </Routes>
    </>
  );
}

export default App;
