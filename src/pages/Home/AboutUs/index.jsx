import React from "react";

export default function AboutUs() {
  const teamMembers = [
    {
      name: "Đỗ Hồng Nhất",
      role: "Frontend Developer",
      image: "https://via.placeholder.com/400x400?text=Developer+1",
      description:
        "Chuyên về UI/UX và Frontend Development với Reactjs, Tailwind CSS và Flowbite. Yêu thích tạo ra những giao diện đẹp mắt và trải nghiệm người dùng tuyệt vời.",
    },
    {
      name: "Dương Quốc Bảo",
      role: "Frontend Developer",
      image: "https://via.placeholder.com/400x400?text=Developer+2",
      description:
        "Chuyên về UI/UX và Frontend Development với Reactjs, Tailwind CSS và Flowbite. Yêu thích tạo ra những giao diện đẹp mắt và trải nghiệm người dùng tuyệt vời.",
    },
  ];

  const stats = [
    { icon: "💻", number: "5+", label: "Projects Completed" },
    { icon: "⭐", number: "1000%", label: "Happy Clients" },
    { icon: "🎯", number: "2+", label: "Years Experience" },
    { icon: "🚀", number: "98%", label: "Success Rate" },
  ];

  const services = [
    {
      icon: "🎨",
      title: "Web Development",
      description:
        "Xây dựng website và ứng dụng web hiện đại với React và công nghệ tiên tiến nhất.",
    },
    {
      icon: "📱",
      title: "Responsive Design",
      description:
        "Thiết kế giao diện responsive hoàn hảo trên mọi thiết bị từ mobile đến desktop.",
    },
    {
      icon: "⚡",
      title: "Performance Optimization",
      description:
        "Tối ưu hiệu suất website để đạt tốc độ tải nhanh và trải nghiệm người dùng mượt mà.",
    },
    {
      icon: "🔧",
      title: "API Integration",
      description: "Tích hợp API và kết nối với các hệ thống backend.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-4 pb-6 md:py-12 lg:py-16">
        <div className="text-center mb-6 md:mb-10 animate-[fadeInUp_0.4s_ease-out]">
          <span className="inline-block bg-gradient-to-r from-[#0284C7] to-[#0369A1] text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            Our Team
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            About Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Chúng tôi là đội ngũ developers đam mê với sứ mệnh tạo ra những sản
            phẩm công nghệ chất lượng cao
          </p>
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto animate-[fadeIn_0.5s_ease-out_0.2s_both]">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="p-8 md:p-10">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-gradient-to-br from-[#0284C7] to-[#0369A1] flex-shrink-0 flex items-center justify-center">
                    <svg
                      className="w-20 h-20 md:w-24 md:h-24 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-sm font-semibold text-[#0284C7] mb-2">
                      I am {member.name.split(" ").pop()}
                    </h3>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      {member.name}
                    </h2>
                    <p className="text-lg text-gray-600 mb-4">{member.role}</p>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {member.description}
                    </p>
                    <div className="flex justify-center md:justify-start">
                      <button className="bg-gradient-to-r from-[#0284C7] to-[#0369A1] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                        Contact Me!
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-4 md:py-8 lg:py-12 animate-[fadeInUp_0.5s_ease-out_0.3s_both]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl md:text-5xl mb-3">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-4 md:py-8 lg:py-12 animate-[fadeInUp_0.5s_ease-out_0.4s_both]">
        <div className="text-center mb-6 md:mb-10">
          <span className="inline-block bg-gradient-to-r from-[#0284C7] to-[#0369A1] text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Development Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                {service.description}
              </p>
              <a
                href="#"
                className="text-[#0284C7] font-semibold hover:text-[#0369A1] transition-colors inline-flex items-center gap-2 group/link"
              >
                Read more
                <svg
                  className="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="container mx-auto px-4 pt-4 pb-6 md:py-8 lg:py-12 animate-[fadeInUp_0.5s_ease-out_0.5s_both]">
        <div className="bg-gradient-to-r from-[#0284C7] to-[#0369A1] rounded-3xl p-6 md:p-16 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Let's Work Together
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Có một dự án tuyệt vời? Hãy liên hệ với chúng tôi để biến ý tưởng
            của bạn thành hiện thực!
          </p>
          <button className="bg-white text-[#0284C7] px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
            Get In Touch
          </button>
        </div>
      </section>
    </div>
  );
}
