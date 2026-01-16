import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Chatbot from "../../components/Chatbot/Chatbot";

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

      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 flex items-end gap-3">
        <Chatbot />

        <div
          className={`overflow-hidden transition-all duration-300 ease-out ${
            showScrollTop
              ? "w-12 md:w-14 opacity-100 translate-y-0"
              : "w-0 opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <button
            onClick={scrollToTop}
            className="relative animate-scroll-top-in bg-gradient-to-br from-[#0EA5E9] to-[#0369A1] text-white w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl hover:shadow-[#0EA5E9]/30 transition-all duration-300 flex items-center justify-center group"
            aria-label="Scroll to top"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-y-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path d="M5 15l7-7 7 7" />
            </svg>
            <span className="absolute inset-0 rounded-full bg-[#0EA5E9] opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"></span>
          </button>
        </div>
      </div>
    </div>
  );
}
