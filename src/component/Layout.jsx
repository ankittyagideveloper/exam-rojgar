import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import { MoveUp } from "lucide-react";
import  { Header,HeaderModernised } from "./Header";
import BottomNavigation from "./BottomNavigation";
import Footer from "./Footer";
import SidebarDemo from "./SidebarDemo";
import { StickyBannerDemo } from "./sticky-banner/StickyBanner";
import { ConnectivityBanner } from "./connectivity-banner/connectivityBanner";
import { useClerk, useAuth } from "@clerk/clerk-react";
import AppBreadcrumb from "./AppBreadcrumb";
import { Button } from "@/components/ui";

const Layout = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const { openSignIn } = useClerk();
  const { isSignedIn } = useAuth();

  // useEffect(() => {
  //   if (!isSignedIn) {
  //     openSignIn();
  //   }
  //   window.addEventListener("scroll", toggleVisibility);
  //   return () => window.removeEventListener("scroll", toggleVisibility);
  // }, [isSignedIn, openSignIn]);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Skip-navigation link — only visible on keyboard focus */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-1/2 focus:-translate-x-1/2 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#1272BA] focus:text-white focus:text-sm focus:font-semibold focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <SidebarDemo>
          <Header />
          <main id="main-content" className=" lg:mt-14" tabIndex={-1}>
            <AppBreadcrumb />
            <Outlet />
          </main>
          {/* {isVisible && (
            <Button
              onClick={scrollToTop}
              className="fixed cursor-pointer  bottom-15 md:bottom-8 right-8 bg-[#008080] hover:bg-[#008080] text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300 z-50"
              aria-label="Scroll to top"
            >
              <MoveUp size={24} />
            </Button>
          )} */}
          <BottomNavigation />
        </SidebarDemo>
      </div>
    </>
  );
};

export default Layout;
