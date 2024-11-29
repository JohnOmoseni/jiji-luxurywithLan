import ConfirmDelete from "@/components/reuseables/ConfirmDelete";
import { StatusBadge } from "@/components/reuseables/StatusBadge";
import { car_image, Heart, Location } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { toggleWishlistItem } from "@/redux/features/wishlistSlice";
import { useDeleteListingMutation } from "@/server/actions/listing";
import { useLazyGetFavoriteQuery } from "@/server/actions/wishlist";
import { useAppDispatch, useAppSelector } from "@/types";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

type CardProps = {
  item: any;
  isOwnListing?: boolean;
  isWishlist?: boolean;
};

function Card({ item, isOwnListing, isWishlist }: CardProps) {
  const [triggerToggleFavorite] = useLazyGetFavoriteQuery();
  const [deleteUserListingMutation, { isLoading: isDeleting }] = useDeleteListingMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const wishlist = useAppSelector((state: any) => state.wishlist.items);

  const isFavorited = wishlist.includes(item.id);

  const handleWishlistClick = async () => {
    const action = isFavorited ? "remove" : "add";

    try {
      const res = await triggerToggleFavorite({ listing_id: item.id, action }).unwrap();

      dispatch(toggleWishlistItem(item.id));
      toast.success(
        res?.message || `Property ${action === "add" ? "added" : "removed"} successfully`
      );
    } catch (error: any) {
      console.error("Error updating wishlist:", error);

      toast.error(
        error?.data?.message || `Error ${action === "add" ? "adding to" : "removing from"} wishlist`
      );
    }
  };

  const handleEditListing = () => {
    navigate(`/ads/edit-advert/${item?.id}`, { state: { type: "edit" } });
  };

  const handleDeleteListing = async () => {
    try {
      await deleteUserListingMutation({ listing_id: item.id });

      toast.success("Ad deleted successfully");
      navigate("/ads");
    } catch (error: any) {
      const message = error?.data?.message;
      toast.error(message || "Error deleting ad");
    }
  };

  return isWishlist ? (
    <WishListCard item={item} />
  ) : (
    <li className="flex-column group relative w-full overflow-hidden transition-sm max-sm:min-w-[300px] md:max-w-[380px] min-h-[320px] rounded-xl">
      <Link
        to={`/listings/${item.id}`}
        className="flex min-h-[220px] w-full flex-grow flex-shrink-0 bg-cover bg-no-repeat bg-center overflow-hidden rounded-b-md"
        style={{ backgroundImage: `url(${item?.main_thumbnail})` }}
      />

      {item?.main_category_name && (
        <div
          className={cn(
            "badge absolute left-2 top-2.5 !border-none !cursor-default",
            "!bg-green-500 text-white"
          )}
        >
          {item?.main_category_name}
        </div>
      )}

      <div className="flex-column w-full gap-1 px-1 py-3 pb-4">
        <div className="row-flex-btwn gap-5">
          <Link to={`/listings/${item?.id}`} className="inline-flex">
            <h3 className="line-clamp-2 leading-6 text-lg tracking-wide">{item?.name}</h3>
          </Link>

          <div className="icon-div !size-8" onClick={handleWishlistClick}>
            <Heart className={`size-4 ${isFavorited ? "fill-red-500 stroke-red-500" : ""}`} />
          </div>
        </div>

        {isOwnListing ? (
          <div className="w-max">
            <StatusBadge
              status={item?.is_approved ? "Approved" : "Declined"}
              containerStyles="!rounded-lg"
            />
          </div>
        ) : (
          <p className="row-flex-start gap-1">
            <Location className="size-4" />
            <span className="font-light text-xs">
              {item?.state_name}
              {item?.lga_name ? `, ${item?.lga_name}` : item?.district && `, ${item?.district}`}
            </span>
          </p>
        )}

        <div className={cn("mt-3", isOwnListing && "row-flex-btwn gap-4")}>
          <p className="text-secondary font-semibold ml-1 leading-3">
            {/* &#8358; */}
            {item?.currency} {item?.actual_amount}.00
          </p>

          {isOwnListing && (
            <div className="ml-auto row-flex gap-2">
              <p className="font-semibold text-base cursor-pointer" onClick={handleEditListing}>
                Edit
              </p>

              <ConfirmDelete
                onDeleteClick={handleDeleteListing}
                title="delete this ad"
                actionTitle="Delete Ad"
                isPending={isDeleting}
                trigger={
                  <p className="font-semibold text-base text-red-600 cursor-pointer">Delete</p>
                }
              />
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default Card;

const WishListCard = ({ item }: { item: any }) => {
  return (
    <li className="group grid grid-cols-[45%_1fr] relative w-full overflow-hidden transition-sm max-sm:min-w-[300px]  rounded-xl border border-border-100 shadow-sm ">
      <div
        className="flex min-h-[200px] w-full flex-grow flex-shrink-0 bg-cover bg-no-repeat bg-center overflow-hidden"
        style={{ backgroundImage: `url(${car_image})` }}
      />

      {item?.main_category_name && (
        <div
          className={cn(
            "badge absolute left-2 top-2.5 !border-none !cursor-default",
            "!bg-green-500 text-white"
          )}
        >
          Automobile
        </div>
      )}

      <div className="flex-column w-full gap-1 px-3.5 py-4">
        <h3 className="line-clamp-2 leading-6 text-lg tracking-wide">{item?.title}</h3>

        <p className="row-flex-start gap-1 mt-1">
          <Location className="size-5" />
          <span className="font-light text-sm">Lagos, Ikeja</span>
        </p>

        <div className={cn("mt-auto row-flex-btwn !flex-wrap gap-x-3 gap-y-1.5")}>
          <p className="text-secondary font-semibold">&#8358;120,000,000</p>

          <p className="font-semibold ml-auto text-end text-base text-red-600">Delete</p>
        </div>
      </div>
    </li>
  );
};
