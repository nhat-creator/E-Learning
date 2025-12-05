import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoutLoading from "../LogoutLoading";
import { useRoutes } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const data = localStorage.getItem("USER_INFO")
    ? JSON.parse(localStorage.getItem("USER_INFO"))
    : null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dropdown show/hide logic with animation
  useEffect(() => {
    if (isDropdownOpen) {
      setIsDropdownVisible(true);
    } else if (isDropdownVisible) {
      // Wait for fade-out animation before hiding
      const timeout = setTimeout(() => setIsDropdownVisible(false), 250);
      return () => clearTimeout(timeout);
    }
  }, [isDropdownOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isDropdownOpen) return;
    const handleClickOutside = (e) => {
      const profileBox = document.getElementById("profile-dropdown-box");
      if (profileBox && !profileBox.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setIsDropdownOpen(false);
    setTimeout(() => {
      localStorage.removeItem("USER_INFO");
      navigate("/", { replace: true });
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/courses?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <>
      {/* Logout Overlay */}
      {isLoggingOut && <LogoutLoading />}

      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0 transition-all duration-300 ${
          isScrolled
            ? "bg-white/70 backdrop-blur-md shadow-lg border-b border-white/20"
            : "bg-white shadow-lg border-b border-gray-100"
        }`}
      >
        <Link to="/">
          <div className="flex items-center gap-2 min-w-max">
            <span className="bg-gradient-to-br from-[#0284C7] to-[#0369A1] text-white font-bold text-lg w-9 h-9 flex items-center justify-center rounded-lg shadow-md">
              E
            </span>
            <span className="font-bold text-xl text-gray-900">E-Learning</span>
          </div>
        </Link>

        <nav className="flex gap-4 md:gap-6 flex-wrap justify-center">
          <NavLink
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={({ isActive }) =>
              `font-semibold transition-all duration-300 pb-1 relative ${
                isActive
                  ? "text-[#0284C7]"
                  : "text-gray-600 hover:text-[#0284C7]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                Trang chủ
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-[#0284C7] transition-all duration-300 ease-out ${
                    isActive ? "w-full" : "w-0"
                  }`}
                ></span>
              </>
            )}
          </NavLink>
          <NavLink
            to="/courses"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={({ isActive }) =>
              `font-semibold transition-all duration-300 pb-1 relative ${
                isActive
                  ? "text-[#0284C7]"
                  : "text-gray-600 hover:text-[#0284C7]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                Khóa học
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-[#0284C7] transition-all duration-300 ease-out ${
                    isActive ? "w-full" : "w-0"
                  }`}
                ></span>
              </>
            )}
          </NavLink>
          <NavLink
            to="/aboutus"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={({ isActive }) =>
              `font-semibold transition-all duration-300 pb-1 relative ${
                isActive
                  ? "text-[#0284C7]"
                  : "text-gray-600 hover:text-[#0284C7]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                Về chúng tôi
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-[#0284C7] transition-all duration-300 ease-out ${
                    isActive ? "w-full" : "w-0"
                  }`}
                ></span>
              </>
            )}
          </NavLink>
        </nav>
        <form
          className="flex w-full max-w-xs mx-auto md:mx-0"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Tìm kiếm khóa học..."
            className="outline-none bg-gray-50 border border-gray-200 rounded-l-lg px-4 py-2 w-full text-gray-700 text-base focus:border-[#0284C7] focus:bg-white hover:border-gray-300 transition-all duration-200 placeholder:text-gray-400 placeholder:opacity-70"
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button
            type="submit"
            className="flex items-center justify-center bg-gradient-to-r from-[#0284C7] to-[#0369A1] border border-[#0284C7] rounded-r-lg px-4 py-2 text-white transition-all duration-200 hover:shadow-md hover:scale-105"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </form>
        <div className="flex gap-2 md:gap-4 justify-center items-center min-w-max">
          {data ? (
            <div className="relative" id="profile-dropdown-box">
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 px-4 py-2 bg-white rounded-xl border-2 border-[#0284C7] shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#0284C7] to-[#0369A1] rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900 text-sm leading-tight">
                    {data.taiKhoan}
                  </span>
                  <span className="text-xs text-[#0284C7] font-medium">
                    Học viên
                  </span>
                </div>
                <svg
                  className={`w-4 h-4 text-gray-400 group-hover:text-[#0284C7] transition-all duration-300 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {isDropdownVisible && (
                <div
                  className={`absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border-2 border-gray-100 overflow-hidden z-50 transition-all duration-250
                    ${
                      isDropdownOpen
                        ? "animate-[fadeInUp_0.3s_ease-out]"
                        : "animate-[fadeOutDown_0.25s_ease-in]"
                    }
                  `}
                >
                  <NavLink
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:text-[#0284C7] transition-all duration-200"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="font-semibold">Thông tin chi tiết</span>
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-all duration-200 border-t border-gray-100"
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
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span className="font-semibold">Đăng xuất</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink
                to="login"
                className="text-[#0284C7] font-semibold px-5 py-2 border-2 border-[#0284C7] rounded-lg transition-all duration-300 hover:bg-[#0284C7] hover:text-white hover:shadow-md"
              >
                Đăng nhập
              </NavLink>
              <NavLink
                to="registation"
                className="bg-gradient-to-r from-[#0284C7] to-[#0369A1] text-white font-semibold px-5 py-2 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Đăng ký
              </NavLink>
            </>
          )}
        </div>
      </header>
    </>
  );
}
