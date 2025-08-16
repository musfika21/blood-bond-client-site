import React from "react";

const CommonButton = ({ children, onClick, type, className = "" }) => {
  const baseClasses =
    "mt-6 inline-block px-4 py-2 text-xs lg:px-6 lg:py-3 rounded-md cursor-pointer bg-red-600 text-white hover:bg-red-800";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default CommonButton;
