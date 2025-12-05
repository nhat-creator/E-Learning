import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCourseDetail } from "../../../../store/Reducers/detailCourse";
import Loading from "../../_components/Loading";

function CourseImage({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      onError={(e) => {
        e.target.style.display = "none";
        e.target.parentElement.innerHTML = `
          <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
            <svg class="w-24 h-24 text-white/40" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
          </div>
        `;
      }}
    />
  );
}

export default function DetailCoursePage() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.detailCourseReducer);
  const { course, loading, error } = state;
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchCourseDetail(id));
  }, [dispatch, id]);

  if (loading) return <Loading />;
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
    <div className="min-h-screen flex flex-col items-center py-6 md:py-10 px-2 sm:px-4">
      <div className="w-full max-w-6xl p-4 sm:p-6 md:p-8">
        {/* Image section */}
        <div className="flex flex-col items-center mb-6 md:mb-8">
          <div className="w-full max-w-[320px] sm:max-w-[400px] md:max-w-[500px] aspect-video rounded-xl overflow-hidden border border-gray-200 shadow-md mb-4 bg-white flex items-center justify-center relative">
            <CourseImage src={course.hinhAnh} alt={course.tenKhoaHoc} />
          </div>
        </div>
        {/* Info header section */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center mb-6 md:mb-8">
          <div className="flex-1 flex flex-col gap-2 items-start w-full">
            <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {course.danhMucKhoaHoc?.tenDanhMucKhoaHoc || "Danh mục"}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              {course.tenKhoaHoc}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 font-medium italic">
              {course.moTa}
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4 mt-2 text-xs sm:text-sm md:text-base">
              <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <span>Mã khóa học:</span>
                <span className="font-mono font-normal text-gray-800">
                  {course.maKhoaHoc}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <span>Bí danh:</span>
                <span className="font-normal text-gray-800">
                  {course.biDanh}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <span>Mã nhóm:</span>
                <span className="font-normal text-gray-800">
                  {course.maNhom}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <span>Ngày tạo:</span>
                <span className="font-normal text-gray-800">
                  {course.ngayTao}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-blue-50 rounded-xl p-4 sm:p-5 md:p-6 border border-blue-100 shadow-sm hover:shadow-md transition-shadow duration-200">
            <h3 className="font-semibold text-gray-900 mb-2 text-base md:text-lg">
              Người tạo
            </h3>
            <p className="text-gray-700 text-xs sm:text-sm mb-1 font-medium">
              Họ tên:{" "}
              <span className="font-normal">
                {course.nguoiTao?.hoTen || "---"}
              </span>
            </p>
            <p className="text-gray-700 text-xs sm:text-sm mb-1 font-medium">
              Tài khoản:{" "}
              <span className="font-normal">
                {course.nguoiTao?.taiKhoan || "---"}
              </span>
            </p>
            <p className="text-gray-700 text-xs sm:text-sm font-medium">
              Loại:{" "}
              <span className="font-normal">
                {course.nguoiTao?.tenLoaiNguoiDung || "---"}
              </span>
            </p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 sm:p-5 md:p-6 border border-blue-100 shadow-sm hover:shadow-md transition-shadow duration-200">
            <h3 className="font-semibold text-gray-900 mb-2 text-base md:text-lg">
              Thông tin khác
            </h3>
            <p className="text-gray-700 text-xs sm:text-sm mb-1 font-medium">
              Số lượng học viên:{" "}
              <span className="font-normal">{course.soLuongHocVien}</span>
            </p>
            <p className="text-gray-700 text-xs sm:text-sm mb-1 font-medium">
              Lượt xem: <span className="font-normal">{course.luotXem}</span>
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white mt-6">
          <table className="min-w-full">
            <thead>
              <tr className="bg-blue-500">
                <th className="py-2 px-3 text-left text-xs font-bold text-white uppercase w-1/3">
                  Thông tin
                </th>
                <th className="py-2 px-3 text-left text-xs font-bold text-white uppercase">
                  Giá trị
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Tên khóa học", value: course.tenKhoaHoc },
                { label: "Mô tả", value: course.moTa },
                {
                  label: "Danh mục",
                  value: course.danhMucKhoaHoc?.tenDanhMucKhoaHoc,
                },
                { label: "Bí danh", value: course.biDanh },
                { label: "Mã nhóm", value: course.maNhom },
                { label: "Hình ảnh", value: course.hinhAnh },
                { label: "Ngày tạo", value: course.ngayTao },
                { label: "Số học viên", value: course.soLuongHocVien },
                { label: "Lượt xem", value: course.luotXem },
              ].map((item, idx) => (
                <tr
                  key={item.label}
                  className={idx % 2 === 0 ? "bg-blue-50" : "bg-white"}
                >
                  <td className="py-2 px-3 text-gray-700 text-xs sm:text-sm font-semibold">
                    {item.label}
                  </td>
                  <td className="py-2 px-3 text-gray-800 text-xs sm:text-sm break-words">
                    {item.label === "Hình ảnh" ? (
                      <a
                        href={item.value}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline break-all"
                      >
                        {item.value || "Không có"}
                      </a>
                    ) : (
                      <span>{item.value || "Không có"}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
