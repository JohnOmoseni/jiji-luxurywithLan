import SectionWrapper from "@/layouts/SectionWrapper";
import Collection from "../_sections/Collection";
import { NoSearch, Plus } from "@/constants/icons";
import { listings } from "@/constants";

function WishLists() {
  const data: any = listings;

  return (
    <SectionWrapper>
      <div className="card sm:p-6 max-w-4xl mx-auto">
        <div className="flex-column gap-4">
          {data && data?.length > 0 && (
            <h2 className="text-xl w-full max-sm:text-center">Wishlists</h2>
          )}

          <Collection
            data={data}
            collectionType="My_Wishlist"
            containerStyles="sm:grid-cols-2"
            emptyListElement={<EmptyList />}
          />
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
