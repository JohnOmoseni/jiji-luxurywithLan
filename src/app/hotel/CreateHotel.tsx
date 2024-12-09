import FallbackLoader from "@/components/fallback/FallbackLoader";
import ListHostelForm from "@/components/forms/ads/ListHostelForm";
import BackArrow from "@/components/reuseables/BackArrow";
import SectionWrapper from "@/layouts/SectionWrapper";
import BookHotelForm from "@/components/forms/ads/BookHotelForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function CreateHotel() {
  const isLoading = false;
  const type = "post";

  return (
    <SectionWrapper mainContainerStyles="!pt-[max(6%,_70px)]">
      <Tabs defaultValue="list" className="max-w-3xl mx-auto relative">
        <div className="absolute -top-[45px] left-1">
          <BackArrow />
        </div>

        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">List Hotel</TabsTrigger>
          <TabsTrigger value="bookings">Book Hotel</TabsTrigger>
        </TabsList>

        {/* LIST HOTEL */}
        <TabsContent value="list">
          <div className="card !p-6 relative">
            <div>
              <h3 className="">{type === "post" ? "List" : "Edit"} Hotel</h3>
              <p className="text-grey text-xs mt-1 max-w-[50ch]">
                Please provide the necessary details about your hotel.
              </p>
            </div>

            {isLoading ? (
              <div className="relative h-[50vh] max-h-[300px]">
                <FallbackLoader loading={isLoading} hideLabel />
              </div>
            ) : (
              <ListHostelForm type={type} />
            )}
          </div>
        </TabsContent>

        {/* BOOKINGS */}
        <TabsContent value="bookings">
          <div className="card !p-6 relative">
            <div>
              <h3 className="">Book Hotel</h3>
              <p className="text-grey text-xs mt-1 max-w-[50ch]">
                Please provide the necessary details about your booking.
              </p>
            </div>

            <BookHotelForm />
          </div>
        </TabsContent>
      </Tabs>
    </SectionWrapper>
  );
}

export default CreateHotel;
