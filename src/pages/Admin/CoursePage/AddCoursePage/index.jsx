import { useState } from "react";
import Modal from "../../../../components/Modal/modal";
import { useDispatch } from "react-redux";
import { addCourse } from "../../../../store/Reducers/courseReducer";

export default function AddCoursePage({ showModal, setShowModal, onSuccess }) {
  const dispatch = useDispatch();
  const adminInfo = localStorage.getItem("ADMIN_INFO")
    ? JSON.parse(localStorage.getItem("ADMIN_INFO"))
    : null;
  const [form, setForm] = useState({
    maKhoaHoc: "",
    biDanh: "",
    tenKhoaHoc: "",
    moTa: "",
    luotXem: 0,
    danhGia: 0,
    hinhAnh: "",
    maNhom: "GP01",
    ngayTao: "",
    maDanhMucKhoaHoc: "",
    taiKhoanNguoiTao: adminInfo?.taiKhoan || "",
  });
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleClose = () => setShowModal(false);

  const handleModalClose = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
    if (modal.type === "success") {
      handleClose();
      setForm({
        maKhoaHoc: "",
        biDanh: "",
        tenKhoaHoc: "",
        moTa: "",
        luotXem: 0,
        danhGia: 0,
        hinhAnh: "",
        maNhom: "GP01",
        ngayTao: "",
        maDanhMucKhoaHoc: "",
        taiKhoanNguoiTao: "",
      });
      if (typeof onSuccess === "function") {
        onSuccess();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation: check for empty string fields (except luotXem, danhGia)
    const requiredFields = [
      "maKhoaHoc",
      "biDanh",
      "tenKhoaHoc",
      "moTa",
      "hinhAnh",
      "maDanhMucKhoaHoc",
    ];
    const emptyFields = requiredFields.filter(
      (key) => !form[key] || String(form[key]).trim() === ""
    );
    if (emptyFields.length > 0) {
      setModal({
        isOpen: true,
        title: "Thiếu thông tin",
        message: "Vui lòng điền đầy đủ tất cả các trường bắt buộc!",
        type: "error",
      });
      return;
    }
    // Check quyền giảng viên
    if (adminInfo?.maLoaiNguoiDung !== "GV") {
      setModal({
        isOpen: true,
        title: "Không đủ quyền",
        message: "Chỉ tài khoản giảng viên mới được thêm khóa học!",
        type: "error",
      });
      return;
    }
    // Call API to add course and handle error
    try {
      const resultAction = await dispatch(addCourse(form));
      if (addCourse.rejected.match(resultAction)) {
        let errorMsg = "Có lỗi xảy ra!";
        const err = resultAction.payload || resultAction.error;
        if (typeof err === "string") errorMsg = err;
        else if (err?.content) errorMsg = err.content;
        else if (err?.message) errorMsg = err.message;
        else if (err?.data) errorMsg = err.data;
        setModal({
          isOpen: true,
          title: "Thêm khóa học thất bại",
          message: errorMsg,
          type: "error",
        });
        return;
      }
      // Success
      setModal({
        isOpen: true,
        title: "Thêm khóa học thành công",
        message: "Chúc mừng! Bạn đã thêm khóa học mới thành công.",
        type: "success",
      });
    } catch (err) {
      setModal({
        isOpen: true,
        title: "Thêm khóa học thất bại",
        message: err?.message || "Có lỗi xảy ra!",
        type: "error",
      });
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl animate-[fadeIn_0.4s_ease-out] relative p-0 max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-0">
          <button
            onClick={handleClose}
            className="btn-close"
            aria-label="Đóng"
            type="button"
          >
            &times;
          </button>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center mt-10">
            Thêm khóa học mới
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-8 pb-2">
            {/* ...existing code for inputs... */}
            <div className="flex flex-col gap-2">
              <label className="label">Mã khóa học</label>
              <input
                name="maKhoaHoc"
                value={form.maKhoaHoc}
                onChange={handleChange}
                className="input"
                placeholder="Nhập mã khóa học"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="label">Bí danh</label>
              <input
                name="biDanh"
                value={form.biDanh}
                onChange={handleChange}
                className="input"
                placeholder="Nhập bí danh"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="label">Tên khóa học</label>
              <input
                name="tenKhoaHoc"
                value={form.tenKhoaHoc}
                onChange={handleChange}
                className="input"
                placeholder="Nhập tên khóa học"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="label">Danh mục khóa học</label>
              <select
                name="maDanhMucKhoaHoc"
                value={form.maDanhMucKhoaHoc}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="">-- Chọn danh mục --</option>
                <option value="BackEnd">Lập trình Backend</option>
                <option value="Design">Thiết kế Web</option>
                <option value="DiDong">Lập trình di động</option>
                <option value="FrontEnd">Lập trình Front end</option>
                <option value="FullStack">Lập trình Full Stack</option>
                <option value="TuDuy">Tư duy lập trình</option>
              </select>
            </div>
            {/* Ngày tạo sẽ tự động lấy ngày hiện tại khi submit, không cho nhập */}
            <div className="flex flex-col gap-2">
              <label className="label">Hình ảnh (URL)</label>
              <input
                name="hinhAnh"
                value={form.hinhAnh}
                onChange={handleChange}
                className="input"
                placeholder="Nhập URL hình ảnh"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="label">Lượt xem</label>
              <input
                name="luotXem"
                type="number"
                value={form.luotXem}
                onChange={handleChange}
                className="input"
                placeholder="Nhập lượt xem"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="label">Đánh giá</label>
              <input
                name="danhGia"
                type="number"
                value={form.danhGia}
                onChange={handleChange}
                className="input"
                placeholder="Nhập đánh giá"
              />
            </div>
          </div>
          <div className="px-8 pb-2">
            <label className="label">Mô tả khóa học</label>
            <textarea
              name="moTa"
              value={form.moTa}
              onChange={handleChange}
              className="input w-full"
              rows={3}
              placeholder="Nhập mô tả khóa học"
            />
          </div>
          <div className="px-8 py-6">
            <button type="submit" className="btn-submit-full">
              Thêm khóa học
            </button>
          </div>
        </form>
        {/* Use shared Modal component for notifications */}
        <Modal
          isOpen={modal.isOpen}
          onClose={handleModalClose}
          title={modal.title}
          message={modal.message}
          type={modal.type}
        />
        <style>{`
          .input {
            width: 100%;
            padding: 0.75rem 1rem;
            border-radius: 1rem;
            border: 1px solid #e5e7eb;
            font-size: 1rem;
            outline: none;
            background: #f8fafc;
            color: #1e293b;
            font-weight: 500;
            margin-bottom: 0.5rem;
            transition: border-color 0.2s, box-shadow 0.2s;
          }
          .input::placeholder {
            color: #94a3b8;
            opacity: 1;
            font-size: 1rem;
          }
          textarea.input {
            font-size: 1rem;
          }
          textarea.input::placeholder {
            color: #94a3b8;
            opacity: 1;
            font-size: 1rem;
          }
          .input:focus {
            border-color: #0284C7;
            box-shadow: 0 0 0 2px #0284C722;
          }
          .label {
            font-size: 1rem;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 0.25rem;
          }
          .btn-submit-full {
            width: 100%;
            padding: 1rem 1rem;
            border-radius: 1rem;
            background: #0284C7;
            color: #fff;
            font-weight: 700;
            font-size: 1.125rem;
            box-shadow: 0 2px 8px #0284C722;
            border: none;
            transition: background 0.2s;
            display: block;
          }
          .btn-submit-full:hover {
            background: #0369a1;
          }
          .btn-close {
            position: absolute;
            top: 24px;
            right: 24px;
            background: none;
            border: none;
            color: #94a3b8;
            font-size: 2rem;
            font-weight: 700;
            cursor: pointer;
            padding: 0;
            line-height: 1;
            z-index: 10;
            box-shadow: none;
            transition: color 0.2s;
          }
          .btn-close:hover {
            color: #64748b;
          }
        `}</style>
      </div>
    </div>
  );
}
