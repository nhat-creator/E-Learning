import React from "react";

export default function NumberSlide() {
  const stats = [
    { number: "1000+", label: "Khóa học" },
    { number: "50,000+", label: "Học viên" },
    { number: "100+", label: "Giảng viên" },
  ];

  return (
    <div className="bg-gradient-to-r from-[#0EA5E9] via-[#0284C7] to-[#0369A1] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.number}
              </h3>
              <p className="text-white text-lg font-medium opacity-90">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
