import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { findUserInfo } from "../../../../store/Reducers/userReducer";
import Loading from "../../_components/Loading";
import { updateUserInfo } from "../../../../store/Reducers/userInfoReducer";
import Modal from "../../../../components/Modal/modal";
export default function UpdateUserPage() {
  const [form, setForm] = useState({
    taiKhoan: "",
    hoTen: "",
    email: "",
    soDT: "",
    matKhau: "",
    maNhom: "GP01",
    maLoaiNguoiDung: "HV",
  });
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });
  const dispatch = useDispatch();
  const { taiKhoan } = useParams();

  useEffect(() => {
    if (taiKhoan) {
      dispatch(findUserInfo(taiKhoan));
    }
  }, [dispatch, taiKhoan]);

  const state = useSelector((state) => state.userReducer);
  const { userInfo: userInfoReducer, loading, error } = state;
  const userInfo = userInfoReducer ? userInfoReducer[0] : null;

  useEffect(() => {
    if (userInfo) {
      setForm({
        taiKhoan: userInfo.taiKhoan,
        hoTen: userInfo.hoTen,
        email: userInfo.email || "",
        soDT: userInfo.soDT || "",
        matKhau: userInfo.matKhau || "",
        maNhom: userInfo.maNhom || "GP01",
        maLoaiNguoiDung: userInfo.maLoaiNguoiDung || "HV",
      });
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(updateUserInfo(form));
      if (resultAction?.payload && !resultAction?.error) {
        setModal({
          isOpen: true,
          title: "Cập nhật thành công",
          message: "Thông tin người dùng đã được cập nhật!",
          type: "success",
        });
      } else {
        let errorMsg = "Có lỗi xảy ra!";
        if (resultAction?.error?.message) errorMsg = resultAction.error.message;
        else if (resultAction?.payload?.content)
          errorMsg = resultAction.payload.content;
        setModal({
          isOpen: true,
          title: "Cập nhật thất bại",
          message: errorMsg,
          type: "error",
        });
      }
    } catch (err) {
      setModal({
        isOpen: true,
        title: "Cập nhật thất bại",
        message: err?.message || "Có lỗi xảy ra!",
        type: "error",
      });
    }
  };

  const handleCloseModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
    // Nếu thành công thì rerender lại user info
    if (modal.type === "success") {
      dispatch(findUserInfo(form.taiKhoan));
    }
  };

  return (
    <div className="px-4 py-6 md:py-8 animate-[fadeInUp_0.6s_ease-out]">
      <div className="max-w-full mx-auto">
        <h1 className="font-extrabold text-2xl md:text-3xl text-gray-900 mb-8 text-left tracking-tight">
          Cập nhật thông tin người dùng
        </h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
        >
          <div>
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="taiKhoan"
            >
              Tài khoản
            </label>
            <input
              type="text"
              id="taiKhoan"
              name="taiKhoan"
              value={form.taiKhoan.trim()}
              placeholder="Nhập tài khoản"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed focus:border-gray-200 focus:bg-gray-100 outline-none transition-all placeholder:text-gray-400"
              required
              readOnly
            />
          </div>
          <div>
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="hoTen"
            >
              Họ tên
            </label>
            <input
              type="text"
              id="hoTen"
              name="hoTen"
              value={form.hoTen}
              onChange={handleChange}
              placeholder="Nhập họ tên"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:border-blue-400 focus:bg-white outline-none transition-all placeholder:text-gray-400"
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Nhập email"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:border-blue-400 focus:bg-white outline-none transition-all placeholder:text-gray-400"
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="soDT"
            >
              Số điện thoại
            </label>
            <input
              type="text"
              id="soDT"
              name="soDT"
              value={form.soDT}
              onChange={handleChange}
              placeholder="Nhập số điện thoại"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:border-blue-400 focus:bg-white outline-none transition-all placeholder:text-gray-400"
            />
          </div>
          <div>
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="matKhau"
            >
              Mật khẩu
            </label>
            <input
              type="password"
              id="matKhau"
              name="matKhau"
              value={form.matKhau}
              onChange={handleChange}
              placeholder="Nhập mật khẩu"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:border-blue-400 focus:bg-white outline-none transition-all placeholder:text-gray-400"
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="maNhom"
            >
              Mã nhóm
            </label>
            <input
              type="text"
              id="maNhom"
              name="maNhom"
              value={form.maNhom}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed focus:border-gray-200 focus:bg-gray-100 outline-none transition-all placeholder:text-gray-400"
              readOnly
            />
          </div>
          <div className="md:col-span-2">
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="maLoaiNguoiDung"
            >
              Loại người dùng
            </label>
            <select
              id="maLoaiNguoiDung"
              name="maLoaiNguoiDung"
              value={form.maLoaiNguoiDung}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:border-blue-400 focus:bg-white outline-none transition-all placeholder:text-gray-400"
            >
              <option value="HV">Học viên</option>
              <option value="GV">Giáo viên</option>
            </select>
          </div>
        </form>
        <div className="md:col-span-2 flex mt-4">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-600 text-white font-bold px-8 py-3 rounded-xl shadow-md hover:bg-blue-700 hover:scale-105 transition-all text-base"
          >
            Cập nhật thông tin
          </button>
        </div>
        <Modal
          isOpen={modal.isOpen}
          onClose={handleCloseModal}
          title={modal.title}
          message={modal.message}
          type={modal.type}
        />
      </div>
    </div>
  );
}
