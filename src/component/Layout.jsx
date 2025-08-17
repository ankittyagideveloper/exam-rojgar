import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import { MoveUp } from "lucide-react";
import Header from "./Header";
import BottomNavigation from "./BottomNavigation";
import Footer from "./Footer";

const Layout = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-20">
        <Outlet />
      </main>
      <Footer />
      {/* Scroll to top button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed  bottom-15 md:bottom-8 right-8 bg-[#008080] hover:bg-[#008080] text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300 z-50"
          aria-label="Scroll to top"
        >
          <MoveUp size={24} />
        </button>
      )}
      <BottomNavigation />
    </div>
  );
};

export default Layout;
