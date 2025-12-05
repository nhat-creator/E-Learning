import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Modal from "../../../components/Modal/modal";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  clearError,
  clearUserLogin,
} from "../../../store/Reducers/loginReducer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const navigate = useNavigate();
  const state = useSelector((state) => state.loginReducer);
  const { error, loading, userLogin } = state;

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });

  const showModal = (title, message, type = "info") => {
    setModal({
      isOpen: true,
      title,
      message,
      type,
    });
  };

  const closeModal = () => {
    setModal({ ...modal, isOpen: false });

    if (modal.type === "success" && userLogin) {
      if (userLogin.maLoaiNguoiDung === "HV") {
        navigate("/");
      } else {
        navigate("/admin");
      }
    }

    dispatch(clearError());
    dispatch(clearUserLogin());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.taiKhoan || !formData.matKhau) {
      showModal("Thông báo", "Vui lòng điền đầy đủ thông tin.", "warning");
      return;
    }
    dispatch(
      loginUser({
        taiKhoan: formData.taiKhoan,
        matKhau: formData.matKhau,
      })
    );
  };

  useEffect(() => {
    if (error) {
      const errorMessage =
        typeof error === "string"
          ? error
          : error?.message || "Tài khoản hoặc mật khẩu không đúng!";
      showModal("Đăng nhập thất bại", errorMessage, "error");
    } else if (userLogin) {
      showModal(
        "Đăng nhập thành công",
        "Chào mừng bạn quay trở lại!",
        "success"
      );
    }
  }, [dispatch, error, userLogin]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F2FE] via-white to-[#BAE6FD] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 animate-[fadeInUp_0.6s_ease-out]">
        {/* Left Side - Form */}
        <div className="p-8 md:p-12 lg:p-16">
          {/* Header with Logo */}
          <div className="mb-8 animate-[fadeIn_0.8s_ease-out_0.2s_both]">
            <div className="flex items-center justify-between mb-10">
              <Link to="/" className="flex items-center gap-2">
                <span className="bg-[oklch(0.488_0.243_264.376)] text-white font-bold text-xl w-10 h-10 flex items-center justify-center rounded-lg">
                  E
                </span>
                <span className="font-bold text-xl text-gray-900">
                  E-Learning
                </span>
              </Link>

              <Link
                to="/"
                className="p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                title="Về trang chủ"
              >
                <svg
                  className="w-6 h-6 text-gray-500 group-hover:text-gray-700 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </Link>
            </div>

            {/* Tabs */}
            <div className="flex flex-col items-center gap-2">
              <button className="font-bold text-[oklch(0.488_0.243_264.376)] text-5xl">
                ĐĂNG NHẬP
              </button>
              <p className="text-gray-600 text-base">
                Chào mừng bạn quay trở lại!
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 animate-[fadeIn_0.8s_ease-out_0.4s_both]"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tài khoản
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-[oklch(0.488_0.243_264.376)]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="taiKhoan"
                  placeholder="nguyenvana"
                  value={formData.taiKhoan}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[oklch(0.488_0.243_264.376)] focus:outline-none transition-colors placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-[oklch(0.488_0.243_264.376)]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="matKhau"
                  placeholder="••••••••"
                  value={formData.matKhau}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-[oklch(0.488_0.243_264.376)] focus:outline-none transition-colors placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 focus:outline-none"
                  tabIndex={-1}
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white font-bold py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Đăng nhập
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-8 text-center text-sm text-gray-600 animate-[fadeIn_0.8s_ease-out_0.6s_both]">
            Chưa có tài khoản?{" "}
            <Link
              to="/registation"
              className="text-[oklch(0.488_0.243_264.376)] font-semibold hover:underline"
            >
              Đăng ký ngay
            </Link>
          </div>
        </div>

        {/* Right */}
        <div className="hidden lg:flex bg-gradient-to-br from-[#0EA5E9] to-[#0369A1] p-12 items-center justify-center relative overflow-hidden animate-[fadeIn_1s_ease-out_0.3s_both]">
          <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>

          <div className="relative z-10 text-center">
            <div className="mb-8">
              <svg
                className="w-80 h-80 mx-auto drop-shadow-2xl"
                viewBox="0 0 400 400"
                fill="none"
              >
                <circle cx="200" cy="200" r="120" fill="white" opacity="0.1" />

                <g transform="translate(80, 140)">
                  <rect
                    x="0"
                    y="50"
                    width="80"
                    height="100"
                    rx="4"
                    fill="#1E293B"
                    stroke="#334155"
                    strokeWidth="3"
                  />
                  <rect
                    x="5"
                    y="55"
                    width="70"
                    height="90"
                    rx="2"
                    fill="#0EA5E9"
                  />
                  <rect
                    x="15"
                    y="70"
                    width="50"
                    height="3"
                    rx="1"
                    fill="white"
                    opacity="0.6"
                  />
                  <rect
                    x="15"
                    y="80"
                    width="45"
                    height="3"
                    rx="1"
                    fill="white"
                    opacity="0.6"
                  />
                  <rect
                    x="15"
                    y="90"
                    width="55"
                    height="3"
                    rx="1"
                    fill="white"
                    opacity="0.6"
                  />
                  <circle cx="40" cy="110" r="15" fill="white" opacity="0.8" />
                  <path
                    d="M40 105 L40 115 M35 110 L45 110"
                    stroke="#0EA5E9"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </g>
                <g transform="translate(240, 100)">
                  <ellipse cx="40" cy="50" rx="60" ry="15" fill="#1E293B" />
                  <polygon points="40,30 10,45 40,50 70,45" fill="#334155" />
                  <rect x="38" y="50" width="4" height="30" fill="#1E293B" />
                  <circle cx="40" cy="80" r="6" fill="#F59E0B" />
                  <path d="M40 80 L45 95" stroke="#F59E0B" strokeWidth="2" />
                </g>
                <g transform="translate(120, 240)">
                  <rect
                    x="0"
                    y="0"
                    width="70"
                    height="50"
                    rx="3"
                    fill="white"
                    stroke="#0EA5E9"
                    strokeWidth="3"
                  />
                  <rect
                    x="5"
                    y="8"
                    width="60"
                    height="3"
                    rx="1"
                    fill="#0EA5E9"
                    opacity="0.6"
                  />
                  <rect
                    x="5"
                    y="15"
                    width="50"
                    height="2"
                    rx="1"
                    fill="#64748B"
                    opacity="0.5"
                  />
                  <rect
                    x="5"
                    y="20"
                    width="55"
                    height="2"
                    rx="1"
                    fill="#64748B"
                    opacity="0.5"
                  />
                  <circle cx="35" cy="35" r="8" fill="#F59E0B" opacity="0.3" />
                  <path
                    d="M35 30 L35 40 M30 35 L40 35"
                    stroke="#F59E0B"
                    strokeWidth="2"
                  />
                </g>

                {/* Pencil */}
                <g transform="translate(250, 220) rotate(-30 20 40)">
                  <rect
                    x="15"
                    y="0"
                    width="10"
                    height="50"
                    rx="2"
                    fill="#EF4444"
                  />
                  <polygon points="15,50 25,50 20,60" fill="#FCD34D" />
                  <rect x="15" y="5" width="10" height="8" fill="#DC2626" />
                  <circle cx="20" cy="9" r="2" fill="white" opacity="0.6" />
                </g>

                {/* Light bulb - idea */}
                <g transform="translate(60, 90)">
                  <circle cx="30" cy="30" r="18" fill="#FCD34D" />
                  <rect
                    x="24"
                    y="48"
                    width="12"
                    height="8"
                    rx="2"
                    fill="#94A3B8"
                  />
                  <rect
                    x="27"
                    y="56"
                    width="6"
                    height="4"
                    rx="1"
                    fill="#64748B"
                  />
                  <path
                    d="M20 20 L25 15 M40 20 L35 15 M15 30 L10 30 M45 30 L50 30 M20 40 L15 45 M40 40 L45 45"
                    stroke="#FCD34D"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </g>

                {/* Stars decoration */}
                <g fill="#FCD34D" opacity="0.9">
                  <path d="M320 180 L323 187 L330 187 L325 192 L327 199 L320 195 L313 199 L315 192 L310 187 L317 187 Z" />
                  <path d="M100 200 L102 205 L107 205 L103 208 L105 213 L100 210 L95 213 L97 208 L93 205 L98 205 Z" />
                  <circle cx="340" cy="240" r="3" />
                  <circle cx="90" cy="280" r="2" />
                </g>

                {/* Trophy */}
                <g transform="translate(280, 260)">
                  <ellipse
                    cx="30"
                    cy="55"
                    rx="25"
                    ry="8"
                    fill="#334155"
                    opacity="0.3"
                  />
                  <rect x="24" y="40" width="12" height="15" fill="#64748B" />
                  <ellipse cx="30" cy="40" rx="8" ry="3" fill="#78716C" />
                  <path
                    d="M18 20 Q18 35 24 40 L36 40 Q42 35 42 20 L38 20 Q38 28 30 28 Q22 28 22 20 Z"
                    fill="#F59E0B"
                  />
                  <rect
                    x="26"
                    y="15"
                    width="8"
                    height="6"
                    rx="1"
                    fill="#FCD34D"
                  />
                  <path
                    d="M15 20 L18 20 M42 20 L45 20"
                    stroke="#F59E0B"
                    strokeWidth="2"
                  />
                </g>
              </svg>
            </div>

            <h2 className="text-3xl font-bold text-white mb-4">
              Welcome to E-Learning
            </h2>
            <p className="text-white/90 text-lg">
              Start your learning journey today
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
    </div>
  );
}
