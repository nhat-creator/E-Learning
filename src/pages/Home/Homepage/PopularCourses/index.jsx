import { useDispatch, useSelector } from "react-redux";
import { fetchCoursesByPage } from "../../../../store/Reducers/courseByPageReducer";
import { useEffect } from "react";
import Loading from "../../_components/Loading";
import { Link } from "react-router-dom";

export default function PopularCourses() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.courseByPageReducer);
  const { loading, courses } = state;

  useEffect(() => {
    dispatch(fetchCoursesByPage({ tenKhoaHoc: "", page: 1, pageSize: 8 }));
  }, []);

  if (loading) return <Loading />;

  const renderCourses = () => {
    return courses.items?.map((course) => (
      <div
        key={course.maKhoaHoc}
        className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
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
                  <svg class="w-24 h-24 text-white/40" fill="currentColor" viewBox="0 0 20 20">
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

  return (
    <section className="py-20 md:py-24 bg-gradient-to-b from-white via-gray-50/50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 md:mb-16 gap-6">
          <div className="animate-[fadeInUp_0.6s_ease-out]">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-[#0284C7] to-[#0369A1] text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg">
                Đề xuất cho bạn
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 leading-tight">
              Khóa học nổi bật
            </h2>
          </div>
          <Link
            to="/courses"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#0284C7] to-[#0369A1] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Xem tất cả
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {renderCourses()}
        </div>
      </div>
    </section>
  );
}
