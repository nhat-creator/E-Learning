import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#181C2A] text-white pt-8 pb-4 px-4 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-2">Về E-Learning</h3>
          <p className="text-sm text-gray-300">
            Nền tảng học lập trình trực tuyến hàng đầu Việt Nam. Học từ cơ bản
            đến nâng cao với giảng viên chuyên nghiệp.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">Liên kết</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Khóa học
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Đăng nhập
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Đăng ký
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">Liên hệ</h3>
          <ul className="space-y-1 text-sm">
            <li>Email: support@elearning.vn</li>
            <li>Hotline: 1900 xxxx</li>
            <li>Địa chỉ: TP. Hồ Chí Minh</li>
          </ul>
        </div>
      </div>
      <hr className="my-6 border-gray-700" />
      <div className="text-center text-gray-400 text-sm">
        © 2025 E-Learning. All rights reserved.
      </div>
    </footer>
  );
}
