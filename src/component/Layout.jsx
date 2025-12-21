import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import { MoveUp } from "lucide-react";
import Header from "./Header";
import BottomNavigation from "./BottomNavigation";
import Footer from "./Footer";
import SidebarDemo from "./SidebarDemo";
import axios from "axios";
import { StickyBannerDemo } from "./sticky-banner/StickyBanner";

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
  // const requestOptions = {
  //   username: "ankit",
  //   password: "testpass",
  // };
  // fetch("https://examrojgar-v1.onrender.com/api/auth/register", requestOptions)
  //   .then((response) => response.json()) // Parse the JSON response
  //   .then((data) => console.log(data)) // Handle the data
  //   .catch((error) => console.error("Error:", error)); // Handle errors

  // const data = {
  //   username: "ankit1",
  //   email: "tyagiankit2@gmail.com",
  //   password: "testpass",
  // };

  // axios
  //   .post("https://examrojgar-v1.onrender.com/api/auth/register", data, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //   .then((response) => {
  //     console.log("Success:", response.data);
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });
  return (
    <>
      <div className="min-h-screen bg-background">
        <SidebarDemo>
          <Header />
          <main className=" lg:mt-14">
            <Outlet />
          </main>
          {isVisible && (
            <button
              onClick={scrollToTop}
              className="fixed cursor-pointer  bottom-15 md:bottom-8 right-8 bg-[#008080] hover:bg-[#008080] text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300 z-50"
              aria-label="Scroll to top"
            >
              <MoveUp size={24} />
            </button>
          )}
          <BottomNavigation />
        </SidebarDemo>
      </div>
    </>
  );
};

export default Layout;
