import React from "react";
import { fetchCourses } from "../../../../store/Reducers/listCourseReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../../_components/Loading";
export default function ByCourse() {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector(
    (state) => state.listCourseReducer
  );
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  // Search & Category filter
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("Tất cả");

  // Get unique categories
  const categories = [
    "Tất cả",
    ...new Set(
      (courses || [])
        .map((course) => course.danhMucKhoaHoc?.tenDanhMucKhoaHoc)
        .filter(Boolean)
    ),
  ];

  // Filter courses
  let filteredCourses = courses || [];
  if (searchTerm) {
    filteredCourses = filteredCourses.filter((course) =>
      course.tenKhoaHoc?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  if (selectedCategory !== "Tất cả") {
    filteredCourses = filteredCourses.filter(
      (course) => course.danhMucKhoaHoc?.tenDanhMucKhoaHoc === selectedCategory
    );
  }

  // Pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCourses = filteredCourses.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) return <Loading />;
  if (error)
    return (
      <div className="py-10 text-center text-red-500">Lỗi tải dữ liệu</div>
    );

  return (
    <div className="px-4 py-6 md:py-8 animate-[fadeInUp_0.4s_ease-out]">
      <div className="max-w-full mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
          Danh sách khóa học
        </h1>

        {/* Filters */}
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
          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0284C7] transition-colors bg-white shadow-sm w-full md:w-auto md:max-w-xs"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <p className="text-gray-600 mb-6">
          Tìm thấy{" "}
          <span className="font-semibold">{filteredCourses.length}</span> khóa
          học
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentCourses.map((course, index) => (
            <div
              key={course.maKhoaHoc}
              className="px-4 py-2 md:px-5 md:py-3 text-gray-700 outline-none border-none w-full bg-transparent focus:ring-0 text-sm md:text-base placeholder:text-gray-400 placeholder:font-normal"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Course Image */}
              <div className="relative h-48 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 overflow-hidden">
                <img
                  src={course.hinhAnh}
                  alt={course.tenKhoaHoc}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML = `
                      <div class=\"absolute inset-0 flex items-center justify-center\">
                        <svg class=\"w-24 h-24 text-white/40\" fill=\"currentColor\" viewBox=\"0 0 20 20\">
                          <path d=\"M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z\" />
                        </svg>
                      </div>
                      <div class=\"absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/30 transition-colors duration-300\"></div>
                      <div class=\"absolute top-3 left-3 z-10\">
                        <span class=\"bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow-lg\">${
                          course.danhMucKhoaHoc?.tenDanhMucKhoaHoc ||
                          "Lập trình Backend"
                        }</span>
                      </div>
                    `;
                  }}
                />
                {/* Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-[#0284C7] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {course.danhMucKhoaHoc?.tenDanhMucKhoaHoc ||
                      "Lập trình Backend"}
                  </span>
                </div>
              </div>
              {/* Course Content */}
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-[#0284C7] transition-colors">
                  {course.tenKhoaHoc}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {course.moTa || "Khóa học hay, Bổ ích"}
                </p>
                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1 text-gray-600 text-sm">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    <span>{course.soLuongHocVien || 0} học viên</span>
                  </div>
                  <Link
                    to={
                      course.maKhoaHoc
                        ? `/admin/registration/by-course/${course.maKhoaHoc}`
                        : "/admin/error-404"
                    }
                    className="text-[#0284C7] font-semibold text-sm hover:text-[#0369A1] transition-colors inline-flex items-center gap-1"
                  >
                    Xem ghi danh
                    <svg
                      className="w-4 h-4"
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
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-1 mt-6 select-none">
            <button
              className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-gray-700 hover:bg-gray-100 disabled:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed transition-all"
              onClick={() => handlePageChange(currentPage - 1)}
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
                    onClick={() => handlePageChange(page)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-all ${
                      page === currentPage
                        ? "bg-[#0284C7] text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                )
              );
            })()}
            <button
              className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-gray-700 hover:bg-gray-100 disabled:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed transition-all"
              onClick={() => handlePageChange(currentPage + 1)}
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
    </div>
  );
}
