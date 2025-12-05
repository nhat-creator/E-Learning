import { useSelector, useDispatch } from "react-redux";
import Loading from "../_components/Loading";
import { fetchCoursesByCategory } from "../../../store/Reducers/courseByCategoryReducer";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function CoursesByCategory() {
  const state = useSelector((state) => state.courseByCategoryReducer);
  const { courses, loading, error } = state;
  const dispatch = useDispatch();
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchCoursesByCategory(id));
    setCurrentPage(1); // Reset to page 1 when category changes
  }, [dispatch, id]);

  // Pagination calculations
  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCourses = courses.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
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

    return pages.map((page, index) => {
      if (page === "...") {
        return (
          <span
            key={`ellipsis-${index}`}
            className="px-3 py-2 text-gray-400 font-bold text-lg"
          >
            ...
          </span>
        );
      }

      return (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`min-w-[44px] h-11 px-4 py-2 rounded-xl font-bold transition-all duration-300 shadow-md ${
            currentPage === page
              ? "bg-gradient-to-r from-[#0284C7] to-[#0369A1] text-white shadow-xl scale-110 ring-2 ring-[#0284C7]/30"
              : "bg-white text-gray-700 hover:bg-gray-50 hover:scale-105 hover:shadow-lg"
          }`}
        >
          {page}
        </button>
      );
    });
  };

  const renderCourses = () => {
    return currentCourses.map((course, index) => (
      <div
        key={`${course.maKhoaHoc}-${currentPage}`}
        className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-[fadeInUp_0.5s_ease-out]"
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        {/* Image */}
        <div className="relative overflow-hidden h-48 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
          <img
            src={course.hinhAnh}
            alt={course.tenKhoaHoc}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.innerHTML = `
                <div class="absolute inset-0 flex items-center justify-center">
                  <svg class="w-24 h-24 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/30 transition-colors duration-300"></div>
                <div class="absolute top-4 left-4 z-10">
                  <span class="bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                    ${
                      course.danhMucKhoaHoc?.tenDanhMucKhoaHoc ||
                      "Lập trình Backend"
                    }
                  </span>
                </div>
              `;
            }}
          />
          {/* Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-gradient-to-r from-[#0284C7] to-[#0369A1] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
              {course.danhMucKhoaHoc?.tenDanhMucKhoaHoc || "Lập trình Backend"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[56px] group-hover:text-[#0369A1] transition-colors">
            {course.tenKhoaHoc}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[40px]">
            {course.moTa || "Khóa học chất lượng cao với nội dung cập nhật"}
          </p>

          {/* Divider */}
          <div className="border-t border-gray-200 mb-4"></div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className="text-sm">
                {course.soLuongHocVien || 0} học viên
              </span>
            </div>

            <Link
              to={course.maKhoaHoc ? `/detail/${course.maKhoaHoc}` : "/404"}
              className="text-[#0284C7] font-semibold text-sm hover:text-[#0369A1] transition-colors flex items-center gap-1 group/link"
            >
              Xem chi tiết
              <svg
                className="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    ));
  };

  if (loading) return <Loading />;

  // Get category name from first course
  const categoryName =
    courses[0]?.danhMucKhoaHoc?.tenDanhMucKhoaHoc || "Danh mục";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-16 animate-[fadeIn_0.4s_ease-out]">
        {/* Header Section */}
        <div className="mb-12 text-center md:text-left animate-[fadeInUp_0.5s_ease-out]">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-[#0284C7] to-[#0369A1] text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
              Danh mục khóa học
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
            {categoryName}
          </h1>
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
            <div className="flex items-center gap-2 text-gray-600">
              <span className="text-lg font-bold text-gray-900">
                {courses.length}
              </span>
              <span className="text-lg text-gray-600">khóa học</span>
            </div>
          </div>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#0284C7] to-[#0369A1] rounded-full mx-auto md:mx-0 shadow-md"></div>
        </div>

        {/* Courses Grid */}
        {courses.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {renderCourses()}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-16 animate-[fadeIn_0.5s_ease-out]">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-3 rounded-xl font-semibold transition-all duration-300 shadow-md ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                      : "bg-white text-[#0284C7] hover:bg-gradient-to-r hover:from-[#0284C7] hover:to-[#0369A1] hover:text-white hover:shadow-lg hover:scale-110"
                  }`}
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
                      strokeWidth={2.5}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                {/* Page Numbers */}
                <div className="flex gap-2">{renderPageNumbers()}</div>

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-3 rounded-xl font-semibold transition-all duration-300 shadow-md ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                      : "bg-white text-[#0284C7] hover:bg-gradient-to-r hover:from-[#0284C7] hover:to-[#0369A1] hover:text-white hover:shadow-lg hover:scale-110"
                  }`}
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
                      strokeWidth={2.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-xl">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0284C7]/20 to-[#0369A1]/20 blur-3xl"></div>
              <svg
                className="w-32 h-32 mx-auto text-gray-300 relative"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Không tìm thấy khóa học
            </h3>
            <p className="text-gray-500 text-lg">
              Danh mục này chưa có khóa học nào
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
