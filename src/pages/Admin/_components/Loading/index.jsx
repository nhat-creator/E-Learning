import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6">
        {/* Spinner with gradient */}
        <div className="relative w-20 h-20">
          {/* Outer ring */}
          <div className="absolute inset-0 border-4 border-gray-300/30 rounded-full"></div>
          {/* Spinning gradient ring */}
          <div className="absolute inset-0 border-4 border-transparent border-t-[#0284C7] border-r-[#0EA5E9] rounded-full animate-spin"></div>
          {/* Inner glow */}
          <div className="absolute inset-2 bg-gradient-to-br from-[#0284C7]/10 to-[#0EA5E9]/10 rounded-full animate-pulse"></div>
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-gradient-to-br from-[#0284C7] to-[#0EA5E9] rounded-full animate-pulse"></div>
          </div>
        </div>
        {/* Text with gradient */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284C7] to-[#0EA5E9] font-bold text-xl animate-pulse">
            Đang tải
          </p>
          <div className="flex gap-1">
            <div
              className="w-2 h-2 bg-[#0284C7] rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-[#0369A1] rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-[#0EA5E9] rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
