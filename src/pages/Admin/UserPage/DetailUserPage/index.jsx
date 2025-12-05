import { useDispatch, useSelector } from "react-redux";
import { findUserInfo } from "../../../../store/Reducers/userReducer";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Loading from "../../_components/Loading";

export default function DetailUserPage() {
  const dispatch = useDispatch();
  const { taiKhoan } = useParams();
  console.log("taiKhoan:", taiKhoan);
  const {
    userInfo: userInfoReducer,
    loading,
    error,
  } = useSelector((state) => state.userReducer);

  const userInfo = userInfoReducer ? userInfoReducer[0] : null;
  console.log("userInfo:", userInfo);
  useEffect(() => {
    dispatch(findUserInfo(taiKhoan));
  }, [dispatch, taiKhoan]);

  return (
    <div className="px-4 py-6 md:py-8 animate-[fadeInUp_0.6s_ease-out]">
      <div className="max-w-full mx-auto">
        <h1 className="font-extrabold text-3xl md:text-4xl text-gray-900 mb-10 text-center md:text-left tracking-tight">
          Thông tin chi tiết người dùng
        </h1>
        <div className="p-8 mb-10">
          {loading ? (
            <Loading />
          ) : error ? (
            <div className="text-center py-12 text-red-500 font-semibold text-lg">
              Lỗi: {error}
            </div>
          ) : userInfo ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-2">
                <div>
                  <div className="mb-5">
                    <div className="text-gray-400 text-xs font-semibold uppercase mb-1 tracking-wider">
                      Họ tên
                    </div>
                    <div className="text-gray-900 font-bold text-xl md:text-2xl">
                      {userInfo.hoTen}
                    </div>
                  </div>
                  <div className="mb-5">
                    <div className="text-gray-400 text-xs font-semibold uppercase mb-1 tracking-wider">
                      Tài khoản
                    </div>
                    <div className="text-gray-700 font-mono text-base md:text-lg">
                      {userInfo.taiKhoan}
                    </div>
                  </div>
                  <div className="mb-5">
                    <div className="text-gray-400 text-xs font-semibold uppercase mb-1 tracking-wider">
                      Email
                    </div>
                    <div className="text-gray-700 text-base md:text-lg">
                      {userInfo.email}
                    </div>
                  </div>
                  <div className="mb-5">
                    <div className="text-gray-400 text-xs font-semibold uppercase mb-1 tracking-wider">
                      Số điện thoại
                    </div>
                    <div className="text-gray-700 text-base md:text-lg">
                      {userInfo.soDT || "N/A"}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-5">
                    <div className="text-gray-400 text-xs font-semibold uppercase mb-1 tracking-wider">
                      Loại người dùng
                    </div>
                    <div
                      className={`inline-block px-4 py-1 rounded-full text-xs font-bold ${
                        userInfo.maLoaiNguoiDung === "GV"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {userInfo.maLoaiNguoiDung === "GV"
                        ? "Giáo viên"
                        : "Học viên"}
                    </div>
                  </div>
                  <div className="mb-5">
                    <div className="text-gray-400 text-xs font-semibold uppercase mb-1 tracking-wider">
                      Mã nhóm
                    </div>
                    <div className="text-gray-700 text-base md:text-lg">
                      GP01
                    </div>
                  </div>
                  <div className="mb-5">
                    <div className="text-gray-400 text-xs font-semibold uppercase mb-1 tracking-wider">
                      Mật khẩu
                    </div>
                    <div className="text-gray-700 font-mono text-base md:text-lg">
                      {userInfo.matKhau}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Không tìm thấy thông tin người dùng.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
