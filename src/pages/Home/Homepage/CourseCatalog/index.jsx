import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseCatalog } from "../../../../store/Reducers/courseCatalogReducer";
import Loading from "../../_components/Loading";
import { Link } from "react-router-dom";

export default function CourseCatalog() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.courseCatalogReducer);
  const { loading, courseCatalog } = state;

  useEffect(() => {
    dispatch(fetchCourseCatalog());
  }, []);

  const getCategoryIcon = (maDanhMuc) => {
    const icons = {
      BackEnd: (
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
      Design: (
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      DiDong: (
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      FrontEnd: (
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      FullStack: (
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      TuDuy: (
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    };
    return icons[maDanhMuc] || icons.FullStack;
  };

  if (loading) return <Loading />;

  return (
    <div className="bg-gradient-to-b from-white via-blue-50/30 to-white py-20 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 animate-[fadeInUp_0.6s_ease-out]">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-[#0284C7] to-[#0369A1] text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg">
              Khám phá ngay
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-5 leading-tight">
            Danh mục khóa học
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Khám phá các khóa học chất lượng cao từ những chuyên gia hàng đầu
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {courseCatalog?.map((category, index) => (
            <Link
              key={category.maDanhMuc}
              to={`/category/${category.maDanhMuc}`}
              className="group bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center border-2 border-gray-100 hover:border-[#0284C7] hover:-translate-y-2 animate-[fadeInUp_0.6s_ease-out]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon Container */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0284C7] to-[#0369A1] rounded-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                <div className="relative w-24 h-24 bg-gradient-to-br from-[#0284C7] to-[#0369A1] rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                  {getCategoryIcon(category.maDanhMuc)}
                </div>
              </div>

              {/* Category Name */}
              <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-3 leading-tight min-h-[3.5rem] flex items-center group-hover:text-[#0284C7] transition-colors duration-300">
                {category.tenDanhMuc}
              </h3>

              {/* Divider */}
              <div className="w-16 h-1 bg-gradient-to-r from-[#0284C7] to-[#0369A1] rounded-full mb-4 group-hover:w-24 transition-all duration-300"></div>

              {/* CTA */}
              <div className="mt-auto">
                <span className="inline-flex items-center gap-2 text-[#0284C7] font-bold text-base group-hover:gap-3 transition-all duration-300">
                  Xem khóa học
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
                </span>
              </div>

              {/* Corner Decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#0284C7]/5 to-transparent rounded-bl-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
