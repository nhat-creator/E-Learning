import Introduce from "./Introduce";
import About from "./About";
import Brand from "./Brand";
import CourseCatalog from "./CourseCatalog";
import NumberSlide from "./NumberSlide";
import PopularCourses from "./PopularCourses";
import { useEffect, useRef, useState, useLayoutEffect } from "react";

export default function HomePage() {
  // Scroll to top on reload
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute("data-index");
            setVisibleSections((prev) => new Set([...prev, index]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "100px 0px 0px 0px",
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div>
      <div
        ref={(el) => (sectionRefs.current[0] = el)}
        data-index="0"
        className={`transition-all duration-700 ${
          visibleSections.has("0")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <Introduce />
      </div>
      <div
        ref={(el) => (sectionRefs.current[1] = el)}
        data-index="1"
        className={`transition-all duration-700 ${
          visibleSections.has("1")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <CourseCatalog />
      </div>
      <div
        ref={(el) => (sectionRefs.current[2] = el)}
        data-index="2"
        className={`transition-all duration-700 ${
          visibleSections.has("2")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <PopularCourses />
      </div>
      <div
        ref={(el) => (sectionRefs.current[3] = el)}
        data-index="3"
        className={`transition-all duration-700 ${
          visibleSections.has("3")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <Brand />
      </div>
      <div
        ref={(el) => (sectionRefs.current[4] = el)}
        data-index="4"
        className={`transition-all duration-700 ${
          visibleSections.has("4")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <NumberSlide />
      </div>
      <div
        ref={(el) => (sectionRefs.current[5] = el)}
        data-index="5"
        className={`transition-all duration-700 ${
          visibleSections.has("5")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <About />
      </div>
    </div>
  );
}
