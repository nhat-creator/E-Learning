import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HomeTemplate() {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const adminInfo = localStorage.getItem("ADMIN_INFO");
    if (adminInfo) {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-40 md:pt-16">
        <Outlet />
      </main>
      <Footer />

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 bg-gradient-to-br from-[#0EA5E9] to-[#0369A1] text-white w-14 h-14 rounded-full shadow-2xl hover:shadow-[#0EA5E9]/50 hover:scale-110 transition-all duration-300 flex items-center justify-center group ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-20 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <svg
          className="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path d="M5 15l7-7 7 7" />
        </svg>
        <span className="absolute inset-0 rounded-full bg-[#0EA5E9] opacity-0 group-hover:opacity-30 group-hover:scale-150 transition-all duration-500"></span>
      </button>
    </div>
  );
}
