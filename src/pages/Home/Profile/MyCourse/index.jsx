import { getUserInfo } from "../../../../store/Reducers/userInfoReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../_components/Loading";
import { cancelJoinCourse } from "../../../../store/Reducers/joinCoursesReducer";
import Modal from "../../../../components/Modal/modal";
function ConfirmModal({ open, onClose, onConfirm, courseName }) {
  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(0,0,0,0.45)" }}
        aria-hidden={!open}
      >
        {/* Modal content */}
        <div
          className={`bg-white rounded-2xl shadow-2xl px-8 py-8 w-full max-w-md text-center transform transition-all duration-300 ${
            open ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
          style={{ minWidth: 320 }}
          role="dialog"
          aria-modal="true"
        >
          <h3 className="font-bold text-2xl mb-4 text-gray-900">
            Xác nhận hủy ghi danh
          </h3>
          <p className="mb-7 text-gray-700 text-base">
            Bạn có chắc chắn muốn hủy ghi danh khóa học
            <span className="font-bold text-blue-600"> {courseName}</span>?
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={onConfirm}
              className="px-6 py-2.5 rounded-lg bg-red-600 text-white font-semibold text-base hover:bg-red-700 transition-colors min-w-[100px] shadow"
            >
              Có
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg bg-gray-200 text-gray-700 font-semibold text-base hover:bg-gray-300 transition-colors min-w-[100px]"
              autoFocus
            >
              Không
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function MyCourse() {
  // Modal thông báo
  const [notify, setNotify] = useState({
    open: false,
    type: "info",
    title: "",
    message: "",
  });

  // Lấy trạng thái hủy ghi danh từ store
  const joinCoursesState = useSelector(
    (state) => state.joinCoursesReducer || {}
  );
  const {
    loading: cancelLoading,
    error: cancelError,
    success: cancelSuccess,
    message: cancelMessage,
  } = joinCoursesState;
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector(
    (state) => state.userInfoReducer
  );
  const { chiTietKhoaHocGhiDanh } = userInfo || [];

  // Search and pagination states
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  // Filter courses by search term
  let filteredCourses = chiTietKhoaHocGhiDanh || [];
  if (searchTerm) {
    filteredCourses = filteredCourses.filter((course) =>
      course.tenKhoaHoc?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Pagination logic
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCourses = filteredCourses.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelJoin = (course) => {
    setSelectedCourse(course);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedCourse(null);
  };

  const handleModalConfirm = async () => {
    if (selectedCourse) {
      // Gọi API và chờ kết quả
      try {
        const resultAction = await dispatch(
          cancelJoinCourse({
            maKhoaHoc: selectedCourse.maKhoaHoc,
            taiKhoan: userInfo.taiKhoan,
          })
        );
        // Nếu có payload và không lỗi
        if (resultAction && resultAction.payload && !resultAction.error) {
          setNotify({
            open: true,
            type: "success",
            title: "Hủy ghi danh thành công!",
            message:
              resultAction.payload?.message ||
              "Bạn đã hủy ghi danh khóa học thành công!",
          });
        } else {
          setNotify({
            open: true,
            type: "error",
            title: "Hủy ghi danh thất bại",
            message:
              resultAction?.payload ||
              resultAction?.error?.message ||
              "Có lỗi xảy ra!",
          });
        }
      } catch (err) {
        setNotify({
          open: true,
          type: "error",
          title: "Hủy ghi danh thất bại",
          message: err?.message || "Có lỗi xảy ra!",
        });
      }
    }
    setModalOpen(false);
    setSelectedCourse(null);
  };

  // Khi đóng modal thông báo thành công thì mới gọi getUserInfo để rerender
  const handleNotifyClose = () => {
    if (notify.type === "success") {
      dispatch(getUserInfo());
    }
    setNotify({ ...notify, open: false });
  };

  const renderCourses = () => {
    if (loading) {
      return <Loading />;
    }
    if (error) {
      return <div className="text-center py-8 text-red-500">Lỗi: {error}</div>;
    }
    if (!chiTietKhoaHocGhiDanh || chiTietKhoaHocGhiDanh.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          Bạn chưa đăng ký khóa học nào.
        </div>
      );
    }
    return (
      <>
        {/* Search Bar */}
        <div className="w-full md:max-w-md mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm khóa học..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-400"
          />
        </div>
        {/* Results count */}
        <p className="text-gray-600 text-sm mb-6">
          Tìm thấy{" "}
          <span className="font-semibold text-gray-800">
            {filteredCourses.length}
          </span>{" "}
          khóa học
        </p>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {currentCourses.map((course) => (
            <div
              key={course.maKhoaHoc}
              className="bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden aspect-[3/4] border border-gray-100 p-0 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="relative w-full aspect-[3/2] bg-gradient-to-br from-[#0f172a] via-[#111827] to-black flex items-center justify-center overflow-hidden">
                {course.hinhAnh ? (
                  <img
                    src={course.hinhAnh}
                    alt={course.tenKhoaHoc}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      const parent = e.target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class='absolute inset-0 flex items-center justify-center'>
                            <svg class='w-16 h-16 text-gray-300' fill='currentColor' viewBox='0 0 20 20'>
                              <path d='M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z' />
                            </svg>
                          </div>
                        `;
                      }
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex flex-col flex-1 px-6 pt-5 pb-0 gap-3 items-center justify-between">
                <h4 className="font-bold text-lg sm:text-xl text-gray-900 mb-0 text-center truncate">
                  {course.tenKhoaHoc}
                </h4>
                <p className="text-gray-500 text-sm text-center line-clamp-2 mb-2">
                  {course.moTa || "Không có mô tả."}
                </p>
                <div className="items-center justify-between mt-auto mb-5 w-full">
                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <Link
                      to={`/detail/${course.maKhoaHoc}`}
                      className="flex-1 flex items-center justify-center gap-0 xl:gap-2 px-4 py-2.5 rounded-full bg-blue-600 text-white font-semibold text-sm shadow hover:bg-blue-700 transition-colors"
                      aria-label="Xem chi tiết"
                    >
                      <svg
                        className="w-5 h-5 xl:hidden"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="hidden xl:inline whitespace-nowrap">
                        Xem chi tiết
                      </span>
                    </Link>
                    <button
                      className="flex-1 flex items-center justify-center gap-0 xl:gap-2 px-4 py-2.5 rounded-full border border-red-200 text-red-600 font-semibold text-sm shadow hover:bg-red-50 transition-colors"
                      aria-label="Hủy ghi danh"
                      onClick={() => handleCancelJoin(course)}
                    >
                      <svg
                        className="w-5 h-5 xl:hidden"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      <span className="hidden xl:inline whitespace-nowrap">
                        Hủy ghi danh
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination - styled like image */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {/* Prev button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-all duration-200 text-lg font-semibold shadow-sm
                ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed"
                    : "bg-white text-blue-600 border-gray-200 hover:bg-blue-50 hover:text-blue-700"
                }
              `}
              aria-label="Trang trước"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Page numbers */}
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              // Show first, last, current, and neighbors
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-all duration-200 text-lg font-semibold shadow-sm
                      ${
                        currentPage === page
                          ? "bg-blue-600 text-white border-blue-600 shadow-md"
                          : "bg-white text-gray-700 border-gray-200 hover:bg-blue-50 hover:text-blue-700"
                      }
                    `}
                    aria-label={`Trang ${page}`}
                  >
                    {page}
                  </button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <span
                    key={page}
                    className="w-10 h-10 flex items-center justify-center text-gray-400"
                  >
                    ...
                  </span>
                );
              }
              return null;
            })}

            {/* Next button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-all duration-200 text-lg font-semibold shadow-sm
                ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed"
                    : "bg-white text-blue-600 border-gray-200 hover:bg-blue-50 hover:text-blue-700"
                }
              `}
              aria-label="Trang sau"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
        {/* Modal xác nhận hủy ghi danh */}
        <ConfirmModal
          open={modalOpen}
          onClose={handleModalClose}
          onConfirm={handleModalConfirm}
          courseName={selectedCourse?.tenKhoaHoc || ""}
        />
      </>
    );
  };
  return (
    <div className="w-full bg-white rounded-2xl shadow-lg border border-[#e0e7ef] p-4 md:p-8 lg:p-10 animate-[fadeInUp_0.5s_ease]">
      <h1
        className="text-2xl md:text-3xl font-extrabold mb-8"
        style={{ color: "#0284C7" }}
      >
        Khóa học của tôi
      </h1>
      {renderCourses()}
      <Modal
        isOpen={notify.open}
        onClose={handleNotifyClose}
        title={notify.title}
        message={notify.message}
        type={notify.type}
      />
    </div>
  );
}
