import React from "react";
import { useEffect } from "react";

export default function Security() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="w-full px-4 pb-10 animate-[fadeInUp_0.5s_ease]">
      <div className="w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10 mr-auto">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="inline-flex items-center gap-3"></div>
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-50 to-violet-50 flex items-center justify-center shadow-inner">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-14 h-14 text-slate-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V7.125a4.125 4.125 0 10-8.25 0V10.5m-.75 11.625h9.75A2.25 2.25 0 0019.5 19.875v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-800">
              Chức năng đang phát triển
            </h3>
            <p className="text-sm md:text-base text-slate-500 max-w-xl">
              Tính năng thay đổi mật khẩu sẽ sớm được cập nhật. Tạm thời, vui
              lòng liên hệ quản trị viên nếu bạn cần hỗ trợ đặt lại mật khẩu
              hoặc có thắc mắc liên quan đến bảo mật tài khoản.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <button className="flex-1 px-5 py-3 rounded-2xl bg-slate-900 text-white font-semibold shadow hover:bg-slate-800 transition">
              Liên hệ quản trị viên
            </button>
            <button className="flex-1 px-5 py-3 rounded-2xl border border-slate-200 text-slate-600 font-semibold hover:border-slate-300 transition">
              Trung tâm trợ giúp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
