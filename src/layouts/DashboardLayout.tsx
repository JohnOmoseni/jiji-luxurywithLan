import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const isChatPage = pathname.includes("/chat");

  return (
    <>
      <div className="w-full h-full bg-background-100 overflow-x-hidden overflow-y-auto">
        <Outlet />

        {!isChatPage && <Footer />}
      </div>
    </>
  );
}
