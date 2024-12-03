import * as yup from "yup";

import {
  CarUsed,
  Close,
  Location,
  profile,
  Remove,
  Verified,
  WishListIcon,
} from "@/constants/icons";
import { useGetItemByIDQuery } from "@/server/actions/market";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useFormik } from "formik";
import { Value } from "react-phone-number-input";
import { cn, convertToTitleCase, formatPrice, formatRelativeTime } from "@/lib/utils";
import { isValidPhoneNumber } from "libphonenumber-js";
import { StartChatInput } from "../messaging/ChatInput";
import { useStartChatMutation } from "@/server/actions/messaging";
import { useAuth } from "@/context/AuthContext";

import Button from "@/components/reuseables/CustomButton";
import SectionWrapper from "@/layouts/SectionWrapper";
import Collection from "../_sections/Collection";
import FallbackLoader from "@/components/fallback/FallbackLoader";
import FormWrapper from "@/components/forms/FormWrapper";
import CustomFormField, { FormFieldType } from "@/components/forms/CustomFormField";

function Details() {
  const { id } = useParams();
  const { data, isError, isFetching, error } = useGetItemByIDQuery({ id: id! }, { skip: !id });

  const item = data?.data;
  const [showMore, setShowMore] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (isError) {
      toast.error((error as any)?.message || "Error fetching item");
    }
  }, [isError, error]);

  console.log("[DETAILS]", item);

  const details = useMemo(() => {
    const detailsInfo = item?.details
      ? Object.entries(item.details)
          .filter(([key]) => !key.includes("id")) // Filter out id fields
          .map(([key, value]) => ({
            label: convertToTitleCase(key),
            value:
              key.includes("has_") || key.includes("is_")
                ? value === 1
                  ? "Yes"
                  : "No"
                : typeof value === "boolean"
                ? value
                  ? "Yes"
                  : "No"
                : value || "N/A",
          }))
      : [];

    const dynamicOtherDetails = item?.other_details?.length
      ? item.other_details.map((detail: any) => ({
          label: detail.label || detail.name,
          icon: CarUsed,
        }))
      : [];

    return {
      name: item?.name || "Unknown",
      location: item?.address ? `${item.address}` : "Unknown",
      mediaImages: [
        item?.main_thumbnail,
        ...(item?.media?.map((media: any) => media.file_url) || []),
      ],
      description: item?.description || "No description provided.",
      favouriteCount: item?.favourite_count || 0,
      lastUpdated: item?.updated_at || null,
      otherDetails: dynamicOtherDetails,
      info: detailsInfo,
      sellerName: item?.owner?.name,
    };
  }, [item]);

  const asideInfo = useMemo(
    () => ({
      id: item?.id,
      amount: item?.actual_amount,
      sellerName: item?.owner?.name || "Unknown",
      ownerEmail: item?.owner?.email || "Unknown",
      ownerImage: item?.owner?.profile_picture || profile,
      ownerWhatsapp: item?.owner?.phone,
      ownerPhone: item?.owner?.alt_no,
      ownerLastSeen: item?.owner?.last_seen || null,
      ownerJoinedDate: item?.owner?.created_at || null,
      isVerified: item?.owner?.is_verified || false,
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
        {isFetching ? (
          <div className="relative h-[50vh] max-h-[300px]">
            <FallbackLoader loading={isFetching} />
          </div>
        ) : (
          <div className="flex-column md:row-flex !items-start gap-6 md:gap-8">
            <section className="flex-1 flex-column w-full gap-6">
              <div className="sm:card flex-column gap-4 sm:!p-4">
                <div className="relative w-full h-[400px]">
                  <img
                    src={details?.mediaImages?.[activeImageIndex]}
                    alt=""
                    className="w-full h-full object-cover rounded-t-md transition-opacity duration-300 nodownload-image"
                    style={{ opacity: 0.9 }}
                    onContextMenu={(e) => e.preventDefault()}
                    draggable="false"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 row-flex pointer-events-none">
                    <div className="flex-column gap-1 absolute bottom-10 left-0 right-0 select-none rotate-[-10deg]">
                      <p className="text-white text-center text-3xl font-sora uppercase font-bold opacity-50">
                        LUXURYWITHLAN
                      </p>
                      <p className="text-white text-center text-2xl uppercase font-bold opacity-50">
                        {details?.sellerName && <span>{details?.sellerName}</span>}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-[repeat(auto-fit,_minmax(4rem,_1fr))] gap-4">
                  {details?.mediaImages?.map((img, index) => (
                    <div
                      key={index}
                      className={cn(
                        "relative w-full h-20 md:h-28 cursor-pointer transition-opacity duration-200",
                        activeImageIndex === index && "opacity-60"
                      )}
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <img
                        src={img}
                        alt={`Image ${index + 1}`}
                        onContextMenu={(e) => e.preventDefault()}
                        draggable="false"
                        loading="lazy"
                        className="w-full h-full object-cover rounded-md nodownload-image"
                      />

                      {/* Invisible overlay for thumbnails */}
                      <div
                        className="absolute inset-0 bg-transparent select-none"
                        onContextMenu={(e) => e.preventDefault()}
                      />
                    </div>
                  ))}
                </div>

                <div className="">
                  <div className="row-flex-btwn gap-5">
                    <h2 className="line-clamp-2 leading-6 tracking-wide">{details?.name}</h2>

                    <div className="row-flex gap-1.5">
                      <WishListIcon className="size-4" />
                      <span className="text-xs">{details?.favouriteCount || 0}</span>
                    </div>
                  </div>

                  <p className="row-flex-start gap-1 mt-1">
                    <Location className="size-5 text-foreground font-semibold" />

                    <span className="leading-5 text-sm font-light">
                      <span className="">{details?.location}</span>
                      <span className="">
                        {details?.lastUpdated && `, ${formatRelativeTime(details?.lastUpdated)}`}
                      </span>
                    </span>
                  </p>
                </div>
              </div>

              {details?.otherDetails?.length > 0 && (
                <div className="card grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6">
                  {details?.otherDetails?.map(({ label, icon: Icon }: any, idx: number) => (
                    <div key={idx} className="flex-column !items-center gap-2">
                      {Icon && <Icon className="text-grey size-12" />}
                      <p className="max-sm:text-base text-center">{label}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="card !px-5 !pt-5 !pb-3 relative flex flex-column">
                <div className="grid grid-cols-2 gap-y-6 gap-x-8 w-full">
                  {details.info
                    .slice(0, showMore ? details.info.length : 4)
                    .map((item: any, idx) => (
                      <div key={idx} className="flex-column gap-2">
                        <span className="font-semibold">{item?.label}</span>
                        <span className="font-light capitalize text-sm text-placeholder">
                          {item?.value}
                        </span>
                      </div>
                    ))}
                </div>

                {details.info.length > 4 && (
                  <button
                    onClick={() => setShowMore(!showMore)}
                    className="mt-4 ml-auto  text-base transition font-medium text-secondary hover:font-semibold"
                  >
                    {showMore ? "Show Less" : "Show More"}
                  </button>
                )}

                <span className="absolute top-0 left-[50%] translate-x-[-1000%] border border-slate-200 border-opacity-30 w-px h-full" />
              </div>

              <div className="card !py-6 !px-6">
                <h3>Description</h3>

                <p className="leading-6 text-base text-placeholder mt-4 whitespace-pre-line">
                  {details?.description}
                </p>
              </div>
            </section>

            <aside className="w-full md:w-72 space-y-4">
              <Aside info={asideInfo} listing={item} />
            </aside>
          </div>
        )}

        <SimilarAdverts />
      </div>
    </SectionWrapper>
  );
}

export default Details;

const Aside = ({ info }: { info: any; listing?: any }) => {
  const [showRequestCallback, setShowRequestCallback] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // const handleShowContact = () => {
  //   const phoneNumber = "08103011365";
  //   const whatsappURL = `https://wa.me/${phoneNumber}`;

  //   // Opens WhatsApp
  //   window.open(whatsappURL, "_blank");
  // };

  const handleCallSeller = () => {
    const phoneNumber = info?.ownerPhone || info?.ownerWhatsapp;

    if (showContact) {
      window.location.href = `tel:${phoneNumber}`;
    } else if (phoneNumber) {
      setShowContact(true);
      toast.info("Call will be triggered when you click on the button again");
    } else {
      toast.info("No phone number found");
    }
  };

  return (
    <>
      <div className="card flex-column gap-8">
        <h2 className="font-semibold">
          {info?.currency} {formatPrice(info?.amount) || "N/A"}
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
            <img src={info?.ownerImage} alt="" className="object-cover size-full" />
          </div>

          <div className="flex-column gap-1.5">
            <h3 className="capitalize line-clamp-2 cursor-default gap-2">{info?.sellerName}</h3>
            <Link
              to={`/reviews/${info?.id}`}
              className="text-xs capitalize text-grey inline-flex items-center gap-1"
            >
              <Verified className="size-4" />
              <span className="text-yellow-600 font-medium">4.9</span>
              <span>Reviews ({info?.reviewsCount})</span>
            </Link>

            <span className="text-grey text-xs">
              {info?.ownerLastSeen && (
                <>
                  Last Seen:
                  <span className="italic"> {formatRelativeTime(info?.ownerLastSeen)}</span>
                </>
              )}
            </span>
          </div>
        </div>

        <div className="row-flex !flex-wrap gap-x-4 gap-y-2">
          {showChat ? (
            <StartChat info={info} closeChat={() => setShowChat(false)} />
          ) : (
            <Button
              title={user ? "Message" : "Login to Message"}
              className="w-full tracking-wider"
              onClick={() => {
                if (user) {
                  setShowChat(true);
                } else {
                  //  const returnTo = encodeURIComponent(window.location.pathname);
                  //  navigate(`/signin?returnTo=${returnTo}`);
                  navigate("/signin", {
                    state: { returnTo: window.location.pathname },
                  });
                }
              }}
            />
          )}

          <div className="w-full relative">
            <Button
              title={showContact ? info?.ownerPhone || info?.ownerWhatsapp : "Call"}
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

const StartChat = ({
  info,

  closeChat,
}: {
  info: any;
  closeChat: () => void;
}) => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [startChatMutation, { isLoading }] = useStartChatMutation();

  const handleSubmit = async () => {
    if (!text) return;
    if (text.length < 5) {
      toast.info("Message must be at least 5 characters");
      return;
    }

    const msg = text.trim();
    setText("");

    const payload = {
      property_id: info?.id,
      message: msg,
    };

    try {
      await startChatMutation(payload).unwrap();

      toast.success("Message sent");
      navigate(`/chat/${payload?.property_id}`);
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message;

      toast.error(errorMsg || "Error sending message");
    }
  };

  return (
    <div className="w-full flex-column gap-2">
      <div className="row-flex-btwn gap-3 mb-2">
        <h3 className="text-base">Your message</h3>
        <span className="icon-div !size-7 group active:scale-95" onClick={closeChat} title="close">
          <Close className="size-4 cursor-pointer text-grey transition-colors group-hover:text-foreground" />
        </span>
      </div>

      <StartChatInput text={text} setText={setText} />

      <Button
        title={"Start Chat"}
        className="w-full tracking-wider"
        onClick={handleSubmit}
        isLoading={isLoading}
        disabled={!text?.trim() || isLoading}
      />
    </div>
  );
};

const RequestCallBack = ({ closeModal }: { closeModal: () => void }) => {
  const onSubmit = async (values: any) => {
    // @ts-ignore
    const data = {
      name: values.name,
      phone_number: values.phone_number,
    };

    try {
      toast.success("Callback request sent");
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
        name: yup
          .string()
          .required("Name is required")
          .test("is-full-name", "Full Name is required", (value: any) => {
            return value && value.trim().split(" ").length >= 2;
          }),
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
