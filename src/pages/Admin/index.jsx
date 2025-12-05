import { Outlet } from "react-router-dom";
import Navbar from "./_components/Navbar/navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal/modal";

export default function AdminPage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const adminUser = localStorage.getItem("ADMIN_INFO")
    ? JSON.parse(localStorage.getItem("ADMIN_INFO"))
    : null;

  useEffect(() => {
    if (!adminUser) {
      setShowModal(true);
    }
  }, [adminUser]);

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/", { replace: true });
  };

  if (!adminUser) {
    return (
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title="Không đủ quyền truy cập"
        message="Bạn không có quyền truy cập vào trang quản trị. Vui lòng đăng nhập với tài khoản quản trị viên."
        type="error"
      />
    );
  }

  return (
    <div className="flex flex-row min-h-screen">
      <Navbar />
      <main className="flex-1 overflow-auto animate-[fadeIn_0.6s_ease-out]">
        <Outlet />
      </main>
    </div>
  );
}
