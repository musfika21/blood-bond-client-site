import React from "react";

const CommonButton = ({ children, onClick, type = "button", className = "" }) => {
  const baseClasses =
    "mt-6 inline-block px-4 py-2 text-xs lg:px-6 lg:py-3 rounded-md cursor-pointer transition-colors duration-200";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} bg-red-600 text-white hover:bg-red-800 ${className}`}
    >
      {children}
    </button>
  );
};

export default CommonButton;
