import FallbackLoader from "@/components/fallback/FallbackLoader";
import ListHostelForm from "@/components/forms/hotels/ListHostelForm";
import BackArrow from "@/components/reuseables/BackArrow";
import SectionWrapper from "@/layouts/SectionWrapper";
import BookHotelForm from "@/components/forms/hotels/BookHotelForm";
import { useLocation, useParams } from "react-router-dom";
import { useGetHotelByIDQuery } from "@/server/actions/hotel";
import { useEffect } from "react";
import { toast } from "sonner";

function ManageHotel() {
  const { id: hotel_id } = useParams();
  const { state } = useLocation();
  const { type: stateType = "hotels", formType = "post" } = state || {};

  const {
    data: hotelData,
    isLoading: fetchingHotel,
    isError,
    error,
  } = useGetHotelByIDQuery({ hotel_id: hotel_id! }, { skip: !hotel_id || formType !== "edit" });

  const data = stateType === "hotels" ? hotelData?.data : null;
  console.log("HOTEL DATA", hotelData);

  useEffect(() => {
    if (isError) {
      const message = (error as any)?.message || (error as any)?.data?.message;
      toast.error(message || "Error fetching hotel data");
    }
  }, [isError]);

  return (
    <SectionWrapper mainContainerStyles="!pt-[max(6%,_70px)] ">
      {/* LIST HOTEL */}
      <div className="card !p-6 relative max-w-3xl mx-auto">
        <div className="absolute -top-[45px] left-1">
          <BackArrow />
        </div>

        {stateType === "hotels" ? (
          <>
            <div>
              <h3 className="">{formType === "post" ? "List" : "Edit"} Hotel</h3>
              <p className="text-grey text-xs mt-1 max-w-[50ch]">
                Please provide the necessary details about your hotel.
              </p>
            </div>

            {fetchingHotel ? (
              <div className="relative h-[50vh] max-h-[300px]">
                <FallbackLoader loading={fetchingHotel} hideLabel />
              </div>
            ) : (
              <ListHostelForm data={data} type={formType} />
            )}
          </>
        ) : (
          <>
            <div>
              <h3 className="">Book Hotel</h3>
              <p className="text-grey text-xs mt-1 max-w-[50ch]">
                Please provide the necessary details about your booking.
              </p>
            </div>

            <BookHotelForm />
          </>
        )}
      </div>
    </SectionWrapper>
  );
}

export default ManageHotel;
