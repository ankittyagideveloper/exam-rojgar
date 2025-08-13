import { Outlet } from "react-router";
import Header from "./Header";
import BottomNavigation from "./BottomNavigation";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-20">
        <Outlet />
      </main>

      <Footer />
      <BottomNavigation />
    </div>
  );
};

export default Layout;
