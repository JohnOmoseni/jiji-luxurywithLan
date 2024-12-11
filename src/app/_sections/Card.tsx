import ConfirmDelete from "@/components/reuseables/ConfirmDelete";
import { StatusBadge } from "@/components/reuseables/StatusBadge";
import { Heart, Location } from "@/constants/icons";
import { cn, formatPrice } from "@/lib/utils";
import { toggleWishlistItem } from "@/redux/features/wishlistSlice";
import { useDeleteBookingMutation } from "@/server/actions/bookings";
import { useDeleteHotelMutation } from "@/server/actions/hotel";
import { useDeleteListingMutation } from "@/server/actions/listing";
import { useLazyGetFavoriteQuery } from "@/server/actions/wishlist";
import { useAppDispatch, useAppSelector } from "@/types";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

type CardProps = {
  item: any;
  type: "listing" | "hotel" | "booking" | "wishlist" | "All";
};

function Card({ item, type }: CardProps) {
  const [triggerToggleFavorite, { isLoading: isTogglingFavorite }] = useLazyGetFavoriteQuery();
  const [deleteUserListingMutation, { isLoading: isDeletingListing }] = useDeleteListingMutation();
  const [deleteUserBookingMutation, { isLoading: isDeletingBooking }] = useDeleteBookingMutation();
  const [deleteUserHotelMutation, { isLoading: isDeletingHotel }] = useDeleteHotelMutation();

  const isUserItem = type === "listing" || type === "hotel";
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const wishlist = useAppSelector((state: any) => state.wishlist.items);

  const isFavorited = wishlist.includes(item.id);

  const handleWishlistClick = async (actionType?: "add" | "remove") => {
    const action = actionType || (isFavorited ? "remove" : "add");

    try {
      dispatch(toggleWishlistItem(item.id));
      const res = await triggerToggleFavorite({ listing_id: item.id, action }).unwrap();

      toast.success(
        res?.message || `Property ${action === "add" ? "added" : "removed"} successfully`
      );
    } catch (error: any) {
      console.error("Error updating wishlist:", error);
      dispatch(toggleWishlistItem(item.id));

      toast.error(
        error?.data?.message || `Error ${action === "add" ? "adding to" : "removing from"} wishlist`
      );
    }
  };

  const handleEditListing = () => {
    navigate(`/ads/edit-advert/${item?.id}`, { state: { type: "edit" } });
  };

  const handleEditHotel = () => {
    navigate(`/hotels/edit-hotel/${item?.id}`, { state: { type: "edit" } });
  };

  const handleEditBooking = () => {
    navigate(`/bookings/edit-booking/${item?.id}`, { state: { type: "edit" } });
  };

  const handleDeleteHotel = async () => {
    try {
      await deleteUserHotelMutation({ hotel_id: item.id });

      toast.success("Hotel deleted successfully");
      navigate("/my-hotels");
    } catch (error: any) {
      const message = error?.data?.message || "Error deleting hotel";
      toast.error(message);
    }
  };

  const handleDeleteBooking = async () => {
    try {
      await deleteUserBookingMutation({ booking_id: item.id });

      toast.success("Booking deleted successfully");
      navigate("/my-bookings");
    } catch (error: any) {
      const message = error?.data?.message || "Error deleting booking";
      toast.error(message);
    }
  };

  const handleDeleteListing = async () => {
    try {
      await deleteUserListingMutation({ listing_id: item.id });

      toast.success("Listing deleted successfully");
      navigate("/my-ads");
    } catch (error: any) {
      const message = error?.data?.message || "Error deleting listing";
      toast.error(message);
    }
  };

  return type === "wishlist" ? (
    <WishListCard
      item={item}
      handleDeleteListing={handleWishlistClick}
      isDeleting={isTogglingFavorite}
    />
  ) : type === "hotel" ? (
    <HotelCard item={item} isDeleting={isDeletingHotel} handleDeleteHotel={handleDeleteHotel} />
  ) : (
    <li className="flex-column group relative w-full overflow-hidden transition-sm max-sm:min-w-[280px] md:max-w-[380px] min-h-[320px] rounded-xl">
      <Link
        to={`/listings}/${item.id}`}
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
          <Link to={`/listings}/${item.id}`} className="inline-flex">
            <h3 className="line-clamp-2 leading-6 text-lg tracking-wide">{item?.name}</h3>
          </Link>

          <div className="icon-div !size-8" onClick={() => handleWishlistClick()}>
            <Heart className={`size-4 ${isFavorited ? "fill-red-500 stroke-red-500" : ""}`} />
          </div>
        </div>

        {isUserItem ? (
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

        <div className={cn("mt-3", isUserItem && "row-flex-btwn gap-4")}>
          <p className="text-secondary font-semibold ml-1 leading-3">
            {/* &#8358; */}
            {item?.currency} {formatPrice(item?.actual_amount)}
          </p>

          {isUserItem && (
            <div className="ml-auto row-flex gap-2">
              <p
                className="font-semibold text-base cursor-pointer"
                onClick={() => {
                  if (type === "listing") handleEditListing();
                  else if (type === "hotel") handleEditHotel();
                  else if (type === "booking") handleEditBooking();
                }}
              >
                Edit
              </p>

              <ConfirmDelete
                onDeleteClick={() => {
                  if (type === "listing") handleDeleteListing();
                  else if (type === "hotel") handleDeleteHotel();
                  else if (type === "booking") handleDeleteBooking();
                }}
                title="delete this ad"
                actionTitle="Delete Ad"
                isPending={isDeletingListing || isDeletingHotel || isDeletingBooking}
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

const HotelCard = ({
  item,
  isDeleting,
  handleDeleteHotel,
}: {
  item: any;
  isDeleting: boolean;
  handleDeleteHotel: () => Promise<void>;
}) => {
  return (
    <li className="group grid grid-cols-[45%_1fr] relative w-full overflow-hidden transition-sm max-sm:min-w-[280px] max-w-[400px] rounded-xl border border-border-100 shadow-sm ">
      <div
        className="flex min-h-52 w-full flex-grow flex-shrink-0 bg-cover bg-no-repeat bg-center overflow-hidden drop-shadow-md"
        style={{ backgroundImage: `url(${item?.office_front})` }}
      />

      <div className="flex-column w-full gap-1 px-3.5 py-4">
        <h3 className="line-clamp-2 leading-6 text-lg tracking-wide">{item?.name}</h3>

        <p className="flex flex-row gap-1 mt-1">
          <Location className="size-5" />
          <span className="font-light text-sm">
            {item?.state?.name}
            {item?.local_gov_area?.name
              ? `, ${item?.local_gov_area?.name}`
              : item?.area && `, ${item?.area}`}
          </span>
        </p>

        <div className={cn("mt-auto flex-column gap-2")}>
          {item?.address && <p className="text-xs font-semibold">Address: {item?.address}</p>}

          <div className="row-flex ml-auto gap-2">
            <Link
              to={`/my-hotels/edit-hotel/${item?.id}`}
              state={{ type: "hotels", formType: "edit" }}
              className="text-xs font-semibold"
            >
              Edit
            </Link>

            <ConfirmDelete
              onDeleteClick={handleDeleteHotel}
              title="delete this hotel"
              actionTitle="Delete Hotel"
              isPending={isDeleting}
              trigger={
                <p className="font-semibold text-xs w-full text-end text-red-600 cursor-pointer">
                  Remove
                </p>
              }
            />
          </div>
        </div>
      </div>
    </li>
  );
};

const WishListCard = ({
  item,
  isDeleting,
  handleDeleteListing,
}: {
  item: any;
  isDeleting: boolean;
  handleDeleteListing: (actionType?: "add" | "remove") => void;
}) => {
  return (
    <li className="group grid grid-cols-[45%_1fr] relative w-full overflow-hidden transition-sm max-sm:min-w-[300px]  rounded-xl border border-border-100 shadow-sm ">
      <div
        className="flex min-h-[200px] w-full flex-grow flex-shrink-0 bg-cover bg-no-repeat bg-center overflow-hidden"
        style={{ backgroundImage: `url(${item?.main_thumbnail})` }}
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
        <h3 className="line-clamp-2 leading-6 text-lg tracking-wide">{item?.name}</h3>

        <p className="flex flex-row gap-1 mt-1">
          <Location className="size-5" />
          <span className="font-light text-sm">
            {item?.state_name}
            {item?.lga_name ? `, ${item?.lga_name}` : item?.district && `, ${item?.district}`}
          </span>
        </p>

        <div className={cn("mt-auto row-flex-btwn !flex-wrap gap-x-3 gap-y-1.5")}>
          <p className="text-secondary font-semibold">
            {item?.currency} {formatPrice(item?.actual_amount)}
          </p>

          <ConfirmDelete
            onDeleteClick={() => handleDeleteListing("remove")}
            title="remove this ad from wishlist"
            actionTitle="Remove Ad"
            isPending={isDeleting}
            trigger={<p className="font-semibold text-xs text-red-600 cursor-pointer">Remove</p>}
          />
        </div>
      </div>
    </li>
  );
};
