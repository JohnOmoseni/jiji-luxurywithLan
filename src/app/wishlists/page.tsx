import SectionWrapper from "@/layouts/SectionWrapper";
import Collection from "../_sections/Collection";
import { NoSearch } from "@/constants/icons";
import { useGetAllUserFavoritesQuery } from "@/server/actions/wishlist";
import { toast } from "sonner";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/types";
import { setHasMutated } from "@/redux/features/wishlistSlice";
import FallbackLoader from "@/components/fallback/FallbackLoader";

function WishLists() {
  const { data, isFetching, isError, error, refetch } = useGetAllUserFavoritesQuery({});
  const { hasMutated } = useAppSelector((state) => state.wishlist);
  const wishlists = data?.data?.data;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (hasMutated) {
      refetch().then(() => {
        dispatch(setHasMutated(false));
      });
    }
  }, [hasMutated, refetch, dispatch]);

  useEffect(() => {
    if (isError) {
      const message = (error as any)?.message;
      toast.error(message || "Error fetching data");
    }
  }, [isError, error]);

  return (
    <SectionWrapper>
      <div className="card sm:p-6 max-w-4xl mx-auto">
        <div className="flex-column gap-4">
          {wishlists && wishlists?.length > 0 && (
            <h2 className="text-xl w-full max-sm:text-center">Wishlists</h2>
          )}

          {isFetching ? (
            <div className="relative h-[50vh] max-h-[300px]">
              <FallbackLoader loading={isFetching} />
            </div>
          ) : (
            <Collection
              data={wishlists}
              collectionType="My_Wishlist"
              containerStyles="sm:grid-cols-2"
              emptyListElement={<EmptyList />}
            />
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}

export default WishLists;

const EmptyList = () => (
  <div className="flex-column gap-6 !items-center pb-5">
    <NoSearch className="w-fit h-fit" />
    <div className="flex-column gap-1 !items-center w-full">
      <h2 className="text-xl text-center">No item in wishlists. </h2>
      <p className=" text-center">Add an item to your wishlist!</p>
    </div>
  </div>
);
