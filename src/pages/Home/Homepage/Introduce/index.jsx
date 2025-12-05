import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Introduce() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/courses?search=${encodeURIComponent(searchTerm)}`);
  };
  const userInfo = localStorage.getItem("USER_INFO")
    ? JSON.parse(localStorage.getItem("USER_INFO"))
    : null;
  return (
    <div className="relative h-screen max-h-[600px] bg-gradient-to-br from-[#0EA5E9] via-[#0284C7] to-[#0369A1] flex items-center justify-center px-6 overflow-hidden animate-gradient-x">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
          Học lập trình online
          <br />
          cùng các chuyên gia
        </h1>
        <p className="text-base md:text-lg text-white/90 mb-6">
          Nền tảng học lập trình trực tuyến hàng đầu Việt Nam. Hơn 1000+ khóa
          học chất lượng cao.
        </p>

        {/* Search Bar */}
        <div className="flex items-stretch bg-white rounded-2xl shadow-2xl overflow-hidden max-w-2xl mx-auto mb-5">
          <input
            type="text"
            placeholder="Tìm kiếm khóa học..."
            className="flex-1 px-5 py-3 text-gray-700 outline-none border-none bg-transparent focus:ring-0 placeholder:text-gray-400 placeholder:opacity-70"
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="bg-[oklch(0.488_0.243_264.376)] text-white px-6 py-3 font-semibold hover:bg-[oklch(0.388_0.243_264.376)] transition-all flex items-center gap-2"
          >
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            Tìm kiếm
          </button>
        </div>

        {/* Action Buttons */}
        {userInfo ? (
          <div></div>
        ) : (
          <div className="flex gap-4 justify-center items-center flex-wrap mt-6">
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-[#0284C7] px-8 py-3 rounded-xl font-semibold border border-[#0284C7] hover:bg-[#e0f2fe] transition-all focus:outline-none"
            >
              Đăng nhập
            </button>
            <button
              onClick={() => navigate("/registation")}
              className="bg-[#0284C7] text-white px-8 py-3 rounded-xl font-semibold border border-[#0284C7] shadow-md hover:bg-[#0369A1] transition-all focus:outline-none"
            >
              Đăng ký ngay
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
