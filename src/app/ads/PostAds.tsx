import { useLocation, useNavigate, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { categoryFields, leasedFields } from "@/constants";
import { DynamicFieldType } from "@/types";
import { toast } from "sonner";
import { useFormik } from "formik";
import { generateInitialValues } from "@/lib";
import { CategoryTypes, FormValues } from "@/types/api.types";
import {
  useAddListingMutation,
  useEditListingMutation,
  useGetListingByIDQuery,
} from "@/server/actions/listing";
import { useGetAllLGAsQuery, useGetAllStatesQuery } from "@/server/actions/utils";

import SectionWrapper from "@/layouts/SectionWrapper";
import PostSuccess from "./PostSuccess";
import PostAdForm from "@/components/forms/ads/PostAdForm";
import BackArrow from "@/components/reuseables/BackArrow";
import PostAdForm2 from "@/components/forms/ads/PostAdForm2";
import FallbackLoader from "@/components/fallback/FallbackLoader";

function PostAds() {
  const { id: listing_id } = useParams();
  const { state } = useLocation();
  const category = state?.category || "Land";
  const type = state?.type || "post";

  const {
    data: postData,
    isLoading: fetchingListing,
    isError,
    error,
  } = useGetListingByIDQuery({ listing_id: listing_id! }, { skip: !listing_id || type !== "edit" });

  useEffect(() => {
    if (isError) {
      const message = (error as any)?.message;
      toast.error(message || "Error fetching listing data");
    }
  }, [isError]);

  const [step, setStep] = useState(1);
  const [files, setFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dynamicFields, setDynamicFields] = useState<DynamicFieldType[]>([]);
  const [staticFields, setStaticFields] = useState<FormValues | null>(postData?.data || null);
  const [selectedState, setSelectedState] = useState("");

  const [categoryType, setCategoryType] = useState<CategoryTypes>(category);

  const { data: states } = useGetAllStatesQuery({});
  const { data: lgas } = useGetAllLGAsQuery(
    { state_id: selectedState || postData?.data?.state_id },
    { skip: !selectedState && !postData?.data?.state_id }
  );

  const [addListingMutation] = useAddListingMutation();
  const [editListingMutation] = useEditListingMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (postData?.data) {
      setStaticFields(postData.data);
    }
  }, [postData]);

  const onSubmit = async (dynamicValues: any) => {
    setIsLoading(true);
    const values = staticFields;

    const dynamicFieldsObj = dynamicFields.reduce((acc, key) => {
      const value = (dynamicValues as any)[key?.name];
      if (value !== "" && value !== undefined) {
        acc[key?.name] = value;
      }
      return acc;
    }, {} as Record<string, any>);

    const data = {
      name: values?.name,
      description: values?.description,
      amount: values?.amount,
      actual_amount: values?.actual_amount,
      is_negotiatable: values?.is_negotiable,
      condition: "new",
      address: values?.address,

      main_category_id: 1,
      sub_categories: [6],

      state_id: values?.state,
      lga_id: values?.lga,
      district: values?.district,
      media: [...files],
      ...dynamicFieldsObj,
    };

    console.log("FORM VALUES", files, data);

    try {
      let message;
      if (type === "post") {
        await addListingMutation(data).unwrap();
        message = "Posted Ad Successfully";
      } else if (type === "edit") {
        await editListingMutation({ listing_id: 1, ...data }).unwrap();

        message = "Edited Ad Successfully";
      }

      toast.success(message || `Uploaded Successfully`);
      navigate("/ads");
    } catch (error: any) {
      const message = error?.response?.data?.message;

      toast.error(message || "Error uploading");
    } finally {
      setIsLoading(false);
    }
  };

  const { values, errors, touched, setFieldValue, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: generateInitialValues(categoryType, postData?.data),
      validationSchema: "",
      onSubmit,
      enableReinitialize: true,
    });

  useEffect(() => {
    let fields = categoryFields[categoryType || ""] || [];

    if (categoryType === "Land" && values?.is_leased) {
      fields = [...fields, ...leasedFields];
    }

    setDynamicFields(fields);
  }, [categoryType, values.is_leased]);

  useEffect(() => {
    setCategoryType(category);
  }, [category]);

  const nextStep = () => {
    setStep((prev) => Math.min(3, prev + 1));
    toast.info("Next Page");
  };

  const prevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  return (
    <SectionWrapper>
      <div className={cn("card !p-6 max-w-3xl relative mx-auto", step === 2 && "!mt-12")}>
        <div className="flex-column gap-4">
          {step === 2 && (
            <div className="absolute -top-[45px] left-1">
              <BackArrow onHandleGoBack={step === 2 ? prevStep : null} />
            </div>
          )}

          <div>
            <h3 className="">{type === "edit" ? "Edit" : "Post"} Advert</h3>
            {step === 1 && (
              <p className="text-grey text-xs mt-1 max-w-[50ch]">
                Please provide the necessary details about your ad.
              </p>
            )}
          </div>

          {fetchingListing ? (
            <div className="relative h-[50vh] max-h-[300px]">
              <FallbackLoader loading={isLoading} hideLabel />
            </div>
          ) : (
            <div className="">
              {step === 1 && (
                <PostAdForm
                  step={step}
                  data={staticFields}
                  nextStep={nextStep}
                  states={states}
                  lgas={lgas}
                  selectedState={selectedState}
                  setSelectedState={setSelectedState}
                  files={files}
                  setFiles={setFiles}
                  setStaticFields={setStaticFields}
                  categoryType={categoryType}
                  setCategoryType={setCategoryType}
                />
              )}

              {step === 2 && (
                <PostAdForm2
                  step={step}
                  prevStep={prevStep}
                  isLoading={isLoading}
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  dynamicFields={dynamicFields}
                />
              )}
              {step === 3 && <PostSuccess />}
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}

export default PostAds;
