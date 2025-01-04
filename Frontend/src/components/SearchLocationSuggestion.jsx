import React, { useState } from "react";
import { CiLocationOn } from "react-icons/ci";

const SearchLocationSuggestion = ({
  suggestions,
  setPickup,
  setDestination,
}) => {
  return (
    <div className="flex flex-col px-5 gap-2 py-5">
      {suggestions.map((suggestion) => (
        <div className="border-2   px-2 py-3 rounded-md text-base text-gray-800 flex items-center justify-normal gap-4 hover:cursor-pointer hover:border-black">
          <span>
            <CiLocationOn />
          </span>
          <p>{suggestion.description}</p>
        </div>
      ))}
      {suggestions.length === 0 && (
        <div className="border  border-gray-300 px-2 py-3  rounded-md text-base text-gray-800 flex items-center justify-normal gap-4 ">
          <span>
            <CiLocationOn />
          </span>
          No results found
        </div>
      )}
    </div>
  );
};

export default SearchLocationSuggestion;
