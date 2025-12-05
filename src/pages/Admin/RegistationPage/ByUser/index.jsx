import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchListUsers } from "../../../../store/Reducers/listUsersReducer";
import Loading from "../../_components/Loading";

const ITEMS_PER_PAGE = 10;

export default function ByUserPage() {
  const dispatch = useDispatch();
  const { listUsers, loading, error } = useSelector(
    (state) => state.listUsersReducer
  );

  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchListUsers());
  }, [dispatch]);

  // Filter users by tab and search term
  const filteredUsers =
    listUsers?.filter((user) => {
      const tabMatch =
        activeTab === "all" ||
        (activeTab === "students" && user.maLoaiNguoiDung === "HV") ||
        (activeTab === "teachers" && user.maLoaiNguoiDung === "GV");

      const searchMatch =
        !searchTerm ||
        user.hoTen?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.taiKhoan?.toLowerCase().includes(searchTerm.toLowerCase());

      return tabMatch && searchMatch;
    }) || [];

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page on search/filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeTab]);

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    return (
      <div className="flex justify-center items-center gap-1 mt-6 select-none">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-gray-700 hover:bg-gray-100 disabled:bg-gray-50 disabled:text-gray-300 transition-all"
        >
          &lt;
        </button>
        {pages.map((page, idx) =>
          page === "..." ? (
            <span
              key={`ellipsis-${idx}`}
              className="w-8 h-8 flex items-center justify-center text-gray-400"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-md text-sm font-medium transition-all ${
                page === currentPage
                  ? "bg-[#0284C7] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          )
        )}
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-gray-700 hover:bg-gray-100 disabled:bg-gray-50 disabled:text-gray-300 transition-all"
        >
          &gt;
        </button>
      </div>
    );
  };

  const renderTableBody = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan="5" className="p-6 text-center">
            <Loading />
          </td>
        </tr>
      );
    }
    if (error) {
      return (
        <tr>
          <td colSpan="5" className="p-6 text-center text-red-500">
            Lỗi: {error}
          </td>
        </tr>
      );
    }
    if (paginatedUsers.length === 0) {
      return (
        <tr>
          <td colSpan="5" className="p-12 text-center text-gray-500">
            Không tìm thấy người dùng nào.
          </td>
        </tr>
      );
    }
    return paginatedUsers.map((user) => (
      <tr key={user.taiKhoan} className="hover:bg-gray-50 transition-colors">
        <td className="px-4 py-3 md:px-6 md:py-4 font-semibold text-gray-900">
          {user.hoTen}
        </td>
        <td className="px-2 py-3 md:px-4 md:py-4 text-gray-600">
          {user.taiKhoan}
        </td>
        <td className="px-2 py-3 md:px-4 md:py-4 text-gray-600">
          {user.email}
        </td>
        <td className="px-2 py-3 md:px-4 md:py-4">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
              user.maLoaiNguoiDung === "GV"
                ? "bg-purple-100 text-purple-800"
                : "bg-sky-100 text-sky-800"
            }`}
          >
            {user.maLoaiNguoiDung === "GV" ? "Giáo viên" : "Học viên"}
          </span>
        </td>
        <td className="px-4 py-3 md:px-6 md:py-4 text-center">
          <Link
            to={`/admin/registration/by-user/${user.taiKhoan}`}
            className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg px-4 py-2 text-xs font-semibold transition-all shadow-md hover:shadow-lg"
          >
            Xem ghi danh
          </Link>
        </td>
      </tr>
    ));
  };

  return (
    <div className="px-4 py-6 md:py-8 animate-[fadeInUp_0.4s_ease-out]">
      <div className="max-w-full mx-auto">
        <h1 className="font-bold text-2xl md:text-4xl text-gray-900 mb-6 text-center md:text-left">
          Danh sách người dùng
        </h1>

        {/* Search and Tabs */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-stretch bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden focus-within:border-[#0284C7] focus-within:shadow-md transition-all flex-1 max-w-md w-full">
              <input
                type="text"
                placeholder="Tìm kiếm người dùng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 md:px-5 md:py-3 text-gray-700 outline-none border-none w-full bg-transparent focus:ring-0 text-sm md:text-base placeholder:text-gray-400"
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
          </div>
          <div className="flex gap-2 flex-wrap justify-center md:justify-start">
            {[
              { key: "all", label: "Tất cả", count: listUsers?.length || 0 },
              {
                key: "students",
                label: "Học viên",
                count:
                  listUsers?.filter((u) => u.maLoaiNguoiDung === "HV").length ||
                  0,
              },
              {
                key: "teachers",
                label: "Giáo viên",
                count:
                  listUsers?.filter((u) => u.maLoaiNguoiDung === "GV").length ||
                  0,
              },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-xl font-medium border transition-all text-xs md:text-sm whitespace-nowrap ${
                  activeTab === tab.key
                    ? "bg-[#0284C7] text-white border-[#0284C7] shadow"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* User Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-x-auto">
          <table className="min-w-[800px] w-full text-xs md:text-sm">
            <thead className="bg-gray-50">
              <tr className="text-gray-600 text-left">
                <th className="px-4 py-3 md:px-6 md:py-4 font-semibold">
                  Họ tên
                </th>
                <th className="px-2 py-3 md:px-4 md:py-4 font-semibold">
                  Tài khoản
                </th>
                <th className="px-2 py-3 md:px-4 md:py-4 font-semibold">
                  Email
                </th>
                <th className="px-2 py-3 md:px-4 md:py-4 font-semibold">
                  Loại
                </th>
                <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-center">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {renderTableBody()}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {renderPagination()}
      </div>
    </div>
  );
}
