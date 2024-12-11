import { useLocation, useNavigate, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { categoryFields, leasedFields, mainCategories } from "@/constants";
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
import BackArrow from "@/components/reuseables/BackArrow";
import FallbackLoader from "@/components/fallback/FallbackLoader";
import PostSuccess from "../_sections/PostSuccess";
import AddRoomsForm from "@/components/forms/hotels/AddRoomsForm";
import AddRoomsForm2 from "@/components/forms/hotels/AddRoomsForm2";

function AddRoom() {
  const { id: listing_id } = useParams();
  const { state } = useLocation();
  const category = state?.category || "Hotel";
  const type = state?.type || "post";

  const {
    data: hotelData,
    isLoading: fetchingListing,
    isError,
    error,
  } = useGetListingByIDQuery({ listing_id: listing_id! }, { skip: !listing_id || type !== "edit" });

  useEffect(() => {
    if (isError) {
      const message = (error as any)?.message || (error as any)?.data?.message;
      toast.error(message || "Error fetching hotel data");
    }
  }, [isError]);

  const [step, setStep] = useState(1);
  const [files, setFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dynamicFields, setDynamicFields] = useState<DynamicFieldType[]>([]);
  const [staticFields, setStaticFields] = useState<FormValues | null>(hotelData?.data || null);
  const [selectedState, setSelectedState] = useState("");

  const [categoryType, setCategoryType] = useState<CategoryTypes>(category);

  const { data: states } = useGetAllStatesQuery({});
  const { data: lgas } = useGetAllLGAsQuery(
    { state_id: selectedState || hotelData?.data?.state_id },
    { skip: !selectedState && !hotelData?.data?.state_id }
  );

  const [addListingMutation] = useAddListingMutation();
  const [editListingMutation] = useEditListingMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (hotelData?.data) {
      setStaticFields(hotelData.data);
    }
  }, [hotelData]);

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

    const main_category_id =
      mainCategories?.find((category) => category?.value === categoryType)?.id || "0";

    const data = {
      name: values?.name,
      description: values?.description,
      amount: values?.amount,
      actual_amount: values?.actual_amount,
      condition: "new",
      address: values?.address,

      main_category_id: main_category_id,
      sub_categories: Number(main_category_id) + 1,

      state_id: values?.state,
      lga_id: values?.lga,
      district: values?.district,
      media: [...files],
      ...dynamicFieldsObj,
      number_of_rooms: values?.number_of_rooms || 1,
    };

    console.log("FORM VALUES", files, data);

    try {
      let message;
      if (type === "post") {
        await addListingMutation(data).unwrap();
        message = "Room Added Successfully";
      } else if (type === "edit") {
        await editListingMutation({ listing_id: 1, ...data }).unwrap();

        message = "Room Updated Successfully";
      }

      toast.success(message);
      navigate("/my-ads");
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.data?.message;

      console.log("UPLOAD ERROR", error);

      toast.error(message || "Error adding  room");
    } finally {
      setIsLoading(false);
    }
  };

  const { values, errors, touched, setFieldValue, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: generateInitialValues(categoryType, hotelData?.data),
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

  const [form1Values, setForm1Values] = useState<any>(null);

  const handleForm1Submit = (values: any) => {
    setStaticFields(values);
    setForm1Values(values);
    nextStep();
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
            <h3 className="">{type === "edit" ? "Edit" : "Add"} Room</h3>
            {step === 1 && (
              <p className="text-grey text-xs mt-1 max-w-[50ch]">
                Please provide the necessary details about your room.
              </p>
            )}
          </div>

          {fetchingListing ? (
            <div className="relative h-[50vh] max-h-[300px]">
              <FallbackLoader loading={isLoading} hideLabel />
            </div>
          ) : (
            <>
              <div className={cn("block", step === 1 ? "block" : "hidden")}>
                <AddRoomsForm
                  step={step}
                  data={form1Values || staticFields}
                  nextStep={handleForm1Submit}
                  states={states}
                  lgas={lgas}
                  selectedState={selectedState}
                  setSelectedState={setSelectedState}
                  files={files}
                  setFiles={setFiles}
                  categoryType={categoryType}
                  setCategoryType={setCategoryType}
                />
              </div>

              {step === 2 && (
                <AddRoomsForm2
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
              {step === 3 && <PostSuccess title="" />}
            </>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}

export default AddRoom;
