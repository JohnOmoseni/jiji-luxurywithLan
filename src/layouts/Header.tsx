import {
  Adverts,
  ArrowRight,
  Chatbox,
  HotelIcon,
  KeyboardArrowDown,
  Logo,
  LogoutIcon,
  Plus,
  profile,
  WishListIcon,
} from "@/constants/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { DropdownList } from "@/components/ui/components/DropdownList";
import { BtnLoader } from "@/components/fallback/FallbackLoader";
import { getInitials } from "@/lib";
import { useAppSelector } from "@/types";
import { cn } from "@/lib/utils";

import AvatarWrapper from "@/components/ui/components/AvatarWrapper";
import Button from "@/components/reuseables/CustomButton";
import TooltipWrapper from "@/components/ui/components/TooltipWrapper";

interface HeaderProps {
  customHeaderComponent?: React.ReactNode;
  customActionHeaderButton?: React.ReactNode;
}

function Header({ customHeaderComponent, customActionHeaderButton }: HeaderProps) {
  const { handleLogout, isLoadingAuth, user } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { selectedCategory } = useAppSelector((state) => state.appState);
  const isPostPage = pathname.includes("/post") || pathname.includes("/add-room");
  const isMyHotelsPage = pathname.includes("/my-hotels");

  const onLogout = async () => {
    await handleLogout();
  };

  return (
    <div className="sticky top-0 bg-background shadow-sm z-[100] min-h-[60px] w-full">
      <div className="row-flex-btwn gap-6 py-3 px-4 sm:px-5">
        <Link to="/" className="md:ml-4">
          <Logo className="w-fit h-10" />
        </Link>

        {customHeaderComponent && customHeaderComponent}

        <div className="row-flex ml-auto max-[340px]:gap-2 gap-3">
          {!user ? (
            <Link
              to="/signin"
              className="text-base text-secondary font-semibold transition hover:scale-105"
            >
              Login
            </Link>
          ) : (
            <>
              <TooltipWrapper
                trigger={
                  <Link to="/my-hotels" className="icon-div">
                    <HotelIcon className="size-3 sm:size-4" />
                  </Link>
                }
                content="Manage Hotels"
              />

              <TooltipWrapper
                trigger={
                  <Link to="/wishlist" className="icon-div">
                    <WishListIcon className="size-3 sm:size-4" />
                  </Link>
                }
                content="Saved"
              />

              <TooltipWrapper
                trigger={
                  <Link to="/chats" className="icon-div">
                    <Chatbox className="size-3 sm:size-4" />
                  </Link>
                }
                content="Messages"
              />

              <TooltipWrapper
                trigger={
                  <Link to="/my-ads" className="icon-div">
                    <Adverts className="size-3 sm:size-4" />
                  </Link>
                }
                content="My Adverts"
              />
            </>
          )}

          <div className="gap-2 row-flex">
            {user ? (
              <Link to="/profile" className="hidden sm:block">
                <AvatarWrapper
                  containerClassName="max-sm:order-2"
                  fallback={getInitials(user?.name)}
                />
              </Link>
            ) : (
              <img
                src={profile}
                alt="user"
                className="size-8 rounded-full object-cover clip-circle"
              />
            )}

            {user && (
              <DropdownList
                trigger={
                  <div className="row-flex-btwn gap-1">
                    <p className="w-full break-words text-xs sm:text-sm max-w-[10ch] text-center font-semibold leading-4 line-clamp-2">
                      {user?.name || "User"}
                    </p>

                    <KeyboardArrowDown className="size-4 cursor-pointer" />
                  </div>
                }
                containerStyles="min-w-[6rem] max-sm:-mr-3 header-popover-content"
                list={["Profile", "Log out"]}
                renderItem={(item, idx) => {
                  return (
                    <div
                      key={idx}
                      className="row-flex-btwn py-2.5 px-3 w-full cursor-pointer gap-3"
                      onClick={item === "Log out" ? onLogout : () => navigate("/profile")}
                    >
                      <span className="text-base">
                        {isLoadingAuth && item === "Log out" ? "Signing out" : item}
                      </span>
                      {isLoadingAuth && item === "Log out" ? (
                        <BtnLoader isLoading={isLoadingAuth} />
                      ) : item === "Log out" ? (
                        <LogoutIcon className="h-fit w-4 text-red-600" />
                      ) : null}
                    </div>
                  );
                }}
              />
            )}
          </div>

          {customActionHeaderButton && customActionHeaderButton}

          <Button
            icon={Plus}
            title={isMyHotelsPage ? "Add Rooms" : "Post"}
            className={cn(
              "group-hover:scale-95 max-[400px]:!px-2.5 max-[400px]:!gap-1",
              (isPostPage || isMyHotelsPage) && "!hidden"
            )}
            onClick={() =>
              user
                ? navigate("/ads/post", { state: { category: selectedCategory } })
                : navigate("/signin")
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Header;

// @ts-ignore
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
