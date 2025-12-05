import { useDispatch, useSelector } from "react-redux";
import { fetchCourseDetail } from "../../../../store/Reducers/detailCourse";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Modal from "../../../../components/Modal/modal";
import { fetchCatalogs } from "../../../../store/Reducers/catalogReducer";
import { updateCourse } from "../../../../store/Reducers/courseReducer";
import Loading from "../../_components/Loading";

export default function UpdateCoursePage() {
  const [catalogs, setCatalogs] = useState([]);
  const { maKhoaHoc } = useParams();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    tenKhoaHoc: "",
    maKhoaHoc: "",
    maNhom: "",
    moTa: "",
    hinhAnh: "",
    ngayTao: "",
    soLuongHocVien: 0,
    danhMucKhoaHoc: { tenDanhMucKhoaHoc: "" },
    nguoiTao: { hoTen: "" },
  });
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });
  useEffect(() => {
    dispatch(fetchCourseDetail(maKhoaHoc));
    dispatch(fetchCatalogs());
  }, [dispatch, maKhoaHoc]);
  const catalogState = useSelector((state) => state.catalogReducer);
  useEffect(() => {
    if (catalogState && Array.isArray(catalogState.catalogs)) {
      setCatalogs(catalogState.catalogs);
    }
  }, [catalogState]);
  const state = useSelector((state) => state.detailCourseReducer);
  const { course, loading, error } = state;
  useEffect(() => {
    if (course) {
      // Xử lý ngày tạo về đúng format yyyy-MM-dd cho input type='date'
      let ngayTaoFormat = "";
      if (course.ngayTao) {
        // Nếu là dạng dd/MM/yyyy thì chuyển về yyyy-MM-dd
        const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        const match = course.ngayTao.match(regex);
        if (match) {
          ngayTaoFormat = `${match[3]}-${match[2]}-${match[1]}`;
        } else if (!isNaN(Date.parse(course.ngayTao))) {
          // Nếu là dạng hợp lệ khác thì dùng slice(0,10)
          ngayTaoFormat = new Date(course.ngayTao).toISOString().slice(0, 10);
        } else {
          ngayTaoFormat = course.ngayTao;
        }
      }
      setForm({
        tenKhoaHoc: course.tenKhoaHoc || "",
        maKhoaHoc: course.maKhoaHoc || "",
        maNhom: course.maNhom || "",
        moTa: course.moTa || "",
        hinhAnh: course.hinhAnh || "",
        ngayTao: ngayTaoFormat,
        soLuongHocVien: course.soLuongHocVien || 0,
        danhMucKhoaHoc: {
          tenDanhMucKhoaHoc: course.danhMucKhoaHoc?.tenDanhMucKhoaHoc || "",
        },
        nguoiTao: { hoTen: course.nguoiTao?.hoTen || "" },
      });
    }
  }, [course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Chuẩn hóa dữ liệu gửi đi
    let ngayTaoStr = "";
    if (form.ngayTao) {
      const dateObj = new Date(form.ngayTao);
      if (!isNaN(dateObj.getTime())) {
        ngayTaoStr = dateObj.toISOString().slice(0, 10);
      } else {
        ngayTaoStr = form.ngayTao;
      }
    }
    const submitForm = {
      ...form,
      ngayTao: ngayTaoStr,
      // map đúng tên trường API
      maDanhMucKhoaHoc:
        catalogs.find(
          (cat) => cat.tenDanhMuc === form.danhMucKhoaHoc.tenDanhMucKhoaHoc
        )?.maDanhMuc || "",
      taiKhoanNguoiTao: course?.nguoiTao?.taiKhoan || "",
    };
    try {
      const result = await dispatch(updateCourse(submitForm));
      if (result?.payload && !result?.error) {
        setModal({
          isOpen: true,
          title: "Cập nhật thành công",
          message: "Thông tin khóa học đã được cập nhật!",
          type: "success",
        });
      } else {
        setModal({
          isOpen: true,
          title: "Cập nhật thất bại",
          message: result?.error?.message || "Có lỗi xảy ra!",
          type: "error",
        });
      }
    } catch (err) {
      setModal({
        isOpen: true,
        title: "Cập nhật thất bại",
        message: err?.message || "Có lỗi xảy ra!",
        type: "error",
      });
    }
  };

  const handleCloseModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
    // Nếu thành công thì refetch lại chi tiết khóa học
    if (modal.type === "success") {
      dispatch(fetchCourseDetail(maKhoaHoc));
    }
  };

  if (loading)
    return (
      <div className="py-10 text-center">
        <span>Đang tải...</span>
      </div>
    );
  if (error)
    return <div className="py-10 text-center text-red-500">{error}</div>;

  return (
    <div className="px-4 py-6 md:py-8 animate-[fadeInUp_0.6s_ease-out]">
      <div className="max-w-full mx-auto">
        <h1 className="font-bold text-2xl md:text-3xl text-gray-900 mb-8 text-left tracking-tight">
          Cập nhật thông tin khóa học
        </h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
        >
          <div>
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="maKhoaHoc"
            >
              Mã khóa học
            </label>
            <input
              type="text"
              id="maKhoaHoc"
              name="maKhoaHoc"
              value={form.maKhoaHoc}
              readOnly
              className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed focus:border-gray-200 focus:bg-gray-100 outline-none transition-all placeholder:text-gray-400"
            />
          </div>
          <div>
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="tenKhoaHoc"
            >
              Tên khóa học
            </label>
            <input
              type="text"
              id="tenKhoaHoc"
              name="tenKhoaHoc"
              value={form.tenKhoaHoc}
              onChange={handleChange}
              placeholder="Nhập tên khóa học"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:border-blue-400 focus:bg-white outline-none transition-all placeholder:text-gray-400"
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="maNhom"
            >
              Mã nhóm
            </label>
            <input
              type="text"
              id="maNhom"
              name="maNhom"
              value={form.maNhom}
              readOnly
              className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed focus:border-gray-200 focus:bg-gray-100 outline-none transition-all placeholder:text-gray-400"
            />
          </div>
          <div>
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="danhMucKhoaHoc"
            >
              Danh mục khóa học
            </label>
            <select
              id="danhMucKhoaHoc"
              name="danhMucKhoaHoc"
              value={form.danhMucKhoaHoc.tenDanhMucKhoaHoc}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  danhMucKhoaHoc: { tenDanhMucKhoaHoc: e.target.value },
                }))
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:border-blue-400 focus:bg-white outline-none transition-all"
            >
              <option value="">Chọn danh mục</option>
              {catalogs.map((cat) => (
                <option key={cat.maDanhMuc} value={cat.tenDanhMuc}>
                  {cat.tenDanhMuc}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="moTa"
            >
              Mô tả
            </label>
            <textarea
              id="moTa"
              name="moTa"
              value={form.moTa}
              onChange={handleChange}
              placeholder="Nhập mô tả"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:border-blue-400 focus:bg-white outline-none transition-all placeholder:text-gray-400"
              rows={3}
            />
          </div>
          <div>
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="ngayTao"
            >
              Ngày tạo
            </label>
            <input
              type="date"
              id="ngayTao"
              name="ngayTao"
              value={form.ngayTao ? form.ngayTao.slice(0, 10) : ""}
              readOnly
              className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed focus:border-gray-200 focus:bg-gray-100 outline-none transition-all placeholder:text-gray-400"
            />
          </div>
          <div>
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="soLuongHocVien"
            >
              Số lượng học viên
            </label>
            <input
              type="number"
              id="soLuongHocVien"
              name="soLuongHocVien"
              value={form.soLuongHocVien}
              readOnly
              className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed focus:border-gray-200 focus:bg-gray-100 outline-none transition-all placeholder:text-gray-400"
            />
          </div>
          <div>
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="hinhAnh"
            >
              Hình ảnh (URL)
            </label>
            <input
              type="text"
              id="hinhAnh"
              name="hinhAnh"
              value={form.hinhAnh}
              onChange={handleChange}
              placeholder="Nhập URL hình ảnh"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:border-blue-400 focus:bg-white outline-none transition-all placeholder:text-gray-400"
            />
          </div>
          <div>
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="nguoiTao"
            >
              Người tạo
            </label>
            <input
              type="text"
              id="nguoiTao"
              name="nguoiTao"
              value={form.nguoiTao.hoTen}
              readOnly
              className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed focus:border-gray-200 focus:bg-gray-100 outline-none transition-all placeholder:text-gray-400"
            />
          </div>
        </form>
        <div className="md:col-span-2 flex mt-4">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-600 text-white font-bold px-8 py-3 rounded-xl shadow-md hover:bg-blue-700 hover:scale-105 transition-all text-base"
          >
            Cập nhật thông tin khóa học
          </button>
        </div>
        {/* Modal thông báo */}
        <Modal
          isOpen={modal.isOpen}
          onClose={handleCloseModal}
          title={modal.title}
          message={modal.message}
          type={modal.type}
        />
      </div>
    </div>
  );
}
