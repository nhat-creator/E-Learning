import React, { useState, useEffect } from "react";
import Modal from "../../../../components/Modal/modal";
import {
  addNewUser,
  clearUserError,
} from "../../../../store/Reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";

const nd = {
  taiKhoan: "",
  matKhau: "",
  email: "",
  soDt: "",
  maNhom: "GP01",
  maLoaiNguoiDung: "HV",
  hoTen: "",
};

export default function AddUserModal({ open, onClose, onSuccess }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState(nd);
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });
  const [pendingSuccess, setPendingSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { loading, error, userInfo } = useSelector(
    (state) => state.userReducer
  );

  // Reset error and userInfo when modal is opened
  useEffect(() => {
    if (open) {
      dispatch(clearUserError());
      setSubmitted(false);
    }
  }, [open, dispatch]);

  const showModal = (title, message, type = "info") => {
    setModal({
      isOpen: true,
      title,
      message,
      type,
    });
  };

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
    if (pendingSuccess && onSuccess) {
      onSuccess();
      setPendingSuccess(false);
      if (onClose) onClose(); // Tắt modal thêm người dùng
    }
  };

  useEffect(() => {
    if (!submitted) return;
    if (error) {
      let errorMsg = "Có lỗi xảy ra!";
      if (typeof error === "string") errorMsg = error;
      else if (error?.content) errorMsg = error.content;
      else if (error?.message) errorMsg = error.message;
      else if (error?.data) errorMsg = error.data;
      showModal("Thêm người dùng thất bại", errorMsg, "error");
      setPendingSuccess(false);
    } else if (userInfo) {
      showModal(
        "Thêm người dùng thành công",
        "Người dùng đã được thêm!",
        "success"
      );
      setForm(nd);
      setPendingSuccess(true);
    }
  }, [error, userInfo, submitted]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check empty fields
    for (const key in form) {
      if (!form[key] || form[key].toString().trim() === "") {
        showModal("Thông báo", "Vui lòng điền đầy đủ thông tin.", "warning");
        return;
      }
    }
    // Check email format
    if (!validateEmail(form.email)) {
      showModal("Thông báo", "Email không đúng định dạng.", "error");
      return;
    }
    setSubmitted(true);
    dispatch(addNewUser(form));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-8 w-full max-w-3xl md:max-w-4xl animate-[fadeInUp_0.4s_ease-out] relative mx-2 sm:mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#0284C7] text-2xl font-bold"
        >
          &times;
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Thêm người dùng mới
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Tài khoản
              </label>
              <input
                type="text"
                name="taiKhoan"
                value={form.taiKhoan}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20 outline-none bg-gray-50 text-gray-900 font-medium placeholder:text-gray-400"
                placeholder="Nhập tài khoản"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Họ tên
              </label>
              <input
                type="text"
                name="hoTen"
                value={form.hoTen}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20 outline-none bg-gray-50 text-gray-900 font-medium placeholder:text-gray-400"
                placeholder="Nhập họ tên"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20 outline-none bg-gray-50 text-gray-900 font-medium placeholder:text-gray-400"
                placeholder="Nhập email"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Số điện thoại
              </label>
              <input
                type="text"
                name="soDt"
                value={form.soDt}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20 outline-none bg-gray-50 text-gray-900 font-medium placeholder:text-gray-400"
                placeholder="Nhập số điện thoại"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Mật khẩu
              </label>
              <input
                type="password"
                name="matKhau"
                value={form.matKhau}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20 outline-none bg-gray-50 text-gray-900 font-medium placeholder:text-gray-400"
                placeholder="Nhập mật khẩu"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Mã nhóm
              </label>
              <input
                type="text"
                name="maNhom"
                value={form.maNhom}
                readOnly
                className="w-full px-4 py-3 rounded-xl border border-dashed border-gray-300 bg-gray-100 text-gray-500 font-semibold opacity-80 cursor-not-allowed placeholder:text-gray-400"
                placeholder="GP01 (cố định)"
                tabIndex={-1}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Loại người dùng
              </label>
              <select
                name="maLoaiNguoiDung"
                value={form.maLoaiNguoiDung}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20 outline-none bg-gray-50 text-gray-900 font-medium"
              >
                <option value="HV">Học viên</option>
                <option value="GV">Giáo viên</option>
              </select>
            </div>
          </div>
          <Modal
            isOpen={modal.isOpen}
            onClose={closeModal}
            title={modal.title}
            message={modal.message}
            type={modal.type}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-[#0284C7] to-[#0369A1] text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg"
          >
            {loading ? "Đang thêm..." : "Thêm người dùng"}
          </button>
        </form>
      </div>
    </div>
  );
}
