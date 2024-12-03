import { Logo } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { Outlet, useLocation } from "react-router-dom";

export default function AuthLayout() {
  const { pathname } = useLocation();
  const isSignupPage = pathname.startsWith("/signup");

  return (
    <div
      className={cn(
        "relative grid place-items-center gap-3 sm:gap-5 h-full bg-background-100 w-full overflow-x-hidden px-3 overflow-y-auto",
        !isSignupPage ? "py-3" : "py-4"
      )}
    >
      <div className="row-flex w-full">
        <Logo className="h-fit w-10 object-contain text-center" />
      </div>

      <div className="min-w-[300px] relative w-full max-w-[420px] rounded-xl bg-background px-6 py-6 border border-border-200 shadow-sm min-[450px]:w-full">
        <div className="flex-column gap-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
6;
