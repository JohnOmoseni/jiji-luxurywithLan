import * as yup from "yup";

import {
  CarUsed,
  Close,
  FuelGas,
  Gear,
  Heart,
  Location,
  profile,
  Remove,
  SpeedMeter,
  Verified,
} from "@/constants/icons";
import { useGetItemByIDQuery } from "@/server/actions/market";
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useFormik } from "formik";
import { Value } from "react-phone-number-input";
import { isValidPhoneNumber } from "libphonenumber-js";

import Button from "@/components/reuseables/CustomButton";
import SectionWrapper from "@/layouts/SectionWrapper";
import Collection from "../_sections/Collection";
import FallbackLoader from "@/components/fallback/FallbackLoader";
import FormWrapper from "@/components/forms/FormWrapper";
import CustomFormField, { FormFieldType } from "@/components/forms/CustomFormField";
import { cn } from "@/lib/utils";

function Details() {
  const { id } = useParams();
  const { data, isError, isLoading, error } = useGetItemByIDQuery({ id: id! }, { skip: !id });

  useEffect(() => {
    if (isError) {
      toast.error((error as any)?.message || "Error fetching item");
    }
  }, [isError, error]);

  const item = data?.data;

  console.log("[DETAILS]", item);

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
      ownerWhatsapp: item?.phone_number,
      ownerPhone: item?.alt_no,
      currency: item?.currency,
      reviewsCount: item?.reviews_count || 0,
      rating: item?.favourite_count || 0,
      category: item?.main_category_name || "N/A",
    }),
    [item]
  );

  return (
    <SectionWrapper>
      <div className="">
        {isLoading ? (
          <div className="relative h-[50vh] max-h-[300px]">
            <FallbackLoader loading={isLoading} />
          </div>
        ) : (
          <div className="flex-column md:row-flex !items-start gap-6 md:gap-8">
            <section className="flex-1 flex-column w-full gap-6">
              <div className="sm:card flex-column gap-4 sm:!p-4">
                <img
                  src={details?.mediaImages?.[0]}
                  alt=""
                  className="w-full h-[400px] object-cover rounded-t-md"
                />

                <div className="grid grid-cols-[repeat(auto-fit,_minmax(4rem,_1fr))] gap-4 ">
                  {details?.mediaImages.slice(1)?.map((img, index) => (
                    <div key={index} className="relative w-full h-20 sm:h-28">
                      <img
                        src={img}
                        alt={`Image ${index + 1}`}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  ))}
                </div>

                <div className="">
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

              <div className="card grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6">
                {details?.otherDetails?.map(({ label, icon: Icon }, idx) => (
                  <div key={idx} className="flex-column !items-center gap-2">
                    {Icon && <Icon className="text-grey size-12" />}
                    <p className="max-sm:text-base text-center">{label}</p>
                  </div>
                ))}
              </div>

              <div className="card !p-5 relative">
                <div className="grid grid-cols-2 gap-y-6 gap-x-8 w-full">
                  {details.info.map((item: any, idx) => (
                    <div key={idx} className="flex-column gap-2">
                      <span className="font-semibold">{item?.label}</span>
                      <span className="font-light text-sm text-placeholder">{item?.value}</span>
                    </div>
                  ))}
                </div>

                <span className="absolute top-0 left-[50%] translate-x-[-1000%] border border-slate-200 border-opacity-30 w-px h-full" />
              </div>

              <div className="card !py-6 !px-6">
                <h3>Description</h3>

                <p className="leading-5 text-sm text-placeholder mt-4">{details?.description}</p>
              </div>
            </section>

            <aside className="w-full md:w-72 space-y-4">
              <Aside info={asideInfo} />
            </aside>
          </div>
        )}

        <SimilarAdverts />
      </div>
    </SectionWrapper>
  );
}

export default Details;

const Aside = ({ info }: { info: any }) => {
  const [showRequestCallback, setShowRequestCallback] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const handleShowContact = () => {
    const phoneNumber = "08103011365";
    const whatsappURL = `https://wa.me/${phoneNumber}`;

    // Opens WhatsApp
    window.open(whatsappURL, "_blank");
  };

  const handleCallSeller = () => {
    if (showContact) {
      const phoneNumber = "08103011365";
      window.location.href = `tel:${phoneNumber}`;
    } else {
      setShowContact(true);
    }
  };

  return (
    <>
      <div className="card flex-column gap-8">
        <h2 className="font-semibold">
          {info?.currency} {info?.amount}
        </h2>

        {showRequestCallback ? (
          <RequestCallBack closeModal={() => setShowRequestCallback(false)} />
        ) : (
          <Button
            variant="outline"
            title="Request Call Back"
            className="w-full text-secondary border-secondary"
            onClick={() => setShowRequestCallback(true)}
          />
        )}
      </div>

      <div className="flex-column gap-6 card">
        <div className="w-full grid grid-cols-[max-content_1fr] items-center gap-3 ">
          <div className="relative size-12 overflow-hidden rounded-full border border-slate-300 border-opacity-30 p-px shadow-sm clip-circle self-start">
            <img src={profile} alt="" className="object-contain size-full" />
          </div>
          <div className="flex-column gap-1">
            <h3 className="capitalize line-clamp-2 cursor-default gap-2">{info?.sellerName}</h3>
            <p className="text-xs capitalize text-grey inline-flex items-center gap-1">
              <Verified className="size-4" />
              <span className="text-yellow-600 font-medium">4.9</span>
              <span>Reviews ({info?.reviewsCount})</span>
            </p>
          </div>
        </div>

        <div className="row-flex !flex-wrap gap-x-4 gap-y-2">
          <Button title={"Message"} className="w-full tracking-wider" />

          <div className="w-full relative">
            <Button
              title={showContact ? "08103011365" : "Call"}
              onClick={handleCallSeller}
              className={cn(
                "w-full",
                !showContact ? "text-secondary border-secondary" : "tracking-wider"
              )}
              variant={showContact ? "default" : "outline"}
            />

            {showContact && (
              <button
                type="button"
                onClick={() => setShowContact(false)}
                className="absolute -top-2.5 -right-2 bg-background rounded-full"
              >
                <Remove className="text-secondary size-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const SimilarAdverts = () => {
  return (
    <div className="flex-column gap-4 mt-8 sm:mt-12">
      <h2>Similar adverts</h2>

      <Collection
        data={[]}
        containerStyles="sm:grid-cols-[repeat(auto-fit,_minmax(200px,_230px))]"
      />
    </div>
  );
};

const RequestCallBack = ({ closeModal }: { closeModal: () => void }) => {
  const onSubmit = async (values: any) => {
    const data = {
      name: values.name,
      phone_number: values.phone_number,
    };

    try {
      toast.success("Saved");
    } catch (error: any) {
      const message = error?.response?.data?.message;

      toast.error(message || "Error saving changes");
    }
  };

  const { values, errors, touched, handleChange, setFieldValue, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        phone_number: "",
      },
      validationSchema: yup.object().shape({
        name: yup.string().required("name is required"),
        phone_number: yup
          .string()
          .test("is-valid-phone", "Please enter a valid phone number", (value) =>
            isValidPhoneNumber(value!, "NG")
          )
          .required("Phone Number is required"),
      }),
      onSubmit,
    });

  return (
    <div className="relative">
      <FormWrapper
        btnStyles=""
        containerStyles="max-w-full mt-0"
        buttonLabel="Request Call back"
        onSubmit={handleSubmit}
        isSubmitting={false}
      >
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Your Name"
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
          onChange={handleChange}
          field={{
            value: values.name,
          }}
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          name={"phone_number"}
          label="Phone Number"
          field={{ value: values.phone_number }}
          onChange={(value: Value) => {
            setFieldValue("phone_number", value);
          }}
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
        />
      </FormWrapper>

      <span
        className="icon-div !size-6 absolute right-0 -top-4 group active:scale-95"
        onClick={closeModal}
        title="close"
      >
        <Close
          size="14"
          className="z-[1000] cursor-pointer text-grey transition-colors group-hover:text-foreground"
        />
      </span>
    </div>
  );
};
