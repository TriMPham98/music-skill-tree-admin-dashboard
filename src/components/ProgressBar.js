import React from "react";

const ProgressBar = ({ progress }) => (
  <div className="w-20 bg-gray-700 rounded-full h-2.5">
    <div
      className="bg-green-600 h-2.5 rounded-full"
      style={{ width: `${progress}%` }}></div>
  </div>
);

export default ProgressBar;
