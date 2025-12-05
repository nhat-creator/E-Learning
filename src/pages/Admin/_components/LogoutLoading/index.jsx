import React from "react";

export default function LogoutLoading() {
  return (
    <div>
      <div className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-sm flex items-center justify-center animate-[fadeIn_0.3s_ease-out]">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#0284C7] to-[#0369A1] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-[spin_1s_linear_infinite]">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </div>
          <p className="text-lg font-semibold text-gray-900">
            Đang đăng xuất...
          </p>
          <p className="text-sm text-gray-500 mt-1">Hẹn gặp lại bạn!</p>
        </div>
      </div>
    </div>
  );
}
