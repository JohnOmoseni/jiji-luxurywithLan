import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useGetItemByIDQuery } from "@/server/actions/market";
import {
  CarUsed,
  FuelGas,
  Gear,
  Heart,
  Location,
  profile,
  SpeedMeter,
  Verified,
} from "@/constants/icons";
import SectionWrapper from "@/layouts/SectionWrapper";
import Button from "@/components/reuseables/CustomButton";
import FallbackLoader from "@/components/fallback/FallbackLoader";
import Collection from "../_sections/Collection";

function Details() {
  const { id } = useParams();
  const { data, isError, isLoading, error } = useGetItemByIDQuery({ id: id! }, { skip: !id });

  useEffect(() => {
    if (isError) {
      toast.error((error as any)?.message || "Error fetching item");
    }
  }, [isError, error]);

  const item = data?.data;

  const details = useMemo(
    () => ({
      name: item?.name || "BMW 328i 2012 Black",
      location: item?.state_name
        ? `${item.state_name}${
            item?.lga_name ? `, ${item.lga_name}` : item?.district ? `, ${item.district}` : ""
          }`
        : "Unknown",
      mediaImages: [
        item?.main_thumbnail,
        ...(item?.other_media?.map((media: any) => media.file_url) || []),
      ],
      description: item?.description || "No description provided.",
      otherDetails: [
        { label: "Foreign Used", icon: CarUsed },
        { label: "Petrol", icon: FuelGas },
        { label: "Automatic", icon: Gear },
        { label: "121,345 km", icon: SpeedMeter },
      ],
      info: [
        { label: "Second Condition", value: "New" },
        { label: "Make", value: "BMW" },
        { label: "Color", value: "Black" },
        { label: "Registered Car", value: "300" },
        { label: "Interior Color", value: "Black" },
        { label: "Year of Manufacture", value: "2018" },
      ],
    }),
    [item]
  );

  const asideInfo = useMemo(
    () => ({
      amount: item?.actual_amount || "N/A",
      sellerName: item?.seller_name || "Unknown",
      ownerWhatsapp: item?.phone_no,
      ownerPhone: item?.alt_no,
      currency: item?.currency,
      reviewsCount: item?.reviews_count || 0,
      rating: item?.favourite_count || 0,
      category: item?.main_category_name || "N/A",
    }),
    [item]
  );

  if (isLoading) {
    return (
      <SectionWrapper>
        <div className="relative h-[50vh] max-h-[300px]">
          <FallbackLoader loading={isLoading} />
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper>
      <div className="flex-column md:flex-row gap-8">
        <section className="flex-1 space-y-6">
          <div className="sm:card flex-column gap-4 sm:!p-4">
            <img
              src={details.mediaImages[0]}
              alt={details.name}
              className="w-full h-[400px] object-cover rounded-t-md"
            />
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(4rem,_1fr))] gap-4">
              {details.mediaImages.slice(1).map((img, index) => (
                <div key={index} className="w-full h-20 sm:h-28">
                  <img
                    src={img}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              ))}
            </div>

            <div className="mt-3">
              <div className="row-flex-btwn gap-5">
                <h2 className="line-clamp-2 leading-6 tracking-wide">{details?.name}</h2>

                <div className="icon-div !size-9">
                  <Heart className="size-5" />
                </div>
              </div>

              <p className="row-flex-start gap-1 mt-0.5">
                <Location className="size-5 text-foreground font-semibold" />
                <span className="font-light text-sm mt-1">{details?.location}</span>
              </p>
            </div>
          </div>

          <div className="card grid grid-cols-2 gap-4">
            {details.otherDetails.map(({ label, icon: Icon }, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <Icon className="text-grey size-12" />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="card p-5">
            <div className="grid grid-cols-2 gap-6">
              {details.info.map(({ label, value }, idx) => (
                <div key={idx}>
                  <span className="font-semibold">{label}</span>
                  <p className="text-sm text-gray-600">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-semibold">Description</h3>
            <p className="mt-4 text-sm text-gray-600">{details.description}</p>
          </div>
        </section>

        <aside className="w-full md:w-72 space-y-4">
          <Aside info={asideInfo} />
        </aside>
      </div>

      <SimilarAdverts />
    </SectionWrapper>
  );
}

const Aside = ({ info }: { info: any }) => (
  <>
    <div className="card flex-column gap-6">
      <h2 className="font-semibold">
        {info.currency} {info.amount}
      </h2>
      <Button
        variant="outline"
        title="Request Call Back"
        className="w-full text-secondary border-secondary"
      />
    </div>

    <div className="card flex-column gap-6">
      <div className="flex items-center gap-3">
        <img src={profile} alt="Seller" className="w-12 h-12 rounded-full" />
        <div>
          <h3 className="font-medium">{info.sellerName}</h3>
          <p className="text-xs text-gray-500 row-flex-start gap-1 mt-1">
            <Verified className="size-4 text-yellow-600" /> {info.rating} Reviews (
            {info.reviewsCount})
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        <Button title="Message" className="w-full" />
        <Button title="Call" variant="outline" className="w-full text-secondary border-secondary" />
      </div>
    </div>
  </>
);

const SimilarAdverts = () => (
  <div className="mt-8">
    <h2 className="mb-4">Similar Adverts</h2>
    <Collection data={[]} containerStyles="sm:grid-cols-[repeat(auto-fit,_minmax(200px,_230px))]" />
  </div>
);

export default Details;
