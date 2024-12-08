import { toast } from "sonner";
import { NoSearch, Plus } from "@/constants/icons";
import { useEffect } from "react";
import { useGetAllHotelsQuery } from "@/server/actions/hotel";
import { useNavigate } from "react-router-dom";
import Button from "@/components/reuseables/CustomButton";
import SectionWrapper from "@/layouts/SectionWrapper";
import Collection from "../_sections/Collection";
import FallbackLoader from "@/components/fallback/FallbackLoader";

function HotelListings() {
  const { data, isError, isLoading, error } = useGetAllHotelsQuery({});
  const hotelListings = data?.data?.data;

  console.log("[HOTEL LISTINGS]", hotelListings);

  useEffect(() => {
    if (isError) {
      const message = (error as any)?.message;
      toast.error(message || "Error fetching data");
    }
  }, [isError]);

  return (
    <SectionWrapper>
      <div className="card !p-6 max-w-6xl mx-auto">
        {isLoading ? (
          <div className="relative h-[50vh] max-h-[300px]">
            <FallbackLoader loading={isLoading} />
          </div>
        ) : (
          <div className="flex-column gap-4">
            {hotelListings && hotelListings?.length > 0 && <h2 className="text-xl">Hotels</h2>}

            <Collection
              data={hotelListings}
              collectionType="My_Listing"
              emptyListElement={<EmptyList />}
            />
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}

export default HotelListings;

const EmptyList = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-column gap-5 !items-center">
      <NoSearch className="w-fit h-fit" />
      <h2 className="text-xl text-center">You have not listed any hotels yet!</h2>
      <Button
        icon={Plus}
        title="List a Hotel"
        className="group-hover:scale-95 mt-4"
        onClick={() => navigate("/create-hotel")}
      />
    </div>
  );
};
