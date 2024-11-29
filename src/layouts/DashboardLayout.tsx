import { Outlet } from "react-router-dom";
import Footer from "./Footer";

export default function DashboardLayout() {
  return (
    <div className="w-full h-full bg-background-100 overflow-x-hidden overflow-y-auto">
      <Outlet />

      <Footer />
    </div>
  );
}
