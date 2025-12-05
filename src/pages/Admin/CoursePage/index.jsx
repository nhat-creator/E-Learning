import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCourses } from "../../../store/Reducers/listCourseReducer";
import AddCoursePage from "./AddCoursePage";
import { deleteCourse } from "../../../store/Reducers/courseReducer";
import Modal from "../../../components/Modal/modal";
import { useNavigate } from "react-router-dom";
import Loading from "../_components/Loading";
import { Link } from "react-router-dom";

const PAGE_SIZE = 8;

export default function CoursePage() {
  const navigate = useNavigate();
  const {
    loading,
    error,
    courses: fetchedCourses = [],
  } = useSelector((state) => state.listCourseReducer);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  const dispatch = useDispatch();
  const [showAddModal, setShowAddModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    course: null,
  });
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  // Lấy danh sách danh mục duy nhất
  const categories = Array.from(
    new Set(
      (fetchedCourses || [])
        .map((c) => c.danhMucKhoaHoc?.tenDanhMucKhoaHoc)
        .filter(Boolean)
    )
  );

  // Lọc theo tab
  let tabbedCourses = fetchedCourses || [];
  if (activeTab !== "all") {
    tabbedCourses = tabbedCourses.filter(
      (course) => course.danhMucKhoaHoc?.tenDanhMucKhoaHoc === activeTab
    );
  }

  // Lọc theo tìm kiếm
  const filteredCourses = tabbedCourses.filter((course) =>
    course.tenKhoaHoc?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalCourses = filteredCourses.length;
  const totalPages = Math.ceil(totalCourses / PAGE_SIZE) || 1;
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Reset page if search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleDeleteClick = (course) => {
    setConfirmDelete({ open: true, course });
  };

  const handleConfirmDelete = async () => {
    if (confirmDelete.course) {
      try {
        const result = await dispatch(
          deleteCourse(confirmDelete.course.maKhoaHoc)
        );

        if (result.error) {
          // Xóa thất bại, hiển thị lỗi từ API
          let errorMessage = "Xóa khóa học thất bại.";

          if (result.payload) {
            const data = result.payload;
            if (typeof data === "string") {
              errorMessage = data;
            } else if (data.message) {
              errorMessage = data.message;
            } else {
              errorMessage = JSON.stringify(data);
            }
          } else if (result.error.message) {
            errorMessage = result.error.message;
          }

          setModal({
            isOpen: true,
            title: "Xóa khóa học thất bại",
            message: errorMessage,
            type: "error",
          });
        } else {
          // Xóa thành công
          setModal({
            isOpen: true,
            title: "Chúc mừng!",
            message: "Bạn đã xóa khóa học thành công!",
            type: "success",
          });
        }
      } catch (err) {
        // Xử lý lỗi ngoại lệ
        let errorMessage = "Xóa khóa học thất bại.";

        if (err.response?.data) {
          const data = err.response.data;
          if (typeof data === "string") {
            errorMessage = data;
          } else if (data.message) {
            errorMessage = data.message;
          } else {
            errorMessage = JSON.stringify(data);
          }
        } else if (err.message) {
          errorMessage = err.message;
        }

        setModal({
          isOpen: true,
          title: "Xóa khóa học thất bại",
          message: errorMessage,
          type: "error",
        });
      }
    }
    setConfirmDelete({ open: false, course: null });
  };

  const handleCancelDelete = () => {
    setConfirmDelete({ open: false, course: null });
  };

  return (
    <div className="px-4 py-6 md:py-8 animate-[fadeInUp_0.6s_ease-out]">
      <div className="max-w-full mx-auto">
        <h1 className="font-bold text-2xl md:text-4xl text-gray-900 mb-6 text-center md:text-left">
          Quản lý khóa học
        </h1>
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            className={`px-4 py-2 rounded-xl font-medium border transition-all text-xs md:text-sm whitespace-nowrap ${
              activeTab === "all"
                ? "bg-[#0284C7] text-white border-[#0284C7] shadow"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
            }`}
            onClick={() => {
              setActiveTab("all");
              setCurrentPage(1);
            }}
          >
            Tất cả ({fetchedCourses.length})
          </button>
          {categories.map((cat) => {
            const count = fetchedCourses.filter(
              (c) => c.danhMucKhoaHoc?.tenDanhMucKhoaHoc === cat
            ).length;
            return (
              <button
                key={cat}
                className={`px-4 py-2 rounded-xl font-medium border transition-all text-xs md:text-sm whitespace-nowrap ${
                  activeTab === cat
                    ? "bg-[#0284C7] text-white border-[#0284C7] shadow"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
                onClick={() => {
                  setActiveTab(cat);
                  setCurrentPage(1);
                }}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-stretch bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden focus-within:border-[#0284C7] focus-within:shadow-md transition-all flex-1 max-w-md w-full">
            <input
              type="text"
              placeholder="Tìm kiếm khóa học..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 md:px-5 md:py-3 text-gray-700 outline-none border-none w-full bg-transparent focus:ring-0 text-sm md:text-base placeholder:text-gray-400 placeholder:font-normal"
            />
            <button
              onClick={() => setSearchTerm("")}
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
            onClick={() => setShowAddModal(true)}
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
            Thêm khóa học
          </button>
          {showAddModal && (
            <AddCoursePage
              showModal={showAddModal}
              setShowModal={setShowAddModal}
              onSuccess={() => dispatch(fetchCourses())}
            />
          )}
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-x-auto">
          {loading ? (
            <Loading />
          ) : error ? (
            <div className="py-12 text-center text-red-500">{error}</div>
          ) : (
            <table className="min-w-[900px] w-full text-xs md:text-sm">
              <thead className="bg-linear-to-r from-gray-50 to-gray-100">
                <tr className="text-gray-600 text-left">
                  <th className="px-4 py-2 md:px-6 md:py-4 font-semibold">
                    Tên khóa học
                  </th>
                  <th className="px-2 py-2 md:px-4 md:py-4 font-semibold">
                    Tên danh mục
                  </th>
                  <th className="px-2 py-2 md:px-4 md:py-4 font-semibold">
                    Mô tả
                  </th>
                  <th className="px-2 py-2 md:px-4 md:py-4 font-semibold">
                    Ngày tạo
                  </th>
                  <th className="px-2 py-2 md:px-4 md:py-4 font-semibold text-center">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedCourses.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      Không có khóa học nào
                    </td>
                  </tr>
                ) : (
                  paginatedCourses.map((course) => (
                    <tr
                      key={course.maKhoaHoc}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-2 md:px-6 md:py-4 font-semibold text-gray-900">
                        {course.tenKhoaHoc}
                      </td>
                      <td className="px-2 py-2 md:px-4 md:py-4">
                        {course.danhMucKhoaHoc?.tenDanhMucKhoaHoc || "-"}
                      </td>
                      <td className="px-2 py-2 md:px-4 md:py-4 text-gray-600">
                        {course.moTa && course.moTa.length > 60
                          ? course.moTa.slice(0, 60) + "..."
                          : course.moTa}
                      </td>
                      <td className="px-2 py-2 md:px-4 md:py-4 text-gray-600">
                        {course.ngayTao}
                      </td>
                      <td className="px-2 py-2 md:px-4 md:py-4 text-center">
                        <div className="flex gap-2 justify-center">
                          {/* Nút chỉnh sửa: icon bút chì màu vàng */}
                          <button
                            onClick={() => {
                              course.maKhoaHoc
                                ? navigate(
                                    `/admin/course/update/${course.maKhoaHoc}`
                                  )
                                : navigate("/admin/error-404");
                            }}
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
                          {/* Nút xem chi tiết: icon mắt màu xanh */}
                          <button
                            onClick={() => {
                              course.maKhoaHoc
                                ? navigate(
                                    `/admin/detail-course/${course.maKhoaHoc}`
                                  )
                                : navigate("/admin/error-404");
                            }}
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
                          <button
                            className="bg-red-500 text-white hover:bg-red-600 rounded-lg p-2 transition-all hover:scale-110 shadow-md"
                            onClick={() => handleDeleteClick(course)}
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
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination ngoài bảng */}
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
            {/* Hiển thị dạng rút gọn: 1, 2, ..., n */}
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
      </div>
      {/* Modal xác nhận xóa giống UserPage */}
      {confirmDelete.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-[fadeInUp_0.3s_ease-out] p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Xác nhận xóa khóa học
            </h3>
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              Bạn có chắc chắn muốn xóa khóa học
              <span className="font-semibold text-red-600">
                {" "}
                {confirmDelete.course?.tenKhoaHoc}{" "}
              </span>
              không?
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-red-600 transition-all"
              >
                Có
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-xl font-bold hover:bg-gray-400 transition-all"
              >
                Không
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal thông báo xóa thành công/thất bại */}
      <Modal
        isOpen={modal.isOpen}
        onClose={() => {
          const wasSuccess = modal.type === "success";
          setModal((prev) => ({ ...prev, isOpen: false }));
          // Chỉ fetch lại khi modal thành công vừa đóng
          if (wasSuccess) {
            dispatch(fetchCourses());
          }
        }}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
    </div>
  );
}
