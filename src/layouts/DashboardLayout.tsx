import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const isChatPage = pathname.includes("/chat");

  return (
    <>
      <ScrollToTop />

      <div className="w-full h-full bg-background-100 overflow-x-hidden overflow-y-auto">
        <Outlet />

        {!isChatPage && <Footer />}
      </div>
    </>
  );
}
