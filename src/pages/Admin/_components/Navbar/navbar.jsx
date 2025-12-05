import React from "react";
import { Link } from "react-router-dom";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LogoutLoading from "../LogoutLoading";
import { useEffect } from "react";
export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const adminUser = localStorage.getItem("ADMIN_INFO")
    ? JSON.parse(localStorage.getItem("ADMIN_INFO"))
    : null;

  const isRegistrationActive = location.pathname.startsWith(
    "/admin/registration"
  );

  useEffect(() => {
    if (isRegistrationActive) {
      setIsRegistrationOpen(true);
    } else {
      setIsRegistrationOpen(false);
    }
  }, [isRegistrationActive]);

  const handleLogout = () => {
    setIsLoggingOut(true);

    setTimeout(() => {
      localStorage.removeItem("ADMIN_INFO");
      navigate("/", { replace: true });
    }, 500);
  };

  return (
    <>
      {/* Logout Overlay */}
      {isLoggingOut && <LogoutLoading />}

      <aside className="h-screen w-72 bg-gradient-to-b from-white to-gray-50 flex flex-col justify-between py-8 px-6 shadow-xl border-r border-gray-200">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="bg-gradient-to-br from-[#0284C7] to-[#0369A1] text-white font-bold text-xl w-12 h-12 flex items-center justify-center rounded-xl shadow-lg">
              E
            </div>
            <div>
              <span className="font-bold text-xl text-gray-900 block">
                E-Learning
              </span>
              <span className="text-xs text-gray-500">Admin Dashboard</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            <NavLink
              to="/admin/user"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-3 px-4 py-3 rounded-xl text-white bg-gradient-to-r from-[#0284C7] to-[#0369A1] shadow-lg shadow-blue-500/30 font-semibold"
                  : "flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-[#0284C7] transition-all duration-300 group"
              }
            >
              <svg
                className="w-5 h-5 group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <span className="font-semibold">Quản lý người dùng</span>
            </NavLink>

            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-3 px-4 py-3 rounded-xl text-white bg-gradient-to-r from-[#0284C7] to-[#0369A1] shadow-lg shadow-blue-500/30 font-semibold"
                  : "flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-[#0284C7] transition-all duration-300 group"
              }
            >
              <svg
                className="w-5 h-5 group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <span className="font-semibold">Quản lý khóa học</span>
            </NavLink>

            {/* Quản lý ghi danh với submenu */}
            <div>
              <NavLink
                to="/admin/registration/by-course"
                onClick={() => setIsRegistrationOpen(!isRegistrationOpen)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
                  isRegistrationActive
                    ? "text-white bg-gradient-to-r from-[#0284C7] to-[#0369A1] shadow-lg shadow-blue-500/30 font-semibold"
                    : "text-gray-600 hover:bg-blue-50 hover:text-[#0284C7]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="font-semibold">Quản lý ghi danh</span>
                </div>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isRegistrationOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </NavLink>

              {/* Submenu */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isRegistrationOpen ? "max-h-40 mt-2" : "max-h-0"
                }`}
              >
                <div className="ml-4 flex flex-col gap-1">
                  <NavLink
                    to="/admin/registration/by-course"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-3 px-4 py-2 rounded-lg text-[#0284C7] bg-blue-50 border border-blue-200 text-sm font-medium"
                        : "flex items-center gap-3 px-4 py-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all text-sm"
                    }
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    <span>Theo khóa học</span>
                  </NavLink>

                  <NavLink
                    to="/admin/registration/by-user"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-3 px-4 py-2 rounded-lg text-[#0284C7] bg-blue-50 border border-blue-200 text-sm font-medium"
                        : "flex items-center gap-3 px-4 py-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all text-sm"
                    }
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>Theo người dùng</span>
                  </NavLink>
                </div>
              </div>
            </div>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-4">
          {/* User Profile */}
          <Link to="/admin/profile-admin" className="block">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white shadow-md border border-gray-100">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0284C7] to-[#0369A1] rounded-full flex items-center justify-center shadow-sm">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex-1">
                <div className="font-bold text-gray-900">
                  {adminUser?.taiKhoan || "Admin"}
                </div>
                <div className="text-xs text-[#0284C7] font-medium flex items-center gap-1">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Quản trị viên
                </div>
              </div>
            </div>
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl py-3 font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Đăng xuất
          </button>
        </div>
      </aside>
    </>
  );
}
