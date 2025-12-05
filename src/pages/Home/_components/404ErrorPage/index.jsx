import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ErrorPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Prevent scrolling
    document.body.style.overflow = "hidden";

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center px-4 overflow-hidden">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-[180px] md:text-[220px] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0284C7] to-[#0369A1] leading-none animate-[fadeInUp_0.8s_ease-out] drop-shadow-2xl">
            404
          </h1>
          {/* Floating Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
            <div className="absolute top-0 left-1/4 w-16 h-16 bg-blue-200/30 rounded-full blur-xl animate-[bounce_3s_ease-in-out_infinite]"></div>
            <div className="absolute bottom-0 right-1/4 w-20 h-20 bg-cyan-200/30 rounded-full blur-xl animate-[bounce_4s_ease-in-out_infinite]"></div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4 mb-10 animate-[fadeInUp_1s_ease-out]">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Không tìm thấy trang
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed">
            Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di
            chuyển.
          </p>
        </div>

        {/* Illustration */}
        <div className="mb-10 animate-[fadeInUp_1.2s_ease-out]">
          <div className="relative inline-block">
            <svg
              className="w-64 h-64 mx-auto opacity-80"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Book/Page Icon */}
              <rect
                x="40"
                y="60"
                width="120"
                height="100"
                rx="8"
                fill="#0284C7"
                fillOpacity="0.1"
                stroke="#0284C7"
                strokeWidth="3"
              />
              <rect
                x="50"
                y="70"
                width="100"
                height="80"
                rx="4"
                fill="white"
                stroke="#0284C7"
                strokeWidth="2"
              />
              {/* Question Mark */}
              <text
                x="100"
                y="130"
                fontSize="48"
                fontWeight="bold"
                fill="#0284C7"
                textAnchor="middle"
              >
                ?
              </text>
              {/* Magnifying Glass */}
              <circle
                cx="140"
                cy="140"
                r="20"
                fill="none"
                stroke="#0369A1"
                strokeWidth="3"
              />
              <line
                x1="154"
                y1="154"
                x2="170"
                y2="170"
                stroke="#0369A1"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-[fadeInUp_1.4s_ease-out]">
          <button
            onClick={() => navigate("/")}
            className="group relative px-8 py-4 bg-gradient-to-r from-[#0284C7] to-[#0369A1] text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Về trang chủ
            </span>
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </button>

          <button
            onClick={() => navigate("/courses")}
            className="px-8 py-4 bg-white text-[#0284C7] font-semibold rounded-xl border-2 border-[#0284C7] hover:bg-[#0284C7] hover:text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            Xem khóa học
          </button>
        </div>
      </div>
    </div>
  );
}
