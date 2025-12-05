import React from "react";

export default function Brand() {
  const brands = [
    {
      name: "Cốc Cốc",
      logo: "https://via.placeholder.com/150x80/e5e7eb/6b7280?text=Coc+Coc",
    },
    {
      name: "Vietcombank",
      logo: "https://via.placeholder.com/150x80/e5e7eb/6b7280?text=Vietcombank",
    },
    {
      name: "NCSC",
      logo: "https://via.placeholder.com/150x80/e5e7eb/6b7280?text=NCSC",
    },
    {
      name: "Zalo",
      logo: "https://via.placeholder.com/150x80/e5e7eb/6b7280?text=Zalo",
    },
    {
      name: "VNCERT/CC",
      logo: "https://via.placeholder.com/150x80/e5e7eb/6b7280?text=VNCERT",
    },
    {
      name: "Viettel",
      logo: "https://via.placeholder.com/150x80/e5e7eb/6b7280?text=Viettel",
    },
    {
      name: "VIB",
      logo: "https://via.placeholder.com/150x80/e5e7eb/6b7280?text=VIB",
    },
    {
      name: "JICA",
      logo: "https://via.placeholder.com/150x80/e5e7eb/6b7280?text=JICA",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-white py-16 md:py-20 lg:py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 border-2 border-gray-100 rounded-3xl p-8 md:p-12 lg:p-16 shadow-xl">
          {/* Title with Highlight Effect */}
          <div className="mb-12 md:mb-16 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black inline-flex items-center justify-center gap-3 tracking-tight flex-wrap">
              <span className="relative inline-block px-6 py-2">
                <span className="absolute inset-0 bg-gradient-to-r from-[#0284C7] to-[#0369A1] transform -skew-x-12"></span>
                <span className="relative text-white">TRUSTED</span>
              </span>
              <span className="text-gray-900">BY</span>
            </h2>
          </div>

          {/* Brands Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="group bg-white border-2 border-gray-200 rounded-2xl p-6 md:p-7 lg:p-8 flex items-center justify-center hover:border-[#0284C7] hover:shadow-2xl hover:scale-105 transition-all duration-300 aspect-[4/3] relative overflow-hidden"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0284C7]/5 to-[#0369A1]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#0284C7]/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="text-center w-full relative z-10">
                  <div className="text-xl md:text-2xl lg:text-3xl font-black text-gray-400 group-hover:text-[#0284C7] transition-colors duration-300 leading-tight">
                    {brand.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
