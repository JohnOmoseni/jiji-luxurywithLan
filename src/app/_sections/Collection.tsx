import { cn } from "@/lib/utils";
import Card from "./Card";

type CollectionProps = {
  data: any[];
  emptyTitle?: string;
  emptySubText?: string;
  containerStyles?: string;
  emptyContainerStyles?: string;
  collectionType?: "My_Listing" | "All_Listings" | "Trending_Listing" | "My_Wishlist";
  limit?: number;
  page?: number | string;
  urlParamName?: string;
  totalPages?: number;
  emptyListElement?: any;
};

function Collection({
  data,
  emptyTitle,
  emptySubText,
  containerStyles,
  emptyContainerStyles,
  emptyListElement,
  collectionType,
}: CollectionProps) {
  return (
    <>
      {data && data?.length > 0 ? (
        <>
          <ul
            className={cn(
              "grid w-full grid-cols-1 place-items-center gap-8 py-3 sm:grid-cols-[repeat(auto-fit,_minmax(260px,_1fr))]",
              containerStyles
            )}
          >
            {data.map((item, idx) => {
              const isOwnListing = collectionType === "My_Listing";
              const isWishList = collectionType === "My_Wishlist";

              return (
                <Card item={item} key={idx} isOwnListing={isOwnListing} isWishlist={isWishList} />
              );
            })}
          </ul>
        </>
      ) : emptyListElement ? (
        emptyListElement
      ) : (
        <div
          className={cn(
            "grid min-h-[200px] w-full place-items-center gap-2 px-3 py-4",
            emptyContainerStyles
          )}
        >
          <div className="flex-column">
            <h2 className="text-2xl font-bold">{emptyTitle || "No Item"}</h2>
            <p className="text-center text-sm">{emptySubText || ""}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Collection;