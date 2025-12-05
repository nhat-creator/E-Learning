import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCourseDetail } from "../../../store/Reducers/detailCourse";
import Loading from "../_components/Loading";
import PopularCourses from "../Homepage/PopularCourses";
import { Link } from "react-router-dom";
import { registerCourse } from "../../../store/Reducers/registerCourses";
import Modal from "../../../components/Modal/modal";
import { useState } from "react";
import { getUserInfo } from "../../../store/Reducers/userInfoReducer";

export default function DetailCourse() {
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });
  const userInfo = localStorage.getItem("USER_INFO")
    ? JSON.parse(localStorage.getItem("USER_INFO"))
    : null;
  const { id } = useParams();
  const dispatch = useDispatch();
  const { course, loading, error } = useSelector(
    (state) => state.detailCourseReducer
  );
  const { userInfo: userInfoFromStore } = useSelector(
    (state) => state.userInfoReducer
  );
  const chiTietKhoaHocGhiDanh = userInfoFromStore?.chiTietKhoaHocGhiDanh || [];

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchCourseDetail(id));
  }, [id]);

  const handleSubmit = () => {
    dispatch(
      registerCourse({
        maKhoaHoc: course.maKhoaHoc,
        taiKhoan: userInfo.taiKhoan,
      })
    )
      .unwrap()
      .then(() => {
        setModal({
          isOpen: true,
          title: "Đăng ký thành công",
          message: "Bạn đã ghi danh khóa học thành công!",
          type: "success",
        });
      })
      .catch((err) => {
        setModal({
          isOpen: true,
          title: "Đăng ký thất bại",
          message: err?.message || "Có lỗi xảy ra khi đăng ký khóa học.",
          type: "error",
        });
      });
  };

  if (loading) {
    return <Loading />;
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Không tìm thấy khóa học
        </h2>
      </div>
    );
  }

  return (
    <div className="animate-[fadeIn_0.4s_ease-out]">
      <Modal
        isOpen={modal.isOpen}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        onClose={() => {
          setModal({ ...modal, isOpen: false });
          if (modal.type === "success") {
            window.location.reload();
          }
        }}
      />
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0284C7] via-[#0369A1] to-[#075985] text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="animate-[fadeInUp_0.5s_ease-out]">
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                {course.danhMucKhoaHoc?.tenDanhMucKhoaHoc ||
                  "Lập trình Backend"}
              </span>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {course.tenKhoaHoc}
              </h1>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  <span className="font-semibold">
                    {course.soLuongHocVien} học viên
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-semibold">
                    {course.luotXem} lượt xem
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              {userInfo ? (
                chiTietKhoaHocGhiDanh.some(
                  (c) => c.maKhoaHoc === course.maKhoaHoc
                ) ? (
                  <button
                    disabled
                    className="bg-gray-300 text-gray-500 px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 cursor-not-allowed opacity-70"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Đã ghi danh
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="bg-white text-[#0284C7] px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Đăng ký khóa học
                  </button>
                )
              ) : (
                <Link to="/login">
                  <button className="bg-white text-[#0284C7] px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                      />
                    </svg>
                    Đăng nhập để đăng ký khóa học
                  </button>
                </Link>
              )}
            </div>

            {/* Right Image */}
            <div className="animate-[fadeIn_0.6s_ease-out_0.2s_both]">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 min-h-[400px] flex items-center justify-center">
                <img
                  src={course.hinhAnh}
                  alt={course.tenKhoaHoc}
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML = `
                      <div class="absolute inset-0 flex items-center justify-center">
                        <svg class="w-32 h-32 text-white/40" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                        </svg>
                      </div>
                      <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    `;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Course Description Card */}
          <div className="bg-white rounded-3xl shadow-xl p-4 md:p-6 lg:p-8 mb-8 animate-[fadeInUp_0.5s_ease-out_0.3s_both]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0284C7] to-[#0369A1] rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Mô tả khóa học
              </h2>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {course.moTa || "Khóa học Backend 2345"}
            </p>

            {/* Course Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                <div className="w-10 h-10 bg-[#0284C7] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Danh mục</h3>
                  <p className="text-gray-600">
                    {course.danhMucKhoaHoc?.tenDanhMucKhoaHoc || "Backend"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl">
                <div className="w-10 h-10 bg-[#0284C7] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Ngày tạo</h3>
                  <p className="text-gray-600">
                    {new Date(course.ngayTao).toLocaleDateString("vi-VN")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                <div className="w-10 h-10 bg-[#0284C7] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Người tạo
                  </h3>
                  <p className="text-gray-600">
                    {course.nguoiTao?.hoTen || "Giảng viên"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl">
                <div className="w-10 h-10 bg-[#0284C7] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Mã khóa học
                  </h3>
                  <p className="text-gray-600 font-mono">{course.maKhoaHoc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PopularCourses />
    </div>
  );
}
