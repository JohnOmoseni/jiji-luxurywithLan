import { ArrowRight, Bell, KeyboardArrowDown, Logo, LogoutIcon, Plus } from "@/constants/icons";
import { PopoverWrapper } from "@/components/ui/components/PopoverWrapper";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { DropdownList } from "@/components/ui/components/DropdownList";
import { BtnLoader } from "@/components/fallback/FallbackLoader";
import { getInitials } from "@/lib";
import { useAppSelector } from "@/types";
import { cn } from "@/lib/utils";

import AvatarWrapper from "@/components/ui/components/AvatarWrapper";
import Button from "@/components/reuseables/CustomButton";

function Header({ customHeaderComponentStyles }: { customHeaderComponentStyles?: any }) {
  const { handleLogout, isLoadingAuth, user } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { selectedCategory } = useAppSelector((state) => state.appState);
  const isPostPage = pathname.includes("/ads/post");

  const onLogout = async () => {
    await handleLogout();
  };

  return (
    <div className="sticky top-0 bg-background shadow-sm z-[50] min-h-[60px] w-full">
      <div className="row-flex-btwn gap-6 py-3 px-4 sm:px-5">
        <Link to="/">
          <Logo className="w-fit h-10" />
        </Link>

        {customHeaderComponentStyles && customHeaderComponentStyles}

        <div className="row-flex ml-auto gap-3">
          <PopoverWrapper
            containerStyles="rounded-xl border-border-100 min-w-[360px] py-6"
            trigger={
              <span className="icon-div !bg-background-100 relative" title="Notification">
                <Bell className="size-4" />

                <span className="absolute size-1.5 bg-red-500 rounded-full right-[0.42rem] top-[0.25rem]"></span>
              </span>
            }
          >
            <Notification />
          </PopoverWrapper>

          <div className="sm:row-flex gap-2 hidden">
            <Link to="/profile" className="">
              <AvatarWrapper
                containerClassName="max-sm:order-2"
                fallback={getInitials(user?.name)}
              />
            </Link>

            <DropdownList
              trigger={
                <div className="row-flex-btwn gap-1">
                  <p className="w-full break-words text-sm max-w-[10ch] text-center font-semibold leading-4">
                    {user?.name || "User"}
                  </p>

                  <KeyboardArrowDown className="size-4 cursor-pointer" />
                </div>
              }
              containerStyles="min-w-[6rem] header-popover-content"
              list={["Log out"]}
              renderItem={(item) => {
                return (
                  <div
                    className="row-flex-btwn py-2.5 px-3 w-full cursor-pointer gap-3"
                    onClick={onLogout}
                  >
                    <span className="text-base">{isLoadingAuth ? "Signing out" : item}</span>

                    {isLoadingAuth ? (
                      <BtnLoader isLoading={isLoadingAuth} />
                    ) : (
                      <LogoutIcon className="h-fit w-4 text-red-600" />
                    )}
                  </div>
                );
              }}
            />
          </div>

          <Button
            icon={Plus}
            title="Post"
            className={cn("group-hover:scale-95", isPostPage && "!hidden")}
            onClick={() =>
              !isPostPage ? navigate("/ads/post", { state: { category: selectedCategory } }) : null
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Header;

const Notification = () => (
  <div className="flex-column gap-3 px-1.5">
    <div className="row-flex-btwn gap-4">
      <h3 className="font-semibold text-[1.05rem]">Notifications</h3>

      <span className="text-sm text-secondary cursor-pointer font-semibold active:scale-95 transition">
        Mark all as read
      </span>
    </div>

    <ul className="px-0.5 mt-4 mb-2 not-first-of-type:border-t">
      <li className="grid grid-cols-[max-content_1fr] gap-3 py-2">
        <span className="size-3 mt-1 bg-grey-200 rounded-full clip-circle" />

        <div className="flex-column pr-1">
          <h4 className="font-semibold"> Commission received</h4>
          <p className="grey-text !font-light line-clamp-2 break-all">
            A driver just paid you 10% commission
          </p>
          <span className="text-[0.7rem] mt-1 text-grey-200 tracking-wide">
            03:40pm - 23 Sept, 2024
          </span>
        </div>
      </li>
    </ul>

    <div className="cursor-pointer transition active:scale-95 text-base row-flex pt-3 px-4 mt-auto text-secondary font-semibold">
      View More
      <ArrowRight className="size-4 ml-1" />
    </div>
  </div>
);
