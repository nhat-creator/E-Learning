import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchCourses } from "../../../store/Reducers/listCourseReducer";
import Loading from "../_components/Loading";
import { Link, useLocation } from "react-router-dom";

export default function Courses() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { courses, loading, error } = useSelector(
    (state) => state.listCourseReducer
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  // Sync searchTerm from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search") || "";
    setSearchTerm(search);
  }, [location.search]);

  if (loading) return <Loading />;

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

  // Get unique categories
  const categories = [
    "Tất cả",
    ...new Set(
      courses
        ?.map((course) => course.danhMucKhoaHoc?.tenDanhMucKhoaHoc)
        .filter(Boolean)
    ),
  ];

  // Calculate pagination
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCourses = filteredCourses.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="animate-[fadeInUp_0.4s_ease-out]">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-6">
          Danh sách khóa học
        </h1>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm khóa học..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0284C7] transition-colors"
            />
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0284C7] transition-colors bg-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Results count */}
        <p className="text-gray-600 mb-6">
          Tìm thấy{" "}
          <span className="font-semibold">{filteredCourses.length}</span> khóa
          học
        </p>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentCourses.map((course, index) => (
            <div
              key={`${course.maKhoaHoc}-${currentPage}-${selectedCategory}-${searchTerm}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group animate-[fadeInUp_0.4s_ease-out]"
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
                      <div class="absolute inset-0 flex items-center justify-center">
                        <svg class="w-24 h-24 text-white/40" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                        </svg>
                      </div>
                      <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/30 transition-colors duration-300"></div>
                      <div class="absolute top-3 left-3 z-10">
                        <span class="bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
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
                      course.maKhoaHoc ? `/detail/${course.maKhoaHoc}` : "/404"
                    }
                    className="text-[#0284C7] font-semibold text-sm hover:text-[#0369A1] transition-colors inline-flex items-center gap-1"
                  >
                    Xem chi tiết
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
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`min-w-[40px] px-3 py-2 rounded-lg transition-all duration-300 ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white border border-gray-300 text-[#0284C7] hover:bg-gray-50"
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
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`min-w-[40px] px-3 py-2 rounded-lg font-semibold transition-all duration-300 ${
                      currentPage === page
                        ? "bg-[#0284C7] text-white shadow-md"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <span key={page} className="px-2 text-gray-400">
                    ...
                  </span>
                );
              }
              return null;
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`min-w-[40px] px-3 py-2 rounded-lg transition-all duration-300 ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white border border-gray-300 text-[#0284C7] hover:bg-gray-50"
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
                  strokeWidth={2}
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
