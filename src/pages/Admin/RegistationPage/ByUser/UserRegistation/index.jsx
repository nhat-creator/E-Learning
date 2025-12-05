import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchApprovedCourses,
  fetchUnregisteredCourses,
  fetchPendingCourses,
} from "../../../../../store/Reducers/registationByUserReducer";
import {
  cancelCourse,
  registerCourse,
} from "../../../../../store/Reducers/registerCourses";
import { joinCourse } from "../../../../../store/Reducers/joinCoursesReducer";
import Loading from "../../../_components/Loading";
import Modal from "../../../../../components/Modal/modal";

const CourseTable = ({ courses, onAction, actionType, loading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const filteredCourses = courses.filter((course) =>
    course.tenKhoaHoc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) {
    return <Loading />;
  }

  const renderPagination = () => {
    if (totalPages <= 1) return null;

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

    return (
      <div className="flex justify-center items-center gap-1 mt-6 select-none">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
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
        {pages.map((page, idx) =>
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
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-all ${
                page === currentPage
                  ? "bg-[#0284C7] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          )
        )}
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
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
    );
  };

  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      <div className="flex items-stretch bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden focus-within:border-[#0284C7] focus-within:shadow-md transition-all max-w-sm mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm khóa học..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-x-auto">
        <table className="min-w-full w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-gray-600 text-left">
              <th className="px-6 py-3 font-semibold">Tên khóa học</th>
              <th className="px-6 py-3 font-semibold">Mô tả</th>
              <th className="px-6 py-3 font-semibold text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedCourses.length > 0 ? (
              paginatedCourses.map((course) => (
                <tr key={course.maKhoaHoc} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {course.tenKhoaHoc}
                  </td>
                  <td className="px-6 py-4 text-gray-600 line-clamp-2">
                    {course.moTa}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {actionType === "pending" ? (
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => onAction(course.maKhoaHoc, "confirm")}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 font-semibold rounded-lg transition-all"
                        >
                          Xác nhận
                        </button>
                        <button
                          onClick={() => onAction(course.maKhoaHoc, "cancel")}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 font-semibold rounded-lg transition-all"
                        >
                          Hủy
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() =>
                          onAction(
                            course.maKhoaHoc,
                            actionType === "approved" ? "cancel" : "register"
                          )
                        }
                        className={`px-4 py-2 font-semibold rounded-lg transition-all text-white ${
                          actionType === "approved"
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-blue-500 hover:bg-blue-600"
                        }`}
                      >
                        {actionType === "approved" && "Hủy"}
                        {actionType === "unregistered" && "Ghi danh"}
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-12 text-gray-500">
                  Không có khóa học nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {renderPagination()}
    </div>
  );
};

export default function UserRegistation() {
  const { taiKhoan } = useParams();
  const dispatch = useDispatch();
  const {
    approvedCourses,
    unregisteredCourses,
    pendingCourses,
    loading,
    error,
  } = useSelector((state) => state.registationByUserReducer);

  const [activeTab, setActiveTab] = useState("approved");
  const [modal, setModal] = useState({
    isOpen: false,
    message: "",
    type: "info",
  });

  const fetchData = () => {
    if (taiKhoan) {
      dispatch(fetchApprovedCourses(taiKhoan));
      dispatch(fetchPendingCourses(taiKhoan));
      dispatch(fetchUnregisteredCourses(taiKhoan));
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch, taiKhoan]);

  const handleAction = async (maKhoaHoc, action) => {
    const payload = { maKhoaHoc, taiKhoan };
    let result;

    try {
      if (action === "register") {
        result = await dispatch(registerCourse(payload)).unwrap();
      } else if (action === "confirm") {
        result = await dispatch(joinCourse(payload)).unwrap();
      } else if (action === "cancel") {
        result = await dispatch(cancelCourse(payload)).unwrap();
      }
      setModal({
        isOpen: true,
        message: "Thao tác thành công!",
        type: "success",
      });
    } catch (err) {
      const errorMessage =
        typeof err === "string"
          ? err
          : err?.content || "Thao tác thất bại. Vui lòng thử lại.";
      setModal({ isOpen: true, message: errorMessage, type: "error" });
    }
  };

  const closeModal = () => {
    setModal({ isOpen: false, message: "", type: "info" });
    fetchData(); // Refetch data after closing modal
  };

  const renderContent = () => {
    switch (activeTab) {
      case "approved":
        return (
          <CourseTable
            courses={approvedCourses}
            onAction={(maKhoaHoc, action) => handleAction(maKhoaHoc, action)}
            actionType="approved"
            loading={loading}
          />
        );
      case "pending":
        return (
          <CourseTable
            courses={pendingCourses}
            onAction={(maKhoaHoc, action) => handleAction(maKhoaHoc, action)}
            actionType="pending"
            loading={loading}
          />
        );
      case "unregistered":
        return (
          <CourseTable
            courses={unregisteredCourses}
            onAction={(maKhoaHoc, action) => handleAction(maKhoaHoc, action)}
            actionType="unregistered"
            loading={loading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="px-4 py-6 md:py-8 animate-[fadeInUp_0.4s_ease-out]">
      <div className="max-w-full mx-auto">
        <h1 className="font-bold text-2xl md:text-4xl text-gray-900 mb-6 flex items-center gap-2">
          Quản lý ghi danh cho tài khoản:
          <span className="text-blue-600 font-mono text-xl md:text-2xl bg-blue-50 px-2 py-1 rounded-lg border border-blue-100">
            {taiKhoan}
          </span>
        </h1>

        <div className="border-b border-gray-200 mb-6">
          <nav className="flex gap-4" aria-label="Tabs">
            <button
              onClick={() => setActiveTab("approved")}
              className={`px-4 py-2 font-semibold rounded-t-lg transition-colors ${
                activeTab === "approved"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Đã ghi danh
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-4 py-2 font-semibold rounded-t-lg transition-colors ${
                activeTab === "pending"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Chờ xét duyệt
            </button>
            <button
              onClick={() => setActiveTab("unregistered")}
              className={`px-4 py-2 font-semibold rounded-t-lg transition-colors ${
                activeTab === "unregistered"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Chưa ghi danh
            </button>
          </nav>
        </div>

        {error && (
          <div className="text-red-500 text-center py-4">Lỗi: {error}</div>
        )}

        <div>{renderContent()}</div>

        <Modal
          isOpen={modal.isOpen}
          onClose={closeModal}
          title={modal.type === "success" ? "Thành công" : "Lỗi"}
          message={modal.message}
          type={modal.type}
        />
      </div>
    </div>
  );
}
