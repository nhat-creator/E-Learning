import React from "react";

export default function About() {
  const features = [
    {
      title: "Lấy học viên làm trọng tâm",
      description:
        "Áp dụng phương pháp giảng dạy lấy học viên làm trọng tâm, tạo môi trường học tập tích cực và thu hút. Hệ thống bài tập phong phú giúp bạn rèn luyện kỹ năng một cách hiệu quả.",
      icon: (
        <div className="w-40 h-40 bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] rounded-full flex items-center justify-center shadow-xl">
          <svg
            className="w-20 h-20 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
      ),
    },
    {
      title: "Thực tế và khoa học",
      description:
        "Là một chương trình học lập trình từ cơ bản đến nâng cao. Với đội ngũ giảng viên giàu kinh nghiệm trong việc training chuyên môn, giúp học viên nắm bắt kiến thức nhanh chóng và hiệu quả nhất.",
      icon: (
        <div className="w-40 h-40 bg-white border-4 border-[#0EA5E9] rounded-full flex items-center justify-center shadow-xl">
          <svg
            className="w-20 h-20 text-[#0EA5E9]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      ),
    },
    {
      title: "Rèn luyện tư duy",
      description:
        "Mỗi bước trong cách tiếp cận vấn đề tạo nên chương trình học, chúng tôi suy nghĩ nhiều kỹ càng để giúp cho học viên dễ hiểu, đặc biệt có đối tượng là người mới bắt đầu khó làm quen hay các bạn học non kỹ thuật.",
      icon: (
        <div className="w-40 h-40 bg-gradient-to-br from-[#38BDF8] to-[#0EA5E9] rounded-2xl flex items-center justify-center shadow-xl transform rotate-12">
          <svg
            className="w-20 h-20 text-white -rotate-12"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19.8 18.4L14 10.67V6.5l1.35-1.69c.26-.33.03-.81-.39-.81H9.04c-.42 0-.65.48-.39.81L10 6.5v4.17L4.2 18.4c-.49.66-.02 1.6.8 1.6h14c.82 0 1.29-.94.8-1.6z" />
          </svg>
        </div>
      ),
    },
    {
      title: "Giảng viên chất lượng cao",
      description:
        "Không chỉ có hầu hết nghiệp vụ chuyên môn giảng dạy đều ở mức tốt đoạn với không ít tiêu chí khác về quốc tế, đội ngũ giảng viên của chúng tôi đều là những người đã có nhiều năm kinh nghiệm trong nghề.",
      icon: (
        <div className="w-40 h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[#0EA5E9] opacity-10"></div>
          <svg
            className="w-20 h-20 text-gray-700 relative z-10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <div className="absolute bottom-2 right-2 w-10 h-10 bg-[#0EA5E9] rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </div>
        </div>
      ),
    },
    {
      title: "Mentor và cộng đồng hỗ trợ",
      description:
        "Việc học lập trình không chỉ học qua các bài giảng. Khi bạn gặp khó khăn, bạn cần có mentor và cộng đồng để giải đáp thắc mắc. Vì vậy, E-Learning đã sẵn sàng cung cấp cho học viên hệ thống mentor và cộng đồng hỗ trợ nhiệt tình.",
      icon: (
        <div className="w-40 h-40 bg-gradient-to-br from-white to-gray-100 rounded-2xl flex items-center justify-center shadow-xl border-2 border-[#0EA5E9] relative">
          <svg
            className="w-20 h-20 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <div className="absolute -bottom-1 -right-1 w-12 h-12 bg-[#0EA5E9] rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-7 h-7 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-left mb-20 animate-[fadeInUp_0.6s_ease-out]">
          <div className="inline-block mb-6">
            <span className="bg-gradient-to-r from-[#0284C7] to-[#0369A1] text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg">
              Tại sao chọn chúng tôi
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 leading-tight">
            PHƯƠNG PHÁP ĐÀO TẠO CỦA
          </h2>
          <div className="inline-block relative">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight relative">
              <span className="relative inline-block px-8 py-3">
                <span className="absolute inset-0 bg-gradient-to-r from-[#0284C7] to-[#0369A1] transform -skew-x-12 rounded-lg"></span>
                <span className="relative text-white">E-LEARNING</span>
              </span>
            </h2>
          </div>
        </div>

        <div className="space-y-20 mt-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-12 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-shrink-0">{feature.icon}</div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
