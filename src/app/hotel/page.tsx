import { toast } from "sonner";
import { NoSearch, Plus } from "@/constants/icons";
import { useEffect } from "react";
import { useGetAllHotelsQuery } from "@/server/actions/hotel";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllBookingsQuery } from "@/server/actions/bookings";
import { cn } from "@/lib/utils";

import Button from "@/components/reuseables/CustomButton";
import SectionWrapper from "@/layouts/SectionWrapper";
import Collection from "../_sections/Collection";
import FallbackLoader from "@/components/fallback/FallbackLoader";

function Hotels() {
  const navigate = useNavigate();
  const {
    data: hotels,
    isFetching: isHotelsFetching,
    isError: isHotelsError,
    error: hotelsError,
  } = useGetAllHotelsQuery({});

  const {
    data: bookings,
    isError: isBookingsError,
    isFetching: isBookingsFetching,
    error: bookingsError,
  } = useGetAllBookingsQuery({});

  const hotelListings = hotels?.data?.data;
  const bookingsListings = bookings?.data?.data;

  const { state } = useLocation();
  const { type } = state || { type: "hotels" };

  useEffect(() => {
    if (isHotelsError) {
      const message = (hotelsError as any)?.message;
      toast.error(message || "Error fetching hotels");
    }
    if (isBookingsError) {
      const message = (bookingsError as any)?.message;
      toast.error(message || "Error fetching bookings");
    }
  }, [isHotelsError, isBookingsError]);

  return (
    <SectionWrapper
      customActionHeaderButton={
        <>
          <Link
            to="/my-hotels/add-room"
            state={{ category: "Hotel" }}
            title="Add Rooms"
            className="min-[520px]:!hidden row-flex bg-secondary !size-7 clip-circle"
          >
            <Plus className="size-4 text-secondary-foreground" title="Add Rooms" />
          </Link>

          <Button
            icon={Plus}
            title={"Add Rooms"}
            className={cn("group-hover:scale-95 max-[520px]:!hidden")}
            onClick={() =>
              navigate("/my-hotels/add-room", {
                state: { category: "Hotel" },
              })
            }
          />
        </>
      }
    >
      <div className="card !pt-6 !pb-14 max-w-4xl mx-auto relative min-[520px]:!hidden">
        <>
          <Tabs defaultValue={type} className="max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="hotels">My Hotels</TabsTrigger>
              <TabsTrigger value="reservations">My Reservations</TabsTrigger>
            </TabsList>

            {/* HOTELS */}
            <TabsContent value="hotels">
              <div className="flex-column gap-4 sm:mt-6">
                {isHotelsFetching ? (
                  <div className="relative h-[50vh] max-h-[300px]">
                    <FallbackLoader loading={isHotelsFetching} />
                  </div>
                ) : (
                  <>
                    <Collection
                      data={hotelListings}
                      collectionType="My_Hotels"
                      emptyListElement={<EmptyList type="hotels" />}
                    />

                    {hotelListings?.length > 0 && (
                      <>
                        <Link
                          to="/my-hotels/post"
                          className=" absolute bottom-3 right-3 hidden sm:row-flex"
                        >
                          <Button title="List a Hotel" icon={Plus} />
                        </Link>
                        <Link
                          to="/my-hotels/post"
                          className=" absolute bottom-3 right-3 sm:!hidden icon-div !size-10"
                        >
                          <Plus className="size-6" title="List a Hotel" />
                        </Link>
                      </>
                    )}
                  </>
                )}
              </div>
            </TabsContent>

            {/* BOOKINGS */}
            <TabsContent value="reservations">
              <div className="flex-column gap-4 mt-6">
                {isBookingsFetching ? (
                  <div className="relative h-[50vh] max-h-[300px]">
                    <FallbackLoader loading={isBookingsFetching} />
                  </div>
                ) : (
                  <Collection
                    data={bookingsListings}
                    collectionType="My_Bookings"
                    emptyListElement={<EmptyList type="bookings" />}
                  />
                )}
              </div>
            </TabsContent>
          </Tabs>
        </>
      </div>
    </SectionWrapper>
  );
}

export default Hotels;

const EmptyList = ({ type }: { type: "hotels" | "bookings" }) => {
  const navigate = useNavigate();
  const title = `You have not ${type === "hotels" ? "listed" : "made"} any ${
    type === "hotels" ? "hotels" : "bookings"
  } yet!`;

  const buttonTitle = type === "hotels" ? "List a Hotel" : "Book a Hotel";
  const buttonAction = type === "hotels" ? "/my-hotels/post" : "/listings";

  return (
    <div className="flex-column gap-5 !items-center">
      <NoSearch className="w-fit h-fit" />
      <h2 className="text-xl text-center">{title}</h2>
      <Button
        icon={Plus}
        title={buttonTitle}
        className="group-hover:scale-95 mt-4"
        onClick={() =>
          navigate(buttonAction, {
            state: type === "hotels" ? { type, formType: "post" } : { category: "hotels" },
          })
        }
      />
    </div>
  );
};
