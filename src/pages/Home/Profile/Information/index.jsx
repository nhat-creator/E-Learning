import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../../../store/Reducers/userInfoReducer";
import { updateUserInfo } from "../../../../store/Reducers/userInfoReducer";
import Modal from "../../../../components/Modal/modal";
import Loading from "../../_components/Loading";
const getErrorMessage = (apiError) => {
  if (!apiError) return "Có lỗi xảy ra. Vui lòng thử lại sau.";
  if (typeof apiError === "string") return apiError;
  if (typeof apiError === "object") {
    return (
      apiError.content ||
      apiError.message ||
      apiError.data ||
      "Có lỗi xảy ra. Vui lòng thử lại sau."
    );
  }
  return "Có lỗi xảy ra. Vui lòng thử lại sau.";
};

export default function Information() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(getUserInfo());
  }, [dispatch]);
  const state = useSelector((state) => state.userInfoReducer);
  const { userInfo, loading, error } = state;
  console.log("userInfo:", userInfo);
  const [form, setForm] = useState({
    taiKhoan: "",
    hoTen: "",
    email: "",
    soDt: "",
    matKhau: "",
    maLoaiNguoiDung: "",
    maNhom: "GP01",
  });
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "error",
  });

  const openModal = ({ title, message, type = "error" }) => {
    setModalState({ isOpen: true, title, message, type });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
    if (modalState.type === "success") {
      window.location.reload();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (userInfo) {
      setForm((prev) => ({
        ...prev,
        taiKhoan: userInfo.taiKhoan,
        hoTen: userInfo.hoTen,
        email: userInfo.email,
        soDt: userInfo.soDT,
        matKhau: userInfo.matKhau || "",
        maNhom: "GP01",
        maLoaiNguoiDung: userInfo.maLoaiNguoiDung,
      }));
    }
  }, [userInfo]);

  useEffect(() => {
    if (!error) return;
    setModalState({
      isOpen: true,
      title: "Có lỗi xảy ra",
      message: getErrorMessage(error),
      type: "error",
    });
  }, [error]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedForm = Object.keys(form).reduce((acc, key) => {
      acc[key] = typeof form[key] === "string" ? form[key].trim() : form[key];
      return acc;
    }, {});

    const emptyField = Object.entries(trimmedForm).find(
      ([key, value]) => value === ""
    );

    if (emptyField) {
      openModal({
        title: "Thiếu thông tin",
        message: "Vui lòng điền đầy đủ tất cả các trường trước khi cập nhật.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedForm.email)) {
      openModal({
        title: "Email không hợp lệ",
        message: "Vui lòng kiểm tra lại địa chỉ email của bạn.",
      });
      return;
    }

    try {
      await dispatch(updateUserInfo(trimmedForm)).unwrap();
      openModal({
        title: "Cập nhật thành công",
        message: "Thông tin đã được cập nhật thành công!",
        type: "success",
      });
    } catch (apiError) {
      openModal({
        title: "Cập nhật thất bại",
        message: getErrorMessage(apiError),
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    const apiMessage = getErrorMessage(error);
    return (
      <div className="text-center py-10 text-red-500">
        {apiMessage}
        <Modal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          title={modalState.title}
          message={modalState.message}
          type={modalState.type}
        />
      </div>
    );
  }

  return (
    <>
      <form
        className="w-full bg-white rounded-2xl shadow-lg border border-[#e0e7ef] p-4 md:p-8 lg:p-10 animate-[fadeInUp_0.5s_ease]"
        onSubmit={handleSubmit}
      >
        <h3 className="text-2xl md:text-3xl font-extrabold text-[#0284C7] mb-6 tracking-tight text-center md:text-left">
          Thông tin cá nhân
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              <span>Tài khoản</span>
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full bg-gray-200 text-gray-600 text-[11px] font-semibold tracking-wide uppercase">
                Không chỉnh sửa
              </span>
            </label>
            <input
              type="text"
              name="taiKhoan"
              value={form.taiKhoan}
              disabled
              className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-gray-100 text-gray-500 font-semibold outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              <span>Mật khẩu</span>
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full bg-[#dcfce7] text-[#15803d] text-[11px] font-semibold tracking-wide uppercase">
                Có thể chỉnh sửa
              </span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="matKhau"
                value={form.matKhau}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-[#d4d4d8] bg-white text-[#0f172a] font-semibold outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#c7d2fe]/60 pr-10"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 focus:outline-none"
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

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              <span>Họ tên</span>
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full bg-[#dcfce7] text-[#15803d] text-[11px] font-semibold tracking-wide uppercase">
                Có thể chỉnh sửa
              </span>
            </label>
            <input
              type="text"
              name="hoTen"
              value={form.hoTen}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-[#d4d4d8] bg-white text-[#0f172a] font-semibold outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#c7d2fe]/60"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              <span>Email</span>
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full bg-[#dcfce7] text-[#15803d] text-[11px] font-semibold tracking-wide uppercase">
                Có thể chỉnh sửa
              </span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-[#d4d4d8] bg-white text-[#0f172a] font-semibold outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#c7d2fe]/60"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              <span>Số điện thoại</span>
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full bg-[#dcfce7] text-[#15803d] text-[11px] font-semibold tracking-wide uppercase">
                Có thể chỉnh sửa
              </span>
            </label>
            <input
              type="text"
              name="soDt"
              value={form.soDt}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-[#d4d4d8] bg-white text-[#0f172a] font-semibold outline-none focus:border-[-#6366f1] focus:ring-2 focus:ring-[#c7d2fe]/60"
            />
          </div>

          <div className="flex flex-col h-full justify-end">
            <label className="block text-gray-700 font-semibold mb-2">
              <span>Loại người dùng</span>
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 text-[11px] font-semibold tracking-wide uppercase">
                Không chỉnh sửa
              </span>
            </label>
            <select
              name="maLoaiNguoiDung"
              value={form.maLoaiNguoiDung}
              disabled
              className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-400 font-semibold outline-none cursor-not-allowed min-h-[44px]"
              style={{ minHeight: 44 }}
            >
              <option value="HV">Học viên</option>
              <option value="GV">Giáo viên</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-gradient-to-r from-[#0284C7] to-[#0369A1] hover:from-[#0369A1] hover:to-[#0284C7] text-white font-bold px-8 py-3 rounded-xl shadow-md transition-all w-full sm:w-auto"
          >
            Cập nhật thông tin
          </button>
        </div>
      </form>
      <Modal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
      />
    </>
  );
}
