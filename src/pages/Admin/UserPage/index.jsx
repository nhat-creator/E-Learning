import { useDispatch, useSelector } from "react-redux";
import { fetchListUsers } from "../../../store/Reducers/listUsersReducer";
import AddUserModal from "./AddUserPage";
import {
  deleteUser,
  clearUserError,
} from "../../../store/Reducers/userReducer";
import { useEffect, useState } from "react";
import Modal from "../../../components/Modal/modal";
import Loading from "../_components/Loading";
import { Link } from "react-router-dom";

export default function UserPage() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 8;
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    taiKhoan: null,
  });
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });

  const { listUsers, loading, error } = useSelector(
    (state) => state.listUsersReducer
  );
  const { error: deleteError, loading: deleteLoading } = useSelector(
    (state) => state.userReducer
  );
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    dispatch(fetchListUsers());
  }, [dispatch]);

  useEffect(() => {
    // Show error modal if delete failed
    if (deleteError) {
      let errorMsg = "Có lỗi xảy ra!";
      if (typeof deleteError === "string") errorMsg = deleteError;
      else if (deleteError?.content) errorMsg = deleteError.content;
      else if (deleteError?.message) errorMsg = deleteError.message;
      else if (deleteError?.data) errorMsg = deleteError.data;
      setModal({
        isOpen: true,
        title: "Xóa người dùng thất bại",
        message: errorMsg,
        type: "error",
      });
    }
  }, [deleteError]);

  useEffect(() => {
    if (!deleteLoading && !deleteError && !deleteModal.isOpen) {
      // Only show if a delete was just attempted
      if (deleteSuccess) {
        setModal({
          isOpen: true,
          title: "Xóa người dùng thành công",
          message: "Bạn đã xóa thành công!",
          type: "success",
        });
        setDeleteSuccess(false);
      }
    }
  }, [deleteLoading, deleteError, deleteModal.isOpen, deleteSuccess]);

  // Filter users by tab and search
  const filteredUsers =
    listUsers?.filter((user) => {
      // Filter by tab
      let tabMatch = true;
      if (activeTab === "students") tabMatch = user.maLoaiNguoiDung === "HV";
      if (activeTab === "teachers") tabMatch = user.maLoaiNguoiDung === "GV";

      // Filter by search term (by name or account)
      let searchMatch = true;
      if (searchTerm.trim()) {
        const search = searchTerm.toLowerCase();
        searchMatch =
          user.hoTen?.toLowerCase().includes(search) ||
          user.taiKhoan?.toLowerCase().includes(search);
      }

      return tabMatch && searchMatch;
    }) || [];

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteClick = (taiKhoan) => {
    setDeleteModal({ isOpen: true, taiKhoan });
  };

  const handleDeleteConfirm = () => {
    if (deleteModal.taiKhoan) {
      dispatch(deleteUser(deleteModal.taiKhoan));
      setDeleteSuccess(true);
    }
    setDeleteModal({ isOpen: false, taiKhoan: null });
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, taiKhoan: null });
  };

  const closeModal = () => {
    // If this was an error modal for delete, clear the redux error so it won't reappear
    if (modal.type === "error" && modal.title === "Xóa người dùng thất bại") {
      dispatch(clearUserError());
      setDeleteSuccess(false);
    }

    setModal((prev) => ({ ...prev, isOpen: false }));

    // If last modal was success, rerender user list
    if (
      modal.type === "success" &&
      modal.title === "Xóa người dùng thành công"
    ) {
      dispatch(fetchListUsers());
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const renderListUsers = () => {
    if (loading) {
      return <Loading />;
    }

    if (error) {
      return (
        <tr>
          <td colSpan="7" className="px-6 py-12 text-center">
            <div className="text-red-500">Lỗi: {error}</div>
          </td>
        </tr>
      );
    }

    if (!currentUsers || currentUsers.length === 0) {
      return (
        <tr>
          <td colSpan="7" className="px-6 py-12 text-center">
            <div className="text-gray-500">Không có người dùng nào</div>
          </td>
        </tr>
      );
    }

    return currentUsers.map((user) => (
      <tr key={user.taiKhoan} className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4">
          <span className="font-semibold text-gray-900">{user.hoTen}</span>
        </td>
        <td className="px-4 py-4">
          <span className="text-gray-500 font-mono text-xs">
            {user.taiKhoan}
          </span>
        </td>
        <td className="px-4 py-4 text-gray-600">{user.email}</td>
        <td className="px-4 py-4">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
              user.maLoaiNguoiDung === "GV"
                ? "bg-purple-50 text-purple-700"
                : "bg-blue-50 text-blue-700"
            }`}
          >
            {user.maLoaiNguoiDung === "GV" ? "Giáo viên" : "Học viên"}
          </span>
        </td>
        <td className="px-4 py-4 text-gray-600 text-xs">
          {user.soDt || "N/A"}
        </td>
        <td className="px-4 py-4">
          <div className="flex gap-2 justify-center">
            {/* Nút chỉnh sửa: icon bút chì màu vàng */}
            <Link to={`/admin/user/update/${user.taiKhoan}`}>
              <button
                className="bg-yellow-400 text-white hover:bg-yellow-500 rounded-lg p-2 transition-all hover:scale-110 shadow-md"
                title="Chỉnh sửa"
              >
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 17.25V21h3.75l11.06-11.06a1.5 1.5 0 0 0-2.12-2.12L4.62 18.88z" />
                </svg>
              </button>
            </Link>

            {/* Nút xem chi tiết: icon mắt màu xanh */}
            <Link to={`/admin/user/${user.taiKhoan}`}>
              <button
                className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg p-2 transition-all hover:scale-110 shadow-md"
                title="Xem chi tiết"
              >
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </Link>

            {/* Nút xóa */}
            <button
              className="bg-red-500 text-white hover:bg-red-600 rounded-lg p-2 transition-all hover:scale-110 shadow-md"
              onClick={() => handleDeleteClick(user.taiKhoan)}
              title="Xóa"
            >
              <svg
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <div className="px-4 py-6 md:py-8 animate-[fadeInUp_0.6s_ease-out]">
      <div className="max-w-full mx-auto">
        <div className="mb-8">
          <h1 className="font-bold text-2xl md:text-4xl text-gray-900 mb-6 text-center md:text-left">
            Quản lý người dùng
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-stretch bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden focus-within:border-[#0284C7] focus-within:shadow-md transition-all flex-1 max-w-md w-full">
              <input
                type="text"
                placeholder="Tìm kiếm người dùng..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2 md:px-5 md:py-3 text-gray-700 outline-none border-none w-full bg-transparent focus:ring-0 text-sm md:text-base placeholder:text-gray-400"
              />
              <button
                onClick={() => {
                  setSearchTerm("");
                  setCurrentPage(1);
                }}
                className="px-4 md:px-5 text-gray-400 hover:text-white hover:bg-[#0284C7] transition-all border-l border-gray-200"
              >
                <svg
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            </div>
            <button
              className="bg-[#0284C7] text-white px-4 py-2 md:px-5 md:py-3 rounded-xl text-xs md:text-sm font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2 whitespace-nowrap w-full md:w-auto"
              onClick={() => setOpenModal(true)}
            >
              <svg
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 5v14m-7-7h14" />
              </svg>
              Thêm người dùng
            </button>
          </div>
        </div>
        <div className="mb-6">
          <div className="flex gap-2 flex-wrap justify-center md:justify-start">
            <button
              onClick={() => {
                setActiveTab("all");
                setCurrentPage(1);
              }}
              className={`px-3 py-1 md:px-4 md:py-2 rounded-lg font-medium text-xs md:text-sm transition-all ${
                activeTab === "all"
                  ? "bg-[#0284C7] text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#0284C7]"
              }`}
            >
              Tất cả ({listUsers?.length || 0})
            </button>
            <button
              onClick={() => {
                setActiveTab("students");
                setCurrentPage(1);
              }}
              className={`px-3 py-1 md:px-4 md:py-2 rounded-lg font-medium text-xs md:text-sm transition-all ${
                activeTab === "students"
                  ? "bg-[#0284C7] text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#0284C7]"
              }`}
            >
              Học viên (
              {listUsers?.filter((u) => u.maLoaiNguoiDung === "HV").length || 0}
              )
            </button>
            <button
              onClick={() => {
                setActiveTab("teachers");
                setCurrentPage(1);
              }}
              className={`px-3 py-1 md:px-4 md:py-2 rounded-lg font-medium text-xs md:text-sm transition-all ${
                activeTab === "teachers"
                  ? "bg-[#0284C7] text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#0284C7]"
              }`}
            >
              Giáo viên (
              {listUsers?.filter((u) => u.maLoaiNguoiDung === "GV").length || 0}
              )
            </button>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-x-auto">
          <table className="min-w-[600px] w-full text-xs md:text-sm">
            <thead className="bg-linear-to-r from-gray-50 to-gray-100">
              <tr className="text-gray-600 text-left">
                <th className="px-4 py-2 md:px-6 md:py-4 font-semibold">
                  Họ tên
                </th>
                <th className="px-2 py-2 md:px-4 md:py-4 font-semibold">
                  Tài khoản
                </th>
                <th className="px-2 py-2 md:px-4 md:py-4 font-semibold">
                  Email
                </th>
                <th className="px-2 py-2 md:px-4 md:py-4 font-semibold">
                  Loại người dùng
                </th>
                <th className="px-2 py-2 md:px-4 md:py-4 font-semibold">
                  Số điện thoại
                </th>
                <th className="px-2 py-2 md:px-4 md:py-4 font-semibold text-center">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {renderListUsers()}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-1 mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-gray-700 hover:bg-gray-100 disabled:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed transition-all"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {getPageNumbers().map((page, index) =>
              page === "..." ? (
                <span
                  key={`ellipsis-${index}`}
                  className="w-8 h-8 flex items-center justify-center text-gray-400"
                >
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-all ${
                    currentPage === page
                      ? "bg-[#0284C7] text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-gray-700 hover:bg-gray-100 disabled:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed transition-all"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
      <AddUserModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={() => dispatch(fetchListUsers())}
      />
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-[fadeInUp_0.3s_ease-out] p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Xác nhận xóa người dùng
            </h3>
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              Bạn có chắc chắn muốn xóa người dùng này?
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handleDeleteConfirm}
                className="bg-red-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-red-600 transition-all"
              >
                Có
              </button>
              <button
                onClick={handleDeleteCancel}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-xl font-bold hover:bg-gray-400 transition-all"
              >
                Không
              </button>
            </div>
          </div>
        </div>
      )}
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
