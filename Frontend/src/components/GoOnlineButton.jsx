import React from "react";
import { motion } from "framer-motion";
import useCaptainAuthContext from "../context/CaptainAuthContext";

const GoOnlineButton = () => {
  const { captain } = useCaptainAuthContext();

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Radiation Effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: [0.5, 0],
          scale: [1, 1.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          margin: "auto",
          borderRadius: "50%",
          background:
            captain?.status !== "active"
              ? "rgba(0, 128, 0, 0.4)"
              : "rgba(255, 0, 0, 0.4)",
          width: "60px",
          height: "60px",
        }}
      />

      {/* Button */}
      <button
        style={{
          position: "relative",
          zIndex: 1,
          backgroundColor: captain?.status === "active" ? "red" : "forestgreen",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          fontSize: "10px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        {captain?.status === "active" ? (
          <p>
            {" "}
            go <br />
            offline
          </p>
        ) : (
          <p>
            go <br /> online
          </p>
        )}
      </button>
    </div>
  );
};

export default GoOnlineButton;
