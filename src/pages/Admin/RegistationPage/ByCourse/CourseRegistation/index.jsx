import { joinCourse } from "../../../../../store/Reducers/joinCoursesReducer";
import {
  cancelCourse,
  registerCourse,
} from "../../../../../store/Reducers/registerCourses";
import Loading from "../../../_components/Loading";
import Modal from "../../../../../components/Modal/modal";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchUsers,
  fetchNotRegisteredUsers,
  fetchPendingUsers,
} from "../../../../../store/Reducers/registationByCourseReducer";

function ConfirmModal({ open, onClose, onConfirm, user }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xs text-center">
        <h3 className="font-semibold text-lg mb-3">Xác nhận ghi danh</h3>
        <p className="mb-5 text-gray-700">
          Bạn có chắc chắn muốn ghi danh tài khoản
          <span className="font-bold text-blue-600"> {user?.taiKhoan}</span>?
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700"
          >
            Có
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
          >
            Không
          </button>
        </div>
      </div>
    </div>
  );
}

function ConfirmCancelModal({ open, onClose, onConfirm, user }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xs text-center">
        <h3 className="font-semibold text-lg mb-3">Xác nhận hủy ghi danh</h3>
        <p className="mb-5 text-gray-700">
          Bạn có chắc chắn muốn hủy ghi danh tài khoản
          <span className="font-bold text-red-600"> {user?.taiKhoan}</span>?
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700"
          >
            Có
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
          >
            Không
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CourseRegistation() {
  const [modalOpen, setModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });
  const dispatch = useDispatch();
  const { maKhoaHoc } = useParams();
  useEffect(() => {
    dispatch(fetchUsers(maKhoaHoc));
    dispatch(fetchPendingUsers(maKhoaHoc));
    dispatch(fetchNotRegisteredUsers(maKhoaHoc));
  }, [dispatch, maKhoaHoc]);
  const state = useSelector((state) => state.registationByCourseReducer);
  const { users, pendingUsers, notRegisteredUsers, loading, error } = state;

  const [activeTab, setActiveTab] = useState("users");
  // Search & Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const tabList = [
    { key: "users", label: "Đã ghi danh", data: users },
    { key: "pendingUsers", label: "Chờ xét duyệt", data: pendingUsers },
    {
      key: "notRegisteredUsers",
      label: "Chưa ghi danh",
      data: notRegisteredUsers,
    },
  ];

  const handleJoinCourse = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const handleRegisterClick = (user) => {
    setSelectedUser(user);
    setRegisterModalOpen(true);
  };

  const handleCloseRegisterModal = () => {
    setRegisterModalOpen(false);
    setSelectedUser(null);
  };

  const handleConfirmRegister = async () => {
    if (selectedUser) {
      try {
        const result = await dispatch(
          registerCourse({ maKhoaHoc, taiKhoan: selectedUser.taiKhoan })
        );
        if (result.error) {
          setModal({
            isOpen: true,
            title: "Ghi danh thất bại",
            message: result.payload || "Đã có lỗi xảy ra.",
            type: "error",
          });
        } else {
          setModal({
            isOpen: true,
            title: "Chúc mừng!",
            message: "Bạn đã ghi danh thành công!",
            type: "success",
          });
        }
      } catch (error) {
        setModal({
          isOpen: true,
          title: "Ghi danh thất bại",
          message: "Đã có lỗi xảy ra.",
          type: "error",
        });
      }
    }
    handleCloseRegisterModal();
  };

  const handleCancelCourseClick = (user) => {
    setSelectedUser(user);
    setCancelModalOpen(true);
  };

  const handleCloseCancelModal = () => {
    setCancelModalOpen(false);
    setSelectedUser(null);
  };

  const handleConfirmCancel = async () => {
    if (selectedUser) {
      try {
        const result = await dispatch(
          cancelCourse({ maKhoaHoc, taiKhoan: selectedUser.taiKhoan })
        );
        if (result.error) {
          setModal({
            isOpen: true,
            title: "Hủy ghi danh thất bại",
            message: result.payload || "Đã có lỗi xảy ra.",
            type: "error",
          });
        } else {
          setModal({
            isOpen: true,
            title: "Chúc mừng!",
            message: "Bạn đã hủy ghi danh thành công!",
            type: "success",
          });
        }
      } catch (error) {
        setModal({
          isOpen: true,
          title: "Hủy ghi danh thất bại",
          message: "Đã có lỗi xảy ra.",
          type: "error",
        });
      }
    }
    handleCloseCancelModal();
  };

  const handleModalConfirm = async () => {
    if (selectedUser) {
      try {
        const result = await dispatch(
          joinCourse({ maKhoaHoc, taiKhoan: selectedUser.taiKhoan })
        );
        if (result.error) {
          setModal({
            isOpen: true,
            title: "Ghi danh thất bại",
            message: result.payload || "Đã có lỗi xảy ra.",
            type: "error",
          });
        } else {
          setModal({
            isOpen: true,
            title: "Chúc mừng!",
            message: "Bạn đã ghi danh thành công!",
            type: "success",
          });
        }
      } catch (error) {
        setModal({
          isOpen: true,
          title: "Ghi danh thất bại",
          message: "Đã có lỗi xảy ra.",
          type: "error",
        });
      }
    }
    setModalOpen(false);
    setSelectedUser(null);
  };

  const renderTable = (data, type) => {
    // Search
    let filtered = Array.isArray(data)
      ? data.filter((user) => {
          const term = searchTerm.trim().toLowerCase();
          if (!term) return true;
          return (
            user.hoTen?.toLowerCase().includes(term) ||
            user.taiKhoan?.toLowerCase().includes(term) ||
            user.biDanh?.toLowerCase().includes(term)
          );
        })
      : [];

    // Pagination
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentRows = filtered.slice(startIndex, endIndex);

    return (
      <>
        {/* Search Bar */}
        <div className="flex items-stretch bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden focus-within:border-[#0284C7] focus-within:shadow-md transition-all max-w-xs mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 text-gray-700 outline-none border-none w-full bg-transparent focus:ring-0 text-sm"
          />
          <button
            onClick={() => setSearchTerm("")}
            className="px-4 text-gray-400 hover:text-white hover:bg-[#0284C7] transition-all border-l border-gray-200"
          >
            <svg
              width="20"
              height="20"
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
        <div className="overflow-x-auto">
          <table className="min-w-[600px] w-full text-xs md:text-sm bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mt-2">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr className="text-gray-600 text-left">
                <th className="px-4 py-2 md:px-6 md:py-4 font-semibold">
                  Họ tên
                </th>
                <th className="px-2 py-2 md:px-4 md:py-4 font-semibold">
                  Tài khoản
                </th>
                <th className="px-2 py-2 md:px-4 md:py-4 font-semibold">
                  Bí danh
                </th>
                <th className="px-2 py-2 md:px-4 md:py-4 font-semibold text-center">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-12">
                    <Loading />
                  </td>
                </tr>
              ) : currentRows.length > 0 ? (
                currentRows.map((user, idx) => (
                  <tr
                    key={user.taiKhoan || user.email || idx}
                    className="hover:bg-blue-50/60 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {user.hoTen || "-"}
                    </td>
                    <td className="px-4 py-4 text-gray-500 font-mono text-xs">
                      {user.taiKhoan || "-"}
                    </td>
                    <td className="px-4 py-4 text-gray-600">
                      {user.biDanh || "-"}
                    </td>
                    <td className="px-4 py-4 text-center flex gap-2 justify-center">
                      {/* Đã ghi danh: nút Hủy */}
                      {type === "users" && (
                        <button
                          onClick={() => handleCancelCourseClick(user)}
                          className="bg-red-500 text-white hover:bg-red-600 rounded-lg px-4 py-2 font-semibold transition-all"
                          title="Hủy ghi danh"
                        >
                          Hủy
                        </button>
                      )}
                      {/* Chờ xét duyệt: nút Xác nhận và Hủy */}
                      {type === "pendingUsers" && (
                        <>
                          <button
                            className="bg-green-500 text-white hover:bg-green-600 rounded-lg px-4 py-2 font-semibold transition-all"
                            title="Xác nhận"
                            onClick={() => handleJoinCourse(user)}
                          >
                            Xác nhận
                          </button>
                          <button
                            onClick={() => handleCancelCourseClick(user)}
                            className="bg-red-500 text-white hover:bg-red-600 rounded-lg px-4 py-2 font-semibold transition-all"
                            title="Hủy ghi danh"
                          >
                            Hủy
                          </button>
                        </>
                      )}
                      {/* Chưa ghi danh: nút Ghi danh */}
                      {type === "notRegisteredUsers" && (
                        <button
                          onClick={() => handleRegisterClick(user)}
                          className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg px-4 py-2 font-semibold transition-all"
                          title="Ghi danh"
                        >
                          Ghi danh
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-gray-400 bg-gray-50"
                  >
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-1 mt-6 select-none">
            <button
              className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-gray-700 hover:bg-gray-100 disabled:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed transition-all"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
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
            {(() => {
              const pages = [];
              if (totalPages <= 5) {
                for (let i = 1; i <= totalPages; i++) {
                  pages.push(i);
                }
              } else {
                if (currentPage <= 3) {
                  pages.push(1, 2, 3, 4, "...", totalPages);
                } else if (currentPage >= totalPages - 2) {
                  pages.push(
                    1,
                    "...",
                    totalPages - 3,
                    totalPages - 2,
                    totalPages - 1,
                    totalPages
                  );
                } else {
                  pages.push(
                    1,
                    "...",
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    "...",
                    totalPages
                  );
                }
              }
              return pages.map((page, idx) =>
                page === "..." ? (
                  <span
                    key={"ellipsis-" + idx}
                    className="w-8 h-8 flex items-center justify-center text-gray-400"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-all ${
                      page === currentPage
                        ? "bg-[#0284C7] text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                )
              );
            })()}
            <button
              className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-gray-700 hover:bg-gray-100 disabled:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed transition-all"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
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
      </>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Quản lý ghi danh khóa học
      </h1>
      <div className="flex gap-2 mb-4">
        {tabList.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 border-b-2 ${
              activeTab === tab.key
                ? "border-[#0284C7] text-[#0284C7] bg-blue-50"
                : "border-transparent text-gray-600 bg-white hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="py-10 text-center text-red-500">Lỗi tải dữ liệu</div>
      ) : (
        renderTable(
          tabList.find((tab) => tab.key === activeTab)?.data,
          activeTab
        )
      )}
      {/* Modal xác nhận ghi danh */}
      <ConfirmModal
        open={modalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        user={selectedUser}
      />
      <ConfirmModal
        open={registerModalOpen}
        onClose={handleCloseRegisterModal}
        onConfirm={handleConfirmRegister}
        user={selectedUser}
      />
      <ConfirmCancelModal
        open={cancelModalOpen}
        onClose={handleCloseCancelModal}
        onConfirm={handleConfirmCancel}
        user={selectedUser}
      />
      <Modal
        isOpen={modal.isOpen}
        onClose={() => {
          const wasSuccess = modal.type === "success";
          setModal((prev) => ({ ...prev, isOpen: false }));
          if (wasSuccess) {
            dispatch(fetchUsers(maKhoaHoc));
            dispatch(fetchPendingUsers(maKhoaHoc));
            dispatch(fetchNotRegisteredUsers(maKhoaHoc));
          }
        }}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
    </div>
  );
}
