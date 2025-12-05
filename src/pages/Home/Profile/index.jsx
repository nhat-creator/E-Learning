import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useEffect } from "react";

const navItems = [
  {
    key: "info",
    label: "Thông tin cá nhân",
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    key: "courses",
    label: "Khóa học của tôi",
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M8 6V4a4 4 0 0 1 8 0v2" />
      </svg>
    ),
  },
  {
    key: "security",
    label: "Bảo mật",
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect x="6" y="10" width="12" height="10" rx="2" />
        <path d="M12 16v-4" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </svg>
    ),
  },
];

function Profile() {
  const [active, setActive] = useState("info");
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="w-full container mx-auto min-h-screen mt-20 animate-[fadeInUp_0.5s_ease]">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">
        Thông tin cá nhân
      </h2>
      <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full items-start">
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-lg border border-[#0074c2]/20 p-2 flex flex-col">
            <nav>
              <ul className="flex md:flex-col gap-2">
                {navItems.map((item) => (
                  <li key={item.key}>
                    <Link
                      to={`/profile/${
                        item.key === "info"
                          ? ""
                          : item.key === "courses"
                          ? "my-courses"
                          : "security"
                      }`}
                      className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl font-semibold text-base transition-all duration-200
                        ${
                          active === item.key
                            ? "bg-[#0074c2] text-white shadow-lg scale-[1.03] border border-[#0074c2]"
                            : "bg-white text-[#0074c2] hover:bg-[#e3f0fa] hover:text-[#0074c2] border border-transparent"
                        }
                      `}
                      style={{
                        boxShadow:
                          active === item.key
                            ? "0 4px 24px 0 rgba(0,116,194,0.10)"
                            : undefined,
                      }}
                      onClick={() => setActive(item.key)}
                    >
                      <span
                        className={`flex items-center justify-center w-7 h-7 rounded-lg transition-all
                          ${
                            active === item.key
                              ? "bg-white/20 text-white"
                              : "bg-[#e3f0fa] text-[#0074c2]"
                          }
                        `}
                        style={{
                          color: active === item.key ? "#fff" : "#0074c2",
                        }}
                      >
                        {React.cloneElement(item.icon, {
                          stroke: active === item.key ? "#fff" : "#0074c2",
                        })}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Profile;
