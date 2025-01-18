import React from "react";

const DriverNotFound = (props) => {
  return (
    <div className="flex flex-col items-center justify-center h-fit py-4 bg-gray-100 text-center px-4">
      {/* Icon */}
      <div className="bg-red-100 p-6 rounded-full mb-6">
        <svg
          className="w-12 h-12 text-red-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.364 5.636L5.636 18.364M5.636 5.636l12.728 12.728"
          />
        </svg>
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        No Drivers Available
      </h1>

      {/* Message */}
      <p className="text-gray-600 mb-6">
        We're sorry, but there are currently no drivers available in your area.
        Please try again later or adjust your pickup location.
      </p>

      {/* Retry Button */}
      <button
        onClick={() => props.setDriverNotFound(false)}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition-all"
      >
        Retry
      </button>
    </div>
  );
};

export default DriverNotFound;
