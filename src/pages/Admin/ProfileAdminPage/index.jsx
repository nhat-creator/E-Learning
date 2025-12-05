import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getUserInfo,
  updateUserInfo,
} from "../../../store/Reducers/userInfoReducer";
import Loading from "../_components/Loading";
import Modal from "../../../components/Modal/modal";

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

export default function ProfileAdminPage() {
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector(
    (state) => state.userInfoReducer
  );

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

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  useEffect(() => {
    if (userInfo) {
      setForm({
        taiKhoan: userInfo.taiKhoan || "",
        hoTen: userInfo.hoTen || "",
        email: userInfo.email || "",
        soDt: userInfo.soDT || "",
        matKhau: userInfo.matKhau || "",
        maLoaiNguoiDung: userInfo.maLoaiNguoiDung || "",
        maNhom: "GP01",
      });
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const openModal = ({ title, message, type = "error" }) => {
    setModalState({ isOpen: true, title, message, type });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
    if (modalState.type === "success") {
      dispatch(getUserInfo());
    }
  };

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

  return (
    <div className="px-4 py-6 md:py-8 animate-[fadeInUp_0.6s_ease-out]">
      <div className="max-w-full mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">
          Thông tin tài khoản Admin
        </h1>

        {loading ? (
          <Loading />
        ) : error ? (
          <div className="text-center py-10 text-red-500">
            {getErrorMessage(error)}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Tài khoản
                </label>
                <input
                  type="text"
                  name="taiKhoan"
                  value={form.taiKhoan}
                  disabled
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-gray-100 text-gray-500 font-semibold"
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
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
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
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
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
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
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
                  autoComplete="new-password"
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Loại người dùng
                </label>
                <input
                  type="text"
                  name="maLoaiNguoiDung"
                  value={form.maLoaiNguoiDung === "GV" ? "Giáo vụ" : "Khác"}
                  disabled
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-gray-100 text-gray-500 font-semibold"
                />
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl shadow-md transition-all w-full sm:w-auto"
              >
                Cập nhật thông tin
              </button>
            </div>
          </form>
        )}

        <Modal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          title={modalState.title}
          message={modalState.message}
          type={modalState.type}
        />
      </div>
    </div>
  );
}
