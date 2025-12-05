import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../store/Reducers/registerReducer";
import Modal from "../../../components/Modal/modal";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    soDT: "",
    maNhom: "GP01",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
  const state = useSelector((state) => state.registerReducer);
  const { error, loading, registerSuccess } = state;
  const navigate = useNavigate();

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
    if (modal.type === "success") {
      navigate("/login");
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.hoTen.trim()) newErrors.hoTen = "Vui lòng nhập họ và tên.";
    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Email không đúng định dạng.";
      }
    }
    if (!formData.taiKhoan.trim())
      newErrors.taiKhoan = "Vui lòng nhập tài khoản.";
    if (!formData.matKhau.trim()) newErrors.matKhau = "Vui lòng nhập mật khẩu.";
    if (!formData.soDT.trim()) newErrors.soDT = "Vui lòng nhập số điện thoại.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showModal("Thông báo", "Vui lòng điền đầy đủ thông tin.", "warning");
      return;
    }
    setErrors({});
    try {
      await dispatch(registerUser(formData)).unwrap();
      setSuccess(true);
      showModal(
        "Đăng ký thành công",
        "Chúc mừng bạn đã đăng ký thành công! Vui lòng đăng nhập lại.",
        "success"
      );
    } catch (error) {
      let errorMessage = "Đăng ký thất bại!";
      if (typeof error === "string") {
        errorMessage = error;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (error?.content) {
        errorMessage = error.content;
      } else if (error?.data) {
        errorMessage = JSON.stringify(error.data);
      } else if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      showModal("Đăng ký thất bại", errorMessage, "error");
    }
  };

  useEffect(() => {
    if (error) {
      let errorMessage = "Đăng ký thất bại!";
      if (typeof error === "string") {
        errorMessage = error;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (error?.content) {
        errorMessage = error.content;
      } else if (error?.data) {
        errorMessage = JSON.stringify(error.data);
      } else if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      showModal("Đăng ký thất bại", errorMessage, "error");
    } else if (registerSuccess) {
      showModal(
        "Đăng ký thành công",
        "Chúc mừng bạn đã đăng ký thành công!",
        "success"
      );
    }
  }, [error, registerSuccess]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({ ...errors, [name]: undefined });
  };
  return (
    <>
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
      <div className="min-h-screen bg-gradient-to-br from-[#E0F2FE] via-white to-[#BAE6FD] flex items-center justify-center p-4 md:p-6 lg:p-8">
        <div className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 animate-[fadeInUp_0.6s_ease-out]">
          {/* Left Side - Illustration */}
          <div className="hidden lg:flex bg-gradient-to-br from-[#0EA5E9] to-[#0369A1] p-12 items-center justify-center relative overflow-hidden animate-[fadeIn_1s_ease-out_0.3s_both]">
            <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>

            <div className="relative z-10 text-center">
              <div className="mb-8">
                {/* Study Schedule Card */}
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white font-bold text-xl">
                      Study Schedule
                    </h3>
                    <span className="text-white/80 text-sm">This Week</span>
                  </div>

                  {/* Schedule Items */}
                  <div className="space-y-4 mb-6">
                    {/* Monday */}
                    <div className="bg-white/10 rounded-2xl p-4 border border-white/20 text-left">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/70 text-xs font-semibold">
                          MONDAY
                        </span>
                        <span className="text-white/90 text-xs">
                          09:00 - 11:30
                        </span>
                      </div>
                      <h4 className="text-white font-bold text-sm mb-1">
                        Web Development Fundamentals
                      </h4>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-white/20 rounded-full h-1.5">
                          <div
                            className="bg-gradient-to-r from-purple-400 to-pink-400 h-1.5 rounded-full"
                            style={{ width: "75%" }}
                          ></div>
                        </div>
                        <span className="text-white/80 text-xs">75%</span>
                      </div>
                    </div>

                    {/* Wednesday */}
                    <div className="bg-white/10 rounded-2xl p-4 border border-white/20 text-left">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/70 text-xs font-semibold">
                          WEDNESDAY
                        </span>
                        <span className="text-white/90 text-xs">
                          14:00 - 16:00
                        </span>
                      </div>
                      <h4 className="text-white font-bold text-sm mb-1">
                        Digital Marketing Strategy
                      </h4>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-white/20 rounded-full h-1.5">
                          <div
                            className="bg-gradient-to-r from-blue-400 to-cyan-400 h-1.5 rounded-full"
                            style={{ width: "45%" }}
                          ></div>
                        </div>
                        <span className="text-white/80 text-xs">45%</span>
                      </div>
                    </div>

                    {/* Friday */}
                    <div className="bg-white/10 rounded-2xl p-4 border border-white/20 text-left">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/70 text-xs font-semibold">
                          FRIDAY
                        </span>
                        <span className="text-white/90 text-xs">
                          10:00 - 12:30
                        </span>
                      </div>
                      <h4 className="text-white font-bold text-sm mb-1">
                        Business Communication Skills
                      </h4>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-white/20 rounded-full h-1.5">
                          <div
                            className="bg-gradient-to-r from-green-400 to-emerald-400 h-1.5 rounded-full"
                            style={{ width: "60%" }}
                          ></div>
                        </div>
                        <span className="text-white/80 text-xs">60%</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats Summary */}
                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/20">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">
                        12
                      </div>
                      <div className="text-white/70 text-xs">Courses</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">
                        48h
                      </div>
                      <div className="text-white/70 text-xs">This Week</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">
                        85%
                      </div>
                      <div className="text-white/70 text-xs">Completed</div>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-3">
                Start Your Learning Journey
              </h2>
              <p className="text-white/90 text-base">
                Join thousands of students learning and growing together
              </p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="p-6 md:p-10 lg:p-12 xl:p-14">
            {/* Header with Logo */}
            <div className="mb-6 md:mb-8 animate-[fadeIn_0.8s_ease-out_0.2s_both]">
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

              {/* Title */}
              <div className="text-center mb-2">
                <h1 className="font-bold text-[oklch(0.488_0.243_264.376)] text-5xl mb-2">
                  ĐĂNG KÝ
                </h1>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5 animate-[fadeIn_0.8s_ease-out_0.4s_both]"
            >
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Họ và tên
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
                    name="hoTen"
                    placeholder="Nguyễn Văn A"
                    value={formData.hoTen}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:border-[oklch(0.488_0.243_264.376)] focus:outline-none transition-colors placeholder:text-gray-400 ${
                      errors.hoTen ? "border-red-400" : "border-gray-200"
                    }`}
                  />
                </div>
                {errors.hoTen && (
                  <p className="text-red-500 text-xs mt-1">{errors.hoTen}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
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
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:border-[oklch(0.488_0.243_264.376)] focus:outline-none transition-colors placeholder:text-gray-400 ${
                      errors.email ? "border-red-400" : "border-gray-200"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

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
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:border-[oklch(0.488_0.243_264.376)] focus:outline-none transition-colors placeholder:text-gray-400 ${
                      errors.taiKhoan ? "border-red-400" : "border-gray-200"
                    }`}
                  />
                </div>
                {errors.taiKhoan && (
                  <p className="text-red-500 text-xs mt-1">{errors.taiKhoan}</p>
                )}
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
                    type="password"
                    name="matKhau"
                    placeholder="••••••••"
                    value={formData.matKhau}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:border-[oklch(0.488_0.243_264.376)] focus:outline-none transition-colors placeholder:text-gray-400 ${
                      errors.matKhau ? "border-red-400" : "border-gray-200"
                    }`}
                  />
                </div>
                {errors.matKhau && (
                  <p className="text-red-500 text-xs mt-1">{errors.matKhau}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Số điện thoại
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
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    name="soDT"
                    placeholder="0123456789"
                    value={formData.soDT}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:border-[oklch(0.488_0.243_264.376)] focus:outline-none transition-colors placeholder:text-gray-400 ${
                      errors.soDT ? "border-red-400" : "border-gray-200"
                    }`}
                  />
                </div>
                {errors.soDT && (
                  <p className="text-red-500 text-xs mt-1">{errors.soDT}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white font-bold py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Đăng ký
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-6 text-center text-sm text-gray-600 animate-[fadeIn_0.8s_ease-out_0.5s_both]">
              Đã có tài khoản?{" "}
              <Link
                to="/login"
                className="text-[oklch(0.488_0.243_264.376)] font-semibold hover:underline"
              >
                Đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
