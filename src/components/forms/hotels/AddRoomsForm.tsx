import { useState } from "react";
import { SelectItem } from "@/components/ui/select";
import { listingTypes, mainCategories } from "@/constants";
import { useFormik } from "formik";
import { toast } from "sonner";
import { PostSchema } from "@/schema/validation";
import { InferType } from "yup";
import { CategoryTypes } from "@/types/api.types";

import CustomFormField, { FormFieldType } from "@/components/forms/CustomFormField";
import FormFileUpload from "../FormFileUpload";
import MultipartFormWrapper from "../MultipartFormWrapper";

type AddRoomsFormProps = {
  data?: any;
  step: number;
  categoryType?: CategoryTypes;
  nextStep?: (values: any) => void;
  states: { label: string; value: string }[];
  lgas: { label: string; value: string }[];
  selectedState: string;
  setFiles: any;
  files: any;
  setCategoryType: any;
  setSelectedState: any;
};

const AddRoomsForm = ({
  data,
  categoryType,
  states,
  lgas,
  selectedState,
  setSelectedState,
  nextStep,
  setFiles,
  setCategoryType,
}: AddRoomsFormProps) => {
  const [hasImageUploaded, setHasImageUploaded] = useState(false);

  const onSubmit = async (values: InferType<typeof PostSchema>) => {
    if (!hasImageUploaded) {
      toast.info("Please upload at least 2 images for the ad");
      return;
    }

    setCategoryType(values.category);

    try {
      nextStep?.(values);
    } catch (error: any) {
      const message = error?.response?.data?.message;

      toast.error(message || "Couldn't proceed with posting of ad");
    }
  };

  const { values, errors, touched, setFieldValue, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: data?.name || "",
        listingType: data?.type || "book",
        description: data?.description || "",
        address: data?.address || "",
        district: data?.district || "",
        state: data?.state_id ? String(data?.state_id) : "",
        lga: data?.lga_id ? String(data?.lga_id) : "",
        amount: data?.amount || "",
        actual_amount: data?.actual_amount || "",
        category: categoryType || "Hotel",
        is_negotiable: data?.is_negotiable || false,
      },
      validationSchema: PostSchema,
      enableReinitialize: true,
      onSubmit,
    });

  return (
    <MultipartFormWrapper btnStyles="w-max" containerStyles="max-w-full" onSubmit={handleSubmit}>
      <div className="relative flex-column gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="name"
            label="Room Title"
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
            onChange={handleChange}
            field={{
              value: values.name,
              placeholder: "",
            }}
          />

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            name="listingType"
            label="Listing Type"
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
            field={{
              value: values.listingType,
              placeholder: "",
            }}
            onChange={(value: any) => {
              setFieldValue("listingType", value);
            }}
            selectList={listingTypes}
          >
            {listingTypes?.map((item, index) => (
              <SelectItem key={index} value={item?.value} className="shad-select-item">
                {item?.label}
              </SelectItem>
            ))}
          </CustomFormField>
        </div>

        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          name="description"
          label="Description"
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
          onChange={handleChange}
          field={{
            value: values.description,
            placeholder: "Type Description",
          }}
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="address"
          label="Address"
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
          onChange={handleChange}
          field={{
            value: values.address,
            placeholder: "Type Address",
          }}
        />

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          name="state"
          label="State"
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
          field={{
            value: values.state,
            placeholder: "",
          }}
          selectContainerStyles="max-h-72"
          onChange={(value: any) => {
            setFieldValue("state", value);
            setSelectedState(value);
          }}
          selectList={states}
        >
          {states?.map((item, index) => (
            <SelectItem key={index} value={item?.value} className="shad-select-item">
              {item?.label}
            </SelectItem>
          ))}
        </CustomFormField>

        {selectedState && (
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            name="lga"
            label="LGA"
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
            field={{
              value: values.lga,
              placeholder: "",
            }}
            onChange={(value: string) => {
              setFieldValue("lga", value);
            }}
            selectList={lgas}
          >
            {lgas?.map((item, index) => (
              <SelectItem key={index} value={item?.value} className="shad-select-item">
                {item?.label}
              </SelectItem>
            ))}
          </CustomFormField>
        )}

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="district"
          label="District"
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
          onChange={handleChange}
          field={{
            value: values.district,
            placeholder: "e.g. Ikorodu",
          }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5 ">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="amount"
            label={"Discount Price (\u20A6)"}
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
            onChange={handleChange}
            field={{
              value: values.amount,
              placeholder: "",
              type: "number",
            }}
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="actual_amount"
            label={"Actual Price (\u20A6)"}
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
            onChange={handleChange}
            field={{
              value: values.actual_amount,
              placeholder: "",
              type: "number",
            }}
          />
        </div>

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          name="category"
          label="Category (For Properties)"
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
          field={{
            value: values.category,
            placeholder: "",
          }}
          onChange={(value: any) => {
            setFieldValue("category", value);
          }}
          selectList={mainCategories}
        >
          {mainCategories?.map((item, index) => (
            <SelectItem key={index} value={item?.value} className="shad-select-item">
              {item?.label}
            </SelectItem>
          ))}
        </CustomFormField>

        <div className="mt-2">
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            name="mediaImage"
            errors={errors}
            onBlur={handleBlur}
            touched={touched}
            renderSkeleton={() => (
              <FormFileUpload
                title="Upload Images (At least 2 images)"
                name="mediaImage"
                setHasImageUploaded={setHasImageUploaded}
                images={
                  Array.isArray(data?.media) && data?.media?.length > 0
                    ? data?.media?.map((file: any) => file?.file_url)
                    : []
                }
                onFileChange={(files) => setFiles(files)}
              />
            )}
          />
        </div>
      </div>
    </MultipartFormWrapper>
  );
};

export default AddRoomsForm;
