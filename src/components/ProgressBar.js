import React from "react";

const ProgressBar = ({ progress, size = "small" }) => {
  const sizeClasses = size === "large" ? "h-4 flex-grow" : "w-20 h-2.5";

  return (
    <div className={`bg-gray-700 rounded-full ${sizeClasses}`}>
      <div
        className={`bg-green-600 rounded-full ${sizeClasses}`}
        style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
