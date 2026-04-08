import React from "react";

const LoadingSpinner = ({ label = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="flex items-center gap-3 text-gray-600">
        <div
          className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"
          aria-hidden="true"
        />
        <span className="text-sm">{label}</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;

