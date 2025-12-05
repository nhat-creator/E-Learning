import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="w-20 h-20 border-4 border-gray-200 border-t-[oklch(0.488_0.243_264.376)] rounded-full animate-spin"></div>

        {/* Center logo */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="bg-[oklch(0.488_0.243_264.376)] text-white font-bold text-xl w-10 h-10 flex items-center justify-center rounded-md shadow-lg">
            E
          </span>
        </div>
      </div>

      {/* Loading text */}
      <div className="absolute mt-32">
        <p className="text-gray-600 font-medium text-base">
          Đang tải<span className="animate-pulse">...</span>
        </p>
      </div>
    </div>
  );
}
